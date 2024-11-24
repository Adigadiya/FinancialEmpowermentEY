import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const alertData = [
  {
    id: 1,
    title: 'Fraud Prevention Alert',
    message: 'A new fraud pattern has been detected in the market. Stay vigilant and avoid unsolicited calls.',
    icon: 'warning-outline',
  },
  {
    id: 2,
    title: 'Investment Opportunity',
    message: 'New high-yield bonds are available. Check the latest details and consider investing in them.',
    icon: 'cash-outline',
  },
  {
    id: 3,
    title: 'Subsidy Notification',
    message: 'Government subsidy for electric vehicles announced. Apply before the deadline to avail of the benefits.',
    icon: 'wallet-outline',
  },
  {
    id: 4,
    title: 'Customer Scam Alert',
    message: 'Several users have reported scams involving fraudulent investment schemes. Be cautious while investing.',
    icon: 'alert-circle-outline',
  },
  {
    id: 5,
    title: 'New Tax Benefits',
    message: 'Tax benefits available for retirement funds. Maximize your tax savings this season.',
    icon: 'briefcase-outline',
  },
];

const AlertsScreen = () => {
  const [alerts, setAlerts] = useState(alertData);

  const clearAllNotifications = () => {
    setAlerts([]);
  };

  const dismissNotification = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/Ey.jpg')} style={styles.logo} />

      <Text style={styles.heading}>Alerts and Notifications</Text>
      <ScrollView style={styles.alertList}>
        {alerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={styles.alertCard}
            onPress={() => dismissNotification(alert.id)} 
            activeOpacity={0.8} 
          >
            <Icon name={alert.icon} size={28} color="#FFC107" style={styles.alertIcon} />
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertMessage}>{alert.message}</Text>
            </View>
          
            <TouchableOpacity
              style={styles.tickButton}
              onPress={() => dismissNotification(alert.id)}
            >
              <Icon name="checkmark-circle" size={24} color="#FFC107" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {alerts.length > 0 && (
        <TouchableOpacity style={styles.clearAllButton} onPress={clearAllNotifications}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    padding: 10,
    paddingTop:65,
    justifyContent: 'space-between', 
  },
  logo: {
    width: 70, 
    height: 50, 
    alignSelf: 'center', 
    marginBottom: 20, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFC107', 
    textAlign: 'center', 
  },
  alertList: {
    flex: 1,
  },
  alertCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#1a1a1a', 
    borderRadius: 12, 
    elevation: 5, 
    alignItems: 'center',
  },
  alertIcon: {
    marginRight: 15,
  },
  alertTextContainer: {
    flex: 1, 
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFC107', 
  },
  alertMessage: {
    fontSize: 14,
    color: '#f8f9fa', 
  },
  tickButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearAllButton: {
    backgroundColor: '#FFC107', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20, 
  },
  clearAllText: {
    color: '#000', 
    fontWeight: 'bold',
  },
});

export default AlertsScreen;
