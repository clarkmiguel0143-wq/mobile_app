import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurTargetView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Glow from './Glow';
import BlurTargetContext from './BlurTargetContext';
import { colors, gradients } from '../theme';

export default function GradientBackground({ children }) {
  const blurTarget = useRef(null);

  return (
    <BlurTargetContext.Provider value={blurTarget}>
      <View style={styles.root}>
        <BlurTargetView
          ref={blurTarget}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        >
          <LinearGradient
            colors={gradients.screen}
            locations={gradients.screenStops}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Glow size={480} color="#34F0B4" opacity={0.55} style={{ top: -190, right: -230 }} />
          <Glow size={520} color="#78B4FF" opacity={0.55} style={{ bottom: -226, left: -240 }} />
        </BlurTargetView>
        {children}
      </View>
    </BlurTargetContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden', backgroundColor: colors.blue },
});
