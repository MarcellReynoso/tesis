/** @type {import('next').NextConfig} */
const nextConfig = {
    // Para producción con subpath
    basePath: process.env.NODE_ENV === 'production' ? '/tesis' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/tesis' : '',
    
    // Para manejar trailing slashes
    trailingSlash: true,
    
    // Configuración de imágenes
    images: {
      unoptimized: true, // Si tienes problemas con optimización de imágenes
    },
    
    // Para APIs
    async rewrites() {
      return process.env.NODE_ENV === 'production' ? [
        {
          source: '/tesis/api/:path*',
          destination: '/api/:path*',
        },
      ] : [];
    },
  }
  
  export default nextConfig;