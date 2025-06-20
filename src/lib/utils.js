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