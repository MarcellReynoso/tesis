#!/bin/bash

echo "🔍 Verificando estado del despliegue..."

# Verificar si el directorio del proyecto existe
if [ ! -d "$MARCELL_PATH" ]; then
    echo "❌ Error: El directorio del proyecto no existe: $MARCELL_PATH"
    exit 1
fi

cd "$MARCELL_PATH"

echo "📋 Estado del repositorio:"
git status
echo ""

echo "📋 Últimos commits:"
git log --oneline -5
echo ""

echo "📦 Verificando dependencias:"
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules no existe"
else
    echo "✅ node_modules existe"
fi

echo "🔨 Verificando build:"
if [ ! -d ".next" ]; then
    echo "❌ .next no existe - necesitas hacer build"
else
    echo "✅ .next existe"
    echo "📊 Tamaño del build: $(du -sh .next)"
fi

echo "🔄 Verificando PM2:"
if command -v pm2 &> /dev/null; then
    echo "✅ PM2 está instalado"
    pm2 list
else
    echo "❌ PM2 no está instalado"
fi

echo "🌐 Verificando puerto 3005:"
if netstat -tlnp | grep :3005; then
    echo "✅ Puerto 3005 está en uso"
else
    echo "❌ Puerto 3005 no está en uso"
fi

echo "🔧 Verificando nginx:"
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx está corriendo"
else
    echo "❌ Nginx no está corriendo"
fi

echo "📄 Verificando logs de PM2:"
if pm2 list | grep -q "tesis"; then
    echo "📋 Últimas líneas de log:"
    pm2 logs tesis --lines 10
else
    echo "❌ No hay proceso 'tesis' en PM2"
fi

echo "🌍 Verificando conectividad:"
curl -I http://localhost:3005/marcell 2>/dev/null | head -1 || echo "❌ No se puede conectar a localhost:3005"

echo "✅ Verificación completada" 