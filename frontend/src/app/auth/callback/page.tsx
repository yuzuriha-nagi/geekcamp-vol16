"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState("ログイン処理中...");

  useEffect(() => {
    const handle = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      try {
        const supabase = getSupabaseClient();

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );
          if (error) {
            setMessage(`エラー: ${error.message}`);
            return;
          }
          setMessage("ログインが完了しました。リダイレクトします...");
          router.replace("/");
          return;
        }

        // code がなくても既にセッションがあればそのまま遷移
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setMessage("ログイン済みです。リダイレクトします...");
          router.replace("/");
          return;
        }

        setMessage("認証コードが見つかりませんでした。もう一度ログインしてください。");
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
