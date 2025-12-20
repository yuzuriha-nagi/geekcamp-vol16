"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Register() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      {/* shadcn Cardコンポーネント */}
      <Card className="w-full max-w-sm border-red-900/30 bg-black/80 shadow-2xl backdrop-blur-sm">

        {/* ヘッダー部分 */}
        <CardHeader className="items-center text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            新規登録
          </CardTitle>
          <CardDescription className="text-gray-400">
            ワードウルフの世界へ参加する
          </CardDescription>
        </CardHeader>

        {/* フォーム部分 */}
        <CardContent>
          <form className="grid gap-4">

            {/* ユーザー名 */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-gray-300">
                ユーザー名
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="ゲーム内で表示される名前"
                className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-600 focus-visible:ring-red-600 focus-visible:border-red-600"
                required
              />
            </div>

            {/* アカウントID */}
            <div className="grid gap-2">
              <Label htmlFor="accountId" className="text-gray-300">
                アカウントID
              </Label>
              <Input
                id="accountId"
                name="accountId"
                type="text"
                placeholder="例：wolf123"
                className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-600 focus-visible:ring-red-600 focus-visible:border-red-600"
                required
              />
            </div>

            {/* メールアドレス */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-300">
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.com"
                className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-600 focus-visible:ring-red-600 focus-visible:border-red-600"
                required
              />
            </div>

            {/* パスワード */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-300">
                パスワード
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="8文字以上推奨"
                className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-600 focus-visible:ring-red-600 focus-visible:border-red-600"
                required
              />
            </div>

            {/* パスワード（確認） */}
            <div className="grid gap-2">
              <Label htmlFor="password-confirm" className="text-gray-300">
                パスワード（確認）
              </Label>
              <Input
                id="password-confirm"
                name="confirm"
                type="password"
                placeholder="もう一度入力してください"
                className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-600 focus-visible:ring-red-600 focus-visible:border-red-600"
                required
              />
            </div>

            {/* 登録ボタン */}
            <Button
              type="submit"
              className="mt-2 w-full bg-red-600 py-6 text-lg font-bold text-white hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              同意して登録する
            </Button>
          </form>
        </CardContent>

        {/* フッターリンク */}
        <CardFooter className="flex justify-center">
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium underline-offset-4 hover:underline"
          >
            ← ログイン画面に戻る
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}