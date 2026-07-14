import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { DEFAULT_SCREEN, SCREENS } from './src/constants/screens';
import { appServices } from './src/services/AppServices';
import { createStyles } from './src/theme/createStyles';
import AboutScreen from './src/components/AboutScreen';
import HomeScreen from './src/components/HomeScreen';
import ImageReaderScreen from './src/components/ImageReaderScreen';
import PlayerScreen from './src/components/PlayerScreen';
import SettingsScreen from './src/components/SettingsScreen';
import TranscriptionScreen from './src/components/TranscriptionScreen';
import UploadScreen from './src/components/UploadScreen';
import VoiceAssistantScreen from './src/components/VoiceAssistantScreen';
import WriteScreen from './src/components/WriteScreen';

const DEFAULT_SETTINGS = {
  altoContraste: false,
  tamanoTexto: 18,
  modoSimple: false
};

export default function App({ services = appServices }) {
  const [screen, setScreen] = useState(DEFAULT_SCREEN);
  const [texto, setTexto] = useState('');
  const [origenTexto, setOrigenTexto] = useState('manual');
  const [reproduciendo, setReproduciendo] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const styles = useMemo(() => createStyles(settings), [settings]);

  const vibrate = (type = 'normal') => services.vibration.vibrate(type);

  const announce = (message) => {
    services.speech.speak(message).catch(() => undefined);
  };

  const saveText = (value, source = 'manual') => {
    setTexto(value || '');
    setOrigenTexto(source);
  };

  const navigate = (destination, announcement) => {
    vibrate();
    services.speech.stop();
    if (announcement) announce(announcement);
    setScreen(destination || SCREENS.HOME);
  };

  const goHome = (announcement = 'Volviendo al inicio') => navigate(SCREENS.HOME, announcement);

  const play = async (customText) => {
    const value = String(customText ?? texto).trim();

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

  const toggleSimpleMode = () => {
    setSettings((current) => {
      const nextValue = !current.modoSimple;
      announce(nextValue ? 'Modo simplificado activado' : 'Modo simplificado desactivado');
      return { ...current, modoSimple: nextValue };
    });
    vibrate('success');
  };

  const executeVoiceCommand = (commandText = '') => {
    const normalized = services.voiceCommands.normalize(commandText);
    const command = services.voiceCommands.parse(normalized);

    if (!command) {
      announce('No reconocí el comando. Puedes decir inicio, escribir, documento, imagen, escuchar, configuración o ayuda.');
      return false;
    }

    switch (command.type) {
      case 'navigate':
        navigate(command.screen, command.announcement);
        return true;
      case 'play':
        play();
        return true;
      case 'stop':
        stop();
        announce('Lectura detenida');
        return true;
      case 'toggleSimpleMode':
        toggleSimpleMode();
        return true;
      case 'increaseText':
        setSettings((current) => ({ ...current, tamanoTexto: Math.min(34, current.tamanoTexto + 4) }));
        announce('Aumentando tamaño de letra');
        return true;
      case 'decreaseText':
        setSettings((current) => ({ ...current, tamanoTexto: Math.max(14, current.tamanoTexto - 4) }));
        announce('Disminuyendo tamaño de letra');
        return true;
      case 'contrast':
        setSettings((current) => ({ ...current, altoContraste: !current.altoContraste }));
        announce('Cambiando contraste');
        return true;
      default:
        return false;
    }
  };

  const actions = {
    navigate,
    goHome,
    play,
    stop,
    announce,
    vibrate,
    toggleSimpleMode,
    executeVoiceCommand
  };

  const screenProps = {
    texto,
    setTexto: saveText,
    origenTexto,
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
      case SCREENS.IMAGE_READER:
        return <ImageReaderScreen {...screenProps} />;
      case SCREENS.VOICE_ASSISTANT:
        return <VoiceAssistantScreen {...screenProps} />;
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
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {renderScreen()}
      </ScrollView>
    </SafeAreaView>
  );
}
