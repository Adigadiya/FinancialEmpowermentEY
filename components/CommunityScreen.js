import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = () => {
  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      name: 'User1',
      avatar: require('../assets/user1.jpg'),
      content: 'How do I apply for a government subsidy?',
      upvotes: 10,
      downvotes: 2,
      image: require('../assets/user1.jpg'),
      comments: [
        {
          id: 101,
          name: 'Rahul Yadav',
          content: 'Is there any website for checking eligibility?',
          replies: [
            { id: 202, name: 'User4', content: 'Yes, you can check on the official government website for subsidies.' },
            { id: 203, name: 'User5', content: 'I found the eligibility details on the NABARD website as well.' }
          ]
        }
      ]
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (result.canceled) return;
    setNewPostImage(result.assets[0].uri);
  };

  const handlePost = () => {
    if (!newPostContent.trim() && !newPostImage) return;
    const newPost = {
      id: Date.now(),
      name: 'You',
      avatar: require('../assets/user1.jpg'),
      content: newPostContent,
      image: newPostImage,
      upvotes: 0,
      downvotes: 0,
      comments: []
    };
    setForumPosts([newPost, ...forumPosts]);
    setNewPostContent('');
    setNewPostImage(null);
  };

  const handleUpvote = (postId) => {
    setForumPosts(forumPosts.map(post => post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post));
  };

  const handleDownvote = (postId) => {
    setForumPosts(forumPosts.map(post => post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post));
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    setForumPosts(forumPosts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, { id: Date.now(), name: 'You', content: newComment, replies: [] }] } : post
    ));
    setNewComment('');
  };

  const handleAddReply = (postId, commentId) => {
    if (!newReply.trim()) return;
    setForumPosts(forumPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => 
            comment.id === commentId ? { ...comment, replies: [...comment.replies, { id: Date.now(), name: 'You', content: newReply }] } : comment
          )
        };
      }
      return post;
    }));
    setNewReply('');
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Community Forum</Text>
          <TextInput
            placeholder="Write a post..."
            value={newPostContent}
            onChangeText={setNewPostContent}
            style={styles.input}
          />
          {newPostImage && <Image source={{ uri: newPostImage }} style={styles.previewImage} />}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePickImage} style={styles.button}>
              <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePost} style={[styles.button, styles.postButton]}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      data={forumPosts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <View style={styles.userInfo}>
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.postAuthor}>{item.name}</Text>
          </View>
          <Text style={styles.postContent}>{item.content}</Text>
          {item.image && <Image source={item.image} style={styles.postImage} />}
          <View style={styles.voteContainer}>
            <TouchableOpacity onPress={() => handleUpvote(item.id)}>
              <Ionicons name="arrow-up" size={20} color="green" />
            </TouchableOpacity>
            <Text>{item.upvotes}</Text>
            <TouchableOpacity onPress={() => handleDownvote(item.id)}>
              <Ionicons name="arrow-down" size={20} color="red" />
            </TouchableOpacity>
            <Text>{item.downvotes}</Text>
          </View>
          <TextInput
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => handleAddComment(item.id)} style={styles.button}>
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
          <FlatList
            data={item.comments}
            keyExtractor={(comment) => comment.id.toString()}
            renderItem={({ item: comment }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentAuthor}>{comment.name}:</Text>
                <Text style={styles.commentContent}>{comment.content}</Text>
                <TextInput
                  placeholder="Write a reply..."
                  value={newReply}
                  onChangeText={setNewReply}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => handleAddReply(item.id, comment.id)} style={styles.button}>
                  <Text style={styles.buttonText}>Reply</Text>
                </TouchableOpacity>
                <FlatList
                  data={comment.replies}
                  keyExtractor={(reply) => reply.id.toString()}
                  renderItem={({ item: reply }) => (
                    <View style={styles.replyContainer}>
                      <Text style={styles.replyAuthor}>{reply.name}:</Text>
                      <Text style={styles.replyContent}>{reply.content}</Text>
                    </View>
                  )}
                />
              </View>
            )}
          />
        </View>
      )}
    />
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
  headerContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, flex: 1, marginHorizontal: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  postContainer: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postAuthor: { fontWeight: 'bold', fontSize: 16 },
  postContent: { fontSize: 14, marginVertical: 5 },
  postImage: { width: '100%', height: 200, borderRadius: 5, marginTop: 10 },
  previewImage: { width: '100%', height: 100, borderRadius: 5, marginBottom: 10 },
  voteContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-around' },
  commentContainer: { paddingLeft: 10, marginTop: 10 },
  commentAuthor: { fontWeight: 'bold' },
  commentContent: { fontSize: 14 },
  replyContainer: { paddingLeft: 20, marginTop: 5 },
  replyAuthor: { fontWeight: 'bold' },
  replyContent: { fontSize: 13 }
});

export default CommunityScreen;
