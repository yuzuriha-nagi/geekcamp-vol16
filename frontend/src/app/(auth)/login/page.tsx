"use client";

import { useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. 追加
import { getSupabaseClient } from "@/lib/supabaseClient";

// WarningIconをコンポーネント内で定義（インポートエラーを防ぐため）
const WarningIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default function Home() {
  // ステート管理
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // 2. ルーターの初期化

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        userId: identifier,          // 入力されたID/メールを userId として送る
        gameId: "DEFAULT_ROOM",     // とりあえず固定値（必要なら入力欄を増やす）
        profileText: `ユーザー:${identifier}。ログイン試行。`, // 属性データをまとめた文
        password: password
      };

      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. ユーザー情報をブラウザに保存（bio画面で使うため）
        localStorage.setItem("user", JSON.stringify({
          id: data.user.id,
          profileText: data.user.profileText
        }));

        // 4. プロフィール画面へリダイレク
        router.push("/bio");
      } else {
        alert(`アクセス拒否: ${data.message}`);
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーが応答しません。");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const supabase = getSupabaseClient();
      const redirectTo =
        (process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin) +
        "/auth/callback";
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      });
      if (error) alert(error.message);
    } catch (e) {
      alert("Supabaseの環境変数が設定されていません");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans relative overflow-hidden">
      {/* 画面全体のグラデーション背景 */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-900 via-black to-gray-900 opacity-90"></div>

      {/* ログインカードコンテナ */}
      <main className="relative z-10 w-full max-sm:mx-4 max-w-sm rounded-xl bg-black/90 p-8 shadow-[0_0_50px_rgba(220,38,38,0.3)] backdrop-blur-sm sm:p-10 border border-red-900/30">

        {/* ヘッダー: ロゴとタイトル */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-red-600/50">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            Twitterウルフル
          </h1>
          <p className="text-xs text-red-500 font-bold uppercase tracking-widest">
            禁止ワード投稿で即時BAN
          </p>
        </div>

        {/* 警告メッセージ */}
        <div className="flex items-center gap-3 rounded-md bg-red-700/10 p-4 text-xs text-red-400 border border-red-700/50 mb-6 animate-pulse">
          <WarningIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="font-medium leading-tight">
            一度間違えば、全てが終わる。
          </span>
        </div>

        {/* フォームセクション */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-tighter">
              ID / メールアドレス
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full rounded-md border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-tighter">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-red-600 py-3.5 text-sm font-black text-white transition-all hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95"
          >
            ログイン
          </button>

          <button
            type="button"
            className="w-full rounded-md border border-gray-700 bg-gray-900/70 py-3.5 text-sm font-semibold text-white transition-all hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.35)] active:scale-95"
            onClick={handleGoogleLogin}
          >
            Googleで続行
          </button>
        </form>

        {/* フッターリンク */}
        <div className="mt-8 text-center">
          <a href="#" className="text-xs text-gray-500 hover:text-red-500 transition-colors">
            アカウントをお持ちでない方はこちら
          </a>
          <p className="mt-4 text-[10px] text-gray-700 uppercase tracking-widest font-bold">
            System Monitoring Active
          </p>
        </div>
      </main>
    </div>
  );
}