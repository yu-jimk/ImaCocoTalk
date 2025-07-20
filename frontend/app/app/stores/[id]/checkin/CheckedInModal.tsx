import Link from "next/link";

import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CheckedInModal({ storeId }: { storeId: string }) {
  // QRコードのモックアップ表示（実際の実装ではqrcode.jsなどを使用）
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-8 text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-green-600 mb-2">
            チェックイン完了！
          </h2>
          <p className="text-gray-600 mb-6">
            カフェ・ド・パリにチェックインしました
          </p>
          <div className="space-y-3 flex flex-col gap-1">
            <Link href={`/stores/${storeId}/posts/create`}>
              <Button className="w-full">投稿を作成する</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
