import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';

export default function AboutScreen({ styles, actions }) {
  return (
    <View>
      <Header
        title="Información técnica"
        subtitle="Resumen para sustentar que la app fue implementada con Expo y React Native."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Base tecnológica</Text>
        <Text style={styles.text}>• Expo SDK 57.</Text>
        <Text style={styles.text}>• React Native 0.86.</Text>
        <Text style={styles.text}>• Generación APK con EAS Build.</Text>
        <Text style={styles.text}>• Módulos nativos: documentos, cámara, OCR, texto a voz y reconocimiento de voz.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Principios aplicados</Text>
        <Text style={styles.text}>• SRP: pantallas, servicios y extractores separados.</Text>
        <Text style={styles.text}>• OCP: se pueden agregar nuevos extractores sin cambiar las pantallas.</Text>
        <Text style={styles.text}>• LSP: cada extractor o servicio puede reemplazarse si respeta su contrato.</Text>
        <Text style={styles.text}>• DIP: App depende de servicios, no de APIs nativas directamente.</Text>
        <Text style={styles.text}>• ISP: servicios pequeños para voz, archivos, OCR, comandos, portapapeles y vibración.</Text>
      </View>

      <PrimaryButton
        styles={styles}
        label="⬅ Volver"
        secondary
        onPress={() => actions.goHome()}
      />
    </View>
  );
}
