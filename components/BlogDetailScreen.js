import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const BlogDetailScreen = ({ route, navigation }) => {
  const { blog } = route.params; 

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/Ey.jpg')} style={styles.eyLogo} />
      <Text style={styles.blogTitle}>{blog.title}</Text>
      {blog.content.map((item, index) => {
        if (item.type === 'text') {
          return (
            <Text key={index} style={styles.blogText}>
              {item.value}
            </Text>
          );
        } else if (item.type === 'image') {
          return (
            <Image
              key={index}
              source={item.value}
              style={styles.blogImage}
            />
          );
        }
        return null;
      })}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    padding: 15,
    paddingTop: 70,
  },
  eyLogo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107', 
    marginBottom: 15,
  },
  blogText: {
    fontSize: 16,
    color: '#E0E0E0', 
    marginVertical: 10,
    lineHeight: 22,
  },
  blogImage: {
    width: '100%',
    height: 200,
    marginVertical: 15,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  backButton: {
    backgroundColor: '#FFC107', 
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#000', 
    fontSize: 16,
  },
});

export default BlogDetailScreen;
