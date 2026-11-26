import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24 },
  back: { width: 44, height: 44 },
  backInner: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  title: {
    marginTop: 22,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.34,
    color: colors.white,
  },
  subtitle: { marginTop: 7, fontSize: 15, color: colors.textSoft },
  nameInput: { marginTop: 40 },
  field: { marginTop: 18 },
  terms: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginTop: 22, paddingHorizontal: 4 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    marginTop: 4,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOff: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.7)' },
  termsText: { flex: 1, fontSize: 13, lineHeight: 16, color: 'rgba(255,255,255,0.88)' },
  bold: { fontWeight: '600', color: colors.white },
  createAccount: { marginTop: 36 },
  spacer: { flex: 1 },
  footer: { textAlign: 'center', fontSize: 14, color: colors.textSoft, marginTop: 24 },
  footerLink: { fontWeight: '700', color: colors.white },
});

export default styles;
