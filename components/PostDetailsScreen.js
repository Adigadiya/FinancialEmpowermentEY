import React, { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const initialComments = [
  {
    id: "1",
    username: "Radhika",
    comment: "Mujhe lagta hai mutual funds ek accha option hai! 📈",
    upvotes: 10,
    downvotes: 2,
    replies: [
      {
        id: "1-1",
        username: "Lakshmi",
        comment: "Kaunsa mutual fund recommend karogi? SIP ya lump sum? 🤔",
        upvotes: 5,
        downvotes: 1,
        replies: [
          {
            id: "1-1-1",
            username: "Vikas",
            comment: "Maine SBI Bluechip Fund me invest kiya hai, kaafi acha perform kar raha hai! 🔥",
            upvotes: 7,
            downvotes: 1,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    username: "Raj",
    comment: "Long-term investment karna zaroori hai, wealth build karne ke liye! 📊",
    upvotes: 15,
    downvotes: 3,
    replies: [
      {
        id: "2-1",
        username: "Ankit",
        comment: "हां, अगर सही प्लानिंग हो तो SIP और PPF जैसे options बेहतर हो सकते हैं! 💰",
        upvotes: 10,
        downvotes: 1,
        replies: [],
      },
    ],
  },
  
  {
    id: "3",
    username: "Suresh",
    comment: "FD bhi ek safe option hai, agar risk lena pasand nahi hai toh! 💰",
    upvotes: 12,
    downvotes: 1,
    replies: [
      {
        id: "3-1",
        username: "Meera",
        comment: "Haan maine bhi FD kiya hai, interest rate 7.5% tak mil raha hai! 👍",
        upvotes: 8,
        downvotes: 0,
        replies: [],
      },
      {
        id: "3-2",
        username: "Arjun",
        comment: "Agar safe investment chahiye toh PPF bhi ek acha option ho sakta hai!",
        upvotes: 6,
        downvotes: 1,
        replies: [],
      },
    ],
  },
  {
    id: "4",
    username: "Pooja",
    comment: "Mutual funds vs FD – dono me invest karna sahi rahega balance ke liye! ✅",
    upvotes: 14,
    downvotes: 2,
    replies: [
      {
        id: "4-1",
        username: "Amit",
        comment: "Haan, mutual funds long-term growth ke liye aur FD safe returns ke liye! Best combo! 🏦📊",
        upvotes: 10,
        downvotes: 0,
        replies: [],
      },
    ],
  },
];

export default function PostDetailsScreen({ route }) {
  const { post } = route.params;
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});

  const toggleReplies = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const addComment = (parentId = null, nestedComments = comments) => {
    if (newComment.trim() === '') return;
    const newEntry = {
      id: `${Date.now()}`,
      username: 'You',
      comment: newComment,
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };

    if (!parentId) {
      setComments([...comments, newEntry]);
    } else {
      const updateNestedComments = (commentList) =>
        commentList.map((comment) => {
          if (comment.id === parentId) {
            return { ...comment, replies: [...comment.replies, newEntry] };
          } else if (comment.replies.length > 0) {
            return { ...comment, replies: updateNestedComments(comment.replies) };
          }
          return comment;
        });

      setComments(updateNestedComments(nestedComments));
    }
    setNewComment('');
    setReplyingTo(null);
  };

  const renderComment = ({ item, level = 0 }) => (
    <View style={[styles.commentContainer, { marginLeft: level * 15 }]}> 
      <Text style={styles.commentUsername}>{item.username}</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
      <View style={styles.voteContainer}>
        <TouchableOpacity>
          <Icon name="arrow-up" size={15} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.voteText}>{item.upvotes - item.downvotes}</Text>
        <TouchableOpacity>
          <Icon name="arrow-down" size={15} color="#8B0000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>
      {replyingTo === item.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a reply..."
            placeholderTextColor="#FFD700"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={() => addComment(item.id)} style={styles.commentButton}>
            <Text style={{ color: '#000' }}>Reply</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.replies.length > 0 && (
        <TouchableOpacity onPress={() => toggleReplies(item.id)}>
          <Text style={styles.toggleRepliesText}>
            {expandedComments[item.id] ? 'Hide Replies' : `View Replies (${item.replies.length})`}
          </Text>
        </TouchableOpacity>
      )}
      {expandedComments[item.id] && item.replies.length > 0 && (
        <FlatList
          data={item.replies}
          keyExtractor={(reply) => reply.id}
          renderItem={(replyProps) => renderComment({ ...replyProps, level: level + 1 })}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
      <FlatList data={comments} keyExtractor={(item) => item.id} renderItem={renderComment} />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        placeholderTextColor="#FFD700"
        value={newComment}
        onChangeText={setNewComment}
      />
      <TouchableOpacity onPress={() => addComment()} style={styles.commentButton}>
        <Text style={{ color: '#000' }}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#000' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', marginVertical: 5 },
  postImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 10 },
  commentContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#FFD700' },
  commentUsername: { fontWeight: 'bold', color: '#FFD700', marginBottom: 3 },
  commentText: { color: '#FFF' },
  voteContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  voteText: { color: '#FFD700', marginHorizontal: 5 },
  replyText: { marginLeft: 10, color: '#FFD700' },
  replyInputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  input: {
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#FFD700', 
    padding: 10, 
    borderRadius: 5, 
    color: '#FFF', 
    },

  commentButton: { backgroundColor: '#FFD700', padding: 8, borderRadius: 5 },
  toggleRepliesText: { color: '#FFD700', marginTop: 5, fontSize: 14 },
});
