import { useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlurTargetView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BlurTargetContext from '../../components/BlurTargetContext';
import Glass from '../../components/Glass';
import Glow from '../../components/Glow';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';
import { colors, gradients } from '../../theme';
import { user } from '../../data/user';

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

      <View style={styles.postMessageBox}>
        <Text style={styles.postMessage}>{post.message}</Text>
      </View>

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
  const blurTarget = useRef(null);
  const feedRef = useRef(null);
  const nextPostId = useRef(1);
  const [posts, setPosts] = useState(POSTS);
  const [draft, setDraft] = useState('');

  const publishPost = () => {
    const message = draft.trim();
    if (!message) return;

    const id = `user-post-${nextPostId.current}`;
    nextPostId.current += 1;
    setPosts((current) => [
      { id, initials: user.initials, name: user.headerName, message, likes: 0 },
      ...current,
    ]);
    setDraft('');
    feedRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.root}>
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
                accessibilityLabel="Publish post"
                accessibilityState={{ disabled: !draft.trim() }}
                disabled={!draft.trim()}
                onPress={publishPost}
                style={[styles.postButton, !draft.trim() && styles.postButtonDisabled]}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </Pressable>
            </View>
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
    </View>
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
  feed: { paddingHorizontal: 22, paddingTop: 12, gap: 14 },
  post: { padding: 10 },
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
  postMessageBox: {
    minHeight: 104,
    marginTop: 5,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  postMessage: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.blue,
  },
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
