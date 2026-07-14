import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';

export default function SettingsScreen({ settings, setSettings, styles, actions }) {
  const update = (changes, announcement) => {
    setSettings((current) => ({ ...current, ...changes }));
    actions.announce(announcement);
    actions.vibrate();
  };

  const increaseText = () => update({ tamanoTexto: Math.min(34, settings.tamanoTexto + 4) }, 'Aumentando tamaño de texto');
  const decreaseText = () => update({ tamanoTexto: Math.max(14, settings.tamanoTexto - 4) }, 'Disminuyendo tamaño de texto');

  return (
    <View>
      <Header
        title="Configuración"
        subtitle="Ajustes visuales para mejorar la accesibilidad de toda la aplicación."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estado actual</Text>
        <Text style={styles.text}>Contraste: {settings.altoContraste ? 'activado' : 'desactivado'}</Text>
        <Text style={styles.text}>Tamaño de texto: {settings.tamanoTexto}px</Text>
        <Text style={styles.text}>Modo simple: {settings.modoSimple ? 'activado' : 'desactivado'}</Text>
      </View>

      <View style={styles.cardLargePreview}>
        <Text style={styles.cardTitle}>Vista previa</Text>
        <Text style={styles.text}>Este texto cambia de tamaño inmediatamente para comprobar el ajuste.</Text>
      </View>

      <PrimaryButton
        styles={styles}
        label={settings.altoContraste ? 'Desactivar contraste' : 'Activar contraste'}
        onPress={() => update({ altoContraste: !settings.altoContraste }, settings.altoContraste ? 'Contraste desactivado' : 'Contraste activado')}
      />
      <PrimaryButton
        styles={styles}
        label="Aumentar letra"
        disabled={settings.tamanoTexto >= 34}
        onPress={increaseText}
      />
      <PrimaryButton
        styles={styles}
        label="Disminuir letra"
        disabled={settings.tamanoTexto <= 14}
        onPress={decreaseText}
      />
      <PrimaryButton
        styles={styles}
        label={settings.modoSimple ? 'Desactivar modo simple' : 'Activar modo simple'}
        onPress={() => update({ modoSimple: !settings.modoSimple }, settings.modoSimple ? 'Modo simple desactivado' : 'Modo simple activado')}
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
