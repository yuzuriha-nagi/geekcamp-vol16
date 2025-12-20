"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react"; // アイコンをlucide-reactに統一

// shadcn UI components
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

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        userId: username,
        gameId: "DEFAULT_ROOM",
        profileText: `ユーザー:${username}。ログイン試行。`,
        password: password
      };

      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify({
          id: data.user.id,
          profileText: data.user.profileText
        }));
        router.push("/bio");
      } else {
        alert(`アクセス拒否: ${data.message}`);
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーが応答しません。");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans relative overflow-hidden p-4">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-900 via-black to-gray-900 opacity-90 pointer-events-none"></div>

      {/* shadcn Cardコンポーネント */}
      <Card className="relative z-10 w-full max-w-sm border-red-900/30 bg-black/90 shadow-[0_0_50px_rgba(220,38,38,0.3)] backdrop-blur-sm">

        <CardHeader className="items-center text-center space-y-2 pb-6">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-red-600/50">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-wider">
            Twitterウルフル
          </CardTitle>
          <CardDescription className="text-red-500 font-bold uppercase tracking-widest text-xs">
            禁止ワード投稿で即時BAN
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 警告メッセージエリア */}
          <div className="flex items-center gap-3 rounded-md bg-red-950/40 p-3 text-xs text-red-400 border border-red-900/50 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="font-medium leading-tight">
              一度間違えば、全てが終わる。
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                ユーザー名
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-600 focus-visible:ring-red-600 focus-visible:border-red-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                パスワード
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-600 focus-visible:ring-red-600 focus-visible:border-red-600"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 py-6 text-sm font-black text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all"
            >
              ログイン
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 text-center pt-2">
          <Link href="/register" className="text-xs text-gray-500 hover:text-red-500 transition-colors">
            アカウントをお持ちでない方はこちら
          </Link>
          <p className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">
            System Monitoring Active
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}