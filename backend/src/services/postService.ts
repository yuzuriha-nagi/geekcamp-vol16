// services/postService.ts
import { supabase } from '../supabase';

interface CreatePostParams {
  userId: string;
  gameId: string;
  content: string;
}

export const postService = {
  async createPost({ userId, gameId, content }: CreatePostParams) {
    // 1. ユーザーの現在の状態とNGワードを取得
    const { data: participant, error: fetchError } = await supabase
      .from('game_participants')
      .select('word, is_alive')
      .eq('user_id', userId)
      .eq('game_id', gameId)
      .single();

    if (fetchError || !participant) {
      throw new Error('ユーザーが見つからないか、ゲームに参加していません');
    }

    if (!participant.is_alive) {
      throw new Error('あなたは既に脱落しています');
    }

    // 2. NGワード判定（部分一致）
    // ngword.ts に判定ロジックがある場合はそれをimportして使ってもOK
    const ngWord = participant.word;
    const isBanned = content.includes(ngWord);

    if (isBanned) {
      // ☠️ NGワードを踏んだ場合の処理 (BAN)

      // A. ユーザーを死亡状態にする
      await supabase
        .from('game_participants')
        .update({ is_alive: false })
        .eq('user_id', userId)
        .eq('game_id', gameId);

      // B. システムログ（死亡通知）を投稿
      const systemPost = {
        user_id: null, // またはシステムBotのID
        game_id: gameId,
        content: `🚨【速報】ユーザーが禁止ワード「${ngWord}」を踏んで爆発しました！`,
        type: 'SYSTEM',
      };

      await supabase.from('posts').insert(systemPost);

      return {
        success: false,
        isBanned: true,
        ngWord: ngWord,
        message: 'NGワードを踏みました。GAME OVER',
      };
    }

    // 3. 通常投稿の保存
    const newPost = {
      user_id: userId,
      game_id: gameId,
      content: content,
      type: 'USER',
    };

    const { data: savedPost, error: saveError } = await supabase
      .from('posts')
      .insert(newPost)
      .select()
      .single();

    if (saveError) {
      throw new Error('投稿の保存に失敗しました');
    }

    return {
      success: true,
      isBanned: false,
      post: savedPost,
    };
  },
};
