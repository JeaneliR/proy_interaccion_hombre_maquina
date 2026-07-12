import * as Speech from 'expo-speech';

export class ExpoSpeechService {
  speak(text, options = {}) {
    const message = String(text || '').trim();

    if (!message) {
      return Promise.resolve(false);
    }

    return new Promise((resolve, reject) => {
      Speech.stop();
      Speech.speak(message, {
        language: options.language || 'es-PE',
        rate: options.rate || 0.92,
        pitch: options.pitch || 1,
        onDone: () => resolve(true),
        onStopped: () => resolve(false),
        onError: reject
      });
    });
  }

  stop() {
    Speech.stop();
  }
}
