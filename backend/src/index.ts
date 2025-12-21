import { serve } from '@hono/node-server';
import app from './app'; // app.ts を読み込む

const port = Number(process.env.PORT) || 3000;
console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});