"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const bio = formData.get("bio") as string;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;

  const res = await fetch("http://backend:3000/api/users/me", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
    body: JSON.stringify({ name, email, bio }),
  });

  if (!res.ok) {
    console.error("ユーザー情報の更新に失敗しました", await res.text());
    return;
  }

  redirect("/me");
}

export async function deleteUserAction() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;
  const res = await fetch("http://backend:3000/api/users/me", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
  });

  if (!res.ok) {
    console.error("ユーザー削除に失敗しました", await res.text());
    return;
  }

  cookieStore.delete("user_jwt");

  redirect("/auth/login");
}
