import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const BlogDetailScreen = ({ route, navigation }) => {
  const { blog } = route.params; // Get the blog object passed via navigation

  return (
    <ScrollView style={styles.container}>
      {/* EY Logo */}
      <Image source={require('../assets/Ey.jpg')} style={styles.eyLogo} />

      {/* Blog Title */}
      <Text style={styles.blogTitle}>{blog.title}</Text>

      {/* Blog Content */}
      <Text style={styles.blogContent}>{blog.content}</Text>

      {/* Blog Images */}
      {blog.images && blog.images.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.blogImage} />
      ))}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for EY theme
    padding: 15,
    paddingTop: 70, // Space for the logo at the top
  },
  eyLogo: {
    width: 120, // Adjust based on the actual size of your logo
    height: 60,  // Adjust based on the actual size of your logo
    resizeMode: 'contain',
    alignSelf: 'center', // Center the logo
    marginBottom: 20, // Add space between the logo and the content
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107', // EY Yellow
    marginBottom: 10,
  },
  blogContent: {
    fontSize: 16,
    color: '#E0E0E0', // Light gray text for content
    marginVertical: 10,
    lineHeight: 22,
  },
  blogImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  backButton: {
    backgroundColor: '#FFC107', // EY Yellow
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#000', // Black text for contrast
    fontSize: 16,
  },
});

export default BlogDetailScreen;
