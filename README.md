# QR Scanner - Ionic 6 App

Una aplicación móvil multiplataforma construida con **Ionic 6** y **Angular 20** que permite escanear, gestionar y compartir códigos QR desde dispositivos iOS y Android.

## 📱 Características Principales

- **Escaneo de Códigos QR**: Utiliza la cámara del dispositivo en tiempo real con la librería `jsQR`
- **Almacenamiento Local**: Guarda los registros escaneados en la base de datos local del dispositivo
- **Soporte Múltiple de Formatos**: Detecta y procesa automáticamente diferentes tipos de códigos:
  - URLs (abre en navegador integrado)
  - Coordenadas geográficas (visualiza en mapa interactivo)
  - Correos electrónicos
  - Texto plano
- **Visualización en Mapa**: Muestra ubicaciones geográficas en un mapa interactivo (MapBox)
- **Compartir por Email**: Exporta todos los registros escaneados en formato CSV
- **Interfaz Intuitiva**: Navegación por tabs para fácil acceso a funcionalidades

## 🛠️ Tecnologías Implementadas

### Frontend
- **Ionic 8.0.0** - Framework mobile multiplataforma
- **Angular 20.0.0** - Framework frontend
- **TypeScript 5.9.0** - Lenguaje de tipado
- **SCSS** - Preprocesador CSS

### Librerías Principales
- **@ionic/storage-angular** - Almacenamiento local persistente
- **jsqr** - Decodificación de códigos QR en tiempo real
- **swiper** - Carrusel de imágenes (v12.1.3)
- **@awesome-cordova-plugins/in-app-browser** - Navegador integrado
- **@awesome-cordova-plugins/core** - Plugins Cordova

### Plugins Nativos
- **@ionic-native/file** - Acceso al sistema de archivos
- **@ionic-native/email-composer** - Composición de emails
- **cordova-plugin-inappbrowser** - Navegador en aplicación
- **cordova-plugin-file** - Plugin de archivos Cordova

### Capacitor & Build
- **@capacitor/core** (8.3.1) - Runtime multiplataforma
- **@capacitor/android** - Soporte para Android
- **@angular-devkit/build-angular** - Herramienta de build

### Desarrollo
- **@angular/cli** - CLI de Angular
- **ESLint 9.16.0** - Linting
- **Karma** - Test runner
- **Jasmine** - Framework de testing

## 📋 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Android Studio** (para compilar para Android)
- **Git** (para control de versiones)

## 🚀 Instalación y Setup

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd 06-ionic-scanner-qr
```

### 2. Instalar Dependencias
```bash
npm install --legacy-peer-deps
```

**Nota**: Se utiliza `--legacy-peer-deps` para resolver conflictos de dependencias entre Capacitor 8.x y paquetes que requieren Capacitor 5.x.

### 3. Instalar Plugins Nativos

#### Barcode Scanner (opcional - para escaneo nativo)
```bash
npm install @awesome-cordova-plugins/core --legacy-peer-deps
ionic cordova plugin add phonegap-plugin-barcodescanner
```

#### Navegador Integrado
```bash
npm install @awesome-cordova-plugins/in-app-browser --legacy-peer-deps
ionic cordova plugin add cordova-plugin-inappbrowser
```

#### Acceso a Archivos
```bash
npm install @ionic-native/file --legacy-peer-deps
npm install cordova-plugin-file --legacy-peer-deps
```

#### Composición de Emails
```bash
npm install @ionic-native/email-composer --legacy-peer-deps
npm install cordova-plugin-email-composer --legacy-peer-deps
```

### 4. Sincronizar con Capacitor
```bash
ionic capacitor sync
```

### 5. Agregar Plataforma Android
```bash
ionic capacitor add android
```

## 🔧 Comandos Disponibles

### Desarrollo
```bash
# Inicia el servidor de desarrollo
npm start
# o
ng serve

# Construye la aplicación (desarrollo)
npm run build
# o
ng build

# Watch mode - reconstruye automáticamente
npm run watch
```

### Producción
```bash
# Build de producción
ionic build --prod
```

### Testing
```bash
# Ejecuta tests unitarios
npm test

# Linting
npm run lint
```

### Build para Android
```bash
# Copia los archivos web a Android
ionic capacitor copy android

# Sincroniza dependencias con Android
ionic capacitor sync

# Build de producción para Android
ionic capacitor build android

# Ejecuta en emulador/dispositivo
ionic capacitor run android

# o con Capacitor CLI
npx cap run android
```

### Live Reload (Desarrollo)
```bash
ionic cordova run android -l
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── pages/
│   │   ├── tab1/              # Página de escaneo QR
│   │   ├── tab2/              # Página de registros y lista
│   │   ├── map/               # Página de visualización de mapa
│   │   └── tabs/              # Contenedor de tabs
│   ├── services/
│   │   └── data-local-service.ts    # Servicio de gestión de datos
│   ├── models/
│   │   └── registry.model.ts        # Modelo de registro
│   ├── components/
│   │   └── header/            # Componente header reutilizable
│   ├── app.module.ts          # Módulo principal
│   └── app-routing.module.ts  # Configuración de rutas
├── assets/                    # Recursos estáticos
├── environments/              # Configuración por entorno
└── theme/                     # Temas y variables SCSS
```

## 🎯 Funcionalidades por Página

### Tab 1 - Escáner QR
- Acceso a cámara en tiempo real
- Detección automática de códigos QR
- Visualización de resultado escaneado
- Almacenamiento automático del registro
- Redirección según tipo de código

### Tab 2 - Registros
- Lista de todos los códigos QR escaneados
- Visualización de información del registro (tipo, formato, fecha)
- Eliminación de registros
- Exportación de registros por email (CSV)
- Acceso rápido a URLs, mapas o emails

### Mapa
- Visualización de ubicaciones geográficas
- Integración con MapBox
- Botón de retroceso para volver a registros

## 🔐 Configuración Importante

### Token de MapBox
El proyecto incluye un script de inyección de token MapBox:
```bash
node scripts/inject-mapbox-token.js
```

Asegúrate de configurar tu token de MapBox en las variables de entorno.

### Almacenamiento Local
Los registros se almacenan utilizando **@ionic/storage**, que utiliza diferentes backends según la plataforma:
- Web: localStorage
- iOS: UserDefaults
- Android: SharedPreferences

## 📦 Resolución de Dependencias

El proyecto utiliza `--legacy-peer-deps` debido a conflictos de versiones entre:
- `@capacitor/core@8.3.1` (instalado)
- `@capacitor-community/barcode-scanner@4.0.1` (requiere `@capacitor/core@^5.0.0`)

Esto no afecta la funcionalidad de la aplicación, pero asegúrate de probar completamente antes de actualizar dependencias.

## 🐛 Troubleshooting

### Error: "Can't resolve '@ionic-native/core'"
```bash
npm install @ionic-native/core --legacy-peer-deps
npm install --legacy-peer-deps
```

### Problemas de construcción Android
```bash
# Limpiar caché
cd android && ./gradlew clean
cd ..

# Reconstruir
ionic capacitor build android
```

### Cámara no funciona en dispositivo
- Asegúrate de que la aplicación tiene permisos de cámara
- En Android: verifica en Configuración > Permisos > Cámara
- En iOS: verifica en Info.plist los permisos requeridos

## 📱 Pruebas en Dispositivo

### Android
```bash
# Conectar dispositivo USB con debugging habilitado
adb devices

# Ejecutar aplicación
ionic capacitor run android
```

### iOS
```bash
# Abrir Xcode
ionic capacitor open ios

# Seleccionar dispositivo y hacer build desde Xcode
```

## 📄 Modelos de Datos

### Registry Model
```typescript
class Registry {
  type: string;           // 'url', 'geo', 'email', 'text'
  format: string;         // Formato del código (QR, Barcode, etc)
  text: string;          // Contenido del código
  created: string;       // Fecha de creación
}
```

## 🎨 Personalización

### Temas y Colores
Edita `src/theme/variables.scss` para personalizar colores y variables CSS.

### Estilos Globales
Los estilos globales se encuentran en `src/global.scss`.

## 📝 Notas de Desarrollo

- La aplicación utiliza **standalone: false** en los componentes, usando módulos tradicionales
- El escaneo QR utiliza `jsQR` (librería JavaScript pura) en lugar de plugins nativos
- Los registros se almacenan en memoria y en el almacenamiento local
- Las rutas están configuradas en `app-routing.module.ts`

## 🔄 Flujo de Actualización

1. Hacer cambios en el código
2. Ejecutar `ionic build --prod` para verificar
3. Ejecutar `ionic capacitor copy android`
4. Reconstruir APK o hacer deploy

## 📞 Soporte y Documentación

- [Documentación Ionic](https://ionicframework.com/docs)
- [Documentación Angular](https://angular.io/docs)
- [Capacitor Docs](https://capacitorjs.com/)
- [GitHub Issues](https://github.com/DsiKorp/06-ionic-scanner-qr/issues)

## 📄 Licencia

Este proyecto es educativo y forma parte del curso "Ionic 6: Crear aplicaciones iOS, Android con Angular".

## 👨‍💻 Autor

**DsiKorp**

---

**Última actualización**: Mayo 2026
**Versión**: 1.0.0
