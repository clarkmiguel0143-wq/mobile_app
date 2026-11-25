import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBackground from '../../components/GradientBackground';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { colors, gradients } from '../../theme';
import { APP_NAME } from '../../data/user';

export default function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <View style={[styles.content, { paddingTop: insets.top + 56 }]}>
        <View style={styles.brand}>
          <LinearGradient
            colors={gradients.logo}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.logo}
          />
          <Text style={styles.appName}>{APP_NAME}</Text>
        </View>

        <View style={styles.copy}>
          <Text style={styles.headline}>Everything you need, in one place.</Text>
          <Text style={styles.subtitle}>
            A fresh, simple way to manage your day, connect with others and grow every step of the way.
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title="Get Started"
            onPress={() => navigation.navigate('Registration')}
          />
          <SecondaryButton
            title="I already have an account"
            onPress={() => navigation.navigate('Login')}
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 24 },
  brand: { alignItems: 'center' },
  logo: { width: 76, height: 76, borderRadius: 24 },
  appName: { marginTop: 12, fontSize: 20, fontWeight: '700', color: colors.white },
  copy: { marginTop: 60, paddingHorizontal: 8 },
  headline: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.34,
    color: colors.white,
  },
  subtitle: { marginTop: 12, fontSize: 15, lineHeight: 22, color: colors.textSoft },
  actions: { marginTop: 68 },
  secondaryButton: { marginTop: 12 },
});
