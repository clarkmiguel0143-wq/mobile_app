import { useContext } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, shadows } from '../theme';
import BlurTargetContext from './BlurTargetContext';

export default function Glass({
  children,
  radius = 18,
  intensity = 20,
  style,
  innerStyle,
}) {
  const blurTarget = useContext(BlurTargetContext);

  return (
    <View
      style={[
        { borderRadius: radius, backgroundColor: colors.glassFill },
        shadows.glass,
        style,
      ]}
    >
      <View style={[styles.inner, { borderRadius: radius }, innerStyle]}>
        <BlurView
          intensity={intensity}
          tint="light"
          blurTarget={blurTarget}
          blurMethod={
            Platform.OS === 'android' && blurTarget
              ? 'dimezisBlurView'
              : 'none'
          }
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
});
