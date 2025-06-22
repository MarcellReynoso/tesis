# Guía de Despliegue - Marcell Tesis

## Configuración del Servidor

### Requisitos
- CentOS Stream 9
- Node.js 18+ 
- PM2
- Nginx
- Git

### Variables de Entorno Necesarias

Asegúrate de tener configuradas las siguientes variables de entorno en el servidor:

```bash
# Base de datos
DB_HOST=tu_host_db
DB_PORT=3306
DB_USER=tu_usuario_db
DB_NAME=tu_base_datos
DB_PASSWORD=tu_password_db

# URL base para APIs
URL=https://tutupaca.unjbg.edu.pe

# Configuración de Next.js
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://tutupaca.unjbg.edu.pe
```

## Configuración de Nginx

Asegúrate de que tu configuración de nginx incluya:

```nginx
location /marcell {
    proxy_pass http://localhost:3005;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Headers para evitar caché
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
}
```

## Troubleshooting

### 1. No se ven los cambios después del despliegue

**Posibles causas:**
- Caché del navegador
- Caché de nginx
- Build no se completó correctamente
- PM2 no se reinició correctamente

**Soluciones:**

```bash
# En el servidor, verificar el estado:
cd /ruta/a/tu/proyecto
pm2 list
pm2 logs tesis --lines 50

# Verificar si el build existe:
ls -la .next/

# Reiniciar manualmente:
pm2 restart tesis

# Limpiar caché de nginx:
sudo systemctl reload nginx
```

### 2. Error de conexión a la base de datos

**Verificar:**
```bash
# Verificar variables de entorno:
echo $DB_HOST
echo $DB_USER
echo $DB_NAME

# Verificar conectividad:
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -e "SELECT 1;"
```

### 3. Puerto 3005 no está disponible

**Verificar:**
```bash
# Verificar qué está usando el puerto:
netstat -tlnp | grep :3005

# Verificar estado de PM2:
pm2 list
pm2 status
```

### 4. Problemas con el basePath

**Verificar configuración:**
- Asegúrate de que `next.config.mjs` tenga `basePath: '/marcell'` en producción
- Verifica que las rutas en el código usen las funciones de `utils.js`

### 5. Logs de errores

**Verificar logs:**
```bash
# Logs de PM2:
pm2 logs tesis --lines 100

# Logs de nginx:
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Logs del sistema:
sudo journalctl -u nginx -f
```

## Comandos Útiles

### Reinicio manual completo:
```bash
cd /ruta/a/tu/proyecto
git pull origin master
npm install
NODE_ENV=production npm run build
pm2 delete tesis
pm2 start ecosystem.config.js
pm2 save
sudo systemctl reload nginx
```

### Verificar estado del servidor:
```bash
# Estado de servicios:
systemctl status nginx
systemctl status pm2-root

# Estado de la aplicación:
pm2 list
pm2 logs tesis --lines 20

# Verificar conectividad:
curl -I http://localhost:3005/marcell
```

### Limpiar caché:
```bash
# Limpiar caché de npm:
npm cache clean --force

# Limpiar build:
rm -rf .next

# Limpiar node_modules:
rm -rf node_modules package-lock.json
npm install
```

## Monitoreo

### Verificar que la aplicación esté funcionando:
```bash
# Verificar respuesta HTTP:
curl -I https://tutupaca.unjbg.edu.pe/marcell

# Verificar logs en tiempo real:
pm2 logs tesis -f

# Verificar uso de recursos:
pm2 monit
```

## Contacto

Si tienes problemas con el despliegue, verifica:
1. Los logs de PM2
2. Los logs de nginx
3. La configuración de variables de entorno
4. La conectividad a la base de datos 