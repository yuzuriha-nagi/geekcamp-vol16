"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CURRENT_USER } from "@/data/mock"; // ★追加: モックデータをインポート

export default function BioPage() {
  const router = useRouter();

  // 状態管理
  const [username, setUsername] = useState("");
  const [profileText, setProfileText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 1. マウント時にモックデータから情報を取得
  useEffect(() => {
    // ログインチェック (必要に応じて残すか、開発中はコメントアウト)
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      // router.push("/");
      // return;
    }

    // ★修正: モックデータ(CURRENT_USER)から初期値をセット
    setUsername(CURRENT_USER.name); // 表示名をセット

    // CURRENT_USERに 'bio' プロパティがあると想定
    // 型定義に bio がない場合は (CURRENT_USER as any).bio で回避
    setProfileText((CURRENT_USER as any).bio || "自己紹介が未設定です。");
  }, [router]);

  // 編集開始
  const handleEdit = () => {
    setTempText(profileText);
    setIsEditing(true);
  };

  // 保存処理
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // ★注意: モックデータなのでサーバーには保存されませんが、
      // 動作確認用に通信処理のフリをしてステートだけ更新します。

      /* バックエンドがある場合は以下のfetchを使う
      const payload = {
        userId: CURRENT_USER.id,
        profileText: tempText,
      };
      const response = await fetch("http://localhost:3001/update-profile", ...);
      */

      // 擬似的な遅延と成功処理
      await new Promise(resolve => setTimeout(resolve, 800));

      setProfileText(tempText);
      setIsEditing(false);

      // 必要ならlocalStorageにも保存して永続化のフリをする
      localStorage.setItem("user", JSON.stringify({ ...CURRENT_USER, bio: tempText }));

      alert("プロフィールの更新に成功。監視対象データが書き換えられました。");

    } catch (error) {
      console.error("エラー:", error);
      alert("処理に失敗しました。");
    } finally {
      setIsSaving(false);
    }
  };

  // ユーザー名が決まるまでローディング（一瞬で終わりますが念のため）
  if (!username) return <div className="min-h-screen bg-gray-900" />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-900 via-black to-gray-900 opacity-90"></div>

      <main className="relative z-10 w-full max-sm:mx-4 max-w-md rounded-xl bg-black/90 p-8 shadow-[0_0_50px_rgba(220,38,38,0.3)] backdrop-blur-sm border border-red-900/30">

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-4">
            <div className="w-full h-full bg-gradient-to-tr from-red-600 to-gray-800 rounded-full flex items-center justify-center border-2 border-red-500 shadow-lg shadow-red-600/20 overflow-hidden">
              {/* モックデータのアイコンを使用 */}
              <img src={CURRENT_USER.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-black rounded-full"></div>
          </div>
          <h1 className="text-xl font-bold text-white tracking-widest uppercase">
            {username}
          </h1>
          <p className="text-[10px] text-red-500 font-bold tracking-[0.2em] mt-1">
            STATUS: ACTIVE / UNDER SURVEILLANCE
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-6 relative">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600"></span> 自己紹介 (BIO)
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  className="w-full h-32 rounded-md border border-red-900/50 bg-black p-3 text-sm text-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all resize-none"
                  placeholder="自己紹介を入力してください..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 rounded-md bg-red-600 py-2 text-xs font-bold text-white hover:bg-red-700 transition-all disabled:opacity-50"
                  >
                    {isSaving ? "更新中..." : "データを上書き"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 rounded-md bg-gray-800 py-2 text-xs font-bold text-gray-400 hover:bg-gray-700 transition-all"
                  >
                    破棄
                  </button>
                </div>
              </div>
            ) : (
              <div className="group">
                <p className="text-sm text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
                  {profileText}
                </p>
                <button
                  onClick={handleEdit}
                  className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1"
                >
                  [ 情報を改ざんする ]
                </button>
              </div>
            )}
          </div>

          <div className="bg-red-950/20 border border-red-900/30 rounded p-3">
            <p className="text-[9px] text-red-400/70 leading-tight">
              ※ 注意: 自己紹介文に不適切なワードが含まれる場合、即座に「ワードウルフ」のアルゴリズムによりアカウントが凍結される恐れがあります。
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors tracking-widest uppercase"
          >
            ← ターミナルに戻る
          </button>
        </div>
      </main>
    </div>
  );
}