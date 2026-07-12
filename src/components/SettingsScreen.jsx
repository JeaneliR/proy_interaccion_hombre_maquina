import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function SettingsScreen({ settings, setSettings, styles, actions }) {
  const update = (changes, announcement) => {
    setSettings((current) => ({ ...current, ...changes }));
    actions.announce(announcement);
    actions.vibrate();
  };

  return (
    <View>
      <Header
        title="Configuración"
        subtitle="Ajustes visuales básicos para mejorar la accesibilidad."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estado actual</Text>
        <Text style={styles.text}>Contraste: {settings.altoContraste ? 'activado' : 'desactivado'}</Text>
        <Text style={styles.text}>Tamaño de texto: {settings.tamanoTexto}px</Text>
        <Text style={styles.text}>Modo simple: {settings.modoSimple ? 'activado' : 'desactivado'}</Text>
      </View>

      <PrimaryButton
        styles={styles}
        label={settings.altoContraste ? 'Desactivar contraste' : 'Activar contraste'}
        onPress={() => update({ altoContraste: !settings.altoContraste }, settings.altoContraste ? 'Contraste desactivado' : 'Contraste activado')}
      />
      <PrimaryButton
        styles={styles}
        label="Aumentar letra"
        disabled={settings.tamanoTexto >= 30}
        onPress={() => update({ tamanoTexto: Math.min(30, settings.tamanoTexto + 2) }, 'Aumentando tamaño de texto')}
      />
      <PrimaryButton
        styles={styles}
        label="Disminuir letra"
        disabled={settings.tamanoTexto <= 14}
        onPress={() => update({ tamanoTexto: Math.max(14, settings.tamanoTexto - 2) }, 'Disminuyendo tamaño de texto')}
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
        onPress={() => actions.navigate(SCREENS.HOME, 'Volviendo al inicio')}
      />
    </View>
  );
}
