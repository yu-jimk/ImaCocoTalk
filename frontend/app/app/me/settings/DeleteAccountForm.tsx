"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from "./actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function DeleteAccountForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          アカウントを削除
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>本当にアカウントを削除しますか？</DialogTitle>
          <DialogDescription>
            アカウントを削除すると、すべての投稿とデータが完全に削除されます。この操作は取り消せません。
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={deleteUserAction} className="mt-4">
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                キャンセル
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              削除する
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
