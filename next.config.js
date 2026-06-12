/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Base path for GitHub Pages or Vercel
  // basePath: process.env.NODE_ENV === 'production' ? '/whyme' : '',
  // Asset prefix for CDN
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/whyme/' : '',
}

module.exports = nextConfig
