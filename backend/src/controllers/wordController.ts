import { Context } from 'hono';
import { wordService } from '../services/wordService';

export const wordController = {
  async generate(c: Context) {
    try {
      const body = await c.req.json();
      // 修正: gameId を削除
      const { userId, profileText } = body;

      // 修正: gameId のチェックを削除
      if (!userId || !profileText) {
        return c.json({ error: "データ不足: userId, profileText は必須です" }, 400);
      }

      // Service呼び出し
      const result = await wordService.generatePersonalWord({
        userId,
        profileText,
      });

      return c.json({
        status: "success",
        // 修正: Serviceが返すキー名 'word' に合わせる
        word: result.word,
      });

    } catch (error: any) {
      console.error("Controller Error:", error);
      return c.json({ error: "処理失敗", details: error.message }, 500);
    }
  }
};