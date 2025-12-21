import { serve } from '@hono/node-server';
import app from './app'; // 作成したapp.tsを読み込む

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});