export class UnsupportedFileExtractor {
  supports() {
    return true;
  }

  async extract(asset) {
    const name = asset?.name || 'archivo seleccionado';
    throw new Error(`El archivo "${name}" aún no es compatible. Usa TXT para esta versión del APK.`);
  }
}
