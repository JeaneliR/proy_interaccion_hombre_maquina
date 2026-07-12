import { Vibration } from 'react-native';

const PATTERNS = {
  normal: 40,
  success: [0, 50, 80, 50],
  error: [0, 120, 80, 120]
};

export class VibrationService {
  vibrate(type = 'normal') {
    Vibration.vibrate(PATTERNS[type] || PATTERNS.normal);
  }
}
