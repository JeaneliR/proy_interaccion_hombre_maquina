import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function PlayerScreen({ texto, reproduciendo, styles, actions }) {
  const hasText = Boolean(texto.trim());

  return (
    <View>
      <Header
        title="Reproductor"
        subtitle="Escucha en voz alta el contenido cargado o escrito."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.text}>{hasText ? texto : 'No hay contenido para reproducir.'}</Text>
      </View>

      {reproduciendo ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Leyendo en voz alta...</Text>
        </View>
      ) : null}

      <PrimaryButton
        styles={styles}
        label={reproduciendo ? 'Reproduciendo...' : '▶ Reproducir'}
        disabled={!hasText || reproduciendo}
        onPress={actions.play}
      />
      <PrimaryButton
        styles={styles}
        label="⏹ Detener"
        disabled={!reproduciendo}
        onPress={actions.stop}
      />
      <PrimaryButton
        styles={styles}
        label="⬅ Volver"
        secondary
        onPress={() => actions.goHome()}
      />
    </View>
  );
}
