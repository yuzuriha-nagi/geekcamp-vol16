import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CURRENT_USER } from "@/data/mock";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WordWolf SNS",
  description: "言葉に気をつけろ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* ベースを黒背景・白文字に変更 */}
      <body className={`${inter.className} bg-gray-900 text-gray-200 antialiased min-h-screen relative`}>

        {/* ▼ 背景グラデーション (全ページ共通・固定表示) */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-red-900 via-black to-gray-900 opacity-90 pointer-events-none"></div>

        {/* ここのコメントアウトを切り替えればログイン状態を切り替えれます */}
        <Header currentUser={CURRENT_USER} />
        {/* <Header currentUser={null} /> */}

        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
