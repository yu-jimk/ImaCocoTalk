import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 共通ヘッダー */}
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/stores/1">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">チェックイン</h1>
        </div>
      </header>

      {/* 子コンテンツ */}
      {children}
    </div>
  );
}
