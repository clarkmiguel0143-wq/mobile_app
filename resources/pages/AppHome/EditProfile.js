import { useContext, useState } from 'react';
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
import { PrimaryButton } from '../../components/Buttons';
import Glass from '../../components/Glass';
import GlassInput from '../../components/GlassInput';
import GradientBackground from '../../components/GradientBackground';
import Icon from '../../components/Icon';
import UserContext from '../../data/UserContext';
import styles from './EditProfile.styles';

export default function EditProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { profile, setProfile } = useContext(UserContext);
  const [name, setName] = useState(profile.displayName);
  const [email, setEmail] = useState(profile.email);

  const saveChanges = () => {
    const displayName = name.trim().replace(/\s+/g, ' ');
    const normalizedEmail = email.trim().toLowerCase();

    if (!displayName) {
      Alert.alert('Name required', 'Enter your name before saving.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert('Invalid email', 'Enter a valid email address before saving.');
      return;
    }

    const initials = displayName
      .split(' ')
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();

    setProfile((current) => ({
      ...current,
      displayName,
      headerName: displayName.toUpperCase(),
      initials,
      email: normalizedEmail,
    }));
    navigation.goBack();
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + 20, paddingBottom: Math.max(insets.bottom, 24) },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          >
            <Glass radius={14} style={styles.back}>
              <View style={styles.backInner}>
                <Icon name="back" size={24} />
              </View>
            </Glass>
          </Pressable>

          <Text style={styles.title}>Edit Profile</Text>
          <Text style={styles.subtitle}>Update your profile information.</Text>

          <GlassInput
            label="Full name"
            icon="user"
            placeholder="Your full name"
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

          <PrimaryButton
            title="Save Changes"
            onPress={saveChanges}
            style={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
