import { Text, View } from 'react-native';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

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
        <Text style={styles.text}>• Expo SDK 57</Text>
        <Text style={styles.text}>• React Native 0.86</Text>
        <Text style={styles.text}>• Generación APK con EAS Build</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Principios aplicados</Text>
        <Text style={styles.text}>• SRP: pantallas, servicios y extractores separados.</Text>
        <Text style={styles.text}>• OCP: se pueden agregar extractores PDF/DOCX sin cambiar la pantalla de carga.</Text>
        <Text style={styles.text}>• DIP: App depende de servicios, no de implementaciones directas.</Text>
        <Text style={styles.text}>• ISP: servicios pequeños para voz, archivos, portapapeles y vibración.</Text>
      </View>

      <PrimaryButton
        styles={styles}
        label="⬅ Volver"
        secondary
        onPress={() => actions.navigate(SCREENS.HOME, 'Volviendo al inicio')}
      />
    </View>
  );
}
