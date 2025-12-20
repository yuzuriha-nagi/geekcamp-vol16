import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../supabase";

interface GenerateParams {
  userId: string;
  profileText: string;
  gameId: string;
}

export const wordService = {
  async generatePersonalWord({ userId, profileText, gameId }: GenerateParams) {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

    // Google Geminiの設定
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      あなたはワードウルフゲームの出題者です。
      以下のプロフィールを持つユーザーのために、会話のネタになるような「名詞」を1つ選んでください。
      
      条件:
      1. 一般的な名詞であること。
      2. その人の属性に関連していること。
      3. 出力は以下のJSON形式の文字列のみ。余計な文章は禁止。

      {
        "secret_word": "単語",
        "reason": "理由"
      }

      プロフィール:
      ${profileText}
    `;

    // AI生成実行
    console.log(`Geminiで生成開始: User=${userId}`);
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    console.log("Geminiからの返答:", text);

    // AIのマークダウン装飾を削除 (```json ... ```)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // JSONパース
    const parsedData = JSON.parse(text);
    const secretWord = parsedData.secret_word;

    // Supabaseに保存
    const { error } = await supabase
      .from('game_participants')
      .upsert({
        game_id: gameId,
        user_id: userId,
        word: secretWord
      });

    if (error) throw error;

    return { secretWord, reason: parsedData.reason };
  }
};