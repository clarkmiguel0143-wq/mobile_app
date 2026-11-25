import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Glass from './Glass';
import Icon from './Icon';
import { colors } from '../theme';

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
