import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { LogoutDialog } from "./LogoutDialog";

export function MeHeader() {
  return (
    <header className="bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">マイページ</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/me/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <LogoutDialog />
        </div>
      </div>
    </header>
  );
}
