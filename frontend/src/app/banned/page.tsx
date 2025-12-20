export const metadata = {
  title: "BANNED | WordWolf SNS",
};

export default function BannedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-950 via-black to-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-red-800/40 bg-black/70 p-8 shadow-[0_0_40px_rgba(220,38,38,0.35)] backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-2xl font-bold shadow-lg shadow-red-600/50">
            !
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-red-400 font-bold">
              Access Denied
            </p>
            <h1 className="text-2xl font-black text-white">あなたは BAN されています</h1>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-300 leading-relaxed">
          禁止ワードの投稿またはルール違反が検知されたため、このアカウントは一時停止されています。
          管理者による審査が完了するまでアクセスできません。
        </p>

        <div className="mt-8 grid gap-3">
          <div className="rounded-lg border border-red-800/40 bg-red-900/30 px-4 py-3 text-sm text-red-200">
            ・今後のログインは制限されます。<br />
            ・異議申し立てを行う場合はサポートまでご連絡ください。<br />
            ・再発防止のため、利用規約の再確認をお願いします。
          </div>
          <p className="text-xs text-gray-500">
            この画面が誤表示の場合は、サポートチームにお問い合わせください。
          </p>
        </div>
      </div>
    </main>
  );
}
