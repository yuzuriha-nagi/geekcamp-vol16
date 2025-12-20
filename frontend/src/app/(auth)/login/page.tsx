"use client"; // クライアントコンポーネントとして定義

import { useState } from "react";
import Image from "next/image";
import { WarningIcon } from "@/components/icons/WarningIcon";

export default function Home() {
  // 入力値を管理するためのステート
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("ログイン成功！");
        console.log(data);
      } else {
        alert(`ログイン失敗: ${data.message}`);
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーに接続できませんでした");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans">
      {/* ...背景などのコードは省略... */}

      <main className="relative z-10 w-full max-w-sm rounded-xl bg-black/90 p-8 shadow-2xl backdrop-blur-sm">
        {/* ...ロゴなどのコード... */}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">ユーザー名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white"
              required
            />
          </div>

          <button type="submit" className="mt-4 w-full rounded-md bg-red-600 py-3 font-semibold text-white hover:bg-red-700">
            ログイン
          </button>
        </form>
      </main>
    </div>
  );
}