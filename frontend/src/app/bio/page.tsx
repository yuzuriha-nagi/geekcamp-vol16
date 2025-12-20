"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CURRENT_USER } from "@/data/mock";
import { ShieldAlert, Save, X, Edit3 } from "lucide-react";

// shadcn UI components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function BioPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [profileText, setProfileText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // 開発用: モックデータから初期値をセット
    setUsername(CURRENT_USER.name);
    setProfileText((CURRENT_USER as any).bio || "自己紹介が未設定です。");
  }, [router]);

  const handleEdit = () => {
    setTempText(profileText);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 擬似的な保存処理
      await new Promise(resolve => setTimeout(resolve, 800));
      setProfileText(tempText);
      setIsEditing(false);
      alert("プロフィールの更新に成功。監視対象データが書き換えられました。");
    } catch (error) {
      console.error("エラー:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!username) return <div className="min-h-screen bg-gray-900" />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans p-4 relative overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-900 via-black to-gray-900 opacity-90 pointer-events-none"></div>

      <Card className="relative z-10 w-full max-w-md border-red-900/30 bg-black/90 shadow-[0_0_50px_rgba(220,38,38,0.2)] backdrop-blur-sm">

        <CardHeader className="flex flex-col items-center pb-2">
          {/* アバターエリア */}
          <div className="relative mb-4 group cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-red-600 to-gray-800 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <Avatar className="w-24 h-24 border-2 border-black relative">
              <AvatarImage src={CURRENT_USER.avatarUrl} alt={username} className="object-cover" />
              <AvatarFallback className="bg-gray-800 text-gray-400">AG</AvatarFallback>
            </Avatar>
            {/* オンラインステータスランプ */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-black rounded-full shadow-sm"></div>
          </div>

          <h1 className="text-xl font-black text-white tracking-widest uppercase">
            {username}
          </h1>
          <p className="text-[10px] text-red-500 font-bold tracking-[0.2em] mt-1 animate-pulse">
            STATUS: ACTIVE / UNDER SURVEILLANCE
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-1 relative overflow-hidden">
            {/* 装飾用ヘッダーバー */}
            <div className="bg-gray-900/80 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
              <span className="w-2 h-2 bg-red-600 rounded-sm"></span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                自己紹介(BIO)
              </span>
            </div>

            <div className="p-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                    className="min-h-[140px] border-red-900/50 bg-black text-gray-200 focus-visible:ring-red-600 resize-none leading-relaxed"
                    placeholder="自己紹介を入力してください..."
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-9"
                    >
                      {isSaving ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" /> 上書き保存
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="secondary"
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 h-9"
                    >
                      <X className="w-4 h-4 mr-2" /> キャンセル
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="group relative min-h-[100px]">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono">
                    {profileText}
                  </p>

                  {/* 編集ボタン（ホバーで表示または常時表示） */}
                  <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-end">
                    <Button
                      onClick={handleEdit}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-400 hover:bg-red-950/30 h-8 text-xs font-bold uppercase tracking-wider"
                    >
                      <Edit3 className="w-3 h-3 mr-2" /> データ改ざん
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 警告注記 */}
          <div className="flex gap-3 bg-red-950/20 border border-red-900/20 rounded p-3 items-start">
            <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-400/70 leading-relaxed">
              ※ 自己紹介文に含まれるキーワードも検閲対象です。不適切な発言が確認された場合、アカウントは即座に凍結されます。
            </p>
          </div>
        </CardContent>

        <CardFooter className="justify-center pb-8">
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="text-xs text-gray-600 hover:text-gray-400 tracking-widest uppercase"
          >
            ← ターミナルへ戻る
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}