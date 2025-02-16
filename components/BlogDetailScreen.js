import React, { useState, useRef } from 'react';
import InflationQuiz from './InflationQuiz';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

const items = [
  { id: 1, name: { en: 'House', hi: 'मकान' }, price1950: 25000, price2024: 7500000, image: require('../assets/house.jpg') },
  { id: 2, name: { en: 'Car', hi: 'कार' }, price1950: 5000, price2024: 1200000, image: require('../assets/car.jpeg') },
  { id: 3, name: { en: 'Movie Ticket', hi: 'सिनेमा टिकट' }, price1950: 1, price2024: 250, image: require('../assets/ticket.jpeg') },
  { id: 4, name: { en: 'Petrol (Litre)', hi: 'पेट्रोल (लीटर)' }, price1950: 0.5, price2024: 100, image: require('../assets/petrol.jpeg') },
  { id: 5, name: { en: 'Loaf of Bread', hi: 'ब्रेड' }, price1950: 0.2, price2024: 40, image: require('../assets/bread.jpeg') },
];

const translations = {
  en: {
    title: 'Inflation Calculator',
    comparison: 'Historical Price Comparison',
    calculate: 'Calculate Future Value',
    enterAmount: 'Enter amount',
    years: 'Years:',
    futureValue: 'Future Value:',
    learnMore: 'Learn More',
    whatIsInflation: 'What Is Inflation?',
    inflationDescription: 'Inflation is a gradual loss of purchasing power that is reflected in a broad rise in prices for goods and services over time. The inflation rate is calculated as the average price increase of a basket of selected goods and services over one year.',
    keyTakeaways: 'Key Takeaways',
    takeawayPoints: [
      'Inflation measures how quickly the prices of goods and services are rising.',
      'Inflation is classified into three types: demand-pull inflation, cost-push inflation, and built-in inflation.',
      'The most commonly used inflation indexes are the Consumer Price Index and the Wholesale Price Index.',
    ],
    howInflationImpactsPrices: 'How Inflation Impacts Prices',
    inflationImpactDescription: [
      'While it is easy to measure the price changes of individual products over time, human needs extend beyond just one or two products.',
      'Inflation aims to measure the overall impact of price changes for a diversified set of products and services.'
    ],
  },
  hi: {
    title: 'मुद्रास्फीति कैलकुलेटर',
    comparison: 'ऐतिहासिक मूल्य तुलना',
    calculate: 'भविष्य का मूल्य गणना करें',
    enterAmount: 'राशि दर्ज करें',
    years: 'वर्ष:',
    futureValue: 'भविष्य का मूल्य:',
    whatIsInflation: 'मुद्रास्फीति क्या है?',
    inflationDescription: 'मुद्रास्फीति क्रय शक्ति की एक क्रमिक हानि है जो समय के साथ वस्तुओं और सेवाओं की कीमतों में व्यापक वृद्धि के रूप में परिलक्षित होती है। मुद्रास्फीति दर एक वर्ष में चयनित वस्तुओं और सेवाओं की टोकरी की औसत मूल्य वृद्धि के रूप में गणना की जाती है। उच्च मुद्रास्फीति का अर्थ है कि कीमतें तेजी से बढ़ रही हैं, जबकि निम्न मुद्रास्फीति का अर्थ है कि कीमतें धीरे-धीरे बढ़ रही हैं। मुद्रास्फीति को अपस्फीति के विपरीत देखा जा सकता है, जो तब होती है जब कीमतें गिरती हैं और क्रय शक्ति बढ़ती है।',
    keyTakeaways: 'मुख्य निष्कर्ष',
    takeawayPoints: [
      'मुद्रास्फीति मापती है कि वस्तुओं और सेवाओं की कीमतें कितनी तेजी से बढ़ रही हैं।',
      'मुद्रास्फीति को तीन प्रकारों में वर्गीकृत किया गया है: मांग-आकर्षण मुद्रास्फीति, लागत-धक्का मुद्रास्फीति और अंतर्निहित मुद्रास्फीति।',
      'सबसे अधिक इस्तेमाल किए जाने वाले मुद्रास्फीति सूचकांक उपभोक्ता मूल्य सूचकांक और थोक मूल्य सूचकांक हैं।',
      'मुद्रास्फीति को व्यक्तिगत दृष्टिकोण और परिवर्तन दर के आधार पर सकारात्मक या नकारात्मक रूप से देखा जा सकता है।',
      'जिनके पास भौतिक संपत्ति है, वे कुछ मुद्रास्फीति देखना पसंद कर सकते हैं क्योंकि इससे उनकी संपत्ति का मूल्य बढ़ जाता है।'
    ],
    howInflationImpactsPrices: 'मुद्रास्फीति कैसे कीमतों को प्रभावित करती है',
    inflationImpactDescription: [
      'यह समझना आसान है कि एकल उत्पाद की कीमतों में समय के साथ परिवर्तन को मापा जाए, लेकिन मानव आवश्यकताएँ केवल एक या दो उत्पादों से आगे बढ़ती हैं।',
      'मुद्रास्फीति का उद्देश्य उत्पादों और सेवाओं के एक विविध सेट के लिए मूल्य परिवर्तनों के समग्र प्रभाव को मापना है।'
    ],
  }
};

export default function App() {
  const [amount, setAmount] = useState('1000');
  const [years, setYears] = useState(10);
  const [language, setLanguage] = useState('en');

  const calculateInflation = (amount, years) => {
    const rate = 0.05;
    return (amount * Math.pow(1 + rate, years)).toFixed(2);
  };

  return (
    
    <GestureHandlerRootView style={styles.container}>
      

      <StatusBar style="light" />
      <ScrollView style={styles.scrollView}>
      <View style={styles.languageSwitcher}>
  <TouchableOpacity onPress={() => setLanguage('en')} style={styles.langButton}>
    <Text style={styles.langText}>🇬🇧 English</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setLanguage('hi')} style={styles.langButton}>
    <Text style={styles.langText}>🇮🇳 हिन्दी</Text>
  </TouchableOpacity>
</View>

     
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>{translations[language].whatIsInflation}</Text>
  <Text style={styles.description}>{translations[language].inflationDescription}</Text>
</View>

        

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>{translations[language].comparison}</Text>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
            {items.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.name[language]}</Text>
                <Text style={styles.price}>1950: ₹{item.price1950}</Text>
                <Text style={styles.price}>2024: ₹{item.price2024}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
  <Text style={styles.sectionTitle}>{translations[language].howInflationImpactsPrices}</Text>
  {translations[language].inflationImpactDescription.map((text, index) => (
    <Text key={index} style={styles.description}>{text}</Text>
  ))}
</View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations[language].calculate}</Text>
          <View style={styles.calculatorContainer}>
            <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder={translations[language].enterAmount} placeholderTextColor="#FFD700" />
            <Text style={styles.label}>{translations[language].years} {years}</Text>
            <Slider style={styles.slider} minimumValue={1} maximumValue={30} step={1} value={years} onValueChange={setYears} minimumTrackTintColor="#FFD700" thumbTintColor="#FFD700" />
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>{translations[language].futureValue}</Text>
              <Text style={styles.resultValue}>₹{calculateInflation(parseFloat(amount) || 0, years)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>{translations[language].keyTakeaways}</Text>
{translations[language].takeawayPoints.map((point, index) => (
  <Text key={index} style={styles.description}>• {point}</Text>
))}
      <View style={styles.quizContainer}>
        <Text style={styles.quizHeading}>Test Your Knowledge on Inflation!</Text>
        <InflationQuiz language={language}/>
      </View>

      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  quizContainer: {
    marginTop: 30,
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quizHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',  // Dark Blue for quiz heading (EY theme)
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    textAlign: 'justify',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop:40,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  container: { flex: 1, backgroundColor: '#000' },
  scrollView: { flex: 1, paddingTop: 60 },
  languageSwitcher: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  langButton: { padding: 10, backgroundColor: '#FFD700', marginHorizontal: 5, borderRadius: 5 },
  langText: { color: '#000', fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#FFD700' },
  section: { marginBottom: 30, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 22, fontWeight: '600', marginBottom: 15, color: '#FFD700' },
  cardContainer: { paddingHorizontal: SPACING },
  card: { width: CARD_WIDTH, backgroundColor: '#222', borderRadius: 15, padding: 20, marginHorizontal: SPACING, elevation: 5, alignItems: 'center' },
  cardImage: { width: 80, height: 80, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#FFD700' },
  price: { fontSize: 16, marginBottom: 5, color: '#FFF' },
  calculatorContainer: { backgroundColor: '#222', borderRadius: 15, padding: 20, elevation: 5 },
  input: { borderWidth: 1, borderColor: '#FFD700', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16, color: '#FFF' },
  label: { fontSize: 16, marginBottom: 5, color: '#FFD700' },
  slider: { width: '100%', height: 40, marginBottom: 15 },
  resultContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  resultLabel: { fontSize: 16, color: '#FFD700' },
  resultValue: { fontSize: 18, fontWeight: 'bold', color: '#FFD700' },
});  