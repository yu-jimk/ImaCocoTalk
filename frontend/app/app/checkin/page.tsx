"use client";

import { useState } from "react";

import { QrCode, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CheckedInModal } from "./CheckedInModal";

export default function CheckinPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      // 実際はカメラ + QR解析処理
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsCheckedIn(true);
    } catch (err) {
      console.error("スキャン失敗:", err);
      // setError("QRコードの読み取りに失敗しました"); など
    } finally {
      setIsScanning(false);
    }
  };

  if (isCheckedIn) {
    return <CheckedInModal />;
  }

  return (
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
              <span className="font-medium">カフェ・ド・パリ</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">距離:</span>
              <span className="text-green-600 font-medium">30m以内 ✓</span>
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
            <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-600">スキャン中...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">
                    店内に設置されているQRコードを
                    <br />
                    カメラで読み取ってください
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full"
            >
              <Camera className="h-4 w-4 mr-2" />
              {isScanning ? "スキャン中..." : "カメラを起動"}
            </Button>
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
  );
}
