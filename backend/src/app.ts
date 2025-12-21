// backend/src/app.ts (新規作成)
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import wordRoutes from './routes/words';
import postRoutes from './routes/posts';

dotenv.config();

const app = new Hono();

app.use('*', cors());

// ルート定義
const routes = app
  .route('/api/words', wordRoutes)
  .route('/api/posts', postRoutes);

app.get('/', (c) => c.text('WordWolf API is running!'));

// 型定義とアプリ本体をエクスポート
export type AppType = typeof routes;
export default app;