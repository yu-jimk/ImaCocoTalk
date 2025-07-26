"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Flag,
  Users,
  TrendingUp,
  QrCode,
  Settings,
} from "lucide-react";
import { QrCodeDialog } from "@/components/QrCodeDialog";
import Image from "next/image";

export type StoreInfo = {
  id: string;
  name: string;
  totalPosts: number;
  totalReports: number;
  monthlyVisitors: number;
};

export function DashboardOverview({ storeInfo }: { storeInfo: StoreInfo }) {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/moderator/store/${storeInfo.id}/check_in_qr`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch QR code image");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setQrUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQrCode();
  }, [storeInfo.id]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6 min-h-60">
        <Card className="bg-white py-4 md:py-6 flex-1 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-1 sm:gap-2 text-orange-700 text-base sm:text-xl md:text-2xl whitespace-nowrap truncate">
              <Settings className="h-5 w-5 min-w-5 min-h-5" />
              {storeInfo.name} - 管理概要
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full w-full">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full">
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                    {storeInfo.totalPosts}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-600 flex items-center justify-center gap-1 mt-2">
                    <MessageCircle className="h-3 w-3" />
                    総投稿数
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
                    {storeInfo.totalReports}
                  </div>
                  <div className="text-xs sm:text-sm text-red-600 flex items-center justify-center gap-1 mt-2">
                    <Flag className="h-3 w-3" />
                    違反報告
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                    {storeInfo.monthlyVisitors}
                  </div>
                  <div className="text-xs sm:text-sm text-green-600 flex items-center justify-center gap-1 mt-2">
                    <Users className="h-3 w-3" />
                    月間訪問者
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
                    4.5
                  </div>
                  <div className="text-xs sm:text-sm text-purple-600 flex items-center justify-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    平均評価
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white py-4 md:py-6 flex-1 flex flex-col">
          <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle className="flex items-center gap-1 sm:gap-2 text-gray-700 text-base sm:text-lg md:text-xl whitespace-nowrap justify-center text-center">
              <QrCode className="h-5 w-5 min-w-5 min-h-5" />
              店舗QRコード
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center">
            {qrUrl ? (
              <div
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setQrDialogOpen(true)}
                tabIndex={0}
                role="button"
                aria-label="QRコードを拡大表示"
              >
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  width={200}
                  height={200}
                  unoptimized
                />
                <div className="mt-4 text-xs text-gray-500 flex justify-center items-center">
                  クリックで拡大表示
                </div>
              </div>
            ) : (
              <p>読み込み中...</p>
            )}
          </CardContent>
        </Card>
      </div>

      <QrCodeDialog
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        value={qrUrl || ""}
      />
    </>
  );
}
