export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  ngWord?: string; // 自分のNGワード（他人の場合は見えないのでオプショナル）
  bio?: string;    // ★追加: 自己紹介文
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  user: User; // 結合されたユーザー情報（モック用）
  isBanned?: boolean; // すでにBANされた投稿かどうか
}