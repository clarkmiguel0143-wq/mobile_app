import { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
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
import { colors, gradients } from '../../theme';
import UserContext from '../../data/UserContext';

const SAMPLE_POSTS = [
  {
    initials: 'CM',
    name: 'CLARK MIGUEL',
    message: 'Baby miss na kita',
    likes: 12,
    isOwnPost: true,
  },
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
  comments: [],
}));

function FeedCard({
  post,
  allowCommentsOnMyPosts,
  onAddComment,
  onEditPost,
  onDeletePost,
  onViewProfile,
}) {
  const [liked, setLiked] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(post.message);

  const submitComment = () => {
    const message = commentDraft.trim();
    if (!message) return;

    onAddComment(post.id, message);
    setCommentDraft('');
  };

  const saveEdit = () => {
    const message = editDraft.trim();
    if (!message && !post.imageUri) return;

    onEditPost(post.id, message);
    setEditing(false);
  };

  const canSaveEdit = Boolean(editDraft.trim() || post.imageUri)
    && editDraft.trim() !== post.message;

  return (
    <Glass radius={18} style={styles.post}>
      <View style={styles.postHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`View ${post.name}'s profile`}
          onPress={() => onViewProfile(post)}
          style={({ pressed }) => [styles.postAvatar, pressed && styles.postAuthorPressed]}
        >
          <Text style={styles.postAvatarText}>{post.initials}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`View ${post.name}'s profile`}
          onPress={() => onViewProfile(post)}
          style={({ pressed }) => [styles.postNameButton, pressed && styles.postAuthorPressed]}
        >
          <Text style={styles.postName}>{post.name}</Text>
        </Pressable>
        {post.isOwnPost ? (
          <View style={styles.postOwnerActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit post"
              accessibilityHint="Opens an editor for your post."
              accessibilityState={{ selected: editing }}
              onPress={() => {
                setEditDraft(post.message);
                setEditing(true);
              }}
              style={({ pressed }) => [styles.editPostButton, pressed && styles.editPostPressed]}
            >
              <Icon name="pencil" size={15} color={colors.mint} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Delete post"
              accessibilityHint="Opens a confirmation before removing your post."
              onPress={() => onDeletePost(post.id)}
              style={({ pressed }) => [styles.deletePostButton, pressed && styles.deletePostPressed]}
            >
              <Icon name="trash" size={16} color="#FF8793" />
            </Pressable>
          </View>
        ) : null}
      </View>

      {post.imageUri ? (
        <Image
          accessibilityLabel="Photo in post"
          source={{ uri: post.imageUri }}
          resizeMode="cover"
          style={styles.postImage}
        />
      ) : null}
      {editing ? (
        <View style={post.imageUri ? styles.editPostCaption : styles.editPostMessage}>
          <TextInput
            accessibilityLabel={post.imageUri ? 'Edit post caption' : 'Edit post text'}
            style={[
              styles.editPostInput,
              post.imageUri ? styles.editPostInputOnImage : styles.editPostInputOnWhite,
            ]}
            value={editDraft}
            onChangeText={setEditDraft}
            placeholder={post.imageUri ? 'Write a caption...' : 'Write your post...'}
            placeholderTextColor={post.imageUri ? 'rgba(255,255,255,0.65)' : colors.muted}
            selectionColor={colors.mint}
            multiline
            maxLength={280}
          />
          <View style={styles.editPostActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cancel editing post"
              onPress={() => setEditing(false)}
              style={({ pressed }) => [styles.cancelEditButton, pressed && styles.editActionPressed]}
            >
              <Text style={styles.cancelEditText}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Save post edits"
              accessibilityState={{ disabled: !canSaveEdit }}
              disabled={!canSaveEdit}
              onPress={saveEdit}
              style={[styles.saveEditButton, !canSaveEdit && styles.saveEditDisabled]}
            >
              <Text style={styles.saveEditText}>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : post.message ? (
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
          accessibilityLabel={`${commentsVisible ? 'Hide' : 'Show'} comments, ${post.comments.length}`}
          accessibilityState={{ expanded: commentsVisible }}
          onPress={() => setCommentsVisible((visible) => !visible)}
          style={styles.commentAction}
        >
          <Icon name="comment" size={19} />
          <Text style={styles.actionCount}>{post.comments.length}</Text>
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

      {commentsVisible ? (
        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeading}>Comments</Text>
          {post.comments.length > 0 ? (
            <View style={styles.commentsList}>
              {post.comments.map((comment) => (
                <View key={comment.id} style={styles.commentRow}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentAvatarText}>{comment.initials}</Text>
                  </View>
                  <View style={styles.commentBubble}>
                    <Text style={styles.commentName}>{comment.name}</Text>
                    <Text style={styles.commentMessage}>{comment.message}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyComments}>No comments yet. Start the conversation.</Text>
          )}
          {post.isOwnPost && !allowCommentsOnMyPosts ? (
            <Text style={styles.emptyComments}>Comments are turned off for this post.</Text>
          ) : (
            <View style={styles.commentComposer}>
              <TextInput
                accessibilityLabel="Write a comment"
                style={styles.commentInput}
                placeholder="Write a comment..."
                placeholderTextColor="rgba(255,255,255,0.65)"
                selectionColor={colors.mint}
                value={commentDraft}
                onChangeText={setCommentDraft}
                multiline
                maxLength={280}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Send comment"
                accessibilityState={{ disabled: !commentDraft.trim() }}
                disabled={!commentDraft.trim()}
                onPress={submitComment}
                style={[styles.sendCommentButton, !commentDraft.trim() && styles.sendCommentDisabled]}
              >
                <Text style={styles.sendCommentText}>Send</Text>
              </Pressable>
            </View>
          )}
        </View>
      ) : null}
    </Glass>
  );
}

export default function HomeScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { profile, privacySettings, notifications } = useContext(UserContext);
  const blurTarget = useRef(null);
  const feedRef = useRef(null);
  const postOffsets = useRef({});
  const nextPostId = useRef(1);
  const nextCommentId = useRef(1);
  const [posts, setPosts] = useState(POSTS);
  const [draft, setDraft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const unreadNotificationCount = notifications.filter((notification) => !notification.read).length;
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const people = [
    {
      key: 'current-user',
      displayName: profile.displayName,
      initials: profile.initials,
      isOwnProfile: true,
    },
    ...posts
      .filter((post) => !post.isOwnPost)
      .map((post) => ({
        key: `person-${post.name.toLowerCase()}`,
        displayName: post.name,
        initials: post.initials,
        isOwnProfile: false,
      })),
  ].filter((person, index, list) => (
    list.findIndex((candidate) => candidate.key === person.key) === index
  ));
  const matchingPeople = normalizedSearch
    ? people.filter((person) => person.displayName.toLowerCase().includes(normalizedSearch))
    : [];
  const matchingPosts = normalizedSearch
    ? posts.filter((post) => (
      post.name.toLowerCase().includes(normalizedSearch)
      || post.message.toLowerCase().includes(normalizedSearch)
    ))
    : posts;

  useEffect(() => {
    const postId = route?.params?.openPostId;
    if (!postId) return undefined;
    if (searchQuery.trim()) {
      setSearchQuery('');
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      const offset = postOffsets.current[postId];
      if (posts.some((post) => post.id === postId) && Number.isFinite(offset)) {
        feedRef.current?.scrollTo({ y: offset, animated: true });
      }
      navigation.setParams({ openPostId: undefined });
    });

    return () => cancelAnimationFrame(frame);
  }, [navigation, posts, route?.params?.openPostId, searchQuery]);

  const addComment = (postId, message) => {
    const comment = {
      id: `comment-${nextCommentId.current}`,
      initials: profile.initials,
      name: profile.headerName,
      message: message.trim(),
    };
    nextCommentId.current += 1;
    setPosts((current) => current.map((post) => (
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    )));
  };

  const editPost = (postId, message) => {
    setPosts((current) => current.map((post) => (
      post.id === postId && post.isOwnPost
        ? { ...post, message }
        : post
    )));
  };

  const confirmDeletePost = (postId) => {
    setPostToDelete(postId);
  };

  const deletePost = () => {
    if (!postToDelete) return;

    setPosts((current) => current.filter((post) => post.id !== postToDelete));
    setPostToDelete(null);
  };

  const viewPostAuthorProfile = (post) => {
    navigation.navigate('Profile', {
      profileUser: post.isOwnPost
        ? null
        : { displayName: post.name, initials: post.initials },
    });
  };

  const viewSearchResultProfile = (person) => {
    navigation.navigate('Profile', {
      profileUser: person.isOwnProfile
        ? null
        : { displayName: person.displayName, initials: person.initials },
    });
  };

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
        comments: [],
        isOwnPost: true,
      },
      ...current,
    ]);
    setDraft('');
    setSearchQuery('');
    setSelectedPhoto(null);
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
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              onPress={() => navigation.navigate('Profile')}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>{profile.initials}</Text>
            </Pressable>
            <View style={styles.greetingCol}>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.userName}>{profile.headerName}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Notifications, ${unreadNotificationCount} unread`}
              onPress={() => navigation.navigate('Notifications')}
              style={styles.notificationButton}
            >
              <Glass radius={14} style={styles.bell}>
                <View style={styles.bellInner}>
                  <Icon name="bell" size={24} />
                </View>
              </Glass>
              {unreadNotificationCount > 0 ? (
                <View pointerEvents="none" style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          </View>

          <View style={styles.searchBar}>
            <Icon name="search" size={19} color="rgba(255,255,255,0.8)" />
            <TextInput
              accessibilityLabel="Search people and posts"
              style={styles.searchInput}
              placeholder="Search people and posts"
              placeholderTextColor="rgba(255,255,255,0.7)"
              selectionColor={colors.mint}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              autoCapitalize="none"
            />
            {searchQuery.length > 0 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear search"
                onPress={() => setSearchQuery('')}
                style={styles.clearSearchButton}
              >
                <Text style={styles.clearSearchText}>Clear</Text>
              </Pressable>
            ) : null}
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
          contentContainerStyle={[styles.feed, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
        >
          {normalizedSearch ? (
            <View style={styles.searchResults}>
              <Text style={styles.searchSectionTitle}>People</Text>
              {matchingPeople.length > 0 ? (
                matchingPeople.map((person) => (
                  <Pressable
                    key={person.key}
                    accessibilityRole="button"
                    accessibilityLabel={`View ${person.displayName}'s profile`}
                    onPress={() => viewSearchResultProfile(person)}
                    style={({ pressed }) => [
                      styles.personResult,
                      pressed && styles.personResultPressed,
                    ]}
                  >
                    <View style={styles.personResultAvatar}>
                      <Text style={styles.personResultInitials}>{person.initials}</Text>
                    </View>
                    <Text style={styles.personResultName}>{person.displayName}</Text>
                    <Icon name="chevron" size={20} color="rgba(255,255,255,0.75)" />
                  </Pressable>
                ))
              ) : (
                <Text style={styles.searchEmptyText}>No people found.</Text>
              )}
              <Text style={styles.searchSectionTitle}>Posts</Text>
              {matchingPosts.length === 0 ? (
                <Text style={styles.searchEmptyText}>No posts found.</Text>
              ) : null}
            </View>
          ) : null}
          {matchingPosts.map((post) => (
            <View
              key={post.id}
              onLayout={(event) => {
                postOffsets.current[post.id] = event.nativeEvent.layout.y;
              }}
            >
              <FeedCard
                post={post}
                allowCommentsOnMyPosts={privacySettings.allowCommentsOnMyPosts}
                onAddComment={addComment}
                onEditPost={editPost}
                onDeletePost={confirmDeletePost}
                onViewProfile={viewPostAuthorProfile}
              />
            </View>
          ))}
        </ScrollView>
      </BlurTargetContext.Provider>
      <Modal
        visible={postToDelete !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPostToDelete(null)}
      >
        <View style={styles.deleteDialogBackdrop}>
          <View
            accessibilityViewIsModal
            style={styles.deleteDialog}
          >
            <Text style={styles.deleteDialogTitle}>Delete post?</Text>
            <Text style={styles.deleteDialogMessage}>
              This post will be removed from your feed.
            </Text>
            <View style={styles.deleteDialogActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancel deleting post"
                onPress={() => setPostToDelete(null)}
                style={({ pressed }) => [
                  styles.deleteDialogCancel,
                  pressed && styles.editActionPressed,
                ]}
              >
                <Text style={styles.deleteDialogCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Confirm delete post"
                onPress={deletePost}
                style={({ pressed }) => [
                  styles.deleteDialogConfirm,
                  pressed && styles.deleteDialogConfirmPressed,
                ]}
              >
                <Text style={styles.deleteDialogConfirmText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  deleteDialogBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5,20,48,0.58)',
    padding: 24,
  },
  deleteDialog: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    backgroundColor: colors.white,
    padding: 22,
  },
  deleteDialogTitle: { color: colors.ink, fontSize: 19, fontWeight: '700' },
  deleteDialogMessage: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  deleteDialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 22,
  },
  deleteDialogCancel: {
    minWidth: 82,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D5DFEA',
    paddingHorizontal: 14,
  },
  deleteDialogCancelText: { color: colors.ink, fontSize: 14, fontWeight: '600' },
  deleteDialogConfirm: {
    minWidth: 82,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.danger,
    paddingHorizontal: 14,
  },
  deleteDialogConfirmPressed: { opacity: 0.8 },
  deleteDialogConfirmText: { color: colors.white, fontSize: 14, fontWeight: '700' },
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
  searchBar: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 13,
  },
  searchInput: {
    flex: 1,
    height: 42,
    color: colors.white,
    fontSize: 14,
    padding: 0,
  },
  clearSearchButton: { paddingVertical: 8, paddingLeft: 4 },
  clearSearchText: { color: colors.mint, fontSize: 12, fontWeight: '700' },
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
  searchResults: { gap: 8, marginBottom: 4 },
  searchSectionTitle: {
    marginTop: 4,
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  personResult: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
  },
  personResultPressed: { opacity: 0.75 },
  personResultAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  personResultInitials: { color: colors.blue, fontSize: 10, fontWeight: '700' },
  personResultName: { flex: 1, color: colors.white, fontSize: 14, fontWeight: '600' },
  searchEmptyText: { color: colors.textSoft, fontSize: 13, paddingVertical: 3 },
  post: { padding: 14 },
  postHeader: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 2,
  },
  postOwnerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginLeft: 'auto',
  },
  editPostButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201,255,232,0.35)',
    backgroundColor: 'rgba(201,255,232,0.12)',
  },
  editPostPressed: { opacity: 0.7 },
  deletePostButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,135,147,0.42)',
    backgroundColor: 'rgba(255,99,132,0.14)',
  },
  deletePostPressed: { opacity: 0.7 },
  editPostMessage: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 12,
  },
  editPostCaption: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 10,
  },
  editPostInput: {
    minHeight: 64,
    maxHeight: 140,
    fontSize: 15,
    lineHeight: 21,
    padding: 0,
    textAlignVertical: 'top',
  },
  editPostInputOnImage: { color: colors.white },
  editPostInputOnWhite: { color: colors.blue },
  editPostActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 10,
  },
  cancelEditButton: {
    minWidth: 70,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 12,
  },
  cancelEditText: { color: colors.white, fontSize: 13, fontWeight: '600' },
  saveEditButton: {
    minWidth: 70,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  saveEditDisabled: { opacity: 0.55 },
  saveEditText: { color: colors.blue, fontSize: 13, fontWeight: '700' },
  editActionPressed: { opacity: 0.75 },
  postAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAvatarText: { fontSize: 12, fontWeight: '700', color: colors.blue },
  postNameButton: { flexShrink: 1 },
  postAuthorPressed: { opacity: 0.72 },
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
  commentAction: {
    minWidth: 56,
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
  commentsSection: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.22)',
    gap: 10,
  },
  commentsHeading: { color: colors.white, fontSize: 14, fontWeight: '700' },
  commentsList: { gap: 9 },
  commentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: { color: colors.blue, fontSize: 10, fontWeight: '700' },
  commentBubble: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  commentName: { color: colors.white, fontSize: 12, fontWeight: '700' },
  commentMessage: { marginTop: 3, color: colors.textSoft, fontSize: 13, lineHeight: 18 },
  emptyComments: { color: colors.textSoft, fontSize: 13, lineHeight: 18 },
  commentComposer: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 84,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: colors.white,
    fontSize: 13,
    lineHeight: 18,
  },
  sendCommentButton: {
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  sendCommentDisabled: { opacity: 0.55 },
  sendCommentText: { color: colors.blue, fontSize: 13, fontWeight: '700' },
});
