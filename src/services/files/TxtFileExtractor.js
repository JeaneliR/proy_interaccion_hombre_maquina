import { File } from 'expo-file-system';

export class TxtFileExtractor {
  supports(asset) {
    const name = asset?.name?.toLowerCase() || '';
    const mime = asset?.mimeType?.toLowerCase() || '';
    return mime.includes('text/plain') || name.endsWith('.txt');
  }

  async extract(asset) {
    const file = new File(asset.uri);
    const content = await file.text();

    if (!content.trim()) {
      throw new Error('El archivo TXT está vacío.');
    }

    return content;
  }
}
