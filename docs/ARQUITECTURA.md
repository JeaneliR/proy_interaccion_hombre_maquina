# Arquitectura y principios SOLID

## Estructura

```text
src/
├── components/
├── constants/
├── services/
│   ├── clipboard/
│   ├── device/
│   ├── files/
│   ├── images/
│   ├── speech/
│   └── voice/
└── theme/
```

## Principio de Responsabilidad Única

Cada pantalla se encarga de un flujo visual específico:

- `UploadScreen`: selección y procesamiento de documentos.
- `ImageReaderScreen`: cámara, galería y OCR.
- `VoiceAssistantScreen`: micrófono y comandos de voz.
- `PlayerScreen`: reproducción del texto.
- `SettingsScreen`: configuración visual.

La lógica de archivos, OCR, voz, comandos, portapapeles y vibración está delegada a servicios independientes.

## Principio Abierto/Cerrado

`FileTextExtractorFactory` permite agregar nuevos extractores, por ejemplo PDF o DOCX, sin modificar la pantalla de carga. Para OCR y comandos de voz también se separaron servicios, de modo que se pueden reemplazar sin rehacer las pantallas.

## Sustitución de Liskov

Cualquier extractor que implemente `supports(asset)` y `extract(asset)` puede reemplazar al extractor TXT sin romper el flujo. Lo mismo aplica para servicios que respeten los métodos esperados por `AppServices`.

## Segregación de Interfaces

Los servicios son pequeños y específicos:

- `ExpoSpeechService`: texto a voz.
- `ExpoClipboardService`: copiar texto.
- `VibrationService`: retroalimentación háptica.
- `FileTextExtractorFactory`: selección de extractor.
- `ImageTextExtractorService`: OCR.
- `VoiceCommandService`: interpretación de comandos.

Ninguna pantalla depende de un servicio grande con métodos que no utiliza.

## Inversión de Dependencia

`App.js` depende del objeto `services`, no de APIs nativas directamente. Esto permite reemplazar implementaciones reales por mocks o futuras versiones sin cambiar la lógica principal de navegación.

## Patrones usados

- **Factory:** `FileTextExtractorFactory` selecciona el extractor adecuado.
- **Strategy:** cada extractor define una estrategia distinta de lectura.
- **Adapter:** los servicios envuelven APIs de Expo y React Native.
- **Facade:** `AppServices` centraliza las dependencias usadas por la app.
- **Command:** `VoiceCommandService` transforma frases del usuario en acciones internas.
