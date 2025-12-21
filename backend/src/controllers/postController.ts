import { Context } from 'hono';
import { postService } from '../services/postService';

export const postController = {
  // 投稿作成
  async create(c: Context) {
    try {
      // リクエストボディの取得
      const body = await c.req.json();
      const { userId, gameId, content } = body;

      // バリデーション（簡易）
      if (!userId || !gameId || !content) {
        return c.json({ error: '必須項目(userId, gameId, content)が不足しています' }, 400);
      }

      // サービスの呼び出し
      const result = await postService.createPost({ userId, gameId, content });

      // 結果の返却
      // BANされた場合でもステータス200で返し、クライアント側で分岐処理させるパターン
      return c.json(result, 200);

    } catch (error: any) {
      console.error('Post Error:', error);
      return c.json({ error: error.message || 'Internal Server Error' }, 500);
    }
  }
};