"use server";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // ログイン処理をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Login:", { email, password });
  // 実際の実装では認証処理とリダイレクトを行う
}
