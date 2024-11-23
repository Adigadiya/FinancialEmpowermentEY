import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Localized Solutions Section
const LocalizedSolutions = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Localized Solutions</Text>
    <Text style={styles.sectionText}>
      Highlight region-specific financial opportunities such as government subsidies, local co-ops, or dairy cooperatives.
    </Text>
  </View>
);

// Micro-Investment Platform Section
const MicroInvestmentPlatform = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Micro-Investment Platform</Text>
    <Text style={styles.sectionText}>
      Allow small, recurring investments (as low as ₹10–₹50) into secure, low-risk schemes like savings groups or mutual funds.
    </Text>
    <Text style={styles.sectionText}>
      Simplified dashboards with pictorial representations of returns and growth.
    </Text>
  </View>
);

// Financial Product Marketplace Section
const FinancialProductMarketplace = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Financial Product Marketplace</Text>
    <Text style={styles.sectionText}>
      Compare and recommend suitable financial products (e.g., micro-loans, insurance, savings accounts).
    </Text>
    <Text style={styles.sectionText}>
      Show personalized suggestions based on income, goals, and risk appetite.
    </Text>
  </View>
);

export default function MarketplaceScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* Local image used here */}
        <Image 
          source={require('../assets/Ey.jpg')} // Replace with the path to your logo image
          style={styles.logo} 
        />
      </View>
      <LocalizedSolutions />
      <MicroInvestmentPlatform />
      <FinancialProductMarketplace />
    </ScrollView>
  );
}

// Styling with the Black and Yellow EY theme colors
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000', // EY black background
    padding: 15,
    paddingTop: 80, // Adjusted padding to make space for logo
  },
  header: {
    alignItems: 'center', // Center the logo
    marginBottom: 20,
  },
  logo: {
    width: 75, // Adjust logo width
    height: 40, // Adjust logo height
    borderRadius: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#333', // Dark section background for contrast
    padding: 15,
    borderRadius: 8,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFC107', // EY yellow color for the section title
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#E0E0E0', // Light gray text color for readability
    marginBottom: 8,
  },
  postButton: {
    backgroundColor: '#FFC107', // EY yellow color for buttons
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  postButtonText: {
    color: '#000', // Black text for better visibility on yellow
    fontSize: 16,
  },
  feed: {
    marginTop: 20,
  },
  post: {
    backgroundColor: '#222', // Dark background for individual posts
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUserDetails: {
    flex: 1,
  },
  postName: {
    color: '#FFC107', // EY yellow color for user name
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDate: {
    color: '#888', // Light gray color for post date
    fontSize: 12,
  },
  postText: {
    color: '#E0E0E0', // Light gray text color for the post content
    fontSize: 16,
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFC107', // Yellow color for action text
    fontSize: 14,
    marginLeft: 5,
  },
});
