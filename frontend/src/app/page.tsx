"use client";

import { useState } from "react";
import { PostInput } from "@/components/PostInput";
import { PostCard } from "@/components/PostCard";
import { MOCK_POSTS, CURRENT_USER } from "@/data/mock";
import { Post } from "@/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handlePost = (content: string) => {
    // 簡易BAN判定
    const isBanned = content.includes(CURRENT_USER.ngWord);
    if (isBanned) {
      alert(`☠️ GAME OVER ☠️\n\n禁止ワード「${CURRENT_USER.ngWord}」を踏みました。`);
      return;
    }

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
    // 背景をリッチなグレーに変更
    <main className="max-w-xl mx-auto pt-6 px-2 sm:px-0 pb-20">

      {/* 入力フォーム */}
      {/* Headerの高さ(約64px/4rem) + 余白分を考慮して top を設定 */}
      <PostInput currentUser={CURRENT_USER} onPost={handlePost} />

      {/* タイムライン */}
      <div className="space-y-4 mt-6">
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