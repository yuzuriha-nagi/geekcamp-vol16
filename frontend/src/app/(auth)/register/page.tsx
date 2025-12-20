"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    // layout.tsx で背景設定済みのため、ここでは背景色を指定せず、
    // 画面中央に配置するためのレイアウトのみ設定します
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">

      {/* カードコンテナ (透明度やボーダー色はPostInputなどと統一) */}
      <main className="w-full max-w-sm rounded-xl bg-black/80 p-8 shadow-2xl backdrop-blur-sm sm:p-10 border border-red-900/30">

        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold text-white">
            新規登録
          </h1>
          <p className="text-sm text-gray-400">
            ワードウルフの世界へ参加する
          </p>
        </div>

        {/* フォーム */}
        <form className="flex flex-col gap-4">

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              ユーザー名
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="ゲーム内で表示される名前"
              className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-4 py-2.5 text-white placeholder-gray-600 focus:border-red-600 focus:ring-red-600 transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="accountId" className="block text-sm font-medium text-gray-300 mb-1">
              アカウントID
            </label>
            <input
              id="accountId"
              name="accountId"
              type="text"
              placeholder="例：wolf123"
              className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-4 py-2.5 text-white placeholder-gray-600 focus:border-red-600 focus:ring-red-600 transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-4 py-2.5 text-white placeholder-gray-600 focus:border-red-600 focus:ring-red-600 transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="8文字以上推奨"
              className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-4 py-2.5 text-white placeholder-gray-600 focus:border-red-600 focus:ring-red-600 transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-300 mb-1">
              パスワード（確認）
            </label>
            <input
              id="password-confirm"
              name="confirm"
              type="password"
              placeholder="もう一度入力してください"
              className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-4 py-2.5 text-white placeholder-gray-600 focus:border-red-600 focus:ring-red-600 transition duration-150"
              required
            />
          </div>

          <Button
            type="submit"
            className="mt-4 w-full rounded-md bg-red-600 py-3 text-lg font-bold text-white transition-all hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
          >
            同意して登録する
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            href="/login"
            className="text-gray-400 hover:text-red-500 transition-colors font-medium underline-offset-4 hover:underline"
          >
            ← ログイン画面に戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
