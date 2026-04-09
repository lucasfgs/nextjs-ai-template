import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' }, // Google avatars
      { hostname: 'avatars.githubusercontent.com' }, // GitHub avatars
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

export default nextConfig
