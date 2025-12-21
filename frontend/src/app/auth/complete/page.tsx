"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function CompleteProfile() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadSession = async () => {
      try {
        const supabase = getSupabaseClient();
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          router.replace("/login");
          return;
        }
        const userEmail = data.session.user.email ?? "";
        setEmail(userEmail);
      } catch {
        setError("Supabaseの環境変数が設定されていません");
      }
    };
    loadSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("メールアドレスが取得できませんでした");
      return;
    }
    try {
      const supabase = getSupabaseClient();
      setLoading(true);
      const { error } = await supabase
        .from("users")
        .upsert(
          {
            username,
            account_id: accountId,
            email,
            password,
          },
          { onConflict: "email" } // email で一意になるよう更新/挿入
        );
      setLoading(false);
      if (error) {
        setError(`登録に失敗しました: ${error.message}`);
        return;
      }
      setSuccess("登録が完了しました");
      setUsername("");
      setAccountId("");
      setPassword("");
      router.replace("/");
    } catch {
      setLoading(false);
      setError("Supabaseの環境変数が設定されていません");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-4">
      <main className="w-full max-w-sm rounded-xl bg-black/85 p-8 shadow-2xl border border-red-900/30 backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-6">プロフィール設定</h1>
        <p className="text-sm text-gray-400 mb-6">
          Google認証が完了しました。ユーザー名、ID、パスワードを設定してください。
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">メールアドレス</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">ユーザー名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">アカウントID</label>
            <input
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 transition"
          >
            {loading ? "保存中..." : "登録を完了する"}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}
        </form>
      </main>
    </div>
  );
}
