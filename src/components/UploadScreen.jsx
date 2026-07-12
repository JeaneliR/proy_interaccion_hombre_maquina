import { useState } from 'react';
import { Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function UploadScreen({ setTexto, styles, actions, services }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    setError('');
    setStatus('');
    setLoaded(false);
    setLoading(true);
    actions.vibrate();

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', '*/*'],
        copyToCacheDirectory: true,
        multiple: false
      });

      if (result.canceled) {
        setStatus('Selección cancelada.');
        return;
      }

      const asset = result.assets[0];
      const content = await services.files.extract(asset);
      setTexto(content);
      setLoaded(true);
      setStatus(`Archivo cargado: ${asset.name}`);
      actions.vibrate('success');
      actions.announce('Archivo cargado correctamente');
    } catch (err) {
      const message = err?.message || 'No se pudo leer el archivo.';
      setError(message);
      actions.vibrate('error');
      actions.announce(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Header
        title="Cargar archivo"
        subtitle="Selecciona un archivo TXT para extraer su contenido y escucharlo."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Formato admitido</Text>
        <Text style={styles.text}>TXT / text/plain</Text>
        <Text style={styles.mutedText}>PDF, DOCX e imágenes quedan como mejoras futuras porque requieren extractores adicionales.</Text>
      </View>

      <PrimaryButton
        styles={styles}
        label={loading ? 'Procesando...' : '📂 Seleccionar TXT'}
        disabled={loading}
        onPress={pickDocument}
      />

      {status ? <Text style={styles.status}>{status}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton
        styles={styles}
        label="Ver contenido"
        disabled={!loaded}
        onPress={() => actions.navigate(SCREENS.TRANSCRIPTION, 'Mostrando texto cargado')}
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
