import Image from "next/image";

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority = false,
  ...props 
}) {
  // Función para obtener la ruta correcta según el entorno
  const getImagePath = (imageSrc) => {
    // Si ya es una URL completa, la devolvemos tal como está
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }
    
    // En producción, agregar el basePath
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? `/marcell${imageSrc}` : imageSrc;
  };

  return (
    <img
      src={getImagePath(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
} 