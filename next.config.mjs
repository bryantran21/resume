/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/resume', 
  assetPrefix: '/resume', 
  images: {
    domains: ['steamcdn-a.akamaihd.net'],
    unoptimized: true
  },
};

export default nextConfig;