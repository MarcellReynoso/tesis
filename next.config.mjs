/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/marcell',
    assetPrefix: '/marcell',
  }),
};

export default nextConfig;
