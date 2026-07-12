import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function HomeScreen({ styles, settings, actions }) {
  return (
    <View>
      <Header
        title="Mi App Accesible"
        subtitle="Aplicación nativa hecha con Expo y React Native para cargar, escribir y escuchar contenido."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Funciones principales</Text>
        <Text style={styles.text}>• Escribir o pegar texto.</Text>
        <Text style={styles.text}>• Cargar archivos TXT.</Text>
        <Text style={styles.text}>• Reproducir el contenido con voz.</Text>
        <Text style={styles.text}>• Copiar la transcripción.</Text>
        <Text style={styles.text}>• Ajustar contraste, tamaño de letra y modo simple.</Text>
      </View>

      <PrimaryButton
        styles={styles}
        label="✍️ Escribir o pegar texto"
        onPress={() => actions.navigate(SCREENS.WRITE, 'Pantalla para escribir texto')}
      />
      <PrimaryButton
        styles={styles}
        label="📂 Cargar archivo TXT"
        onPress={() => actions.navigate(SCREENS.UPLOAD, 'Cargar archivo de texto')}
      />
      <PrimaryButton
        styles={styles}
        label="🔊 Reproductor"
        onPress={() => actions.navigate(SCREENS.PLAYER, 'Reproductor de texto')}
      />
      <PrimaryButton
        styles={styles}
        label="⚙️ Configuración"
        onPress={() => actions.navigate(SCREENS.SETTINGS, 'Configuración de accesibilidad')}
      />
      {!settings.modoSimple ? (
        <PrimaryButton
          styles={styles}
          label="ℹ️ Información técnica"
          onPress={() => actions.navigate(SCREENS.ABOUT, 'Información técnica del proyecto')}
          secondary
        />
      ) : null}
    </View>
  );
}
