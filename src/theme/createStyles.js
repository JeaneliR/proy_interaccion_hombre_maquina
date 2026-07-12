import { StyleSheet } from 'react-native';

export function createStyles(settings) {
  const highContrast = settings.altoContraste;
  const simple = settings.modoSimple;

  const colors = highContrast
    ? {
        background: '#000000',
        surface: '#111111',
        text: '#FFFFFF',
        muted: '#FDE68A',
        primary: '#FACC15',
        primaryText: '#000000',
        secondary: '#27272A',
        border: '#FFFFFF',
        danger: '#FCA5A5',
        success: '#86EFAC'
      }
    : {
        background: '#ECFDF5',
        surface: '#FFFFFF',
        text: '#0F172A',
        muted: '#475569',
        primary: '#0F766E',
        primaryText: '#FFFFFF',
        secondary: '#E2E8F0',
        border: '#99F6E4',
        danger: '#B91C1C',
        success: '#047857'
      };

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background
    },
    container: {
      flexGrow: 1,
      padding: simple ? 18 : 22,
      backgroundColor: colors.background
    },
    header: {
      marginBottom: 18
    },
    title: {
      color: colors.text,
      fontSize: settings.tamanoTexto + 10,
      fontWeight: '800',
      marginBottom: 8
    },
    subtitle: {
      color: colors.muted,
      fontSize: settings.tamanoTexto,
      lineHeight: settings.tamanoTexto + 8
    },
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: simple ? 14 : 22,
      padding: simple ? 14 : 18,
      marginBottom: 14
    },
    cardTitle: {
      color: colors.text,
      fontSize: settings.tamanoTexto + 3,
      fontWeight: '700',
      marginBottom: 8
    },
    text: {
      color: colors.text,
      fontSize: settings.tamanoTexto,
      lineHeight: settings.tamanoTexto + 8
    },
    mutedText: {
      color: colors.muted,
      fontSize: settings.tamanoTexto - 1,
      lineHeight: settings.tamanoTexto + 6
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: simple ? 12 : 18,
      paddingVertical: 15,
      paddingHorizontal: 18,
      marginBottom: 12,
      alignItems: 'center'
    },
    secondaryButton: {
      backgroundColor: colors.secondary,
      borderColor: colors.border,
      borderWidth: 1
    },
    disabledButton: {
      opacity: 0.45
    },
    buttonText: {
      color: colors.primaryText,
      fontSize: settings.tamanoTexto,
      fontWeight: '800',
      textAlign: 'center'
    },
    secondaryButtonText: {
      color: colors.text
    },
    input: {
      minHeight: 170,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 16,
      backgroundColor: colors.surface,
      color: colors.text,
      padding: 14,
      textAlignVertical: 'top',
      fontSize: settings.tamanoTexto,
      lineHeight: settings.tamanoTexto + 8,
      marginBottom: 12
    },
    status: {
      color: colors.success,
      fontSize: settings.tamanoTexto,
      marginBottom: 12
    },
    error: {
      color: colors.danger,
      fontSize: settings.tamanoTexto,
      marginBottom: 12
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.secondary,
      borderRadius: 999,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginBottom: 10
    },
    badgeText: {
      color: colors.text,
      fontSize: settings.tamanoTexto - 2,
      fontWeight: '700'
    }
  });
}
