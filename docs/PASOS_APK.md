# Pasos exactos para generar el APK

## Opción recomendada: EAS Build en la nube

```bash
cd mi-app-expo-rn
npm install
npm install --global eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Cuando pregunte por credenciales Android, acepta que Expo genere una nueva keystore.

## Verificar que se generará APK y no AAB

Abre `eas.json` y confirma que exista:

```json
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

Luego usa siempre:

```bash
eas build -p android --profile preview
```

Si usas `production`, normalmente se genera AAB para Play Store.
