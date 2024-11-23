import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

// Sample Blog Data
const blogData = [
  {
    id: '1',
    title: 'Saving 101',
    excerpt: 'Learn the basics of saving money...',
    content: 'Saving money is essential for financial security. Start by creating a budget and sticking to it...',
  },
  {
    id: '2',
    title: 'Investing Basics',
    excerpt: 'Understand how to start investing...',
    content: 'Investing can help grow your wealth over time. Begin by understanding stocks, mutual funds, and risk tolerance...',
  },
  {
    id: '3',
    title: 'Budgeting Tips',
    excerpt: 'Simple steps to manage your budget...',
    content: 'Budgeting helps you manage your finances effectively. Allocate money for needs, wants, and savings...',
  },
];

// Gamified Learning Data
const gamifiedLearning = [
  { id: '1', name: 'Quiz on Budgeting', type: 'quiz' },
  { id: '2', name: 'Investing Puzzle Game', type: 'game' },
  { id: '3', name: 'Financial Goals Rewards', type: 'rewards' },
];

const LearnScreen = ({ navigation }) => {
  const [quizAnswer, setQuizAnswer] = useState(null); // To track selected answer
  const [quizResult, setQuizResult] = useState(''); // To show result feedback

  const handleAnswer = (isCorrect) => {
    setQuizResult(isCorrect ? 'correct' : 'incorrect');
    setQuizAnswer(isCorrect ? 'correct' : 'incorrect');
  };

  // Render Blog Item
  const renderBlogItem = ({ item, index }) => (
    <View>
      <View style={styles.blogBox}>
        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogExcerpt}>{item.excerpt}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('BlogDetailScreen', { blog: item })}
        >
          <Text style={styles.viewMore}>View More...</Text>
        </TouchableOpacity>
      </View>

      {/* Insert Quiz Between Cards */}
      {index === 1 && (
        <>
          {/* Quiz Card */}
          <View style={styles.quizCard}>
            <Text style={styles.quizQuestion}>What is the best strategy for saving for retirement?</Text>

            {/* Display Feedback */}
            {quizResult && (
              <Text style={[styles.feedbackText, quizResult === 'correct' ? styles.correct : styles.incorrect]}>
                {quizResult === 'correct' ? 'Correct!' : 'Wrong!'}
              </Text>
            )}

            {/* Quiz Options */}
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(true)} // Correct answer
            >
              <Text style={styles.quizButtonText}>A. Start early and invest regularly</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(false)} // Incorrect answer
            >
              <Text style={styles.quizButtonText}>B. Save a lump sum just before retirement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(false)} // Incorrect answer
            >
              <Text style={styles.quizButtonText}>C. Invest in high-risk stocks exclusively</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(false)} // Incorrect answer
            >
              <Text style={styles.quizButtonText}>D. Rely solely on employer retirement plans</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  // Render Gamified Learning Section
  const renderGamifiedLearning = () => (
    <View style={styles.gamifiedLearningContainer}>
      <Text style={styles.sectionTitle}>Gamified Learning</Text>
      <FlatList
        horizontal
        data={gamifiedLearning}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} style={styles.gameBox}>
            <Text style={styles.gameText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* EY Logo at the top */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Ey.jpg')} // Replace with the actual path to the logo
          style={styles.logo}
        />
      </View>

      <FlatList
        data={blogData}
        keyExtractor={(item) => item.id}
        renderItem={renderBlogItem}
        ListFooterComponent={renderGamifiedLearning} // Gamified Learning at the end
        contentContainerStyle={styles.blogListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Set black background for the whole screen
    paddingTop: 50, // Start from 140 units down from the top
    paddingHorizontal: 15, // Horizontal padding for spacing
  },
  logoContainer: {
    alignItems: 'center', // Center the logo horizontally
    marginTop: 20, // Add margin to the top
  },
  logo: {
    width: 120, // Adjust width of the logo
    height: 50, // Adjust height of the logo
    resizeMode: 'contain', // Ensure the logo maintains its aspect ratio
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFC107', // Yellow theme for titles
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  blogBox: {
    backgroundColor: '#1C1C1C', // Darker black box
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#FFC107', // Yellow shadow
    marginBottom: 15, // Reduce margin at the bottom of blog box to avoid extra space
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107', // Yellow text for titles
  },
  blogExcerpt: {
    fontSize: 14,
    color: '#E0E0E0', // Light gray for excerpts
    marginTop: 5,
  },
  viewMore: {
    color: '#FFC107', // Yellow for links
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },
  blogListContainer: {
    paddingBottom: 0, // No extra space at the bottom of the list
  },
  quizCard: {
    backgroundColor: '#1C1C1C', // Darker black card
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#FFC107', // Yellow shadow
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107', // Yellow for question text
    marginBottom: 10,
  },
  quizButton: {
    backgroundColor: '#FFC107', // Yellow button for quiz
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  quizButtonText: {
    color: '#000', // Black text for button
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
  gamifiedLearningContainer: {
    marginVertical: 15,
    marginBottom: 20, // Add space after gamified learning section
  },
  gameBox: {
    backgroundColor: '#FFC107', // Yellow box
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameText: {
    color: '#000', // Black text for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearnScreen;
