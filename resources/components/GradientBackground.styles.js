import { StyleSheet } from 'react-native';
import { colors } from '../theme';

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden', backgroundColor: colors.blue },
  topGlow: { top: -190, right: -230 },
  bottomGlow: { bottom: -226, left: -240 },
});

export default styles;
