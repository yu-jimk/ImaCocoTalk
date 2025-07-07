"use server";

import { redirect } from "next/navigation";

export async function moderatorLoginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // モデレーターログイン処理をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Moderator Login:", { email, password });

  // 成功時はモデレーターページにリダイレクト
  redirect("/moderator/dashboard");
}
