import { TextInput, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function WriteScreen({ texto, setTexto, styles, actions }) {
  const hasText = Boolean(texto.trim());

  return (
    <View>
      <Header
        title="Escribir contenido"
        subtitle="Ingresa el texto que deseas guardar, copiar o escuchar."
        styles={styles}
      />

      <TextInput
        accessibilityLabel="Caja para escribir texto"
        multiline
        value={texto}
        onChangeText={setTexto}
        placeholder="Escribe aquí..."
        placeholderTextColor="#64748B"
        style={styles.input}
      />

      <PrimaryButton
        styles={styles}
        label="Guardar y ver texto"
        disabled={!hasText}
        onPress={() => actions.navigate(SCREENS.TRANSCRIPTION, 'Texto guardado')}
      />
      <PrimaryButton
        styles={styles}
        label="Escuchar ahora"
        disabled={!hasText}
        onPress={actions.play}
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
