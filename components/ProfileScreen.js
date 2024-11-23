// components/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  // Sample user data for illustration
  const user = {
    name: 'Kaira Sharma',
    email: 'kaira.sharma@ey.com',
    profileImage: require('../assets/user1.jpg'), // Placeholder image
    financialOverview: {
      totalPortfolioValue: 125000, // in local currency
      totalInvestments: 75000,
      totalSavings: 50000,
      totalDebts: 10000,
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* EY Logo at the top */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Ey.jpg')} style={styles.eyLogo} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      {/* Financial Overview */}
      <View style={styles.overviewSection}>
        <Text style={styles.sectionTitle}>Financial Overview</Text>
        <View style={styles.overviewCard}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Total Portfolio</Text>
            <Text style={styles.overviewValue}>₹{user.financialOverview.totalPortfolioValue}</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Investments</Text>
            <Text style={styles.overviewValue}>₹{user.financialOverview.totalInvestments}</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Savings</Text>
            <Text style={styles.overviewValue}>₹{user.financialOverview.totalSavings}</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Debts</Text>
            <Text style={styles.overviewValue}>₹{user.financialOverview.totalDebts}</Text>
          </View>
        </View>
      </View>

      {/* Financial Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Icon name="arrow-down-circle" size={20} color="#FFC107" />
            <Text style={styles.activityText}>Deposited ₹10,000 into Savings</Text>
          </View>
          <View style={styles.activityItem}>
            <Icon name="arrow-up-circle" size={20} color="#FFC107" />
            <Text style={styles.activityText}>Invested ₹5,000 in Bonds</Text>
          </View>
          <View style={styles.activityItem}>
            <Icon name="wallet" size={20} color="#FFC107" />
            <Text style={styles.activityText}>Paid ₹2,000 Credit Card Bill</Text>
          </View>
        </View>

        {/* View More Button */}
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access Features */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessItems}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Icon name="cash" size={30} color="#FFC107" />
            <Text style={styles.quickAccessText}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Icon name="bar-chart" size={30} color="#FFC107" />
            <Text style={styles.quickAccessText}>Investments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Icon name="shield-checkmark" size={30} color="#FFC107" />
            <Text style={styles.quickAccessText}>Security</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingsItem}>
          <Icon name="settings" size={24} color="#FFC107" />
          <Text style={styles.settingsText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Icon name="notifications" size={24} color="#FFC107" />
          <Text style={styles.settingsText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // EY Black background
    padding: 15,
    paddingTop:70,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  eyLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
    elevation: 5, // Shadow
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  profileEmail: {
    fontSize: 14,
    color: '#f8f9fa',
  },
  overviewSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 10,
  },
  overviewCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    elevation: 5,
  },
  overviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#f8f9fa',
  },
  overviewValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  activitySection: {
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#f8f9fa',
    marginLeft: 10,
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  quickAccessSection: {
    marginBottom: 20,
  },
  quickAccessItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAccessItem: {
    alignItems: 'center',
  },
  quickAccessText: {
    fontSize: 12,
    color: '#FFC107',
    marginTop: 5,
  },
  settingsSection: {
    marginBottom: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingsText: {
    fontSize: 16,
    color: '#f8f9fa',
    marginLeft: 10,
  },
});

export default ProfileScreen;
