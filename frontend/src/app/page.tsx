"use client";

import { useState } from "react";
import { PostInput } from "@/components/PostInput";
import { PostCard } from "@/components/PostCard";
import { MOCK_POSTS, CURRENT_USER } from "@/data/mock";
import { Post } from "@/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  // 投稿ハンドラー
  const handlePost = (content: string) => {
    // 簡易BAN判定ロジック（実際はバックエンドで行う処理）
    // 自分のNGワードが含まれているかチェック
    const isBanned = content.includes(CURRENT_USER.ngWord);

    if (isBanned) {
      alert(`【BAN確定】\n禁止ワード「${CURRENT_USER.ngWord}」が含まれていました。\nあなたのアカウントは凍結されます。`);
      // ここで画面を真っ赤にするなどの処理を入れると面白い
      return;
    }

    // 新しい投稿を作成してリストの先頭に追加
    const newPost: Post = {
      id: crypto.randomUUID(),
      userId: CURRENT_USER.id,
      content: content,
      createdAt: new Date().toISOString(),
      user: CURRENT_USER,
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto border-x border-gray-100 shadow-sm">
      {/* 画面ヘッダー */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b px-4 h-14 flex items-center justify-center">
        <h1 className="font-black text-xl text-blue-500">WordWolf SNS</h1>
      </header>

      {/* 投稿フォーム */}
      <PostInput currentUser={CURRENT_USER} onPost={handlePost} />

      {/* タイムライン */}
      <div className="pb-20">
        {posts.map((post) => (
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