import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';

const app = new Hono();

// Supabaseクライアント（既存のコードの末尾などに追記）
const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// 既存のDBとCORS設定
const db = {
  users: [
    { id: "admin", password: "password123", profileText: "システム管理者。監視中。" },
    { id: "user1", password: "password123", profileText: "ただのプレイヤー。" }
  ]
};

app.use('/*', cors({
  origin: 'http://localhost:3000',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}));

// --- 既存のログイン/更新ルート (そのまま維持) ---
app.post('/login', async (c) => {
  const { userId, password } = await c.req.json();
  const user = db.users.find(u => u.id === userId && u.password === password);
  if (user) return c.json({ message: "成功", user: { id: user.id, profileText: user.profileText } }, 200);
  return c.json({ message: "失敗" }, 401);
});

app.post('/update-profile', async (c) => {
  const { userId, profileText } = await c.req.json();
  const userIndex = db.users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    db.users[userIndex].profileText = profileText;
    return c.json({ message: "更新完了", profileText }, 200);
  }
  return c.json({ message: "見つかりません" }, 404);
});

// --- 追加: Supabaseから詳細データを取得するエンドポイント ---
app.get('/user-details/:userId', async (c) => {
  const userId = c.req.param('userId');

  // Supabaseからフォローリストといいね投稿を並列で取得
const [followsRes, followersRes, likesRes] = await Promise.all([
    supabase.from('follows').select('*').eq('follower_id', userId), // フォロー中
    supabase.from('follows').select('*').eq('following_id', userId), // フォロワー
    supabase.from('likes').select('*').eq('user_id', userId) // いいね
  ]);

  return c.json({
    follows: followsRes.data || [],
    followers: followersRes.data || [],
    likes: likesRes.data || []
  });
});
app.get('/user-details/:userId', async (c) => {
  const userId = c.req.param('userId');

  // Supabaseからデータを取得
  const [followsRes, likesRes] = await Promise.all([
    supabase.from('follows').select('*').eq('follower_id', userId),
    supabase.from('likes').select('*').eq('user_id', userId)
  ]);

  return c.json({
    follows: followsRes.data || [],
    likes: likesRes.data || []
  });
});

serve({ fetch: app.fetch, port: 3001 });