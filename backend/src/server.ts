import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'; // CORSミドルウェアをインポート

const app = new Hono();

app.get('/hello', (c) => c.text('Hono is working!'));

// CORSの設定: Next.jsからのアクセスを許可
app.use('/*', cors({
  origin: 'http://localhost:3000', // Next.jsのURL
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}));

// ログインエンドポイント
app.post('/login', async (c) => {
  const body = await c.req.json();
  const { userId, gameId, profileText,password } = body;
  console.log(`ログイン試行: ${userId} (パスワード: ${password})`);
  console.log(`属性データ: ${profileText}`);

  // 3. 照合処理（例として userId が admin の場合を成功とする）
  // パスワードの代わりに gameId や userId で判定するロジックに変更が必要です
  if (userId === "admin" && password === "password123") { 
    return c.json({
      message: "ログイン成功",
      user: { id: userId, room: gameId }
    }, 200);
  } else {
    return c.json({
      message: "ユーザーIDが正しくありません"
    }, 401);
  }
});

const port = 3001;
console.log(`🚀 Hono Server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port
});