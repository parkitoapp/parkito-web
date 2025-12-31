/** @type {import('next').NextConfig} */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "ylypvdbcrgbwjfvaeamt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Enable compression
  compress: true,
  // Production optimizations
  reactStrictMode: true,
  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,
  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
    ],
  },
  // Compiler optimizations
  compiler: {
    // Remove console.log in production (keep error and warn)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Redirects for old URL structure to new structure
  // Old: /myCity -> New: /citta/myCity
  // Old: /myCity/myParkingAddress -> New: /citta/myCity/myParkingAddress
  async redirects() {
    // List of routes that should NOT be redirected
    const excludedRoutes = [
      'citta',
      'api',
      '_next',
      'admin',
      'blog',
      'chi-siamo',
      'contatti',
      'devices',
      'diventare-host',
      'login',
      'terminiecondizioni',
      'favicon.ico',
    ];

    const excludedPattern = excludedRoutes.join('|');

    return [
      {
        // Redirect old parking routes: /myCity/myParkingAddress -> /citta/myCity/myParkingAddress
        // This must come first to match longer paths before shorter ones
        // [^/.]+  = any char except slash and dot, so file.mp4 won't match
        source: '/:citySlug((?!' + excludedPattern + ')[^/.]+)/:parkingAddress([^/.]+)',
        destination: '/citta/:citySlug/:parkingAddress',
        permanent: process.env.NODE_ENV === 'production', // 301 in prod, 302 in dev
      },
      {
        // Redirect old city-only routes: /myCity -> /citta/myCity
        // [^/.]+  = any char except slash and dot, so file.mp4 won't match
        source: '/:citySlug((?!' + excludedPattern + ')[^/.]+)',
        destination: '/citta/:citySlug',
        permanent: process.env.NODE_ENV === 'production', // 301 in prod, 302 in dev
      },
    ];
  },
};

export default nextConfig; 
