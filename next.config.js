/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'out', // custom build output folder (only needed if you're using static export)
  
  images: {
    unoptimized: true, // disables automatic image optimization (good for static hosting)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        port: '', // optional, usually empty
        pathname: '/**', // allow all paths from that domain
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true, // not recommended for production, but ok during development
  },

  eslint: {
    ignoreDuringBuilds: true, // allows build even if eslint has issues
  },
};

export default nextConfig;
