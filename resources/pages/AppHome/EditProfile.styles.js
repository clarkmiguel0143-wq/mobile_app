import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 24 },
  back: { width: 44, height: 44 },
  backInner: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  title: {
    marginTop: 22,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.32,
    color: colors.white,
  },
  subtitle: { marginTop: 7, fontSize: 15, color: colors.textSoft },
  nameInput: { marginTop: 36 },
  field: { marginTop: 18 },
  saveButton: { marginTop: 32 },
});

export default styles;
