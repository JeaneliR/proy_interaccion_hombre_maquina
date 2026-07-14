import { useState } from 'react';
import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function TranscriptionScreen({ texto, styles, actions, services }) {
  const [message, setMessage] = useState('');
  const hasText = Boolean(texto.trim());

  const copy = async () => {
    try {
      await services.clipboard.copy(texto);
      setMessage('Texto copiado al portapapeles.');
      actions.vibrate('success');
      actions.announce('Texto copiado correctamente');
    } catch (err) {
      const errorMessage = err?.message || 'No se pudo copiar el texto.';
      setMessage(errorMessage);
      actions.vibrate('error');
      actions.announce(errorMessage);
    }
  };

  return (
    <View>
      <Header
        title="Texto disponible"
        subtitle="Desde aquí puedes copiar el texto o enviarlo al reproductor."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.text}>{hasText ? texto : 'Aún no hay texto cargado.'}</Text>
      </View>

      <PrimaryButton styles={styles} label="🔊 Escuchar" disabled={!hasText} onPress={actions.play} />
      <PrimaryButton styles={styles} label="📋 Copiar" disabled={!hasText} onPress={copy} />
      {message ? <Text style={styles.status}>{message}</Text> : null}
      <PrimaryButton
        styles={styles}
        label="⬅ Volver"
        secondary
        onPress={() => actions.goHome()}
      />
    </View>
  );
}
