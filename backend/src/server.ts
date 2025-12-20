import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'; // CORSミドルウェアをインポート

const app = new Hono();

// CORSの設定: Next.jsからのアクセスを許可
app.use('/*', cors({
  origin: 'http://localhost:3000', // Next.jsのURL
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}));

// ログインエンドポイント
app.post('/login', async (c) => {
  const body = await c.req.json();
  const { username, password } = body;

  console.log(`ログイン試行: ${username}`);

  // TODO: ここでデータベース照合などを行う
  if (username === "admin" && password === "password123") {
    return c.json({
      message: "ログイン成功",
      user: { name: username }
    }, 200);
  } else {
    return c.json({
      message: "ユーザー名またはパスワードが違います"
    }, 401);
  }
});

const port = 3001;
console.log(`🚀 Hono Server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port
});