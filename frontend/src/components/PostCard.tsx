import { Post } from "@/types";
import { MessageCircle, Heart, Repeat2, AlertOctagon } from "lucide-react";

interface PostCardProps {
  post: Post;
  isCurrentUser: boolean; // 閲覧者が投稿者本人かどうか
}

export const PostCard = ({ post, isCurrentUser }: PostCardProps) => {
  // NGワードの表示ロジック
  // 本人の場合は "???"、他人の場合は実際のワードを表示
  const displayNgWord = isCurrentUser ? "???" : post.user.ngWord;

  return (
    <div className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${post.isBanned ? 'bg-red-50' : ''}`}>
      <div className="flex gap-3">
        {/* アバター画像 */}
        <img
          src={post.user.avatarUrl}
          alt={post.user.name}
          className="w-10 h-10 rounded-full bg-gray-200 object-cover"
        />

        <div className="flex-1 min-w-0">
          {/* ヘッダー部分：名前とNGワードバッジ */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold text-gray-900 truncate">{post.user.name}</span>
              <span className="text-gray-500 text-sm truncate">{post.user.handle}</span>
            </div>

            {/* NGワードバッジ */}
            <div className={`px-2 py-0.5 rounded text-xs font-bold border flex items-center gap-1
              ${isCurrentUser
                ? "bg-gray-100 text-gray-500 border-gray-200" // 自分用（地味）
                : "bg-red-50 text-red-600 border-red-200"     // 他人用（目立つ）
              }`}
            >
              <AlertOctagon className="w-3 h-3" />
              <span>NG: {displayNgWord}</span>
            </div>
          </div>

          {/* 投稿本文 */}
          <p className="text-gray-800 whitespace-pre-wrap mb-3 leading-relaxed">
            {post.content}
          </p>

          {/* アクションボタン（将来機能用プレースホルダー） */}
          <div className="flex items-center justify-between text-gray-400 max-w-xs">
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors group">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">返信</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 transition-colors group">
              <Repeat2 className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 hover:text-pink-500 transition-colors group">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};