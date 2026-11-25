import { StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Glass from '../../components/Glass';
import Glow from '../../components/Glow';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';
import { colors, gradients } from '../../theme';
import { user } from '../../data/user';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

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

        <View style={styles.topRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initials}</Text>
          </View>
          <View style={styles.greetingCol}>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>{user.headerName}</Text>
          </View>
          <Glass radius={14} style={styles.bell}>
            <View style={styles.bellInner}>
              <Icon name="bell" size={24} />
            </View>
          </Glass>
        </View>

        <Glass radius={18} style={styles.search}>
          <View style={styles.searchRow}>
            <Icon name="search" size={22} />
            <TextInput
              accessibilityLabel="Search"
              style={styles.searchInput}
              placeholder="Search anything..."
              placeholderTextColor="rgba(255,255,255,0.85)"
              selectionColor={colors.mint}
              returnKeyType="search"
            />
          </View>
        </Glass>
      </LinearGradient>

      <View style={styles.body} />

      <BottomNav active="Dashboard" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  header: {
    minHeight: 300,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  glow: { top: -200, right: -230 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700', color: colors.blue },
  greetingCol: { flex: 1 },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  userName: { marginTop: 2, fontSize: 19, fontWeight: '700', color: colors.white },
  bell: { width: 44, height: 44 },
  bellInner: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  search: { height: 54, marginTop: 30 },
  searchRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    gap: 12,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.white, padding: 0 },
  body: { flex: 1 },
});
