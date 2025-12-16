export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-10 px-6 py-16 sm:px-10">
        <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Test Site
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            シンプルなテスト用ホームページ
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            表示確認や動作チェック用のプレースホルダーです。テキストやボタンを差し替えて自由に使えます。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              メインボタン
            </a>
            <a
              href="#"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
            >
              サブボタン
            </a>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          {[
            { title: "セクション1", text: "ダミーの説明テキスト。" },
            { title: "セクション2", text: "必要に応じて差し替え。" },
            { title: "セクション3", text: "リンク先を設定可能。" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
              <button className="mt-4 text-sm font-semibold text-slate-700 underline decoration-slate-300 decoration-2 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-500">
                もっと見る
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
