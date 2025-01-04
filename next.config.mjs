import('./src/server/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
  },
  env: {
    NEXT_PUBLIC_ENV: process.env.VERCEL_ENV || 'development',
  },
};

export default nextConfig;
