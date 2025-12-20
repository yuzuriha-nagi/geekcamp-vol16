export interface User {
  id: string;
  name: string;
  handle: string; // @username
  avatarUrl: string;
  ngWord: string; // その人に割り当てられた禁止ワード
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  user: User; // 結合されたユーザー情報（モック用）
  isBanned?: boolean; // すでにBANされた投稿かどうか
}