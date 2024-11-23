import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

// Sample Blog Data
const blogData = [
  {
    id: '1',
    title: 'Saving 101',
    excerpt: 'Learn the basics of saving money and building financial stability...',
    content: 'Saving money is essential for financial security. Start by creating a budget and sticking to it. Track your expenses to identify areas where you can cut back. Consider automating your savings by setting up an automatic transfer to a separate savings account every payday. Additionally, aim to save at least 20% of your income for long-term financial goals such as retirement, home ownership, or emergencies. Remember, every small contribution adds up over time!',
  },
  {
    id: '2',
    title: 'Investing Basics',
    excerpt: 'Understand how to start investing and the different investment vehicles...',
    content: 'Investing can help grow your wealth over time by taking advantage of compound interest. Begin by understanding stocks, mutual funds, exchange-traded funds (ETFs), and bonds. Each investment option comes with different levels of risk and return. It’s important to diversify your investments to spread risk. Start small, and gradually increase your investments as you learn more about how the market works. Keep a long-term perspective to ride out market fluctuations. Don\'t forget to evaluate your risk tolerance before you start investing.',
  },
  {
    id: '3',
    title: 'Budgeting Tips',
    excerpt: 'Simple steps to manage your budget and take control of your finances...',
    content: 'Budgeting is a key tool for financial success. It allows you to allocate money for your needs, wants, and savings. Start by tracking all your income and expenses to understand where your money is going. Categorize your spending and look for areas where you can cut back, like dining out or subscriptions you no longer need. Set clear goals for savings, such as building an emergency fund or saving for a vacation. Use tools like budgeting apps or spreadsheets to stay organized and committed. Regularly review your budget to stay on track and adjust as needed.',
  },
];

// Gamified Learning Data
const gamifiedLearning = [
  { 
    id: '1', 
    name: 'Quiz on Budgeting', 
    type: 'quiz', 
    image: require('../assets/game1.jpg') // Local image path
  },
  { 
    id: '2', 
    name: 'Investing Puzzle Game', 
    type: 'game', 
    image: require('../assets/game2.jpg') // Local image path
  },
  { 
    id: '3', 
    name: 'Financial Goals Rewards', 
    type: 'rewards', 
    image: require('../assets/game3.jpg') // Local image path
  },
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
            <Image source={item.image} style={styles.gameImage} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFC107', // Yellow theme for section titles
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
  gamifiedLearningContainer: {
    marginVertical: 15,
    marginBottom: 20, // Add space after gamified learning section
  },
  gameBox: {
    backgroundColor: '#1C1C1C', // Darker black card
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107', // Yellow text for game title
    marginBottom: 10, // Add space between title and image
  },
  gameImage: {
    width: 100, // Set the size of the image
    height: 100, // Set the size of the image
    borderRadius: 10,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 20,
  },
  quizButton: {
    backgroundColor: '#FFC107', // Yellow background for quiz options
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  quizButtonText: {
    fontSize: 16,
    color: '#1C1C1C',
  },
  feedbackText: {
    fontSize: 16,
    marginVertical: 10,
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
});

export default LearnScreen;
