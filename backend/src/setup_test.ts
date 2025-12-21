// setup_test.ts
import { supabase } from './supabase'; // 既存のsupabase設定を読み込み

async function main() {
  console.log("テストデータを登録します...");

  const userId = "manual_user_01";
  const gameId = "room_test";
  const ngWord = "バナナ"; // テスト用のNGワード

  // Supabaseに直接データを書き込む
  const { error } = await supabase
    .from('game_participants')
    .upsert({
      user_id: userId,
      game_id: gameId,
      word: ngWord,
      is_alive: true
    });

  if (error) {
    console.error("❌ エラーが発生しました:", error.message);
  } else {
    console.log("✅ 登録完了！");
    console.log(`User: ${userId}`);
    console.log(`Room: ${gameId}`);
    console.log(`NG Word: ${ngWord}`);
  }
}

main();