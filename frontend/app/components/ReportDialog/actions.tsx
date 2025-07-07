// app/actions/report.ts
"use server";

export async function submitReport(data: FormData) {
  const postId = Number(data.get("postId"));
  const reasons = data.getAll("reasons") as string[];

  if (!postId || reasons.length === 0) {
    throw new Error("通報内容が不完全です");
  }

  // ここでDB保存や通知処理などを行う
  console.log("通報内容:", { postId, reasons });

  // 処理が終わったら何らかのレスポンスを返す（不要ならvoidでもOK）
}
