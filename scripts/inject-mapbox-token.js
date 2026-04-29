const fs = require('fs');
const path = require('path');

// Leer .env
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

// Extraer MAPBOX_TOKEN
const match = envContent.match(/^MAPBOX_TOKEN=(.*)$/m);
if (!match) {
  console.error('❌ MAPBOX_TOKEN no encontrado en .env');
  process.exit(1);
}

const token = match[1].trim();
console.log('✅ Token encontrado en .env');

// Actualizar environment.ts
const envDevPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
let envDevContent = fs.readFileSync(envDevPath, 'utf-8');
envDevContent = envDevContent.replace(/mapbox:\s*['"]([^'"]*)['"]/, `mapbox: '${token}'`);
fs.writeFileSync(envDevPath, envDevContent);
console.log('✅ environment.ts actualizado');

// Actualizar environment.prod.ts
const envProdPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');
let envProdContent = fs.readFileSync(envProdPath, 'utf-8');
envProdContent = envProdContent.replace(/mapbox:\s*['"]([^'"]*)['"]/, `mapbox: '${token}'`);
fs.writeFileSync(envProdPath, envProdContent);
console.log('✅ environment.prod.ts actualizado');

console.log('🎉 Mapbox token inyectado correctamente');
