import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function HomeScreen({ styles, settings, actions }) {
  return (
    <View>
      <Header
        title="Mi App Accesible"
        subtitle={settings.modoSimple ? 'Elige una acción principal.' : 'Aplicación nativa con Expo y React Native para escribir, cargar, dictar, leer imágenes y escuchar contenido.'}
        styles={styles}
      />

      {!settings.modoSimple ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Funciones principales</Text>
          <Text style={styles.text}>• Escribir o pegar texto.</Text>
          <Text style={styles.text}>• Cargar archivos TXT, CSV o MD.</Text>
          <Text style={styles.text}>• Leer texto desde imágenes con OCR.</Text>
          <Text style={styles.text}>• Usar comandos de voz con micrófono.</Text>
          <Text style={styles.text}>• Escuchar el contenido con voz.</Text>
          <Text style={styles.text}>• Ajustar contraste, tamaño de letra y modo simple.</Text>
        </View>
      ) : null}

      <PrimaryButton
        styles={styles}
        label="✍️ Escribir o pegar texto"
        onPress={() => actions.navigate(SCREENS.WRITE, 'Pantalla para escribir texto')}
      />
      <PrimaryButton
        styles={styles}
        label="📂 Escuchar información"
        onPress={() => actions.navigate(SCREENS.UPLOAD, 'Cargar documento para escuchar')}
      />
      <PrimaryButton
        styles={styles}
        label="🖼️ Leer imagen"
        onPress={() => actions.navigate(SCREENS.IMAGE_READER, 'Lectura de texto desde imagen')}
      />
      <PrimaryButton
        styles={styles}
        label="🎙️ Asistencia de voz"
        onPress={() => actions.navigate(SCREENS.VOICE_ASSISTANT, 'Asistencia de voz')}
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
      <PrimaryButton
        styles={styles}
        label={settings.modoSimple ? 'Desactivar modo simplificado' : 'Activar modo simplificado'}
        onPress={actions.toggleSimpleMode}
        secondary
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
