import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

// Importing Screens
import CommunityScreen from './components/CommunityScreen';
import MarketplaceScreen from './components/MarketplaceScreen';
import PlannerScreen from './components/PlannerScreen';
import LearnScreen from './components/LearnScreen';
import ProfileScreen from './components/ProfileScreen';
import BlogDetailScreen from './components/BlogDetailScreen';
import AlertsScreen from './components/AlertsScreen'; 
import ChatbotScreen from './components/ChatbotScreen';
// Screens for Top Buttons

const Stack = createNativeStackNavigator();

const LearnNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="LearnScreen" 
      component={LearnScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="BlogDetailScreen" 
      component={BlogDetailScreen} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

// Tab Configurations
const tabs = [
  { name: 'Community', label: 'Community', iconName: 'people-outline' },
  { name: 'Marketplace', label: 'Marketplace', iconName: 'cart-outline' },
  { name: 'Planner', label: 'Planner', iconName: 'calendar-outline' },
  { name: 'Learn', label: 'Learn', iconName: 'book-outline' },
  { name: 'Profile', label: 'Profile', iconName: 'person-outline' },
];

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Community'); // Active bottom tab
  const [topScreen, setTopScreen] = useState(null); // Active top button screen

  const renderScreen = () => {
    if (topScreen === 'Alerts') return <AlertsScreen />;
    if (topScreen === 'Chatbot') return <ChatbotScreen />;

    // Render the current bottom tab screen
    switch (currentScreen) {
      case 'Community':
        return <CommunityScreen />;
      case 'Marketplace':
        return <MarketplaceScreen />;
      case 'Planner':
        return <PlannerScreen />;
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
        {/* Render the current screen */}
        {renderScreen()}

        {/* Top Buttons */}
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => setTopScreen('Alerts')}
          >
            <Icon name="alert-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chatbotButton}
            onPress={() => setTopScreen('Chatbot')}
          >
            <Icon name="chatbubbles-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.navButton,
                currentScreen === tab.name && styles.activeTab, // Highlight active tab
              ]}
              onPress={() => {
                setCurrentScreen(tab.name);
                setTopScreen(null); // Close top button screens when switching tabs
              }}
            >
              <Icon
                name={tab.iconName}
                size={24}
                color={currentScreen === tab.name ? '#007bff' : '#6c757d'}
              />
              <Text
                style={[
                  styles.navText,
                  currentScreen === tab.name && styles.activeTabText,
                ]}
              >
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
    top:50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  chatbotButton: {
    backgroundColor: '#4caf50',
    width: 50,
    top:50,
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
    backgroundColor: '#000', // EY Black background
    borderTopWidth: 0.5, // Thinner line for a more subtle look
    borderTopColor: '#FFC107', // EY Yellow line for contrast
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navText: {
    fontSize: 12,
    color: '#FFC107', // EY Yellow text color for buttons
    marginTop: 5,
  },
  activeTab: {
    backgroundColor: '#e7f3ff', // Light blue for active tab
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
