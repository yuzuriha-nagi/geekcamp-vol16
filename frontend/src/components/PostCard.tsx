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
    <Card className="mb-4 overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4 flex gap-4">

        {/* アバター */}
        <Avatar className="w-12 h-12 border-2 border-background">
          <AvatarImage src={post.user.avatarUrl} alt={post.user.name} className="object-cover" />
          <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* ヘッダー部分 */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-[15px]">{post.user.name}</span>
                <span className="text-muted-foreground text-xs">{post.user.handle}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">2分前</p>
            </div>

            {/* NGワードバッジ */}
            {/* variant="destructive" で赤色、"secondary" でグレーになります */}
            <Badge
              variant={isCurrentUser ? "secondary" : "destructive"}
              className={`px-3 py-1 text-xs font-bold gap-1.5 ${!isCurrentUser && "shadow-sm shadow-red-200"}`}
            >
              <AlertTriangle className="w-3 h-3" strokeWidth={3} />
              {isCurrentUser ? "SECRET" : displayNgWord}
            </Badge>
          </div>

          {/* 本文 */}
          <p className="text-foreground/90 leading-relaxed text-[15px] mb-3 whitespace-pre-wrap">
            {post.content}
          </p>

          {/* アクションボタン (Ghost variantでアイコンのみ表示) */}
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

// ヘルパーコンポーネント
const ActionButton = ({ icon: Icon, count }: any) => (
  <Button
    variant="ghost"
    size="sm"
    className="text-muted-foreground hover:text-foreground h-8 px-2 rounded-full gap-1.5"
  >
    <Icon className="w-4 h-4" />
    {count > 0 && <span className="text-xs">{count}</span>}
  </Button>
);