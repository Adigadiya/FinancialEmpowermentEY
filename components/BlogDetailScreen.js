import React, { useState, useRef } from 'react';
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
  },
  hi: {
    title: 'मुद्रास्फीति कैलकुलेटर',
    comparison: 'ऐतिहासिक मूल्य तुलना',
    calculate: 'भविष्य का मूल्य गणना करें',
    enterAmount: 'राशि दर्ज करें',
    years: 'वर्ष:',
    futureValue: 'भविष्य का मूल्य:',
    learnMore: 'अधिक जानें',
  }
};

export default function App() {
  const [amount, setAmount] = useState('1000');
  const [years, setYears] = useState(10);
  const [language, setLanguage] = useState('en');
  const scrollX = useRef(new Animated.Value(0)).current;

  const calculateInflation = (amount, years) => {
    const rate = 0.05;
    return (amount * Math.pow(1 + rate, years)).toFixed(2);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.languageSwitcher}>
          <TouchableOpacity onPress={() => setLanguage('en')} style={styles.langButton}><Text>English</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage('hi')} style={styles.langButton}><Text>हिन्दी</Text></TouchableOpacity>
        </View>
        <Text style={styles.title}>{translations[language].title}</Text>
        
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
          <Text style={styles.sectionTitle}>{translations[language].calculate}</Text>
          <View style={styles.calculatorContainer}>
            <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder={translations[language].enterAmount} />
            <Text style={styles.label}>{translations[language].years} {years}</Text>
            <Slider style={styles.slider} minimumValue={1} maximumValue={30} step={1} value={years} onValueChange={setYears} />
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>{translations[language].futureValue}</Text>
              <Text style={styles.resultValue}>₹{calculateInflation(parseFloat(amount) || 0, years)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffebcd' },
  scrollView: { flex: 1, paddingTop: 60 },
  languageSwitcher: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  langButton: { padding: 10, backgroundColor: '#ffcc80', marginHorizontal: 5, borderRadius: 5 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#ff5722' },
  section: { marginBottom: 30, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 22, fontWeight: '600', marginBottom: 15, color: '#e65100' },
  cardContainer: { paddingHorizontal: SPACING },
  card: { width: CARD_WIDTH, backgroundColor: '#fff8e1', borderRadius: 15, padding: 20, marginHorizontal: SPACING, elevation: 5, alignItems: 'center' },
  cardImage: { width: 80, height: 80, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 16, marginBottom: 5, color: '#d84315' },
  calculatorContainer: { backgroundColor: '#fff8e1', borderRadius: 15, padding: 20, elevation: 5 },
  input: { borderWidth: 1, borderColor: '#ff9800', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16 },
  label: { fontSize: 16, marginBottom: 5, color: '#ff5722' },
  slider: { width: '100%', height: 40, marginBottom: 15 },
  resultContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  resultLabel: { fontSize: 16, color: '#ff5722' },
  resultValue: { fontSize: 18, fontWeight: 'bold', color: '#d84315' },
});