import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rukminim2.flixcart.com', // Fixes the Runtime Error
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mqtaafuvnujrqcmuqvsx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // --- NEW COMFYUI CONFIGURATON ---
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