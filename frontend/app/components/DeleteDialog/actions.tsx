"use server";

export async function submitDelete(postId: string) {
  if (!postId) {
    throw new Error("postIdが不正です");
  }

  // TODO: 認可チェック（必要なら）
  // TODO: 実際の削除処理（DBからの削除など）
  console.log("削除対象の投稿ID:", postId);

  // 成功時は何も返さずOK
}
