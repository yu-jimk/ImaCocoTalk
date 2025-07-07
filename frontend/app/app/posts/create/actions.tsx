"use server";

import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData) {
  const content = formData.get("content") as string;
  const rating = formData.get("rating") as string;

  // バリデーション
  if (!content.trim() || !rating || Number.parseFloat(rating) === 0) {
    console.error("投稿内容と評価は必須です");
    return;
  }

  // 投稿処理をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Create post:", { content, rating: Number.parseFloat(rating) });

  // 成功時は店舗詳細ページにリダイレクト
  redirect("/stores/1");
}
