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
import { colors } from '../../theme';
import styles from './Registration.styles';

export default function RegistrationScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);

  const createAccount = () => {
    Alert.alert('Registration', 'Account creation is not available yet.');
  };

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

          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join us and get started in minutes.</Text>

          <GlassInput
            label="Full name"
            icon="user"
            placeholder="Clark Miguel"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
            value={name}
            onChangeText={setName}
            style={styles.nameInput}
          />
          <GlassInput
            label="Email address"
            icon="mail"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
            style={styles.field}
          />
          <GlassInput
            label="Password"
            icon="lock"
            secure
            placeholder="Create a password"
            autoComplete="new-password"
            textContentType="newPassword"
            value={password}
            onChangeText={setPassword}
            style={styles.field}
          />
          <GlassInput
            label="Confirm password"
            icon="lock"
            secure
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.field}
          />

          <Pressable
            style={styles.terms}
            onPress={() => setAgreed((value) => !value)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
          >
            <View style={[styles.checkbox, !agreed && styles.checkboxOff]}>
              {agreed ? <Icon name="check" size={16} color={colors.link} strokeWidth={3} /> : null}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.bold}>Terms of Service</Text> and{' '}
              <Text style={styles.bold}>Privacy Policy</Text>
            </Text>
          </Pressable>

          <PrimaryButton
            title="Create Account"
            onPress={createAccount}
            style={styles.createAccount}
          />

          <View style={styles.spacer} />
          <Text style={styles.footer}>
            Already have an account?{'  '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
