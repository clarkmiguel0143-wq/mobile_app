import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Glow from './Glow';
import { colors, gradients } from '../theme';

export default function GradientBackground({ children }) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradients.screen}
        locations={gradients.screenStops}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Glow size={480} color="#34F0B4" opacity={0.55} style={{ top: -190, right: -230 }} />
      <Glow size={520} color="#78B4FF" opacity={0.55} style={{ bottom: -226, left: -240 }} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden', backgroundColor: colors.blue },
});
