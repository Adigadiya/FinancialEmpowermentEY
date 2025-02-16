import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InflationQuiz = ({ language }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Questions and Answers for both languages
  const questions = {
    en: [
      {
        question: "What is inflation?",
        options: [
          "A. A decrease in the price of goods",
          "B. An increase in the price of goods",
          "C. A constant price level for goods",
          "D. The value of currency staying the same"
        ],
        correctAnswer: "B"
      },
      // Add more questions in English if needed
    ],
    hi: [
      {
        question: "महंगाई क्या है?",
        options: [
          "A. माल की कीमतों में कमी",
          "B. माल की कीमतों में वृद्धि",
          "C. माल की कीमतों का स्थिर स्तर",
          "D. मुद्रा का मूल्य समान रहना"
        ],
        correctAnswer: "B"
      },
      // Add more questions in Hindi if needed
    ]
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setIsSubmitted(false); // Reset submission status when a new answer is selected
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsCorrect(selectedAnswer === questions[language][questionIndex].correctAnswer); // Check if the answer is correct
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions[language].length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setIsCorrect(null);
    }
  };

  const getOptionStyle = (option) => {
    // Highlight the selected option with yellow color
    return selectedAnswer === option
      ? { backgroundColor: '#F1C232', color: '#000000' } // Yellow background for selected answer, black text
      : { backgroundColor: '#333333', color: '#FFFFFF' }; // Dark background for non-selected options, white text
  };

  const currentQuestion = questions[language][questionIndex];

  // Texts based on language selection
  const submitButtonText = language === 'en' ? 'Submit Answer' : 'उत्तर जमा करें';
  const nextButtonText = language === 'en' ? 'Next Question' : 'अगला प्रश्न';
  const resultText = isCorrect ? (language === 'en' ? 'Correct!' : 'सही!') : (language === 'en' ? 'Wrong!' : 'गलत!');

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.options}>
        {currentQuestion.options.map((option, index) => {
          const optionLabel = option.split(".")[0]; // Get option letter (A, B, C, D)
          return (
            <TouchableOpacity
              key={index}
              style={[styles.option, getOptionStyle(optionLabel)]} // Dynamic style based on selected answer
              onPress={() => handleAnswerSelect(optionLabel)}
            >
              <Text style={[styles.optionText, { color: selectedAnswer === optionLabel ? '#000000' : '#FFFFFF' }]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{submitButtonText}</Text>
      </TouchableOpacity>

      {isSubmitted && (
        <Text style={[styles.result, { color: isCorrect ? '#7C9F2B' : '#D10000' }]}>
          {resultText}
        </Text>
      )}

      {isSubmitted && questionIndex < questions[language].length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>{nextButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#333333',  // Dark background for quiz container (no white background)
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',  // Black border color
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',  // White color for text
  },
  options: {
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',  // White border for options
  },
  optionText: {
    fontSize: 16,
    textAlign: 'left',
  },
  submitButton: {
    padding: 12,
    backgroundColor: '#F1C232',  // EY Yellow
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#000000',  // Black text for submit button
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  nextButton: {
    padding: 12,
    backgroundColor: '#7C9F2B',  // Green color for next button
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',  // White text for next button
  },
});

export default InflationQuiz;
