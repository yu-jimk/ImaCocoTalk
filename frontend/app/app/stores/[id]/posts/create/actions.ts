"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createPostAction(formData: FormData) {
  const content = formData.get("content") as string;
  const rating = formData.get("rating") as string;
  const store_id = formData.get("store_id") as string;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;

  // バリデーション
  if (!content.trim() || !rating || Number.parseFloat(rating) === 0) {
    console.error("投稿内容と評価は必須です");
    return;
  }

  const res = await fetch(`http://backend:3000/api/posts`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
    body: JSON.stringify({
      store_id,
      rating: Number.parseFloat(rating),
      content,
    }),
  });

  if (!res.ok) {
    console.error("投稿作成に失敗しました", await res.text());
    return;
  }

  redirect(`/stores/${store_id}`);
}
