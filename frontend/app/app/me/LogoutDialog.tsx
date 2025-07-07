"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function LogoutDialog() {
  const router = useRouter();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };
  const confirmLogout = () => {
    // ログアウト処理
    console.log("Logout");
    router.push("/login");
  };
  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleLogout}>
        <LogOut className="h-5 w-5" />
      </Button>

      {/* ログアウト確認ダイアログ */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ログアウトしますか？</DialogTitle>
            <DialogDescription>
              ログアウトすると、再度ログインが必要になります。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button onClick={confirmLogout}>ログアウト</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
