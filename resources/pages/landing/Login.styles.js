import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24 },
  back: { width: 44, height: 44 },
  backInner: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  title: {
    marginTop: 42,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.34,
    color: colors.white,
  },
  subtitle: { marginTop: 7, fontSize: 15, color: colors.textSoft },
  emailInput: { marginTop: 46 },
  passwordInput: { marginTop: 20 },
  forgot: { alignSelf: 'flex-end', marginTop: 18 },
  forgotText: { fontSize: 13, fontWeight: '600', color: colors.mint },
  signIn: { marginTop: 34 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 32 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
  dividerText: { fontSize: 13, color: colors.textSoft },
  socials: { flexDirection: 'row', gap: 12, marginTop: 20 },
  socialButton: { flex: 1 },
  socialGlass: { height: 56 },
  socialRow: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 13, fontWeight: '700', color: colors.blue },
  socialText: { fontSize: 15, fontWeight: '600', color: colors.white },
  spacer: { flex: 1 },
  footer: { textAlign: 'center', fontSize: 14, color: colors.textSoft, marginTop: 24 },
  footerLink: { fontWeight: '700', color: colors.white },
});

export default styles;
