import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import HomeLoanScreen from "./components/HomeLoanScreen"; 
import FarmerLoanScreen from "./components/FarmerLoanScreen"; 
import BusinessLoanScreen from "./components/BusinessLoanScreen";
import InvestmentScreen from "./components/InvestmentScreen";
import EducationLoanScreen from "./components/EducationLoanScreen"; 
import CommunityScreen from './components/CommunityScreen';
import MarketplaceScreen from './components/MarketplaceScreen';
import PlannerScreen from './components/PlannerScreen';
import LearnScreen from './components/LearnScreen';
import ProfileScreen from './components/ProfileScreen';
import BlogDetailScreen from './components/BlogDetailScreen';
import AlertsScreen from './components/AlertsScreen'; 
import ChatbotScreen from './components/ChatbotScreen';
import MySchemeScreen from './components/MySchemeScreen';  
import InsuranceScreen from "./components/InsuranceScreen";
import PostDetailsScreen from "./components/PostDetailsScreen";
import FraudDetectionScreen from "./components/FraudDetectionScreen";
import FraudReportScreen from "./components/FraudReportScreen";
import BudgetingCalculator from './components/BudgetingCalculator';
const Stack = createNativeStackNavigator();

const PlannerNavigator=()=>(
  <Stack.Navigator>
     <Stack.Screen name='PlannerScreen' component={PlannerScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BudgetingCalculator" component={BudgetingCalculator} options={{ title: "Calculator",headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" }  }} />
  </Stack.Navigator>
)
const CommunityNavigator=()=>(
  <Stack.Navigator>
    <Stack.Screen name='CommunityScreen' component={CommunityScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: "Discussion",headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" }  }} />
  </Stack.Navigator>
);
const LearnNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="LearnScreen" component={LearnScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} options={{ headerShown: true, title: "Blog",headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" }   }} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Marketplace" component={MarketplaceScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MySchemeScreen" component={MySchemeScreen} options={{ title: "Government Schemes", headerShown: true   }} /> 
    <Stack.Screen name="FraudReportScreen" component={FraudReportScreen} options={{ title: "Report Frauds", headerShown: true   }} /> 
    <Stack.Screen name="InvestmentScreen" component={InvestmentScreen} options={{ title: "Investments", headerShown: true , headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" }} }/> 
    <Stack.Screen name="HomeLoanScreen" component={HomeLoanScreen} options={{ title: "Home Loans" ,headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" }}} />
    <Stack.Screen name="EducationLoanScreen" component={EducationLoanScreen} options={{ title: "Education Loans", headerShown: true,headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" } }} /> 
    <Stack.Screen name="FarmerLoanScreen" component={FarmerLoanScreen} options={{ title: "Farmer & Agriculture Loans" ,headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" }}} />
    <Stack.Screen name="InsuranceScreen" component={InsuranceScreen} options={{ title: "Insurance Plans",headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" } }} />
    <Stack.Screen name="BusinessLoanScreen" component={BusinessLoanScreen} options={{ title: "Business Loans" ,headerStyle: { backgroundColor: "#000" }, // Black header background
    headerTitleStyle: { color: "#FFF" }}} />
    <Stack.Screen name="FraudDetectionScreen" component={FraudDetectionScreen} options={{ title: "Fraud Detection" ,headerStyle: { backgroundColor: "#fff" }, // Black header background
    headerTitleStyle: { color: "#000" }}} />
    
  </Stack.Navigator>
);


const tabs = [
  { name: 'Community', label: 'Community', iconName: 'people-outline' },
  { name: 'Marketplace', label: 'Marketplace', iconName: 'cart-outline' },
  { name: 'Planner', label: 'Planner', iconName: 'calendar-outline' },
  { name: 'Learn', label: 'Learn', iconName: 'book-outline' },
  { name: 'Profile', label: 'Profile', iconName: 'person-outline' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Community'); 
  const [topScreen, setTopScreen] = useState(null); 

  const renderScreen = () => {
    if (topScreen === 'Alerts' && currentScreen !== 'MyScheme') return <AlertsScreen />;
    if (topScreen === 'Chatbot' && currentScreen !== 'MyScheme') return <ChatbotScreen />;
    
    switch (currentScreen) {
      case 'Community':
        return <CommunityNavigator />;
      case 'Marketplace':
        return <AppNavigator />;
      case 'Planner':
        return <PlannerNavigator />;
      case 'Learn':
        return <LearnNavigator />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <CommunityScreen />;
    }
  };

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {renderScreen()}
        {currentScreen !== 'MySchemeScreen' && (
          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.alertButton} onPress={() => setTopScreen('Alerts')}>
              <Icon name="alert-circle-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatbotButton} onPress={() => setTopScreen('Chatbot')}>
              <Icon name="chatbubbles-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bottomNav}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={[styles.navButton, currentScreen === tab.name && styles.activeTab]}
              onPress={() => {
                setCurrentScreen(tab.name);
                setTopScreen(null); 
              }}
            >
              <Icon name={tab.iconName} size={24} color={currentScreen === tab.name ? '#007bff' : '#6c757d'} />
              <Text style={[styles.navText, currentScreen === tab.name && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topButtons: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertButton: {
    backgroundColor: '#ff4d4f',
    width: 50,
    height: 50,
    top: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  chatbotButton: {
    backgroundColor: '#4caf50',
    width: 50,
    top: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#000', 
    borderTopWidth: 0.5, 
    borderTopColor: '#FFC107', 
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navText: {
    fontSize: 12,
    color: '#FFC107', 
    marginTop: 5,
  },
  activeTab: {
    backgroundColor: '#e7f3ff', 
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
