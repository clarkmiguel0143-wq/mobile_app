import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingHorizontal: 24 },
  back: { width: 44, height: 44 },
  backInner: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  backPressed: { opacity: 0.75 },
  title: { marginTop: 22, fontSize: 30, fontWeight: '700', color: colors.white },
  subtitle: { marginTop: 8, color: colors.textSoft, fontSize: 14, lineHeight: 20 },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 10,
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  settingsCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingCopy: { flex: 1 },
  settingTitle: { color: colors.white, fontSize: 14, fontWeight: '700' },
  settingDescription: { marginTop: 4, color: colors.textSoft, fontSize: 12, lineHeight: 17 },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 24,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  noteText: { flex: 1, color: colors.textSoft, fontSize: 12, lineHeight: 18 },
});

export default styles;
