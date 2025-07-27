import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeletePostAction } from "./actions";

type DeleteDialogProps = {
  postId: string;
  isDeleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
};

export function DeleteDialog({
  postId,
  isDeleteDialogOpen,
  setDeleteDialogOpen,
}: DeleteDialogProps) {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>投稿を削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消すことができません。投稿とそのコメントがすべて削除されます。
          </DialogDescription>
        </DialogHeader>
        <form action={DeletePostAction}>
          <input type="hidden" name="postId" value={postId} />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              type="button"
            >
              キャンセル
            </Button>
            <Button variant="destructive" type="submit">
              削除
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
