// 1. まず dotenv をインポートして設定を実行 (最優先)
import dotenv from 'dotenv';
dotenv.config();

// 2. その後にサービスなどをインポート (これで中身の process.env が有効になります)
import { wordService } from '../src/services/wordService';

async function test() {
  console.log("🚀 Gemini 生成テスト開始...");

  // デバッグ用: ここでキーが見えているか確認
  console.log("DEBUG: Current Key:", process.env.GEMINI_API_KEY ? "Set" : "Not Set");

  try {
    const result = await wordService.generatePersonalWord({
      userId: "test-user-123",
      profileText: "映画鑑賞とプログラミングが好きです。"
    });
    console.log("✅ 結果:", result);
  } catch (error) {
    console.error("❌ エラー:", error);
  }
}

test();