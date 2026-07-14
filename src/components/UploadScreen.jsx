import { useState } from 'react';
import { Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function UploadScreen({ texto, setTexto, styles, actions, services }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(Boolean(texto.trim()));
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    setError('');
    setStatus('');
    setLoaded(false);
    setLoading(true);
    actions.vibrate();

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'text/csv', 'text/markdown', '*/*'],
        copyToCacheDirectory: true,
        multiple: false
      });

      if (result.canceled) {
        setStatus('Selección cancelada.');
        return;
      }

      const asset = result.assets?.[0];
      const content = await services.files.extract(asset);
      setTexto(content, 'documento');
      setLoaded(true);
      setStatus(`Documento procesado: ${asset?.name || 'archivo seleccionado'}`);
      actions.vibrate('success');
      actions.announce('Documento procesado correctamente. Ya puedes escucharlo.');
    } catch (err) {
      const message = err?.message || 'No se pudo leer el documento.';
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
        title="Escuchar información"
        subtitle="Selecciona un documento de texto, procésalo y reprodúcelo en voz alta."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Formatos admitidos</Text>
        <Text style={styles.text}>TXT, CSV y MD.</Text>
        <Text style={styles.mutedText}>PDF y DOCX requieren extractores adicionales; por ahora se informa al usuario si el formato no es compatible.</Text>
      </View>

      <PrimaryButton
        styles={styles}
        label={loading ? 'Procesando documento...' : '📂 Seleccionar documento'}
        disabled={loading}
        onPress={pickDocument}
      />

      {status ? <Text style={styles.status}>{status}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton styles={styles} label="🔊 Escuchar ahora" disabled={!loaded || loading} onPress={() => actions.play()} />
      <PrimaryButton
        styles={styles}
        label="Ver contenido procesado"
        disabled={!loaded || loading}
        onPress={() => actions.navigate(SCREENS.TRANSCRIPTION, 'Mostrando texto procesado')}
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
