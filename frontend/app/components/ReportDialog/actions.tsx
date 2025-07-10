// app/actions/report.ts
"use server";

export async function submitReport(data: FormData) {
  const postId = Number(data.get("postId"));
  const reason = data.get("reason") as string;

  if (!postId || !reason) {
    throw new Error("通報内容が不完全です");
  }

  // ここでDB保存や通知処理などを行う
  console.log("通報内容:", { postId, reason });

  // 処理が終わったら何らかのレスポンスを返す（不要ならvoidでもOK）
}
