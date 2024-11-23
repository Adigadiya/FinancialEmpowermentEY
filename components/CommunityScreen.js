import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const CommunityScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: 'Rural Women Achieving Financial Freedom',
      content: 'From agriculture to entrepreneurship, this woman has transformed her life. Let’s all take inspiration from her journey.',
      image: require('../assets/tweet1.jpg'), // Local image using require
      userImage: require('../assets/Ey.jpg'), // Different user image
      date: '2 hours ago',
      likes: 15,
      comments: 5,
      reposts: 2,
    },
    {
      id: 2,
      name: 'Empowering Through Education',
      content: 'One step at a time, this lady is making waves by providing educational services in her village. A true inspiration!',
      image: '', // No image
      userImage: require('../assets/user1.jpg'), // Different user image
      date: '5 hours ago',
      likes: 7,
      comments: 3,
      reposts: 1,
    },
    {
      id: 3,
      name: 'Join EY in Building a Sustainable Future',
      content: 'EY is committed to helping businesses grow responsibly and sustainably. Let’s make the future brighter together.',
      image: require('../assets/tweet2.jpg'), // EY promotional image
      userImage: require('../assets/user2.jpg'), // EY image for posts
      date: '1 day ago',
      likes: 20,
      comments: 10,
      reposts: 5,
    },
    {
      id: 4,
      name: 'The Importance of Financial Literacy',
      content: 'Empowering individuals through financial literacy can lead to stronger, more resilient communities.',
      image: '', // No image
      userImage: require('../assets/user3.jpg'), // Different user image
      date: '2 days ago',
      likes: 12,
      comments: 4,
      reposts: 3,
    },
    {
      id: 5,
      name: 'App Spotlight: EY Financial Literacy',
      content: 'We’re proud to announce the launch of our new app for financial literacy. Download it now and start your journey to financial freedom.',
      image: require('../assets/tweet3.jpg'), // App promotion image
      userImage: require('../assets/Ey.jpg'), // EY image for app promotion
      date: '3 days ago',
      likes: 25,
      comments: 15,
      reposts: 7,
    },
    // Add more posts as needed
  ]);

  const handlePostSubmit = () => {
    // Handle post submission logic
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleRepost = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, reposts: post.reposts + 1 } : post));
  };

  const handleComment = (id) => {
    // Handle comment functionality (optional)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Local image in the header */}
        <Image source={require('../assets/Ey.jpg')} style={styles.logo} />
      </View>

      <TextInput
        style={styles.postInput}
        placeholder="Share your experience..."
        placeholderTextColor="#888"
        multiline
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePostSubmit}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      <View style={styles.feed}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              {/* Local user image */}
              <Image source={post.userImage} style={styles.userImage} />
              <View style={styles.postUserDetails}>
                <Text style={styles.postName}>{post.name}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
              </View>
            </View>
            <Text style={styles.postText}>{post.content}</Text>
            {post.image ? (
              // Use local image for post if available
              <Image source={post.image} style={styles.postImage} />
            ) : null}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
                <Icon name="thumbs-up" size={20} color="#FFC107" />
                <Text style={styles.actionText}>Like ({post.likes})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(post.id)}>
                <Icon name="comment" size={20} color="#FFC107" />
                <Text style={styles.actionText}>Comment ({post.comments})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleRepost(post.id)}>
                <Icon name="share" size={20} color="#FFC107" />
                <Text style={styles.actionText}>Repost ({post.reposts})</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // EY black theme
    padding: 15,
    paddingTop: 70,
  },
  header: {
    alignItems: 'center', // Center the logo
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 40,
    borderRadius: 20,
  },
  postInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  postButton: {
    backgroundColor: '#FFC107', // EY yellow color
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  postButtonText: {
    color: '#000',
    fontSize: 16,
  },
  feed: {
    marginTop: 20,
  },
  post: {
    backgroundColor: '#222',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUserDetails: {
    flex: 1,
  },
  postName: {
    color: '#FFC107',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDate: {
    color: '#888',
    fontSize: 12,
  },
  postText: {
    color: '#E0E0E0',
    fontSize: 16,
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFC107',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default CommunityScreen;
