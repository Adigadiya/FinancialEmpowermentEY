import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlannerScreen = () => {
  const financialData = {
    savings: 150000, 
    expectedSavings: 300000,
    goalSavings:500000, 
    expensesByCategory: require('../assets/savings.jpg'), 
    shortfallPercentage: ((500000 - 300000) / 500000) * 100, 
    financialGoals: [
      { name: "Children's Education", goalAmount: 200000, saved: 120000 },
      { name: 'House Loan Down Payment', goalAmount: 300000, saved: 180000 },
      { name: 'Emergency Fund', goalAmount: 100000, saved: 70000 },
    ],
    recommendations: [
      { category: 'Dining Out', suggestion: 'Reduce frequency to 1x a week' },
      { category: 'Shopping', suggestion: 'Limit non-essential purchases' },
      { category: 'Travel', suggestion: 'Opt for economical travel options' },
    ],
  };

  const renderProgressLine = (saved, goalAmount) => {
    const progressPercentage = (saved / goalAmount) * 100;
    return (
      <View style={styles.progressLineContainer}>
        <View
          style={[
            styles.progressLine,
            { width: `${progressPercentage}%`, backgroundColor: '#FFC107' },
          ]}
        />
        <View
          style={[
            styles.progressLine,
            { width: `${100 - progressPercentage}%`, backgroundColor: '#fff' },
          ]}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Image source={require('../assets/Ey.jpg')} style={styles.logo} />
      </View>

      <View style={styles.savingsOverview}>
        <Text style={styles.sectionTitle}>Savings Overview</Text>
        <View style={styles.savingsRow}>
          <View style={styles.savingsBlock}>
            <Text style={styles.savingsLabel}>Savings Till Now</Text>
            <Text style={styles.savingsValue}>₹{financialData.savings}</Text>
          </View>
          <View style={styles.savingsBlock}>
            <Text style={styles.savingsLabel}>Expected by Year-End</Text>
            <Text style={styles.savingsValue}>₹{financialData.expectedSavings}</Text>
          </View>
        </View>
        <View style={styles.savingsRow}>
          <View style={styles.savingsBlock}>
            <Text style={styles.savingsLabel}>Shortfall Percentage</Text>
            <Text style={styles.shortfallValue}>
              {financialData.shortfallPercentage.toFixed(1)}% Short
            </Text>
          </View>
          <View style={styles.savingsBlock}>
            <Text style={styles.savingsLabel}>Savings Goal</Text>
            <Text style={styles.savingsValue}>₹{financialData.goalSavings}</Text>
          </View>
        </View>
      </View>

      <View style={styles.goalSection}>
        <Text style={styles.sectionTitle}>Financial Goals</Text>
        {financialData.financialGoals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Text style={styles.goalName}>{goal.name}</Text>
            <Text style={styles.goalAmount}>
              Saved: ₹{goal.saved} / Goal: ₹{goal.goalAmount}
            </Text>
            {renderProgressLine(goal.saved, goal.goalAmount)}
          </View>
        ))}
      </View>
<View style={styles.expenseTrackerSection}>
  <Text style={styles.sectionTitle}>Expense Tracker</Text>

  <Image
    source={financialData.expensesByCategory}
    style={styles.chartImage}
    resizeMode="contain"
  />

  <View style={styles.expenseTrackerActions}>
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.buttonText}>Add Expense</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.buttonText}>Add Salary</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.buttonText}>Edit</Text>
    </TouchableOpacity>
  </View>
</View>

      <View style={styles.recommendationSection}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        {financialData.recommendations.map((item, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Text style={styles.recommendationText}>
              <Icon name="checkmark-circle" size={20} color="#FFC107" /> {item.category}:{' '}
              {item.suggestion}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.alertsSection}>
        <Text style={styles.sectionTitle}>Alerts</Text>
        <View style={styles.alertItem}>
          <Icon name="warning" size={20} color="#FFC107" />
          <Text style={styles.alertText}>You have overspent on Dining Out this month.</Text>
        </View>
        <View style={styles.alertItem}>
          <Icon name="checkmark-done" size={20} color="#FFC107" />
          <Text style={styles.alertText}>Congratulations! You reached 60% of your savings goal!</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
    paddingTop:70,
  },
  logo: {
    width: 120,
    height: 50, 
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginBottom: 10, 
  },
  
  expenseTrackerSection: {
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  chartImage: {
    width: 1100,
    height: 250,
    marginBottom: 15,
  },
  expenseTrackerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#FFC107',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 10,
  },
  savingsOverview: {
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  savingsBlock: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  savingsLabel: {
    fontSize: 14,
    color: '#f8f9fa',
  },
  savingsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  shortfallValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4C4C',
  },
  goalSection: {
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
  },
  goalItem: {
    marginBottom: 15,
  },
  goalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8f9fa',
  },
  goalAmount: {
    fontSize: 14,
    color: '#f8f9fa',
    marginBottom: 5,
  },
  progressLineContainer: {
    height: 10,
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressLine: {
    height: '100%',
  },
  recommendationSection: {
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
  },
  recommendationItem: {
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    color: '#f8f9fa',
  },
  alertsSection: {
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertText: {
    fontSize: 14,
    color: '#f8f9fa',
    marginLeft: 10,
  },
});

export default PlannerScreen;
