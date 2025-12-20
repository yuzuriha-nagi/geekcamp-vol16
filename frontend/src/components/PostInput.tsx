"use client";

import { useState } from "react";
import { User } from "@/types";
import { Send, Sparkles } from "lucide-react";
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
    <Card className="sticky top-[4.5rem] z-30 mb-6 border-border/60 bg-background/95 backdrop-blur shadow-sm">
      <form onSubmit={handleSubmit} className="p-4 flex gap-4">

        <Avatar className="w-10 h-10">
          <AvatarImage src={currentUser.avatarUrl} />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="禁止ワードを回避せよ..."
            className="min-h-[80px] text-base resize-none border-0 focus-visible:ring-0 px-0 py-0 shadow-none placeholder:text-muted-foreground/60"
          />

          <div className="flex items-center justify-between pt-2 mt-2 border-t">
            {/* 装飾用ボタン */}
            <Button variant="ghost" size="icon" type="button" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
              <Sparkles className="w-5 h-5" />
            </Button>

            <Button
              type="submit"
              disabled={!content.trim()}
              className="gap-2 font-bold rounded-full px-6"
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