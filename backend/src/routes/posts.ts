// routes/posts.ts
import { Hono } from 'hono';
import { postController } from '../controllers/postController';

const app = new Hono();

// POST /api/posts へのリクエストを処理
app.post('/', postController.create);

export default app;