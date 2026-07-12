import * as Clipboard from 'expo-clipboard';

export class ExpoClipboardService {
  async copy(text) {
    const value = String(text || '').trim();

    if (!value) {
      throw new Error('No hay texto para copiar.');
    }

    await Clipboard.setStringAsync(value);
    return true;
  }
}
