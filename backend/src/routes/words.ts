import { Hono } from 'hono';
import { wordController } from '../controllers/wordController';

const app = new Hono();

// POST /api/words/generate-personal-word
app.post('/generate', wordController.generate);

export default app;