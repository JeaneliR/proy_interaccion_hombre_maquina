# Pasos exactos para generar el APK

## 1. Instalar dependencias

```bash
cd proy_interaccion
npm install
```

## 2. Validar el bundle de Android

```bash
npx expo export --platform android
```

Debe terminar con un mensaje parecido a:

```text
Android Bundled ...
Exported: dist
```

## 3. Iniciar sesión en Expo

```bash
npm install --global eas-cli
eas login
eas whoami
```

## 4. Generar APK

```bash
eas build -p android --profile preview --clear-cache
```

Cuando pregunte por credenciales Android, acepta que Expo genere una nueva keystore.

## 5. Verificar que se generará APK y no AAB

Abre `eas.json` y confirma que exista:

```json
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

Usa siempre:

```bash
eas build -p android --profile preview --clear-cache
```

Si usas `production`, normalmente se genera AAB para Play Store.

## 6. Después de instalar el APK

Prueba en Android real:

1. Cargar documento TXT/CSV/MD.
2. Escuchar el documento.
3. Tomar foto y extraer texto.
4. Elegir imagen desde galería y extraer texto.
5. Usar comandos de voz.
6. Aumentar letra desde configuración.
7. Activar modo simplificado desde Home.
