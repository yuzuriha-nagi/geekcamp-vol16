"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState("ログイン処理中...");

  useEffect(() => {
    const handle = async () => {
      try {
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) {
          setMessage(`エラー: ${error.message}`);
          return;
        }
        setMessage("ログインが完了しました。リダイレクトします...");
        router.replace("/");
      } catch (e) {
        setMessage("Supabaseの環境変数が設定されていません");
      }
    };

    handle();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="rounded-lg border border-gray-800 bg-black/70 px-6 py-4">
        {message}
      </div>
    </div>
  );
}
