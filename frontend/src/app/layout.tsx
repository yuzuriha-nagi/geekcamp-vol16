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
      {/* ▼ 修正箇所：className に bg-slate-50 と text-gray-900 を追加/確認してください */}
      <body className={`${inter.className} bg-slate-50 text-gray-900 antialiased`}>

        <Header currentUser={CURRENT_USER} />

        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}