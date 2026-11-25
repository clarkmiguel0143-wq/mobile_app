import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';
import { colors, gradients, shadows } from '../theme';

function navigateToTab(navigation, name) {
  const state = navigation.getState();
  if (state.routes[state.index]?.name === name) return;

  if (state.routes.some((route) => route.name === name)) {
    navigation.popTo(name);
  } else {
    navigation.navigate(name);
  }
}

const BottomNavContext = createContext({
  visible: true,
  switchTab: (name, navigation) => navigateToTab(navigation, name),
  completeTabTransition: () => {},
});

export function BottomNavProvider({ children }) {
  const [visible, setVisible] = useState(true);
  const timer = useRef(null);
  const pendingTransition = useRef(false);

  const completeTabTransition = useCallback(() => {
    if (!pendingTransition.current) return;

    pendingTransition.current = false;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setVisible(false);
      timer.current = null;
    }, 1000);
    setVisible(true);
  }, []);

  const switchTab = useCallback((name, navigation) => {
    const state = navigation.getState();
    if (state.routes[state.index]?.name === name) return;

    pendingTransition.current = true;
    setVisible(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(completeTabTransition, 500);

    navigateToTab(navigation, name);
  }, [completeTabTransition]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <BottomNavContext.Provider value={{ visible, switchTab, completeTabTransition }}>
      {children}
    </BottomNavContext.Provider>
  );
}

export function TabSwipeArea({ active, navigation, children, style }) {
  const { switchTab, completeTabTransition } = useContext(BottomNavContext);
  const gestureContext = useRef({ active, navigation, switchTab });
  gestureContext.current = { active, navigation, switchTab };

  useEffect(
    () => navigation.addListener('transitionEnd', completeTabTransition),
    [navigation, completeTabTransition],
  );

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_event, gesture) =>
      Math.abs(gesture.dx) > 18 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.25,
    onPanResponderRelease: (_event, gesture) => {
      if (Math.abs(gesture.dx) < 70 || Math.abs(gesture.dx) <= Math.abs(gesture.dy) * 1.25) {
        return;
      }

      const { active: currentTab, navigation: currentNavigation, switchTab: changeTab } =
        gestureContext.current;
      if (currentTab === 'Dashboard' && gesture.dx < 0) {
        changeTab('Profile', currentNavigation);
      } else if (currentTab === 'Profile' && gesture.dx > 0) {
        changeTab('Dashboard', currentNavigation);
      }
    },
  })).current;

  return (
    <View style={style} {...panResponder.panHandlers}>
      {children}
    </View>
  );
}

const TABS = [
  { key: 'Dashboard', label: 'Home', icon: 'home' },
  { key: 'Profile', label: 'Profile', icon: 'user' },
];

export default function BottomNav({ active, navigation }) {
  const insets = useSafeAreaInsets();
  const { visible, switchTab } = useContext(BottomNavContext);
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(visible ? 0 : 14)).current;
  const scale = useRef(new Animated.Value(visible ? 1 : 0.94)).current;

  useEffect(() => {
    const show = visible;
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: show ? 1 : 0,
        duration: show ? 260 : 200,
        easing: show ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: show ? 0 : 14,
        duration: show ? 260 : 200,
        easing: show ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: show ? 1 : 0.94,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [opacity, scale, translateY, visible]);

  return (
    <Animated.View
      accessibilityElementsHidden={!visible}
      importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.bar,
        shadows.card,
        { bottom: Math.max(insets.bottom, 24) },
        { opacity, transform: [{ translateY }, { scale }] },
      ]}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => !isActive && switchTab(tab.key, navigation)}
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
    </Animated.View>
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
