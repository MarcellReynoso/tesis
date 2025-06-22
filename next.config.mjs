/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para el despliegue en /marcell
  basePath: process.env.NODE_ENV === 'production' ? '/marcell' : '',
  
  // Configuración para imágenes y assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '/marcell' : '',
  
  // Configuración para el servidor
  output: 'standalone',
  
  // Configuración para el puerto
  experimental: {
    serverComponentsExternalPackages: ['mysql2']
  },
  
  // Configuración para evitar problemas de caché
  generateEtags: false,
  
  // Configuración para headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
