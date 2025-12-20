import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import wordRoutes from './routes/words';
import postRoutes from './routes/posts'; // (前回作成した投稿機能があれば)

dotenv.config();

const app = new Hono();

// Middleware
app.use('*', cors());

// ルーティングのマウント
// /api/words/generate-personal-word としてアクセス可能になります
app.route('/api/words', wordRoutes);
app.route('/api/posts', postRoutes);

// ヘルスチェック
app.get('/', (c) => c.text('WordWolf API is running!'));

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});