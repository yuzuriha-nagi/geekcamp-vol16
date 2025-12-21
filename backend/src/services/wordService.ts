import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../supabase";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

export const wordService = {
  // 修正: 引数から gameId を削除
  async generatePersonalWord({ userId, profileText }: { userId: string, profileText: string }) {
    console.log(`[Service] 生成開始: User=${userId}`);

    let secretWord: string;

    // 1. モックモード
    if (!model || !supabase) {
      console.log('⚠️ モックモード: ランダムな単語を返します');
      const mockWords = ['コーヒー', 'パソコン', '音楽', '旅行', '本', '映画', 'スポーツ', '料理'];
      secretWord = mockWords[Math.floor(Math.random() * mockWords.length)];

      return {
        status: "success",
        word: secretWord, // Controller側はこのキーを見ています
        reason: "モック生成",
        mock: true
      };
    }

    // 2. 本番モード
    try {
      const prompt = `
        あなたはワードウルフゲームの出題者です。
        以下のプロフィールを持つユーザーのために、会話のネタになるような「名詞」を1つ選んでください。
        
        条件:
        1. 一般的な名詞であること。
        2. その人の属性に関連していること。
        3. 出力は以下のJSON形式の文字列のみ。余計な文章は禁止。

        { "secret_word": "単語", "reason": "理由" }

        プロフィール: ${profileText}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(text);
      secretWord = parsedData.secret_word;

      // 3. Supabaseへの保存
      // 修正: game_participants ではなく users テーブル等に保存するロジックに変更
      // ※ usersテーブルに word カラムがある前提です
      const { error } = await supabase
        .from('users')
        .upsert({
          user_id: userId,
          word: secretWord
        });

      if (error) throw error;

      return { status: "success", word: secretWord };

    } catch (error) {
      console.error("AI生成または保存エラー:", error);
      throw error;
    }
  }
};