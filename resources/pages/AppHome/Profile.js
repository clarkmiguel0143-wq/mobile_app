import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Glow from '../../components/Glow';
import Icon from '../../components/Icon';
import { colors, gradients, shadows } from '../../theme';
import UserContext from '../../data/UserContext';

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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  header: {
    minHeight: 290,
    paddingBottom: 18,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  glow: { top: -200, right: -230 },
  backButton: {
    position: 'absolute',
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: { opacity: 0.75 },
  screenTitle: { fontSize: 18, fontWeight: '700', color: colors.white },
  ring: {
    marginTop: 16,
    padding: 4,
    borderRadius: 54,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 34, fontWeight: '700', color: colors.blue },
  name: { marginTop: 14, fontSize: 22, fontWeight: '700', color: colors.white },
  email: { marginTop: 3, fontSize: 13, color: colors.textSoft },
  menu: { paddingHorizontal: 24, marginTop: 23, gap: 13 },
  row: {
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 12,
  },
  rowPressed: { opacity: 0.8 },
  tile: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.ink },
  logout: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(229,72,77,0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: colors.danger },
});
