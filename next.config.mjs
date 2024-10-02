/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    NEXT_PUBLIC_ENV: process.env.VERCEL_ENV || "development",
  },
};

export default nextConfig;
