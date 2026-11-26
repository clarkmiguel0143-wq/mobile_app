import { useContext } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../../components/Icon';
import { colors, gradients } from '../../theme';
import UserContext from '../../data/UserContext';

function getActivityStyle(activity) {
  if (activity.includes('liked')) {
    return { icon: 'heart', color: '#FF6384', backgroundColor: 'rgba(255,99,132,0.18)' };
  }
  if (activity.includes('commented')) {
    return { icon: 'comment', color: '#8CC8FF', backgroundColor: 'rgba(140,200,255,0.18)' };
  }
  return { icon: 'share', color: colors.mint, backgroundColor: 'rgba(201,255,232,0.18)' };
}

function NotificationItem({ notification, onPress }) {
  const activityStyle = getActivityStyle(notification.activity);
  const initials = notification.userName
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${notification.userName} ${notification.activity}${notification.read ? '' : ', unread'}`}
      accessibilityHint="Opens the post and marks this notification as read."
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        !notification.read && styles.unreadCard,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
        <View style={[styles.activityBadge, { backgroundColor: activityStyle.backgroundColor }]}>
          <Icon name={activityStyle.icon} size={12} color={activityStyle.color} />
        </View>
      </View>
      <View style={styles.notificationCopy}>
        <Text style={styles.message}>
          <Text style={styles.userName}>{notification.userName}</Text>
          {' '}
          {notification.activity}
        </Text>
        <Text style={styles.tapHint}>Tap to view post</Text>
      </View>
      {!notification.read ? <View style={styles.unreadDot} /> : null}
      <Icon name="chevron" size={18} color="rgba(255,255,255,0.7)" />
    </Pressable>
  );
}

export default function NotificationsScreen({ navigation }) {
  const { notifications, setNotifications } = useContext(UserContext);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const markAllAsRead = () => {
    setNotifications((current) => current.map((notification) => (
      notification.read ? notification : { ...notification, read: true }
    )));
  };

  const openNotification = (notification) => {
    setNotifications((current) => current.map((item) => (
      item.id === notification.id ? { ...item, read: true } : item
    )));
    navigation.popTo('Dashboard', { openPostId: notification.postId });
  };

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
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>
              {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          {unreadCount > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Mark all notifications as read"
              onPress={markAllAsRead}
              style={({ pressed }) => pressed && styles.markAllPressed}
            >
              <Text style={styles.markAllText}>Mark all read</Text>
            </Pressable>
          ) : null}
        </View>
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onPress={() => openNotification(notification)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Icon name="bell" size={24} color={colors.white} />
              </View>
              <Text style={styles.emptyTitle}>You're all caught up</Text>
              <Text style={styles.emptyMessage}>New activity will show up here.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 22, paddingBottom: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: colors.white, fontSize: 24, fontWeight: '700', letterSpacing: -0.3 },
  subtitle: { marginTop: 4, color: colors.textSoft, fontSize: 13 },
  countBadge: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  markAllPressed: { opacity: 0.7 },
  markAllText: { color: colors.mint, fontSize: 12, fontWeight: '700' },
  list: { paddingBottom: 8, gap: 10 },
  card: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  unreadCard: {
    borderColor: 'rgba(255,255,255,0.42)',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  cardPressed: { opacity: 0.8 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  activityBadge: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1565D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
  notificationCopy: { flex: 1 },
  tapHint: { marginTop: 5, color: colors.textSoft, fontSize: 11 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.mint,
    marginHorizontal: 8,
  },
  userName: { fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingHorizontal: 16, paddingTop: 40 },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { marginTop: 14, color: colors.white, fontSize: 16, fontWeight: '700' },
  emptyMessage: { marginTop: 5, color: colors.textSoft, fontSize: 13, textAlign: 'center' },
});
