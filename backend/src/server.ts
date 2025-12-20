import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'; // CORSミドルウェアをインポート

const app = new Hono();

// 仮のデータベース（サーバーを再起動するとリセットされます）
const db = {
  users: [
    { id: "admin", password: "password123", profileText: "システム管理者。監視中。" },
    { id: "user1", password: "password123", profileText: "ただのプレイヤー。" }
  ]
};

app.get('/hello', (c) => c.text('Hono is working!'));

// CORSの設定: Next.jsからのアクセスを許可
app.use('/*', cors({
  origin: 'http://localhost:3000', // Next.jsのURL
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}));

// ログイン
app.post('/login', async (c) => {
  const { userId, password } = await c.req.json();
  const user = db.users.find(u => u.id === userId && u.password === password);

  if (user) {
    return c.json({
      message: "ログイン成功",
      user: { id: user.id, profileText: user.profileText }
    }, 200);
  }
  return c.json({ message: "認証に失敗しました" }, 401);
});

// プロフィール更新
app.post('/update-profile', async (c) => {
  const { userId, profileText } = await c.req.json();
  const userIndex = db.users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    // データを更新
    db.users[userIndex].profileText = profileText;
    console.log(`[Update] ${userId}: ${profileText}`);
    
    return c.json({ message: "更新完了", profileText }, 200);
  }
  
  return c.json({ message: "ユーザーが見つかりません" }, 404);
});

const port = 3001;
console.log(`🚀 Hono Server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port
});