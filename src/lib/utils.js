/**
 * Función para manejar rutas de imágenes que funcionen correctamente
 * con el basePath en producción
 */
export function getImagePath(imagePath) {
  // Si la imagen ya tiene una ruta completa, la devolvemos tal como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // En producción, Next.js automáticamente agrega el basePath a las rutas
  // que comienzan con /, así que simplemente devolvemos la ruta
  return imagePath;
}

/**
 * Función para obtener la URL base de la aplicación
 */
export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // En el cliente
    return window.location.origin;
  }
  
  // En el servidor, usar una variable de entorno o valor por defecto
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://tutupaca.unjbg.edu.pe';
}

/**
 * Función para construir rutas absolutas de imágenes
 */
export function getAbsoluteImagePath(imagePath) {
  const baseUrl = getBaseUrl();
  const basePath = process.env.NODE_ENV === 'production' ? '/marcell' : '';
  return `${baseUrl}${basePath}${imagePath}`;
}

/**
 * Función para obtener la ruta correcta de las APIs según el entorno
 */
export function getApiPath(apiPath) {
  // Si ya es una URL completa, la devolvemos tal como está
  if (apiPath.startsWith('http://') || apiPath.startsWith('https://')) {
    return apiPath;
  }
  
  // En producción, agregar el basePath
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction ? `/marcell${apiPath}` : apiPath;
} 