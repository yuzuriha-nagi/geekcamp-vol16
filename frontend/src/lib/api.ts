// frontend/lib/client.ts
import { hc } from 'hono/client';

// ▼ 重要: バックエンドから AppType をインポートします
// 相対パスは実際のフォルダ構成に合わせて調整してください (例: ../../backend/index)
import type { AppType } from '../../../backend/src/index';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// ▼ ここで <AppType> を渡すのが解決の鍵です！
export const client = hc(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') as any;