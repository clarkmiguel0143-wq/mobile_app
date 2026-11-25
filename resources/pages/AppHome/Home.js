import { useContext, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlurTargetView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BlurTargetContext from '../../components/BlurTargetContext';
import Glass from '../../components/Glass';
import Glow from '../../components/Glow';
import Icon from '../../components/Icon';
import BottomNav, { TabSwipeArea } from '../../components/BottomNav';
import { colors, gradients } from '../../theme';
import UserContext from '../../data/UserContext';
import notifications from '../../data/notifications';

const SAMPLE_POSTS = [
  { initials: 'CM', name: 'CLARK MIGUEL', message: 'Baby miss na kita', likes: 12 },
  {
    initials: 'ML',
    name: 'Mav Leigh',
    message: 'Kung dimo mamasamain pwede kaba mapa sakin',
    likes: 8,
  },
];

const POSTS = SAMPLE_POSTS.map((post, index) => ({
  ...post,
  id: `post-${index + 1}`,
}));

function FeedCard({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <Glass radius={18} style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar}>
          <Text style={styles.postAvatarText}>{post.initials}</Text>
        </View>
        <Text style={styles.postName}>{post.name}</Text>
      </View>

      {post.imageUri ? (
        <Image
          accessibilityLabel="Photo in post"
          source={{ uri: post.imageUri }}
          resizeMode="cover"
          style={styles.postImage}
        />
      ) : null}
      {post.message ? (
        <View style={post.imageUri ? styles.postCaption : styles.postMessageBox}>
          <Text
            style={[
              styles.postMessage,
              post.imageUri ? styles.postCaptionText : styles.textPostMessage,
            ]}
          >
            {post.message}
          </Text>
        </View>
      ) : null}

      <View style={styles.postActions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Unlike post' : 'Like post'}
          accessibilityState={{ selected: liked }}
          onPress={() => setLiked((value) => !value)}
          style={styles.postAction}
        >
          <Icon
            name="heart"
            size={20}
            color={liked ? '#FF6384' : colors.white}
            fill={liked ? '#FF6384' : 'none'}
          />
          <Text style={[styles.actionCount, liked && styles.likedCount]}>
            {post.likes + (liked ? 1 : 0)}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Comment on post"
          onPress={() => Alert.alert('Comments', 'Comments are coming soon.')}
          style={styles.actionButton}
        >
          <Icon name="comment" size={19} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Share post"
          onPress={() => Alert.alert('Share post', 'Sharing is coming soon.')}
          style={styles.actionButton}
        >
          <Icon name="share" size={19} />
        </Pressable>
      </View>
    </Glass>
  );
}

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { profile } = useContext(UserContext);
  const blurTarget = useRef(null);
  const feedRef = useRef(null);
  const nextPostId = useRef(1);
  const [posts, setPosts] = useState(POSTS);
  const [draft, setDraft] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const pickPhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Photo access needed',
          'Allow access to your photos to attach one to a post.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets?.[0]) {
        setSelectedPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        'Unable to select photo',
        error instanceof Error ? error.message : 'Please try again.',
      );
    }
  };

  const publishPost = () => {
    const message = draft.trim();
    if (!message && !selectedPhoto) return;

    const id = `user-post-${nextPostId.current}`;
    nextPostId.current += 1;
    setPosts((current) => [
      {
        id,
        initials: profile.initials,
        name: profile.headerName,
        message,
        imageUri: selectedPhoto,
        likes: 0,
      },
      ...current,
    ]);
    setDraft('');
    setSelectedPhoto(null);
    feedRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <TabSwipeArea active="Dashboard" navigation={navigation} style={styles.root}>
      <BlurTargetView
        ref={blurTarget}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      >
        <LinearGradient
          colors={gradients.screen}
          locations={gradients.screenStops}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Glow size={480} color="#34F0B4" opacity={0.5} style={styles.topGlow} />
        <Glow size={520} color="#78B4FF" opacity={0.45} style={styles.bottomGlow} />
      </BlurTargetView>

      <BlurTargetContext.Provider value={blurTarget}>
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <View style={styles.topRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.initials}</Text>
            </View>
            <View style={styles.greetingCol}>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.userName}>{profile.headerName}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Notifications, ${notifications.length}`}
              onPress={() => navigation.navigate('Notifications')}
              style={styles.notificationButton}
            >
              <Glass radius={14} style={styles.bell}>
                <View style={styles.bellInner}>
                  <Icon name="bell" size={24} />
                </View>
              </Glass>
              {notifications.length > 0 ? (
                <View pointerEvents="none" style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notifications.length > 99 ? '99+' : notifications.length}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          </View>

          <Glass radius={18} style={styles.composer}>
            <View style={styles.composerRow}>
              <TextInput
                accessibilityLabel="Write a post"
                style={styles.composerInput}
                placeholder="What's on your mind?"
                placeholderTextColor="rgba(255,255,255,0.85)"
                selectionColor={colors.mint}
                value={draft}
                onChangeText={setDraft}
                multiline
                maxLength={280}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add photo"
                onPress={pickPhoto}
                style={styles.photoButton}
              >
                <Icon name="image" size={21} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Publish post"
                accessibilityState={{ disabled: !draft.trim() && !selectedPhoto }}
                disabled={!draft.trim() && !selectedPhoto}
                onPress={publishPost}
                style={[
                  styles.postButton,
                  !draft.trim() && !selectedPhoto && styles.postButtonDisabled,
                ]}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </Pressable>
            </View>
            {selectedPhoto ? (
              <View style={styles.photoPreviewRow}>
                <Image source={{ uri: selectedPhoto }} style={styles.photoThumbnail} />
                <Text style={styles.photoAttachedText}>Photo attached</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Remove attached photo"
                  onPress={() => setSelectedPhoto(null)}
                  style={styles.removePhotoButton}
                >
                  <Text style={styles.removePhotoText}>Remove</Text>
                </Pressable>
              </View>
            ) : null}
          </Glass>
        </View>

        <ScrollView
          ref={feedRef}
          style={styles.body}
          contentContainerStyle={[styles.feed, { paddingBottom: insets.bottom + 108 }]}
          showsVerticalScrollIndicator={false}
        >
          {posts.map((post) => <FeedCard key={post.id} post={post} />)}
        </ScrollView>

        <BottomNav active="Dashboard" navigation={navigation} />
      </BlurTargetContext.Provider>
    </TabSwipeArea>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  header: {
    minHeight: 264,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'rgba(10,47,122,0.12)',
  },
  topGlow: { top: -200, right: -230 },
  bottomGlow: { bottom: -240, left: -250 },
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
  notificationButton: { width: 44, height: 44 },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.white,
    backgroundColor: '#FF4D67',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  composer: { minHeight: 72, marginTop: 22 },
  composerRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  composerInput: {
    flex: 1,
    minHeight: 42,
    maxHeight: 54,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white,
    padding: 0,
    paddingTop: 8,
  },
  photoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    minWidth: 62,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  postButtonDisabled: { opacity: 0.65 },
  postButtonText: { fontSize: 14, fontWeight: '700', color: colors.blue },
  photoPreviewRow: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  photoThumbnail: { width: 48, height: 48, borderRadius: 8 },
  photoAttachedText: { flex: 1, color: colors.white, fontSize: 13 },
  removePhotoButton: { paddingHorizontal: 8, paddingVertical: 6 },
  removePhotoText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  feed: { paddingHorizontal: 22, paddingTop: 12, gap: 14 },
  post: { padding: 14 },
  postHeader: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 2,
  },
  postAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAvatarText: { fontSize: 12, fontWeight: '700', color: colors.blue },
  postName: { fontSize: 14, fontWeight: '700', color: colors.white },
  postImage: {
    width: '100%',
    height: 240,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  postMessageBox: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postCaption: {
    marginTop: 24,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  postMessage: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.blue,
  },
  textPostMessage: { fontWeight: '600' },
  postCaptionText: { color: colors.white },
  postActions: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 2,
  },
  postAction: {
    minWidth: 64,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCount: { color: colors.white, fontSize: 12, fontWeight: '600' },
  likedCount: { color: '#FF6384' },
});
