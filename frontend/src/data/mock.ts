import { User, Post } from "@/types";

// ログイン中のユーザー（自分）
// 自分に割り当てられたNGワードは "やばい" ですが、自分には見えません
export const CURRENT_USER: User = {
  id: "me",
  name: "自分（開発者）",
  handle: "@frontend_dev",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  ngWord: "やばい",
};

// 他のユーザーたち
export const MOCK_USERS: User[] = [
  {
    id: "user1",
    name: "田中 太郎",
    handle: "@tarotana",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    ngWord: "それな",
  },
  {
    id: "user2",
    name: "鈴木 花子",
    handle: "@hanako_s",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baby",
    ngWord: "草",
  },
];

// 初期投稿リスト
export const MOCK_POSTS: Post[] = [
  {
    id: "post1",
    userId: "user1",
    content: "今日のランチ、めちゃくちゃ美味しかった！",
    createdAt: "2023-12-16T10:00:00Z",
    user: MOCK_USERS[0],
  },
  {
    id: "post2",
    userId: "user2",
    content: "ハッカソン進捗どう？私は眠いｗ",
    createdAt: "2023-12-16T10:30:00Z",
    user: MOCK_USERS[1],
  },
  {
    id: "post3",
    userId: "user1",
    content: "それはマジで草", // NGワード「それな」は含まれていないのでセーフ
    createdAt: "2023-12-16T11:00:00Z",
    user: MOCK_USERS[0],
  },
];
