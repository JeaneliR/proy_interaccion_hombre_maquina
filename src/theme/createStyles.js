import { StyleSheet } from 'react-native';

export function createStyles(settings) {
  const highContrast = settings.altoContraste;
  const simple = settings.modoSimple;
  const base = settings.tamanoTexto;
  const titleSize = base + (simple ? 8 : 12);
  const subtitleSize = base + (simple ? 1 : 2);
  const buttonSize = base + (simple ? 2 : 1);

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
      marginBottom: simple ? 14 : 20
    },
    title: {
      color: colors.text,
      fontSize: titleSize,
      lineHeight: titleSize + 8,
      fontWeight: '900',
      marginBottom: 8
    },
    subtitle: {
      color: colors.muted,
      fontSize: subtitleSize,
      lineHeight: subtitleSize + 9
    },
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: highContrast ? 2 : 1,
      borderRadius: simple ? 14 : 22,
      padding: simple ? 14 : 18,
      marginBottom: 14
    },
    cardLargePreview: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: highContrast ? 2 : 1,
      borderRadius: 22,
      padding: 22,
      marginBottom: 16
    },
    cardTitle: {
      color: colors.text,
      fontSize: base + 5,
      lineHeight: base + 12,
      fontWeight: '800',
      marginBottom: 8
    },
    text: {
      color: colors.text,
      fontSize: base,
      lineHeight: base + 9
    },
    mutedText: {
      color: colors.muted,
      fontSize: Math.max(13, base - 1),
      lineHeight: base + 7
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: simple ? 12 : 18,
      paddingVertical: simple ? 18 : 16,
      paddingHorizontal: 18,
      marginBottom: 13,
      minHeight: simple ? 64 : 56,
      alignItems: 'center',
      justifyContent: 'center'
    },
    secondaryButton: {
      backgroundColor: colors.secondary,
      borderColor: colors.border,
      borderWidth: highContrast ? 2 : 1
    },
    disabledButton: {
      opacity: 0.45
    },
    buttonText: {
      color: colors.primaryText,
      fontSize: buttonSize,
      lineHeight: buttonSize + 8,
      fontWeight: '900',
      textAlign: 'center'
    },
    secondaryButtonText: {
      color: colors.text
    },
    input: {
      minHeight: simple ? 190 : 170,
      borderColor: colors.border,
      borderWidth: highContrast ? 2 : 1,
      borderRadius: 16,
      backgroundColor: colors.surface,
      color: colors.text,
      padding: 14,
      textAlignVertical: 'top',
      fontSize: base,
      lineHeight: base + 9,
      marginBottom: 12
    },
    status: {
      color: colors.success,
      fontSize: base,
      lineHeight: base + 8,
      marginBottom: 12,
      fontWeight: '700'
    },
    error: {
      color: colors.danger,
      fontSize: base,
      lineHeight: base + 8,
      marginBottom: 12,
      fontWeight: '700'
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.secondary,
      borderRadius: 999,
      paddingVertical: 8,
      paddingHorizontal: 14,
      marginBottom: 12,
      borderColor: colors.border,
      borderWidth: highContrast ? 2 : 0
    },
    badgeText: {
      color: colors.text,
      fontSize: Math.max(13, base - 1),
      lineHeight: base + 6,
      fontWeight: '800'
    },
    previewImage: {
      width: '100%',
      height: simple ? 220 : 280,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: highContrast ? 2 : 1,
      borderRadius: 18,
      marginBottom: 14
    }
  });
}
