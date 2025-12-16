import { User } from "@/types";
import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  currentUser: User;
}

export const Header = ({ currentUser }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* 左側：ロゴ */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-200">
            W
          </div>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight hidden sm:block">
            WordWolf
          </span>
        </div>

        {/* 右側：アクションアイコン */}
        <div className="flex items-center gap-2">
          {/* 検索ボタン（モック） */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* 通知ボタン（未読バッジ付き） */}
          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          {/* ハンバーガーメニュー */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-1">
            <Menu className="w-6 h-6" />
          </button>

          {/* ユーザーアイコン（スマホではメニューの中に隠すことが多いが、今回は表示） */}
          <div className="ml-2 pl-2 border-l border-gray-200">
            <img
              src={currentUser.avatarUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

      </div>
    </header>
  );
};