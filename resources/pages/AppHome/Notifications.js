import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import notifications from '../../data/notifications';
import { colors, gradients } from '../../theme';

export default function NotificationsScreen() {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradients.screen}
        locations={gradients.screenStops}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Notifications</Text>
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((notification) => (
            <Text key={notification.id} style={styles.notification}>
              <Text style={styles.userName}>{notification.userName}</Text>
              {' '}
              {notification.activity}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 16, paddingBottom: 8 },
  title: { color: colors.white, fontSize: 17, fontWeight: '700' },
  list: { paddingTop: 8, paddingBottom: 4, gap: 8 },
  notification: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 18,
  },
  userName: { fontWeight: '700' },
});
