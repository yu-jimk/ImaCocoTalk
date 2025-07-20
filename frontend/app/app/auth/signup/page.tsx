"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MapPin, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  general?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setErrors({});

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";
    const agreeToTerms = formData.get("agreeToTerms") === "true";

    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "名前は必須です";
    if (!email) newErrors.email = "メールアドレスは必須です";
    if (!password || password.length < 6)
      newErrors.password = "パスワードは6文字以上で入力してください";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "パスワードが一致しません";
    if (!agreeToTerms)
      newErrors.terms = "利用規約とプライバシーポリシーへの同意が必要です";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setPending(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ general: data.message || "登録に失敗しました" });
        setPending(false);
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setErrors({ general: "通信エラーが発生しました" });
    }
    setPending(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md py-6">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-blue-600">
            新規登録
          </CardTitle>
          <p className="text-gray-600 text-sm">イマココトークへようこそ</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                名前 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="田中太郎"
                className={errors.name && "border-red-500"}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                メールアドレス <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                className={errors.email && "border-red-500"}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                パスワード <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="6文字以上で入力"
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                パスワード確認 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="パスワードを再入力"
                  className={
                    errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className={errors.terms && "border-red-500"}
                  value="true"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="agreeToTerms"
                    className="text-xs font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:underline"
                    >
                      利用規約
                    </Link>
                    および
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      プライバシーポリシー
                    </Link>
                    に同意します
                  </Label>
                </div>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-xs">{errors.terms}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "登録中..." : "新規登録"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちですか？
            </p>
            <Link
              href="/auth/login"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              ログインはこちら
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
