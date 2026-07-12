import { TxtFileExtractor } from './TxtFileExtractor';
import { UnsupportedFileExtractor } from './UnsupportedFileExtractor';

export class FileTextExtractorFactory {
  constructor(extractors = [new TxtFileExtractor(), new UnsupportedFileExtractor()]) {
    this.extractors = extractors;
  }

  getExtractor(asset) {
    return this.extractors.find((extractor) => extractor.supports(asset));
  }

  async extract(asset) {
    const extractor = this.getExtractor(asset);
    return extractor.extract(asset);
  }
}
