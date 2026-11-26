import { useContext } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Glass from '../../components/Glass';
import GradientBackground from '../../components/GradientBackground';
import Icon from '../../components/Icon';
import { colors } from '../../theme';
import UserContext from '../../data/UserContext';
import styles from './PrivacySecurity.styles';

function PrivacySettingRow({ icon, title, description, value, onValueChange }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Icon name={icon} size={19} />
      </View>
      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        accessibilityLabel={title}
        accessibilityHint={description}
        accessibilityState={{ checked: value }}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: 'rgba(255,255,255,0.28)', true: colors.green }}
        thumbColor={colors.white}
        ios_backgroundColor="rgba(255,255,255,0.28)"
      />
    </View>
  );
}

export default function PrivacySecurityScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { privacySettings, setPrivacySettings } = useContext(UserContext);

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20, paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={({ pressed }) => pressed && styles.backPressed}
        >
          <Glass radius={14} style={styles.back}>
            <View style={styles.backInner}>
              <Icon name="back" size={24} />
            </View>
          </Glass>
        </Pressable>
        <Text style={styles.title}>Privacy &amp; Security</Text>
        <Text style={styles.subtitle}>Choose what you share and how people can interact with your posts.</Text>

        <Text style={styles.sectionTitle}>Profile visibility</Text>
        <View style={styles.settingsCard}>
          <PrivacySettingRow
            icon="mail"
            title="Show email on profile"
            description="Let people see your email address on your profile."
            value={privacySettings.showEmailOnProfile}
            onValueChange={(value) => setPrivacySettings((current) => ({
              ...current,
              showEmailOnProfile: value,
            }))}
          />
        </View>

        <Text style={styles.sectionTitle}>Post interactions</Text>
        <View style={styles.settingsCard}>
          <PrivacySettingRow
            icon="comment"
            title="Allow comments on my posts"
            description="Let people add comments to posts you share."
            value={privacySettings.allowCommentsOnMyPosts}
            onValueChange={(value) => setPrivacySettings((current) => ({
              ...current,
              allowCommentsOnMyPosts: value,
            }))}
          />
        </View>

        <View style={styles.note}>
          <Icon name="shield" size={18} color={colors.mint} />
          <Text style={styles.noteText}>Your choices take effect immediately and remain active for this app session.</Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
