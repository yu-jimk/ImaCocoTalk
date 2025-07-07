import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Flag,
  Users,
  TrendingUp,
  QrCode,
  Settings,
} from "lucide-react";
import { QRCode } from "@/components/qr-code";

export type StoreInfo = {
  name: string;
  totalPosts: number;
  totalReports: number;
  monthlyVisitors: number;
  qrCodeValue: string;
};

type Props = {
  storeInfo: StoreInfo;
  onQrClick: () => void;
};

export const DashboardOverview: React.FC<Props> = ({
  storeInfo,
  onQrClick,
}) => (
  <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6 min-h-60">
    {/* 統計情報カード */}
    <Card className="bg-white border-l-4 border-l-gray-400 py-4 md:py-6 flex-1 h-full">
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

    {/* QRコードカード */}
    <Card className="bg-white  py-4 md:py-6 flex-1 flex flex-col">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="flex items-center gap-1 sm:gap-2 text-gray-700 text-base sm:text-lg md:text-xl whitespace-nowrap justify-center text-center">
          <QrCode className="h-5 w-5 min-w-5 min-h-5" />
          店舗QRコード
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center">
        <div
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={onQrClick}
          tabIndex={0}
          role="button"
          aria-label="QRコードを拡大表示"
        >
          <QRCode value={storeInfo.qrCodeValue} size={200} />
          <div className="mt-4 text-xs text-gray-500 flex justify-center items-center">
            クリックで拡大表示
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
