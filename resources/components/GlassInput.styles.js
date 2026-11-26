import { StyleSheet } from 'react-native';
import { colors } from '../theme';

const styles = StyleSheet.create({
  wrap: { height: 60 },
  row: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    gap: 12,
  },
  textCol: { flex: 1, justifyContent: 'center' },
  label: { fontSize: 11, fontWeight: '500', color: colors.textFaint, marginBottom: 2 },
  input: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
    height: 20,
    padding: 0,
  },
});

export default styles;
