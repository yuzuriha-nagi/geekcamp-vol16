// frontend/src/lib/client.ts (例)

import { hc } from 'hono/client';

// 修正前: import type { AppType } from '../../backend/src/index';
// 修正後: app を参照する（ここに @hono/node-server は含まれていないので安全！）
import type { AppType } from '../../../backend/src/app';

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);