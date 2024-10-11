import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    VERCEL_URL: z.string().optional(),
    FIREBASE_SERVICE_ACCOUNT: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
    FIREBASE_DATABASE_URL: z.string(),
    FIREBASE_STORAGE_BUCKET: z.string(),
  },
  client: {
    NEXT_PUBLIC_VERCEL_ENV: z.enum(['development', 'production']),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  },
});

export default env;
