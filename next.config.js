/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: 'out',
  output: 'standalone', // Ensure this is correct if you're using serverless functions
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
