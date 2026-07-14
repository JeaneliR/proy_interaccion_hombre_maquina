export class UnsupportedFileExtractor {
  supports() {
    return true;
  }

  async extract(asset) {
    const name = asset?.name || 'archivo seleccionado';
    throw new Error(`El archivo "${name}" no se puede procesar en esta versión. Usa TXT, CSV o MD. Para PDF/DOCX se requiere un extractor adicional.`);
  }
}
