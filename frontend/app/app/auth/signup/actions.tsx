"use server";

import { redirect } from "next/navigation";

export interface SignupFormState {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  };
  message?: string;
}

export async function signupUser(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const password = (formData.get("password") ?? "").toString();
  const confirmPassword = (formData.get("confirmPassword") ?? "").toString();
  const agreeToTerms = (formData.get("agreeToTerms") ?? "").toString();

  const errors: SignupFormState["errors"] = {};

  // バリデーション
  if (!name) {
    errors.name = "名前を入力してください";
  }

  if (!email) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "有効なメールアドレスを入力してください";
  }

  if (!password) {
    errors.password = "パスワードを入力してください";
  } else if (password.length < 6) {
    errors.password = "パスワードは6文字以上で入力してください";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "パスワード確認を入力してください";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "パスワードが一致しません";
  }

  if (!agreeToTerms) {
    errors.terms = "利用規約に同意してください";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // TODO: 実際の登録処理を追加
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 成功時はホームページにリダイレクト
  redirect("/");
}
