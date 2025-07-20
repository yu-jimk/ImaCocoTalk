"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function DeletePostAction(formData: FormData) {
  const postId = formData.get("postId")?.toString();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;

  const res = await fetch(`http://backend:3000/api/posts/${postId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
  });

  if (!res.ok) {
    throw new Error("削除に失敗しました");
  }

  // /me に戻したい or 再取得させたいページをキャッシュリセット
  revalidatePath("/me");
}
