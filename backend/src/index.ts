import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = new Hono();

// CORS設定
app.use('/*', cors());

// モックモード判定
const MOCK_MODE = !process.env.GEMINI_API_KEY || !process.env.SUPABASE_URL;

if (MOCK_MODE) {
  console.log('⚠️  モックモードで起動中（環境変数が未設定）');
}

// Google Geminiの設定（モックモード対応）
let genAI: any = null;
let model: any = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

// Supabaseの設定（モックモード対応）
let supabase: any = null;

if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
}

app.post('/generate-personal-word', async (c) => {
  try {
    const { userId, profileText, gameId } = await c.req.json();

    if (!userId || !profileText || !gameId) {
      return c.json({ error: "データ不足" }, 400);
    }

    console.log(`Geminiで生成開始: User=${userId}`);

    let secretWord: string;

    // モックモードの場合
    if (MOCK_MODE || !model) {
      console.log('モックモード: ランダムな単語を生成');
      const mockWords = ['コーヒー', 'パソコン', '音楽', '旅行', '本', '映画', 'スポーツ', '料理'];
      secretWord = mockWords[Math.floor(Math.random() * mockWords.length)];
      
      return c.json({ 
        status: "success", 
        word: secretWord,
        mock: true 
      });
    }

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

    // お掃除処理: AIが ```json ... ``` という飾りをつけるのを消す
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // JSONパース
    const parsedData = JSON.parse(text);
    secretWord = parsedData.secret_word;

    // Supabaseに保存（接続がある場合のみ）
    if (supabase) {
      const { error } = await supabase
        .from('game_participants')
        .upsert({ 
          game_id: gameId, 
          user_id: userId, 
          word: secretWord 
        });

      if (error) throw error;
    }

    return c.json({ status: "success", word: secretWord });

  } catch (error) {
    console.error("エラー詳細:", error);
    return c.json({ error: "処理失敗", details: error }, 500);
  }
});

const PORT = Number(process.env.PORT) || 3000;

console.log(`🚀 サーバー起動中: http://localhost:${PORT}`);
if (MOCK_MODE) {
  console.log('📝 モックモードで動作中 - 実際のAPI/DBは使用されません');
}

serve({
  fetch: app.fetch,
  port: PORT,
});