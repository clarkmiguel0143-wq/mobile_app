import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 24 },
  brand: { alignItems: 'center' },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMark: { width: 154, height: 154 },
  appName: { marginTop: 12, fontSize: 20, fontWeight: '700', color: colors.white },
  copy: { marginTop: 60, paddingHorizontal: 8 },
  headline: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.34,
    color: colors.white,
  },
  subtitle: { marginTop: 12, fontSize: 15, lineHeight: 22, color: colors.textSoft },
  actions: { marginTop: 68 },
  secondaryButton: { marginTop: 12 },
});

export default styles;
