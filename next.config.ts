import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 1. WILDCARD: Allows all secure HTTPS images (Supabase, Unsplash, Flipkart, etc.)
      // This guarantees no images are blocked during development.
      {
        protocol: 'https',
        hostname: '**', 
      },
      // 2. LOCAL AI: Keeps your ComfyUI HTTP connection working perfectly
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8188',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;