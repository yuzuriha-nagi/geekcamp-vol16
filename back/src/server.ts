// アプリケーションのエントリーポイント（Honoインスタンスの作成など）
import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

// サーバーの起動設定
const port = 3001;
console.log(`🚀 Hono Server running on http://localhost:${port}`);

// serve関数を呼び出して、サーバーを起動し、プロセスを維持します
serve({
  fetch: app.fetch, // Honoアプリケーションのfetchハンドラを指定
  port: port
});

// 開発環境やデプロイ先の環境に合わせて適宜エクスポートします
// 例: Cloudflare Workersなど
// export default app;