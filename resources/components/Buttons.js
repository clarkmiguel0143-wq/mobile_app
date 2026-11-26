import { Pressable, Text } from 'react-native';
import { shadows } from '../theme';
import styles from './Buttons.styles';

export function PrimaryButton({ title, onPress, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        shadows.button,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.secondary, pressed && styles.pressed, style]}
    >
      <Text style={styles.secondaryText}>{title}</Text>
    </Pressable>
  );
}
