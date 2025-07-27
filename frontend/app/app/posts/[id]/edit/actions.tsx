"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function editPostAction(formData: FormData) {
  const id = String(formData.get("id"));
  const rating = Number(formData.get("rating"));
  const content = String(formData.get("content"));

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;

  // バリデーション
  if (!content.trim() || !rating || rating === 0) {
    console.error("投稿内容と評価は必須です");
    return;
  }

  const res = await fetch(`http://backend:3000/api/posts/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
    body: JSON.stringify({
      rating: rating,
      content,
    }),
  });

  if (!res.ok) {
    console.error("投稿編集に失敗しました", await res.text());
    return;
  }

  redirect("/me");
}
