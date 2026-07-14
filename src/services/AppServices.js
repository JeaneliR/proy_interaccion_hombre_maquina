import { ExpoSpeechService } from './speech/ExpoSpeechService';
import { ExpoClipboardService } from './clipboard/ExpoClipboardService';
import { VibrationService } from './device/VibrationService';
import { FileTextExtractorFactory } from './files/FileTextExtractorFactory';
import { ImageTextExtractorService } from './images/ImageTextExtractorService';
import { VoiceCommandService } from './voice/VoiceCommandService';

export const appServices = {
  speech: new ExpoSpeechService(),
  clipboard: new ExpoClipboardService(),
  vibration: new VibrationService(),
  files: new FileTextExtractorFactory(),
  imageText: new ImageTextExtractorService(),
  voiceCommands: new VoiceCommandService()
};
