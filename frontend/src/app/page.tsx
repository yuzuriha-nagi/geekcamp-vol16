"use client";

import { useEffect, useState } from "react";
import { PostInput } from "@/components/PostInput";
import { PostCard } from "@/components/PostCard";
import { MOCK_POSTS, CURRENT_USER } from "@/data/mock";
import { Post } from "@/types";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });
        setLoading(false);
        if (error || !data) {
          return; // Supabase未設定やテーブル未作成時はモックのまま
        }
        const mapped: Post[] = data.map((row: any) => ({
          id: row.id ?? crypto.randomUUID(),
          userId: row.user_id ?? "unknown",
          content: row.content ?? "",
          createdAt: row.created_at ?? new Date().toISOString(),
          user: {
            id: row.user_id ?? "unknown",
            name: row.user_name ?? "匿名",
            handle: row.user_handle ?? "@anon",
            avatarUrl:
              row.user_avatar ??
              "https://api.dicebear.com/7.x/avataaars/svg?seed=anon",
            ngWord: row.user_ng_word ?? "???",
          },
        }));
        setPosts(mapped);
      } catch {
        setLoading(false);
        // Supabase環境変数が無い場合などはモック表示のまま
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async (content: string) => {
    // 簡易BAN判定
    const isBanned = content.includes(CURRENT_USER.ngWord || ""); // null安全対策
    if (isBanned) {
      alert(`☠️ GAME OVER ☠️\n\n禁止ワード「${CURRENT_USER.ngWord}」を踏みました。`);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("posts")
        .insert({
          content,
          user_id: CURRENT_USER.id,
          user_name: CURRENT_USER.name,
          user_handle: CURRENT_USER.handle,
          user_avatar: CURRENT_USER.avatarUrl,
          user_ng_word: CURRENT_USER.ngWord,
        })
        .select()
        .single();

      if (error) {
        setError(`投稿保存に失敗しました: ${error.message}`);
      }

      const newPost: Post = {
        id: data?.id ?? crypto.randomUUID(),
        userId: CURRENT_USER.id,
        content,
        createdAt: data?.created_at ?? new Date().toISOString(),
        user: CURRENT_USER,
      };
      setPosts((prev) => [newPost, ...prev]);
    } catch {
      // Supabase環境変数が無い場合はローカルのみ更新
      const newPost: Post = {
        id: crypto.randomUUID(),
        userId: CURRENT_USER.id,
        content,
        createdAt: new Date().toISOString(),
        user: CURRENT_USER,
      };
      setPosts((prev) => [newPost, ...prev]);
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
