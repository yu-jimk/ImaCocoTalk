"use server";

export async function addCommentAction(formData: FormData) {
  const comment = formData.get("comment") as string;

  if (!comment.trim()) {
    console.error("コメントを入力してください");
    return;
  }

  // コメント投稿処理をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("New comment:", comment);

  // 実際の実装では、コメントをデータベースに保存し、
  // 必要に応じてページを再読み込みまたは楽観的更新を行う
}
