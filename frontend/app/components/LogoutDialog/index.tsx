"use client";

import { useState } from "react";
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
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import { logoutAction, moderatorLogoutAction } from "./actions";

export function LogoutDialog() {
  const { pending } = useFormStatus();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const pathname = usePathname();
  const isModerator = pathname.startsWith("/moderator/dashboard");
  const action = isModerator ? moderatorLogoutAction : logoutAction;

  const handleLogout = () => {
    setLogoutDialogOpen(true);
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
            <form action={action}>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "ログアウト中..." : "ログアウト"}
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
