import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import wordRoutes from './routes/words';
import postRoutes from './routes/posts';

dotenv.config();

// ベースとなるアプリ
const app = new Hono();

// ミドルウェア
app.use('*', cors());

// ▼ 修正ポイント: ルート定義をチェーンで繋ぎ、それを `routes` 変数に入れます
const routes = app
  .route('/api/words', wordRoutes)
  .route('/api/posts', postRoutes);

// ヘルスチェック
app.get('/', (c) => c.text('WordWolf API is running!'));

// サーバー起動
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

// ▼ 型のエクスポート
export type AppType = typeof routes;

// ▼ 実行には `app` を使います (appには上記routeで登録された内容が含まれています)
serve({
  fetch: app.fetch,
  port
});