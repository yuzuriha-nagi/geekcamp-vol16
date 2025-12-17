import Image from "next/image";
import { WarningIcon } from "@/app/components/icons/WarningIcon"; // WarningIconコンポーネントを別途作成する必要があります

// 以下のコードブロックは、ユーザーの指定するデザインを再現するために、
// 元の `app/page.tsx` の内容を完全に置き換えるものです。

export default function Home() {
  return (
    // 背景: 赤と黒のグラデーション、中央に配置
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans">
      {/* 画面全体のグラデーション背景 (画像の雰囲気に近づけるため) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-900 via-black to-gray-900 opacity-90"></div>

      {/* ログインカードコンテナ */}
      <main className="relative z-10 w-full max-w-sm rounded-xl bg-black/90 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
        
        {/* ヘッダー: ロゴとタイトル */}
        <div className="flex flex-col items-center gap-2 mb-8">
          {/* ロゴ: Twitter風の鳥のアイコンと警告マーク (Imageタグは外部SVG/PNGファイルが必要です) */}
          {/* 今回は `public` フォルダに `twitter-warning.svg` があるとして代替します */}
          <Image
            src="/twitter-warning.svg" // 適切なロゴ画像パスに変更してください
            alt="Twitterウルフルロゴ"
            width={48}
            height={48}
            className="mb-2"
          />
          <h1 className="text-2xl font-bold text-white">
            Twitterウルフル
          </h1>
          <p className="text-sm text-red-500">
            禁止ワード投稿で即時BAN
          </p>
        </div>

        {/* 警告メッセージ (赤背景のボックス) */}
        <div className="flex items-center gap-2 rounded-md bg-red-700/20 p-3 text-sm text-red-400 border border-red-700 mb-6">
          <WarningIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="font-medium">
            ワードウルフの世界へようこそ。一度間違えば、全てが終わる。
          </span>
        </div>

        {/* フォームセクション */}
        <form className="flex flex-col gap-4">
          {/* ユーザー名/メールアドレスの入力欄 */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              ユーザー名
            </label>
            <input
              id="username"
              type="text"
              placeholder="あなたのユーザー名"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-600 focus:ring-red-600 transition duration-150"
              required
            />
          </div>

          {/* パスワードの入力欄 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-600 focus:ring-red-600 transition duration-150"
              required
            />
          </div>

          {/* ログインボタン (赤色) */}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-red-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
          >
            ログイン
          </button>
        </form>

        {/* フッターリンクと注意書き */}
        <div className="mt-6 text-center text-sm">
          {/* アカウントをお持ちでない方へ */}
          <a
            href="#" // 適切な登録ページURLに変更してください
            className="text-gray-400 hover:text-red-500 transition-colors font-medium"
          >
            アカウントをお持ちでない方はこちら
          </a>

          {/* 注意書き */}
          <p className="mt-4 text-xs text-gray-500">
            禁止ワードを投稿すると即座にアカウントがBANされます
          </p>
        </div>
      </main>
    </div>
  );
}