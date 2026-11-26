import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBackground from '../../components/GradientBackground';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { gradients } from '../../theme';
import { APP_NAME } from '../../data/user';
import styles from './Welcome.styles';

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
          >
            <Image
              source={require('../../../assets/dexapp-logo.png')}
              style={styles.logoMark}
              resizeMode="contain"
              accessibilityLabel={`${APP_NAME} logo`}
            />
          </LinearGradient>
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
