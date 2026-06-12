/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Removed: using SSR for dynamic pages with query params
  images: {
    unoptimized: true,
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // For Vercel deployment
  // No export needed - Vercel handles SSR natively
}

module.exports = nextConfig
