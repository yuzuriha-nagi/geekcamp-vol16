import { Context } from 'hono';
import { wordService } from '../services/wordService';

export const wordController = {
  async generate(c: Context) {
    try {
      // リクエストボディの取得
      const body = await c.req.json();
      const { userId, profileText, gameId } = body;

      // バリデーション
      if (!userId || !profileText || !gameId) {
        return c.json({ error: "データ不足: userId, profileText, gameId は必須です" }, 400);
      }

      // サービスの呼び出し (ロジックは全てここに任せる)
      const result = await wordService.generatePersonalWord({
        userId,
        profileText,
        gameId
      });

      // 成功レスポンス
      return c.json({
        status: "success",
        word: result.secretWord,
        // 必要ならreasonも返す
        // reason: result.reason 
      });

    } catch (error: any) {
      console.error("Controller Error:", error);
      return c.json({ error: "処理失敗", details: error.message }, 500);
    }
  }
};