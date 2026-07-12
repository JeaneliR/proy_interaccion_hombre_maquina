# Mi App Accesible - Expo React Native

Proyecto creado desde cero para cumplir con la consigna: **generar un APK con Expo de una aplicación implementada en React Native**.

## 1. Tecnología usada

- Expo SDK 57
- React Native 0.86
- React 19.2.3
- EAS Build para generar APK
- `expo-speech` para texto a voz
- `expo-document-picker` para seleccionar archivos
- `expo-file-system` para leer archivos TXT
- `expo-clipboard` para copiar texto

## 2. Qué implementa la app

La aplicación permite:

1. Escribir o pegar texto.
2. Cargar un archivo TXT.
3. Ver el texto cargado.
4. Reproducir el texto en voz alta.
5. Copiar el texto al portapapeles.
6. Cambiar contraste, tamaño de letra y modo simple.
7. Presentar una pantalla técnica con principios SOLID aplicados.

> En esta versión base se deja PDF, DOCX, OCR y reconocimiento de voz como mejoras futuras. Esto evita depender de librerías nativas adicionales y permite generar el APK de forma más limpia con Expo.

## 3. Instalación desde cero

En una carpeta nueva:

```bash
npm install
```

Luego ejecuta la app en modo desarrollo:

```bash
npx expo start
```

Escanea el QR con Expo Go o presiona `a` para abrir Android si tienes emulador.

## 4. Generar APK con Expo EAS

Instala EAS CLI:

```bash
npm install --global eas-cli
```

Inicia sesión:

```bash
eas login
```

Verifica la configuración:

```bash
eas build:configure
```

Genera el APK:

```bash
eas build -p android --profile preview
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

## 5. Alternativa local

Si tienes Android Studio, Java, SDK de Android y Gradle configurados, puedes intentar:

```bash
eas build -p android --profile preview --local
```

Aun usando `--local`, EAS necesita autenticación de Expo.

## 6. Commits incluidos

El proyecto se preparó con Git y commits claros:

1. `chore: create expo react native project from scratch`
2. `feat: implement accessible native screens and services`
3. `docs: add apk build guide and architecture notes`
4. `feat: connect root app navigation`

## 7. Sustento breve para exposición

Este proyecto cumple la consigna porque no usa React web ni Capacitor. Está implementado con componentes nativos de React Native (`View`, `Text`, `Pressable`, `TextInput`, `ScrollView`) y se empaqueta con Expo/EAS en formato APK para Android.
