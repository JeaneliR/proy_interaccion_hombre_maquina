import { extractTextFromImage, isSupported } from 'expo-text-extractor';

export class ImageTextExtractorService {
  isAvailable() {
    return Boolean(isSupported);
  }

  async extract(uri) {
    if (!uri) {
      throw new Error('Primero selecciona o toma una imagen.');
    }

    if (!this.isAvailable()) {
      throw new Error('Este dispositivo no soporta extracción de texto desde imagen.');
    }

    const result = await extractTextFromImage(uri);
    const text = Array.isArray(result) ? result.join('\n') : String(result || '');

    if (!text.trim()) {
      throw new Error('No se detectó texto en la imagen. Intenta con una foto más clara, enfocada y con buena iluminación.');
    }

    return text.trim();
  }
}
