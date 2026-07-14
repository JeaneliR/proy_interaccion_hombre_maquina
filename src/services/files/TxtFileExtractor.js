import * as FileSystem from 'expo-file-system/legacy';

const SUPPORTED_EXTENSIONS = ['.txt', '.md', '.csv'];
const SUPPORTED_MIMES = ['text/plain', 'text/markdown', 'text/csv', 'application/csv'];

export class TxtFileExtractor {
  supports(asset) {
    const name = asset?.name?.toLowerCase() || '';
    const mime = asset?.mimeType?.toLowerCase() || '';
    return SUPPORTED_MIMES.some((type) => mime.includes(type)) || SUPPORTED_EXTENSIONS.some((extension) => name.endsWith(extension));
  }

  async extract(asset) {
    if (!asset?.uri) {
      throw new Error('No se recibió la ruta del archivo seleccionado.');
    }

    const info = await FileSystem.getInfoAsync(asset.uri);

    if (!info.exists) {
      throw new Error('El archivo no está disponible. Selecciónalo nuevamente.');
    }

    const content = await FileSystem.readAsStringAsync(asset.uri, {
      encoding: FileSystem.EncodingType.UTF8
    });

    if (!content.trim()) {
      throw new Error('El archivo está vacío o no contiene texto legible.');
    }

    return content;
  }
}
