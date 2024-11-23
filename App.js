import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

// Importing Screens
import CommunityScreen from './components/CommunityScreen';
import ChatbotScreen from './components/ChatbotScreen';
import MarketplaceScreen from './components/MarketplaceScreen';
import PlannerScreen from './components/PlannerScreen';
import LearnScreen from './components/LearnScreen';
import ProfileScreen from './components/ProfileScreen';

const Stack = createStackNavigator();

// Home Screen
const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Financial Empowerment App</Text>
    <Button title="Go to Alerts" onPress={() => navigation.navigate('Alerts')} />
    <Button title="Go to Community" onPress={() => navigation.navigate('Community')} />
    <Button title="Go to Chatbot" onPress={() => navigation.navigate('Chatbot')} />
    <Button title="Go to Marketplace" onPress={() => navigation.navigate('Marketplace')} />
    <Button title="Go to Planner" onPress={() => navigation.navigate('Planner')} />
    <Button title="Go to Learn" onPress={() => navigation.navigate('Learn')} />
    <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
  </View>
);

// Alerts Screen
const AlertsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18 }}>AI-Powered Fraud Prevention Alerts</Text>
  </View>
);

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alerts" component={AlertsScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Planner" component={PlannerScreen} />
        <Stack.Screen name="Learn" component={LearnScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
