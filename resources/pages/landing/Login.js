import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBackground from '../../components/GradientBackground';
import Glass from '../../components/Glass';
import GlassInput from '../../components/GlassInput';
import Icon from '../../components/Icon';
import { PrimaryButton } from '../../components/Buttons';
import styles from './Login.styles';
import { useMutation } from '@tanstack/react-query';
import { loginAPI } from '../../api/login_logout/login';

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

  const { mutate: loginFunction } = useMutation({
      mutationFn: (data) => loginAPI(data),
      onSuccess: (response) => {
        console.log('Login successful:', response);
        // navigation.getParent()?.reset({
        //   index: 0,
        //   routes: [{ name: 'MainApp' }],
        // });
      },
      onError: (e) => {
        alert(e.response?.data?.message || 'An error occurred');
      },
  });

  const handleLogin = async () => {
    if(!email || !password){
      Alert.alert('Missing details', 'Please fill in all fields');
      return;
    }

    await loginFunction({ 
      email, 
      password
    });
  }

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

          <PrimaryButton title="Sign In" onPress={() => handleLogin()} style={styles.signIn} />

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
