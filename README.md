# Mi App Accesible - Expo React Native

Proyecto creado para cumplir la consigna: **generar un APK con Expo de una aplicación implementada en React Native**.

## 1. Tecnología usada

- Expo SDK 57
- React Native 0.86
- React 19.2.3
- EAS Build para generar APK
- `expo-speech` para texto a voz
- `expo-speech-recognition` para comandos por micrófono
- `expo-document-picker` para seleccionar documentos
- `expo-file-system` para leer archivos TXT, CSV y MD
- `expo-image-picker` para tomar foto o elegir imagen
- `expo-text-extractor` para OCR desde imagen
- `expo-clipboard` para copiar texto

## 2. Qué implementa la app

La aplicación permite:

1. Escribir o pegar texto.
2. Cargar documentos TXT, CSV o MD y reproducirlos en voz alta.
3. Leer imágenes con cámara o galería y extraer texto con OCR.
4. Usar asistencia de voz mediante comandos básicos.
5. Reproducir, detener y copiar el texto procesado.
6. Cambiar contraste, tamaño de letra y modo simplificado.
7. Presentar una pantalla técnica con principios SOLID aplicados.

## 3. Comandos de voz disponibles

En el módulo **Asistencia de voz**, puedes decir:

- `inicio`
- `escribir`
- `documento`
- `imagen`
- `escuchar`
- `detener`
- `configuración`
- `modo simple`
- `aumentar letra`
- `contraste`

## 4. Instalación

```bash
npm install
```

Luego ejecuta la app en modo desarrollo:

```bash
npx expo start
```

> Si Expo Go indica incompatibilidad con el SDK, continúa con EAS Build y prueba el APK instalado en Android.

## 5. Validar bundle Android antes del APK

```bash
npx expo export --platform android
```

Si este comando termina con `Exported: dist`, el empaquetado JavaScript está correcto.

## 6. Generar APK con Expo EAS

Instala EAS CLI:

```bash
npm install --global eas-cli
```

Inicia sesión:

```bash
eas login
```

Genera el APK:

```bash
eas build -p android --profile preview --clear-cache
```

El perfil `preview` está configurado en `eas.json` con:

```json
{
  "android": {
    "buildType": "apk"
  }
}
```

Cuando EAS termine, mostrará un enlace para descargar el archivo `.apk`.

## 7. Observaciones de prueba en Android

- El reconocimiento de voz depende del servicio de voz disponible en el dispositivo Android.
- Para OCR, usa imágenes claras, enfocadas y con buena iluminación.
- PDF y DOCX quedan fuera de esta versión porque requieren extractores adicionales específicos.

## 8. Commits incluidos

El proyecto se preparó con Git y commits claros. Los últimos commits relevantes son:

```text
3dcf4f6 feat: complete native APK interaction modules
d8b5769 fix: add expo babel preset dependency
3809d2a docs: update commit list
a613ad9 feat: connect root app navigation
a9b8d42 docs: add apk build guide and architecture notes
dac59f2 feat: implement accessible native screens and services
2b6308d chore: create expo react native project from scratch
```

## 9. Sustento breve para exposición

Este proyecto cumple la consigna porque no usa React web ni Capacitor. Está implementado con componentes nativos de React Native (`View`, `Text`, `Pressable`, `TextInput`, `Image`, `ScrollView`) y se empaqueta con Expo/EAS en formato APK para Android.
