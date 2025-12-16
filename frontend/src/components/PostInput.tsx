"use client";

import { useState } from "react";
import { User } from "@/types";
import { SendHorizontal } from "lucide-react";

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
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 backdrop-blur-md bg-white/90">
            <form onSubmit={handleSubmit} className="flex gap-3">
                <img
                    src={currentUser.avatarUrl}
                    alt="My Avatar"
                    className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="NGワードに気をつけて投稿..."
                        className="w-full resize-none bg-transparent border-none focus:ring-0 text-lg placeholder:text-gray-400 min-h-[50px] outline-none"
                        rows={2}
                    />
                    <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                        <button
                            type="submit"
                            disabled={!content.trim()}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>投稿する</span>
                            <SendHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};