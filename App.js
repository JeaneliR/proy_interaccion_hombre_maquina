import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { DEFAULT_SCREEN, SCREENS } from './src/constants/screens';
import { appServices } from './src/services/AppServices';
import { createStyles } from './src/theme/createStyles';
import AboutScreen from './src/components/AboutScreen';
import HomeScreen from './src/components/HomeScreen';
import PlayerScreen from './src/components/PlayerScreen';
import SettingsScreen from './src/components/SettingsScreen';
import TranscriptionScreen from './src/components/TranscriptionScreen';
import UploadScreen from './src/components/UploadScreen';
import WriteScreen from './src/components/WriteScreen';

export default function App({ services = appServices }) {
  const [screen, setScreen] = useState(DEFAULT_SCREEN);
  const [texto, setTexto] = useState('');
  const [reproduciendo, setReproduciendo] = useState(false);
  const [settings, setSettings] = useState({
    altoContraste: false,
    tamanoTexto: 18,
    modoSimple: false
  });

  const styles = useMemo(() => createStyles(settings), [settings]);

  const vibrate = (type = 'normal') => services.vibration.vibrate(type);

  const announce = (message) => {
    services.speech.speak(message).catch(() => undefined);
  };

  const navigate = (destination, announcement) => {
    vibrate();
    services.speech.stop();
    if (announcement) announce(announcement);
    setScreen(destination || SCREENS.HOME);
  };

  const play = async () => {
    const value = texto.trim();

    if (!value) {
      announce('No hay texto para reproducir');
      return;
    }

    if (reproduciendo) {
      return;
    }

    vibrate();
    setReproduciendo(true);

    try {
      await services.speech.speak(value);
    } catch {
      vibrate('error');
    } finally {
      setReproduciendo(false);
    }
  };

  const stop = () => {
    services.speech.stop();
    setReproduciendo(false);
    vibrate();
  };

  const actions = {
    navigate,
    play,
    stop,
    announce,
    vibrate
  };

  const screenProps = {
    texto,
    setTexto,
    styles,
    settings,
    setSettings,
    actions,
    services,
    reproduciendo
  };

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.WRITE:
        return <WriteScreen {...screenProps} />;
      case SCREENS.UPLOAD:
        return <UploadScreen {...screenProps} />;
      case SCREENS.TRANSCRIPTION:
        return <TranscriptionScreen {...screenProps} />;
      case SCREENS.PLAYER:
        return <PlayerScreen {...screenProps} />;
      case SCREENS.SETTINGS:
        return <SettingsScreen {...screenProps} />;
      case SCREENS.ABOUT:
        return <AboutScreen {...screenProps} />;
      case SCREENS.HOME:
      default:
        return <HomeScreen {...screenProps} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={settings.altoContraste ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.container}>{renderScreen()}</ScrollView>
    </SafeAreaView>
  );
}
