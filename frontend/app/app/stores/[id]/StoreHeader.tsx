import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function StoreHeader() {
  return (
    <div className="bg-white border-b border-blue-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">店舗詳細</h1>
      </div>
    </div>
  );
}
