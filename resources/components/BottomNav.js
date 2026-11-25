import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';
import { colors, gradients, shadows } from '../theme';

const TABS = [
  { key: 'Dashboard', label: 'Home', icon: 'home' },
  { key: 'Profile', label: 'Profile', icon: 'user' },
];

export default function BottomNav({ active, navigation }) {
  const insets = useSafeAreaInsets();

  const switchTab = (name) => {
    const state = navigation.getState();
    const routeExists = state.routes.some((route) => route.name === name);

    if (routeExists) {
      navigation.popTo(name);
    } else {
      navigation.navigate(name);
    }
  };

  return (
    <View style={[styles.bar, shadows.card, { bottom: Math.max(insets.bottom, 24) }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => !isActive && switchTab(tab.key)}
            style={styles.tab}
          >
            {isActive ? (
              <LinearGradient
                colors={gradients.accent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.pill}
              >
                <Icon name={tab.icon} size={20} color={colors.white} />
              </LinearGradient>
            ) : (
              <View style={styles.pill}>
                <Icon name={tab.icon} size={20} color={colors.muted} />
              </View>
            )}
            <Text style={[styles.label, { color: isActive ? colors.blue : colors.muted }]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export const NAV_HEIGHT = 72;

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    height: NAV_HEIGHT,
    borderRadius: 36,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },
  tab: { flex: 1, alignItems: 'center', paddingTop: 6 },
  pill: { width: 48, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  label: { marginTop: 2, fontSize: 12, fontWeight: '600' },
});
