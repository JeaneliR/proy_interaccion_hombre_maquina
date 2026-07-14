import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import { SCREENS } from '../constants/screens';

export default function ImageReaderScreen({ setTexto, styles, actions, services }) {
  const [imageUri, setImageUri] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  const resetMessages = () => {
    setError('');
    setStatus('');
    setProcessed(false);
  };

  const processImage = async (uri) => {
    setProcessing(true);
    setError('');
    setStatus('Procesando imagen...');

    try {
      const text = await services.imageText.extract(uri);
      setTexto(text, 'imagen');
      setProcessed(true);
      setStatus('Texto extraído correctamente.');
      actions.vibrate('success');
      actions.announce('Texto extraído correctamente. Ya puedes escucharlo.');
    } catch (err) {
      const message = err?.message || 'No se pudo procesar la imagen.';
      setError(message);
      actions.vibrate('error');
      actions.announce(message);
    } finally {
      setProcessing(false);
    }
  };

  const pickImage = async () => {
    resetMessages();
    actions.vibrate();

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setError('No se otorgó permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (result.canceled) {
      setStatus('Selección cancelada.');
      return;
    }

    const uri = result.assets?.[0]?.uri;
    setImageUri(uri || '');
    await processImage(uri);
  };

  const takePhoto = async () => {
    resetMessages();
    actions.vibrate();

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setError('No se otorgó permiso para usar la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1
    });

    if (result.canceled) {
      setStatus('Captura cancelada.');
      return;
    }

    const uri = result.assets?.[0]?.uri;
    setImageUri(uri || '');
    await processImage(uri);
  };

  return (
    <View>
      <Header
        title="Leer imagen"
        subtitle="Toma una foto o selecciona una imagen para extraer texto con OCR."
        styles={styles}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recomendación</Text>
        <Text style={styles.text}>Usa una foto clara, bien iluminada y con el texto enfocado.</Text>
      </View>

      {imageUri ? <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" /> : null}

      <PrimaryButton styles={styles} label="📷 Tomar foto" disabled={processing} onPress={takePhoto} />
      <PrimaryButton styles={styles} label="🖼️ Elegir de galería" disabled={processing} onPress={pickImage} />

      {status ? <Text style={styles.status}>{status}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton styles={styles} label="🔊 Escuchar texto extraído" disabled={!processed || processing} onPress={() => actions.play()} />
      <PrimaryButton
        styles={styles}
        label="Ver texto extraído"
        disabled={!processed || processing}
        onPress={() => actions.navigate(SCREENS.TRANSCRIPTION, 'Mostrando texto extraído de la imagen')}
      />
      <PrimaryButton styles={styles} label="⬅ Volver" secondary onPress={() => actions.goHome()} />
    </View>
  );
}
