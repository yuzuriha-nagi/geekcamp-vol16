import { Post } from "@/types";
import { MessageCircle, Heart, Repeat2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  post: Post;
  isCurrentUser: boolean;
}

export const PostCard = ({ post, isCurrentUser }: PostCardProps) => {
  const displayNgWord = isCurrentUser ? "???" : post.user.ngWord;

  return (
    // 背景を黒系に、ホバー時にボーダーが赤くなる演出を追加
    <Card className="mb-4 overflow-hidden border-gray-800 bg-black/40 shadow-sm hover:shadow-md hover:border-red-900/50 transition-all duration-200">
      <CardContent className="p-4 flex gap-4">

        {/* アバター */}
        <Avatar className="w-12 h-12 border-2 border-gray-800">
          <AvatarImage src={post.user.avatarUrl} alt={post.user.name} className="object-cover" />
          <AvatarFallback className="bg-gray-800 text-gray-400">{post.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* ヘッダー部分 */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                {/* 文字色を白/グレーに */}
                <span className="font-bold text-gray-200 text-[15px]">{post.user.name}</span>
                <span className="text-gray-500 text-xs">{post.user.handle}</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">2分前</p>
            </div>

            {/* NGワードバッジ */}
            <Badge
              // バッジの色味を調整
              className={`px-3 py-1 text-xs font-bold gap-1.5 border-0 ${isCurrentUser
                  ? "bg-gray-800 text-gray-400 hover:bg-gray-700" // 自分用（隠蔽）
                  : "bg-red-900/60 text-red-200 hover:bg-red-900 shadow-[0_0_10px_rgba(220,38,38,0.2)]" // 他人（警告）
                }`}
            >
              <AlertTriangle className="w-3 h-3" strokeWidth={3} />
              {isCurrentUser ? "SECRET" : displayNgWord}
            </Badge>
          </div>

          {/* 本文 */}
          <p className="text-gray-300 leading-relaxed text-[15px] mb-3 whitespace-pre-wrap">
            {post.content}
          </p>

          {/* アクションボタン */}
          <div className="flex items-center gap-1 -ml-2">
            <ActionButton icon={MessageCircle} count={0} />
            <ActionButton icon={Repeat2} count={0} />
            <ActionButton icon={Heart} count={0} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ヘルパーコンポーネント（ダークモード対応）
const ActionButton = ({ icon: Icon, count }: any) => (
  <Button
    variant="ghost"
    size="sm"
    className="text-gray-500 hover:text-red-400 hover:bg-red-900/10 h-8 px-2 rounded-full gap-1.5 transition-colors"
  >
    <Icon className="w-4 h-4" />
    {count > 0 && <span className="text-xs">{count}</span>}
  </Button>
);