import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBackground from '../../components/GradientBackground';
import Glass from '../../components/Glass';
import GlassInput from '../../components/GlassInput';
import Icon from '../../components/Icon';
import { PrimaryButton } from '../../components/Buttons';
import { colors } from '../../theme';

function SocialButton({ label, letter }) {
  return (
    <View style={styles.socialButton}>
      <Glass radius={18} style={styles.socialGlass}>
        <View style={styles.socialRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{letter}</Text>
          </View>
          <Text style={styles.socialText}>{label}</Text>
        </View>
      </Glass>
    </View>
  );
}

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => navigation.getParent()?.reset({
    index: 0,
    routes: [{ name: 'MainApp' }],
  });

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingTop: insets.top + 20, paddingBottom: Math.max(insets.bottom, 24) },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => navigation.goBack()} accessibilityLabel="Go back">
            <Glass radius={14} style={styles.back}>
              <View style={styles.backInner}>
                <Icon name="back" size={24} />
              </View>
            </Glass>
          </Pressable>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey.</Text>

          <GlassInput
            label="Email address"
            icon="mail"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
            style={styles.emailInput}
          />
          <GlassInput
            label="Password"
            icon="lock"
            secure
            placeholder="Enter your password"
            autoComplete="password"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
          />

          <Pressable
            style={styles.forgot}
            hitSlop={8}
            onPress={() => Alert.alert('Password reset', 'Password reset is not available yet.')}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <PrimaryButton title="Sign In" onPress={signIn} style={styles.signIn} />

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socials}>
            <SocialButton label="Google" letter="G" />
            <SocialButton label="Facebook" letter="f" />
          </View>

          <View style={styles.spacer} />
          <Text style={styles.footer}>
            Don&apos;t have an account?{'  '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Registration')}>
              Sign up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24 },
  back: { width: 44, height: 44 },
  backInner: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  title: {
    marginTop: 42,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.34,
    color: colors.white,
  },
  subtitle: { marginTop: 7, fontSize: 15, color: colors.textSoft },
  emailInput: { marginTop: 46 },
  passwordInput: { marginTop: 20 },
  forgot: { alignSelf: 'flex-end', marginTop: 18 },
  forgotText: { fontSize: 13, fontWeight: '600', color: colors.mint },
  signIn: { marginTop: 34 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 32 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
  dividerText: { fontSize: 13, color: colors.textSoft },
  socials: { flexDirection: 'row', gap: 12, marginTop: 20 },
  socialButton: { flex: 1 },
  socialGlass: { height: 56 },
  socialRow: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 13, fontWeight: '700', color: colors.blue },
  socialText: { fontSize: 15, fontWeight: '600', color: colors.white },
  spacer: { flex: 1 },
  footer: { textAlign: 'center', fontSize: 14, color: colors.textSoft, marginTop: 24 },
  footerLink: { fontWeight: '700', color: colors.white },
});
