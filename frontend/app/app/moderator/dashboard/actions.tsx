// actions.tsx
// 管理画面の各種アクションをまとめて管理するファイル

// 固定投稿の削除
export const deletePinnedPost = (postId: number) => {
  // ここでAPIリクエストや状態管理を行う（現状はconsole.log）
  console.log("Delete pinned post (action):", postId);
};

// ログアウト
export const logout = (router: { push: (path: string) => void }) => {
  // ここで認証状態のクリアやリダイレクト処理を行う（現状はconsole.log）
  console.log("Logout (action)");
  router.push("/moderator/login");
};

// ダイアログの開閉
export const openDialog = (setOpen: (v: boolean) => void) => setOpen(true);
export const closeDialog = (setOpen: (v: boolean) => void) => setOpen(false);

// 汎用：選択IDのセット
export const setSelectedId = (
  setId: (v: number | null) => void,
  id: number | null
) => setId(id);

// 汎用：削除確定（例: confirmDelete）
export const confirmDeletePinned = (
  selectedItemId: number | null,
  setDeleteDialogOpen: (v: boolean) => void,
  setSelectedItemId: (v: number | null) => void
) => {
  if (selectedItemId) {
    deletePinnedPost(selectedItemId);
    setDeleteDialogOpen(false);
    setSelectedItemId(null);
  }
};

// 他にも必要なアクションをここに追加
