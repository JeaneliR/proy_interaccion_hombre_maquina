import { ExpoSpeechService } from './speech/ExpoSpeechService';
import { ExpoClipboardService } from './clipboard/ExpoClipboardService';
import { VibrationService } from './device/VibrationService';
import { FileTextExtractorFactory } from './files/FileTextExtractorFactory';

export const appServices = {
  speech: new ExpoSpeechService(),
  clipboard: new ExpoClipboardService(),
  vibration: new VibrationService(),
  files: new FileTextExtractorFactory()
};
