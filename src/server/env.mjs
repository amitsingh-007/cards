import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    VERCEL_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_VERCEL_ENV: z.enum(["development", "production"]),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
  },
});

export default env;
