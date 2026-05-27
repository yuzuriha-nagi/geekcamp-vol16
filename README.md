# BARK 

ハッカソン「geekcamp-vol16にて開発した、「ワードウルフ」と「SNS」を融合させ、日常のつぶやきにスリルとゲーム性を加えた新感覚のコミュニケーションアプリケーションです。

## 📖 プロジェクトの目的と背景
既存のSNSのような自由な情報発信の場に、「自分の禁止ワードを言ったら即BANされる」というワードウルフの要素を取り入れることで、日常のテキストコミュニケーションにエンターテインメント性を生み出すことを目的としています。
ユーザーは「自分のNGワードは一体何か？」を推測・警戒しながら投稿する緊張感を味わうことができ、単なる情報の消費ややり取りにとどまらない、スリリングで新しいSNS体験を提供します。

## ✨ 主な機能
- **個人特有のNGワード自動割り当て:** アカウント作成時、ユーザーごとに異なる禁止ワードがシステム側から密かに割り当てられます。
- **一撃BANのペナルティシステム:** Twitterライクに自由に投稿できるUIを備えつつ、自身のNGワードを含んだ投稿を行ってしまうと即座に検知され、アカウントがバン（利用停止）される仕組みを実装しています。
- **Supabase Authを用いたセキュアなユーザー認証:** 安全なログイン・サインアップ機能を提供し、ユーザーごとのステータス（生存 / BAN状態）をセキュアに管理・維持します。
- **リアルタイムなタイムライン同期:** 他のユーザーの投稿や、誰かがNGワードを踏んでBANされた状況などをタイムライン上でシームレスに確認できます。

## 🛠 アーキテクチャと技術選定の理由

### Frontend: Next.js (App Router) / TypeScript
- **選定理由:** クライアントサイドとサーバーサイドのレンダリング境界を明確に意識し、Server Componentsを活用することでクライアントへのJavaScriptバンドルサイズを最小化し、初期ロードの高速化を図っています。また、TypeScriptによる静的型付けを徹底することで、コンポーネント間のデータの受け渡しにおける型安全性を担保し、ランタイムエラーを未然に防ぐ堅牢なUI設計を実現しています。

### Backend: Hono (Cloudflare Workers)
- **選定理由:** バックエンドにはNode.jsランタイムではなく、V8 Isolate上で動作するCloudflare Workersを採用しました。これによりコールドスタートの遅延をミリ秒単位まで削減し、エッジネットワークを活用した低遅延なAPIレスポンス（NGワードの判定など）を実現しています。フレームワークには、Web Standard APIに準拠し、エッジ環境に対して極めてオーバーヘッドの少ないHonoを選定することで、インフラの特性を最大限に引き出しています。

### Database / Auth: Supabase (PostgreSQL)
- **選定理由:** 単なるBaaSとしての利便性だけでなく、内部で稼働するPostgreSQLの堅牢なリレーショナルモデルを評価して採用しました。また、アプリケーション層でのバリデーションに依存するのではなく、データベース層のRow Level Security (RLS) を適切に設定することで、データへのアクセス権限を原理原則に基づいてセキュアに制御しています。

## 📁 ディレクトリ構成

```text
.
├── backend/                  # Hono (APIルーティングおよびNGワード判定ロジック)
│   ├── src/
│   │   ├── controllers/      # リクエストの制御 (post, word)
│   │   ├── routes/           # エンドポイントの定義
│   │   ├── services/         # ビジネスロジック (投稿処理, NGワード判定等)
│   │   ├── ngword.ts         # NGワードのコアロジック
│   │   └── supabase.ts       # DB接続設定
│   └── wrangler.toml         # Cloudflare Workers デプロイ設定
├── frontend/                 # Next.js (フロントエンドUIおよびルーティング)
│   ├── src/
│   │   ├── app/              # App Router (タイムライン、BAN画面、認証画面等)
│   │   ├── components/       # 再利用可能なUIコンポーネント (shadcn/ui含む)
│   │   ├── lib/              # APIクライアントやSupabase設定
│   │   └── types/            # TypeScriptの型定義
│   ├── components.json       # shadcn/ui 設定ファイル
│   └── eslint.config.mjs     # Linter設定
├── package.json              # ルートレベルの依存関係
└── README.md                 # 本ドキュメント
```
## 🚀 ローカル環境構築 (Getting Started)
前提条件
Node.js (v18以上推奨)

npm (または yarn / pnpm)

Supabase アカウントおよびプロジェクト

Cloudflare アカウント (Wrangler CLI)

### 1. リポジトリのクローン
Bash
git clone [https://github.com/yuzuriha-nagi/geekcamp-vol16.git](https://github.com/yuzuriha-nagi/geekcamp-vol16.git)
cd geekcamp-vol16
### 2. 環境変数の設定
frontend および backend それぞれのディレクトリに .env ファイルを作成し、必要な環境変数を設定します。（※ .env.example があればそれをコピーして使用してください）

frontend/.env

Code snippet
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
### 3. フロントエンドの起動
Bash
cd frontend
npm install
npm run dev
http://localhost:3000 でアクセス可能です。

### 4. バックエンドの起動
Bash
cd ../backend
npm install
npm run dev
http://localhost:8787 でローカルAPIサーバーが起動します。

## 🧪 品質保証 (テスト・CI/CD)
実務でのチーム開発・保守運用を見据え、以下の品質担保プロセスを導入しています。

静的解析: ESLint, Prettier によるコード規約の統一

CI (継続的インテグレーション): GitHub Actions を用い、Push / PR 時に自動で Lint チェックとビルドを実行

単体テスト: Jest を用いたコアロジック（NGワード判定処理など）のテスト