export const environment = {
  production: true,
  mapbox: process.env['MAPBOX_TOKEN'] || '' // Se inyecta automáticamente desde .env
};
