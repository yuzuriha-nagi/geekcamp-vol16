import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Google Geminiの設定
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// ★修正点: 一番安定している "gemini-pro" に変更
// 設定(generationConfig)は削除してシンプルにします
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

app.post('/generate-personal-word', async (req, res) => {
  try {
    const { userId, profileText, gameId } = req.body;

    if (!userId || !profileText || !gameId) {
       res.status(400).json({ error: "データ不足" });
       return;
    }

    console.log(`Geminiで生成開始: User=${userId}`);

    // AIへの命令
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log("Geminiからの返答:", text);

    // ★お掃除処理: AIが ```json ... ``` という飾りをつけるのを消す
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

    res.json({ status: "success", word: secretWord });

  } catch (error) {
    console.error("エラー詳細:", error);
    // エラーの中身も返して原因を見やすくする
    res.status(500).json({ error: "処理失敗", details: error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動中: http://localhost:${PORT}`);
});