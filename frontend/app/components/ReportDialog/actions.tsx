"use server";

import { cookies } from "next/headers";

export async function submitReport(data: FormData) {
  const postId = data.get("postId") as string;
  const reason = data.get("reason") as string;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;

  if (!postId || !reason) {
    throw new Error("通報内容が不完全です");
  }

  // API通信で通報内容を送信
  const res = await fetch(`http://backend:3000/api/posts/${postId}/report`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
    body: JSON.stringify({ reason }),
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("API通信に失敗しました");
  }

  // 必要ならレスポンスを返す
  // const result = await res.json();
  // return result;
}
