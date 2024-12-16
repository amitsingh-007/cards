import('./src/server/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  env: {
    NEXT_PUBLIC_ENV: process.env.VERCEL_ENV || 'development',
  },
};

export default nextConfig;
