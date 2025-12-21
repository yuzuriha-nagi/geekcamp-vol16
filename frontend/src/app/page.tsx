"use client";

import { useEffect, useState } from "react";
import { PostInput } from "@/components/PostInput";
import { PostCard } from "@/components/PostCard";
import { MOCK_POSTS, CURRENT_USER } from "@/data/mock";
import { Post, User } from "@/types";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // セッションからユーザー情報を取得
  useEffect(() => {
    const loadUserAndPosts = async () => {
      try {
        const supabase = getSupabaseClient();
        const { data: sessionData } = await supabase.auth.getSession();
        const sessionUser = sessionData.session?.user;
        const email = sessionUser?.email;

        let userProfile: User | null = null;
        if (email) {
          const handleFromEmail = `@${email.split("@")[0]}`;
          userProfile = {
            id: sessionUser?.id ?? "unknown",
            name:
              (sessionUser?.user_metadata as any)?.full_name ??
              email.split("@")[0],
            handle: handleFromEmail,
            avatarUrl:
              (sessionUser?.user_metadata as any)?.avatar_url ??
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
              email.split("@")[0],
            ngWord: "???",
          };

          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();
          if (profile) {
            userProfile = {
              id: profile.id ?? userProfile.id,
              name: profile.username ?? userProfile.name,
              handle: profile.account_id
                ? `@${profile.account_id}`
                : userProfile.handle,
              avatarUrl:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                (profile.username ?? userProfile.name),
              ngWord: profile.ng_word ?? "???",
            };
          }
        }
        setCurrentUser(userProfile ?? CURRENT_USER);

        setLoading(true);
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
        setCurrentUser(CURRENT_USER); // Supabase未設定などの場合はモックユーザー
      }
    };

    loadUserAndPosts();
  }, []);

  const handlePost = async (content: string) => {
    const author = currentUser ?? CURRENT_USER;

    // 簡易BAN判定
    const isBanned = content.includes(author.ngWord || ""); // null安全対策
    if (isBanned) {
      alert(`☠️ GAME OVER ☠️\n\n禁止ワード「${author.ngWord}」を踏みました。`);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("posts")
        .insert({
          content,
          user_id: author.id,
          user_name: author.name,
          user_handle: author.handle,
          user_avatar: author.avatarUrl,
          user_ng_word: author.ngWord,
        })
        .select()
        .single();

      if (error) {
        setError(`投稿保存に失敗しました: ${error.message}`);
      }

      const newPost: Post = {
        id: data?.id ?? crypto.randomUUID(),
        userId: author.id,
        content,
        createdAt: data?.created_at ?? new Date().toISOString(),
        user: author,
      };
      setPosts((prev) => [newPost, ...prev]);
    } catch {
      // Supabase環境変数が無い場合はローカルのみ更新
      const newPost: Post = {
        id: crypto.randomUUID(),
        userId: author.id,
        content,
        createdAt: new Date().toISOString(),
        user: author,
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
            isCurrentUser={
              currentUser
                ? post.userId === currentUser.id
                : post.userId === CURRENT_USER.id
            }
          />
        ))}
      </div>
    </main>
  );
}
