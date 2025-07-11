"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitDelete } from "./actions";

type DeleteDialogProps = {
  postId: number;
  isDeleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
};

export function DeleteDialog({
  postId,
  isDeleteDialogOpen,
  setDeleteDialogOpen,
}: DeleteDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await submitDelete(postId);
        alert("投稿を削除しました");
        setDeleteDialogOpen(false);
      } catch (e) {
        alert(e);
      }
    });
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>投稿を削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消すことができません。投稿とそのコメントがすべて削除されます。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            キャンセル
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "削除中..." : "削除"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
