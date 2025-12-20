"use client";

import { useState } from "react";
import { PostInput } from "@/components/PostInput";
import { PostCard } from "@/components/PostCard";
import { MOCK_POSTS, CURRENT_USER } from "@/data/mock";
import { Post } from "@/types";
import { client } from "@/lib/api";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handlePost = async (content: string) => {
    try {
      // ▼ API呼び出し
      const api = client.api.posts as any;
      const res = await api.$post({
        json: {
          userId: CURRENT_USER.id,
          gameId: "room_A",
          content: content,
        },
      });

      // ▼ レスポンスの処理
      if (res.ok) {
        const data = await res.json();

        // 成功時の処理
        if (data.success) {
          console.log("投稿成功:", data.post);
          // ここで setPosts などを使い、タイムラインを更新する
          // fetchPosts(); // 再取得関数などがあれば呼ぶ
        }
        // 成功ステータスだが中身でBANされている場合 (Serviceの実装による)
        else if (data.isBanned) {
          alert(`☠️ GAME OVER ☠️\n\n禁止ワード「${data.ngWord}」を踏みました。`);
          // 強制ログアウトや画面を赤くするなどの処理
        }
      } else {
        // 400/500エラーの場合（「既に死んでいます」など）
        const errorData = await res.json();
        // エラーメッセージの型が合わない場合は any キャスト等で回避
        alert(`エラー: ${(errorData as any).error || "送信できませんでした"}`);
      }

    } catch (e) {
      console.error("通信エラー", e);
      alert("サーバーに接続できません。");
    }
  };

  return (
    // 背景色は layout.tsx で設定しているので、ここではレイアウトのみ調整
    <main className="max-w-xl mx-auto pt-6 px-2 sm:px-0 pb-20">

      {/* 入力フォーム */}
      {/* 注: PostInput自体もダークモード対応（bg-black/40 text-white 等）にする必要があります */}
      <PostInput currentUser={CURRENT_USER} onPost={handlePost} />

      {/* タイムライン */}
      <div className="space-y-4 mt-6">
        {posts.map((post) => (
          /* 注: PostCard自体もダークモード対応（bg-black/40 text-white border-gray-800 等）にする必要があります */
          <PostCard
            key={post.id}
            post={post}
            isCurrentUser={post.userId === CURRENT_USER.id}
          />
        ))}
      </div>
    </main>
  );
}