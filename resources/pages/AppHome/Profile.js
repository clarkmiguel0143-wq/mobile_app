import { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Glow from '../../components/Glow';
import Icon from '../../components/Icon';
import { colors, gradients, shadows } from '../../theme';
import UserContext from '../../data/UserContext';
import styles from './Profile.styles';

function MenuRow({ icon, title, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.row, shadows.card, pressed && styles.rowPressed]}
    >
      <LinearGradient
        colors={gradients.accent}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tile}
      >
        <Icon name={icon} size={20} />
      </LinearGradient>
      <Text style={styles.rowTitle}>{title}</Text>
      <Icon name="chevron" size={24} color={colors.muted} />
    </Pressable>
  );
}

export default function ProfileScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const navBottom = Math.max(insets.bottom, 24);
  const { profile, privacySettings } = useContext(UserContext);
  const viewedProfile = route.params?.profileUser ?? profile;
  const isOwnProfile = !route.params?.profileUser;

  const logOut = () => navigation.getParent()?.reset({
    index: 0,
    routes: [{ name: 'Landing' }],
  });

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradients.screen}
        locations={gradients.screenStops}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <Glow size={480} color="#34F0B4" opacity={0.5} style={styles.glow} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to Home"
          onPress={() => navigation.navigate('Dashboard')}
          style={({ pressed }) => [
            styles.backButton,
            { top: insets.top + 10 },
            pressed && styles.backButtonPressed,
          ]}
        >
          <Icon name="back" size={23} />
        </Pressable>
        <Text style={styles.screenTitle}>Profile</Text>
        <View style={styles.ring}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{viewedProfile.initials}</Text>
          </View>
        </View>
        <Text style={styles.name}>{viewedProfile.displayName}</Text>
        {isOwnProfile && privacySettings.showEmailOnProfile ? (
          <Text style={styles.email}>{profile.email}</Text>
        ) : null}
      </LinearGradient>

      {isOwnProfile ? (
        <>
          <View style={styles.menu}>
            <MenuRow
              icon="pencil"
              title="Edit Profile"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <MenuRow
              icon="shield"
              title="Privacy & Security"
              onPress={() => navigation.navigate('PrivacySecurity')}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={logOut}
            style={[styles.logout, { bottom: navBottom + 20 }]}
          >
            <Icon name="logout" size={24} color={colors.danger} />
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}
