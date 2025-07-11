"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Form from "next/form";

import { MapPin, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { signupUser, type SignupFormState } from "./actions";

const initialState: SignupFormState = {};

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signupUser, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md py-6">
        {/* Header */}
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
          {/* Form */}
          <Form action={formAction} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">
                名前 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="田中太郎"
                className={state.errors?.name && "border-red-500"}
              />
              {state.errors?.name && (
                <p className="text-red-500 text-xs">{state.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                メールアドレス <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                className={state.errors?.email && "border-red-500"}
              />
              {state.errors?.email && (
                <p className="text-red-500 text-xs">{state.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
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
                  className={
                    state.errors?.password ? "border-red-500 pr-10" : "pr-10"
                  }
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
              {state.errors?.password && (
                <p className="text-red-500 text-xs">{state.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
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
                    state.errors?.confirmPassword
                      ? "border-red-500 pr-10"
                      : "pr-10"
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
              {state.errors?.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className={state.errors?.terms && "border-red-500"}
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
              {state.errors?.terms && (
                <p className="text-red-500 text-xs">{state.errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "登録中..." : "新規登録"}
            </Button>
          </Form>

          {/* Links */}
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
