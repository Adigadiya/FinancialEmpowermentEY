import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const posts = [
  {
    id: "1",
    user: "r/FinanceTalks",
    title: "Stock Market Trends for 2025",
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/3-remote-village-of-eng-tribe-in-mountains-near-kengtung-myanmar-cavan-images.jpg",
    likes: 1200,
    dislikes: 50,
    comments: 300,
  },
  {
    id: "2",
    user: "r/InvestmentTips",
    title: "How to Save Money in Your 20s",
    image: null,
    likes: 800,
    dislikes: 30,
    comments: 120,
  },
  {
    id: "3",
    user: "r/CryptoWorld",
    title: "Bitcoin Hits New High!",
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/3-remote-village-of-eng-tribe-in-mountains-near-kengtung-myanmar-cavan-images.jpg",
    likes: 2500,
    dislikes: 100,
    comments: 600,
  },
];

const CommunityScreen = ({ navigation }) => {
  const [postData, setPostData] = useState(posts);

  const handleVote = (id, type) => {
    const updatedPosts = postData.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likes: type === "like" ? post.likes + 1 : post.likes,
          dislikes: type === "dislike" ? post.dislikes + 1 : post.dislikes,
        };
      }
      return post;
    });
    setPostData(updatedPosts);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/Ey.jpg")} style={styles.eyLogo} />
      </View>
      <FlatList
        data={postData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("PostDetails", { post: item })}>
            <View style={styles.postContainer}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.title}>{item.title}</Text>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
              <View style={styles.footer}>
                <View style={styles.voteSection}>
                  <TouchableOpacity onPress={() => handleVote(item.id, "like")}>                  
                    <Ionicons name="thumbs-up" size={24} color="#00ffcc" />
                  </TouchableOpacity>
                  <Text style={styles.voteCount}>{item.likes}</Text>
                  <TouchableOpacity onPress={() => handleVote(item.id, "dislike")}>                  
                    <Ionicons name="thumbs-down" size={24} color="#ff6666" />
                  </TouchableOpacity>
                  <Text style={styles.voteCount}>{item.dislikes}</Text>
                </View>
                <View style={styles.commentSection}>
                  <Ionicons name="chatbubble-outline" size={24} color="#ffffff" />
                  <Text style={styles.commentCount}>{item.comments} Comments</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = {
  logoContainer: { alignItems: "center", marginBottom: 20 },
  eyLogo: { width: 100, height: 50, resizeMode: "contain" },
  postContainer: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  user: {
    fontSize: 14,
    color: "#cccccc",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  voteSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  voteCount: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#ffffff",
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCount: {
    marginLeft: 5,
    fontSize: 16,
    color: "#ffffff",
  },
};

export default CommunityScreen;