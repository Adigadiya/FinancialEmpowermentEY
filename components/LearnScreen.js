import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';


const blogData = [
  {
    id: '1',
    excerpt: 'Learn the basics of saving money and building financial stability...',
    title: 'Saving 101',
    content: [
      { type: 'text', value: 'Saving money is essential for financial security. Start by creating a budget and sticking to it.' },
      { type: 'image', value: require('../assets/blog1.jpg') }, 
      { type: 'text', value: 'Track your expenses to identify areas where you can cut back. Consider automating your savings by setting up an automatic transfer to a separate savings account every payday.' },
      { type: 'image', value: require('../assets/blog2.jpg') }, 
      { type: 'text', value: 'Aim to save at least 20% of your income for long-term financial goals such as retirement, home ownership, or emergencies.' },
      { type: 'text', value: 'Remember, every small contribution adds up over time!' },
    ],
  },
  {
    id: '2',
    excerpt: 'Understand how to start investing and the different investment vehicles...',
    title: 'Investing Basics',
    content: [
      { type: 'text', value: 'Investing can help grow your wealth over time by taking advantage of compound interest.' },
      { type: 'image', value: require('../assets/blog3.jpg') }, 
      { type: 'text', value: 'Begin by understanding stocks, mutual funds, ETFs, and bonds. Each investment option comes with different levels of risk and return.' },
      { type: 'image', value: require('../assets/blog4.jpg') }, 
      { type: 'text', value: 'Diversify your investments to spread risk. Start small, and gradually increase your investments as you learn more about the market.' },
      { type: 'text', value: 'Keep a long-term perspective to ride out market fluctuations and evaluate your risk tolerance.' },
    ],
  },
  {
    id: '3',
    title: 'Budgeting Tips',
    excerpt: 'Simple steps to manage your budget and take control of your finances...',
    content: [
      { type: 'text', value: 'Budgeting is a key tool for financial success. It allows you to allocate money for your needs, wants, and savings.' },
      { type: 'image', value: require('../assets/blog5.jpg') }, 
      { type: 'text', value: 'Start by tracking all your income and expenses to understand where your money is going.' },
      { type: 'image', value: require('../assets/blog6.jpg') }, 
      { type: 'text', value: 'Set clear goals for savings, such as building an emergency fund or saving for a vacation. Use tools like budgeting apps or spreadsheets to stay organized and committed. Regularly review your budget to stay on track and adjust as needed.' },
    ],
  },
];

const gamifiedLearning = [
  { 
    id: '1', 
    name: 'Quiz on Budgeting', 
    type: 'quiz', 
    image: require('../assets/game1.jpg') 
  },
  { 
    id: '2', 
    name: 'Investing Puzzle Game', 
    type: 'game', 
    image: require('../assets/game2.jpg') 
  },
  { 
    id: '3', 
    name: 'Financial Goals Rewards', 
    type: 'rewards', 
    image: require('../assets/game3.jpg') 
  },
];

const LearnScreen = ({ navigation }) => {
  const [quizAnswer, setQuizAnswer] = useState(null); 
  const [quizResult, setQuizResult] = useState(''); 

  const handleAnswer = (isCorrect) => {
    setQuizResult(isCorrect ? 'correct' : 'incorrect');
    setQuizAnswer(isCorrect ? 'correct' : 'incorrect');
  };

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

      {index === 1 && (
        <>
          
          <View style={styles.quizCard}>
            <Text style={styles.quizQuestion}>What is the best strategy for saving for retirement?</Text>

          
            {quizResult && (
              <Text style={[styles.feedbackText, quizResult === 'correct' ? styles.correct : styles.incorrect]}>
                {quizResult === 'correct' ? 'Correct!' : 'Wrong!'}
              </Text>
            )}

           
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(true)} 
            >
              <Text style={styles.quizButtonText}>A. Start early and invest regularly</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(false)} 
            >
              <Text style={styles.quizButtonText}>B. Save a lump sum just before retirement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(false)} 
            >
              <Text style={styles.quizButtonText}>C. Invest in high-risk stocks exclusively</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => handleAnswer(false)} 
            >
              <Text style={styles.quizButtonText}>D. Rely solely on employer retirement plans</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

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
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Ey.jpg')} 
          style={styles.logo}
        />
      </View>

      <FlatList
        data={blogData}
        keyExtractor={(item) => item.id}
        renderItem={renderBlogItem}
        ListFooterComponent={renderGamifiedLearning} 
        contentContainerStyle={styles.blogListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    paddingTop: 50, 
    paddingHorizontal: 15, 
  },
  logoContainer: {
    alignItems: 'center', 
    marginTop: 20, 
  },
  logo: {
    width: 120, 
    height: 50, 
    resizeMode: 'contain', 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFC107', 
  },
  blogBox: {
    backgroundColor: '#1C1C1C', 
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#FFC107', 
    marginBottom: 15, 
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107', 
  },
  blogExcerpt: {
    fontSize: 14,
    color: '#E0E0E0', 
    marginTop: 5,
  },
  viewMore: {
    color: '#FFC107', 
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },
  blogListContainer: {
    paddingBottom: 0, 
  },
  quizCard: {
    backgroundColor: '#1C1C1C', 
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#FFC107',
  },
  gamifiedLearningContainer: {
    marginVertical: 15,
    marginBottom: 20, 
  },
  gameBox: {
    backgroundColor: '#1C1C1C', 
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
    color: '#FFC107', 
    marginBottom: 10, 
  },
  gameImage: {
    width: 100, 
    height: 100, 
    borderRadius: 10,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 20,
  },
  quizButton: {
    backgroundColor: '#FFC107', 
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
