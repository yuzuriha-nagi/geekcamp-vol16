"use client";

import { useState } from "react";
import { User } from "@/types";
import { Send, AlertOctagon } from "lucide-react"; // アイコン変更
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostInputProps {
  currentUser: User;
  onPost: (content: string) => void;
}

export const PostInput = ({ currentUser, onPost }: PostInputProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(content);
    setContent("");
  };

  return (
    // 背景を黒の半透明に変更、ボーダーを暗い色に
    <Card className="top-[4.5rem] z-30 mb-6 border-gray-800 bg-black/60 backdrop-blur-md shadow-lg shadow-black/20">
      <form onSubmit={handleSubmit} className="p-4 flex gap-4">

        <Avatar className="w-10 h-10 border border-gray-700">
          <AvatarImage src={currentUser.avatarUrl} />
          <AvatarFallback className="bg-gray-800 text-gray-400">ME</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="言葉を選べ。監視されている..."
            // 入力エリアのデザインをダークモード仕様に強制
            className="min-h-[80px] text-base resize-none border-0 focus-visible:ring-0 px-0 py-0 shadow-none bg-transparent text-gray-100 placeholder:text-gray-600"
          />

          <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-800">
            {/* 装飾用ボタン: 青から赤/グレー系へ */}
            <Button variant="ghost" size="icon" type="button" className="text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-colors">
              <AlertOctagon className="w-5 h-5" />
            </Button>

            <Button
              type="submit"
              disabled={!content.trim()}
              // 送信ボタンを赤色に
              className="gap-2 font-bold rounded-full px-6 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-800 disabled:text-gray-500"
            >
              投下
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};