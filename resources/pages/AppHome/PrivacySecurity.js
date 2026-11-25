import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Glass from '../../components/Glass';
import GradientBackground from '../../components/GradientBackground';
import Icon from '../../components/Icon';
import { colors } from '../../theme';

export default function PrivacySecurityScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
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
        <Text style={styles.title}>Privacy &amp; Security</Text>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 24 },
  back: { width: 44, height: 44 },
  backInner: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 22, fontSize: 30, fontWeight: '700', color: colors.white },
});
