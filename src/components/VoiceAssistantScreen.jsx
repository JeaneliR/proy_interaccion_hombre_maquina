import { useState } from 'react';
import { Text, View } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent
} from 'expo-speech-recognition';
import Header from './Header';
import PrimaryButton from './PrimaryButton';

export default function VoiceAssistantScreen({ styles, actions }) {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Presiona iniciar y di un comando.');
  const [error, setError] = useState('');

  useSpeechRecognitionEvent('start', () => {
    setRecognizing(true);
    setStatus('Escuchando... habla ahora.');
  });

  useSpeechRecognitionEvent('end', () => {
    setRecognizing(false);
    setStatus('Reconocimiento finalizado.');
  });

  useSpeechRecognitionEvent('result', (event) => {
    const text = event.results?.[0]?.transcript || '';
    setTranscript(text);

    if (text.trim()) {
      const executed = actions.executeVoiceCommand(text);
      setStatus(executed ? `Comando reconocido: ${text}` : `Texto reconocido: ${text}`);
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    const message = event?.message || event?.error || 'No se pudo usar el reconocimiento de voz.';
    setRecognizing(false);
    setError(message);
    setStatus('Ocurrió un problema con el micrófono o el reconocimiento de voz.');
    actions.vibrate('error');
  });

  const startListening = async () => {
    setError('');
    setTranscript('');
    actions.vibrate();

    try {
      const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
      if (!available) {
        setError('El reconocimiento de voz no está disponible en este dispositivo. Verifica que Google, Android System Intelligence o Speech Recognition esté habilitado.');
        return;
      }

      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setError('No se otorgó permiso para usar el micrófono o el reconocimiento de voz.');
        return;
      }

      ExpoSpeechRecognitionModule.start({
        lang: 'es-PE',
        interimResults: false,
        continuous: false
      });
    } catch (err) {
      const message = err?.message || 'No se pudo iniciar el asistente de voz.';
      setError(message);
      actions.vibrate('error');
    }
  };

  const stopListening = async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();
      setRecognizing(false);
      actions.vibrate();
    } catch {
      setRecognizing(false);
    }
  };

  return (
    <View>
      <Header
        title="Asistencia de voz"
        subtitle="Usa el micrófono para controlar funciones básicas de la aplicación."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Comandos disponibles</Text>
        <Text style={styles.text}>Di: inicio, escribir, documento, imagen, escuchar, detener, configuración, modo simple, aumentar letra o contraste.</Text>
      </View>

      {recognizing ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Micrófono activo</Text>
        </View>
      ) : null}

      <PrimaryButton
        styles={styles}
        label={recognizing ? 'Escuchando...' : '🎙️ Iniciar micrófono'}
        disabled={recognizing}
        onPress={startListening}
      />
      <PrimaryButton
        styles={styles}
        label="⏹ Detener micrófono"
        disabled={!recognizing}
        onPress={stopListening}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resultado</Text>
        <Text style={styles.text}>{transcript || 'Aún no hay transcripción de voz.'}</Text>
      </View>

      {status ? <Text style={styles.status}>{status}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton styles={styles} label="⬅ Volver" secondary onPress={() => actions.goHome()} />
    </View>
  );
}
