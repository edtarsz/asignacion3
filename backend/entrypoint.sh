#!/bin/sh
# entrypoint.sh

# Aplica cualquier migración pendiente de la base de datos
echo "Aplicando migraciones de la base de datos..."
npx prisma migrate deploy

echo "Iniciando el servidor..."
npm run dev