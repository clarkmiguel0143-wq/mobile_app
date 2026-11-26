import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Glass from './Glass';
import Icon from './Icon';
import { colors } from '../theme';
import styles from './GlassInput.styles';

export default function GlassInput({ label, icon, secure = false, style, ...inputProps }) {
  const [hidden, setHidden] = useState(secure);

  return (
    <Glass radius={18} style={[styles.wrap, style]}>
      <View style={styles.row}>
        <Icon name={icon} size={24} color={colors.white} />
        <View style={styles.textCol}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.6)"
            selectionColor={colors.mint}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={hidden}
            {...inputProps}
          />
        </View>
        {secure ? (
          <Pressable
            onPress={() => setHidden((value) => !value)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          >
            <Icon
              name={hidden ? 'eye' : 'eyeOff'}
              size={24}
              color="rgba(255,255,255,0.85)"
            />
          </Pressable>
        ) : null}
      </View>
    </Glass>
  );
}
