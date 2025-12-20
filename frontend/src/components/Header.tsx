import Link from "next/link";
import { User } from "@/types";
import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  // ログインしていない状態(null)を許容するように変更
  currentUser: User | null;
}

export const Header = ({ currentUser }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* 左側：ロゴ (クリックでトップへ) */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:scale-105 transition-transform duration-200">
            W
          </div>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight hidden sm:block">
            WordWolf
          </span>
        </Link>

        {/* 右側：分岐処理 */}
        <div className="flex items-center gap-2">

          {currentUser ? (
            /* ====================
               ログイン済みの場合
               ==================== */
            <>
              {/* 検索ボタン */}
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-900/20 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* 通知ボタン */}
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-900/20 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_5px_#ef4444]"></span>
              </button>

              {/* メニュー */}
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-900/20 rounded-full transition-colors ml-1">
                <Menu className="w-6 h-6" />
              </button>

              {/* ユーザーアイコン */}
              <div className="ml-2 pl-2 border-l border-gray-800 hidden sm:block">
                <img
                  src={currentUser.avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-700 cursor-pointer hover:opacity-80 transition-opacity object-cover bg-gray-800"
                />
              </div>
            </>
          ) : (
            /* ====================
               未ログインの場合
               ==================== */
            <div className="flex items-center gap-4">
              {/* ログインボタン (テキスト) */}
              <Link
                href="/login" // または /login
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                ログイン
              </Link>

              {/* 登録ボタン (目立つスタイル) */}
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-full hover:bg-red-700 shadow-[0_0_10px_rgba(220,38,38,0.4)] hover:shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-all"
              >
                新規登録
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};