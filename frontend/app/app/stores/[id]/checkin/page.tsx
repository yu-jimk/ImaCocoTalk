"use client";

import { useRef, useState, use, useEffect } from "react";
import jsQR from "jsqr";
import { ArrowLeft, QrCode, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckedInModal } from "./CheckedInModal";
import { StoreData } from "@/app/types";
import Link from "next/link";

export default function CheckinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [store, setStore] = useState<StoreData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const lat = 35.6762;
        const lng = 139.6503;
        const res = await fetch(
          `http://localhost:3000/api/stores/${id}?lat=${lat}&lng=${lng}`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          throw new Error("店舗情報が取得できませんでした");
        }
        const data = await res.json();
        setStore(data);
      } catch (err) {
        console.error(err);
        setError("店舗情報の取得に失敗しました");
      }
    };

    fetchStore();
  }, [id]);

  const startScan = async () => {
    setError(null);
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // ✅ メタデータ（サイズなど）読み込み完了を待つ
        await new Promise((resolve) => {
          videoRef.current!.onloadedmetadata = () => {
            resolve(null);
          };
        });

        requestAnimationFrame(tick);
      }
    } catch (err) {
      console.error("カメラ起動失敗:", err);
      setError("カメラへのアクセスが拒否されました");
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    cancelAnimationFrame(animationRef.current!);
    setIsScanning(false);
  };

  const tick = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQR(imageData.data, canvas.width, canvas.height);
    if (code) {
      console.log("QR内容:", code.data);
      stopScan();

      try {
        const res = await fetch("http://localhost:3000/api/check_ins", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            store_id: id,
            qr_token: code.data,
            latitude: 35.6762,
            longitude: 139.6503,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          setError(err.error || "チェックインに失敗しました");
          return;
        }

        // 成功時
        setIsCheckedIn(true);
      } catch (err) {
        console.error("チェックインエラー:", err);
        setError("サーバーへの接続に失敗しました");
      }

      return;
    }

    animationRef.current = requestAnimationFrame(tick);
  };

  if (isCheckedIn) {
    return <CheckedInModal storeId={id} storeName={store?.name ?? "店舗"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 共通ヘッダー */}
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href={`/stores/${id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">チェックイン</h1>
        </div>
      </header>
      <div className="p-4">
        {/* Location Status */}
        <Card className="mb-6 py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              現在地確認
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">店舗:</span>
                <span className="font-medium">{store?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">距離:</span>
                <span
                  className={`font-medium ${
                    store?.distance && parseInt(store.distance) <= 30
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {store?.distance
                    ? parseInt(store.distance) <= 30
                      ? `${store.distance}以内 ✓`
                      : `${store.distance}以上 ✗`
                    : "-"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Scanner */}
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <QrCode className="h-5 w-5 text-blue-600" />
              QRコードスキャン
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="relative w-full max-w-md aspect-video mx-auto bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <Button
                onClick={isScanning ? stopScan : startScan}
                className="w-full max-w-md mx-auto"
              >
                <Camera className="h-4 w-4 mr-2" />
                {isScanning ? "スキャン停止" : "カメラを起動"}
              </Button>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">チェックイン方法</h3>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal pl-4">
              <li>店舗から30m以内にいることを確認</li>
              <li>店内のQRコードをスキャン</li>
              <li>チェックイン完了後、投稿が可能になります</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
