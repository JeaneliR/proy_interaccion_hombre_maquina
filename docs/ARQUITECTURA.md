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
│   └── speech/
└── theme/
```

## Principio de Responsabilidad Única

Cada pantalla solo se encarga de su vista y flujo inmediato. La lectura de archivos, la voz, el portapapeles y la vibración se delegan a servicios independientes.

## Principio Abierto/Cerrado

`FileTextExtractorFactory` permite agregar nuevos extractores, por ejemplo PDF o DOCX, sin modificar la pantalla `UploadScreen`.

## Sustitución de Liskov

Cualquier extractor que implemente `supports(asset)` y `extract(asset)` puede reemplazar a otro sin romper el flujo de carga de archivos.

## Segregación de Interfaces

Los servicios están separados por responsabilidad: voz, archivos, vibración y portapapeles. Ninguna pantalla depende de un servicio grande con métodos que no usa.

## Inversión de Dependencia

`App.js` usa el objeto `services` para conectar la aplicación con sus dependencias. Esto permite reemplazar implementaciones reales por mocks o futuras versiones sin cambiar la lógica principal.

## Patrones usados

- **Factory:** `FileTextExtractorFactory` selecciona el extractor adecuado.
- **Strategy:** cada extractor define una estrategia distinta de lectura.
- **Adapter:** los servicios envuelven APIs de Expo y React Native.
- **Facade:** `AppServices` centraliza las dependencias usadas por la app.
