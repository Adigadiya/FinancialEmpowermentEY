import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // You can use other chart libraries based on your preference

const InvestAndMarketplaceScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Ey.jpg')} // Adjust the path based on your folder structure
          style={styles.logo}
        />
      </View>

      <ScrollView>
        {/* Micro-Investment Platform */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Micro-Investment Platform</Text>
          <Text style={styles.sectionDescription}>
            Track your investment progress and performance.
          </Text>

          {/* Investment Plan Graphs */}
          <View style={styles.graphsContainer}>
            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Investment Growth</Text>
              <LineChart
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                  datasets: [
                    {
                      data: [10, 25, 35, 40, 45],
                    },
                  ],
                }}
                width={200}
                height={150}
                chartConfig={{
                  backgroundColor: '#1a1a1a',
                  backgroundGradientFrom: '#1a1a1a',
                  backgroundGradientTo: '#1a1a1a',
                  color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 0.5,
                }}
              />
            </View>
            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Savings Increase</Text>
              <LineChart
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                  datasets: [
                    {
                      data: [0, 10, 15, 25, 35],
                    },
                  ],
                }}
                width={200}
                height={150}
                chartConfig={{
                  backgroundColor: '#1a1a1a',
                  backgroundGradientFrom: '#1a1a1a',
                  backgroundGradientTo: '#1a1a1a',
                  color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 0.5,
                }}
              />
            </View>
            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Loss / Hike Percentage</Text>
              <LineChart
                data={{
                  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                  datasets: [
                    {
                      data: [2, 5, 7, 4],
                    },
                  ],
                }}
                width={200}
                height={150}
                chartConfig={{
                  backgroundColor: '#1a1a1a',
                  backgroundGradientFrom: '#1a1a1a',
                  backgroundGradientTo: '#1a1a1a',
                  color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 0.5,
                }}
              />
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Increase</Text>
              <Text style={styles.statValue}>₹1,000</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Savings</Text>
              <Text style={styles.statValue}>₹8,500</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Output</Text>
              <Text style={[styles.statValue, styles.lossstat]}>+5%</Text>
            </View>
          </View>
        </View>

        {/* Localized Solutions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localized Solutions</Text>
          <Text style={styles.sectionDescription}>
            Explore region-specific financial opportunities.
          </Text>

          {/* Example Solutions */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Government Subsidy: Rural Housing</Text>
            <Text style={styles.cardDescription}>
              Get up to ₹2,50,000 for building or renovating your home.
            </Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Farmer Loan Assistance</Text>
            <Text style={styles.cardDescription}>
              Loans starting at ₹10,000 with low-interest rates for farming expenses.
            </Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        {/* Financial Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Products</Text>

          {/* List of Financial Products */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Micro-Loan: Women's Self-Help Group</Text>
            <Text style={styles.cardDescription}>
              Low-interest loans starting at ₹500 for small businesses and home needs.
            </Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Savings Account: Zero Balance</Text>
            <Text style={styles.cardDescription}>
              Open a savings account with no minimum balance requirement and attractive interest rates.
            </Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,  // Adjust the width as per your logo size
    height: 60, // Adjust the height as per your logo size
    resizeMode: 'contain',
  },
  section: {
    margin: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  graphsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  graphContainer: {
    width: '30%',
  },
  graphTitle: {
    textAlign: 'center',
    color: '#FFC107',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statBox: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: '#ccc',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  lossstat: {
    color: 'green',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  applyButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  viewMoreButton: {
    marginTop: 10,
    backgroundColor: '#FFC107',
    paddingVertical: 8,
    borderRadius: 5,
  },
  viewMoreText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});

export default InvestAndMarketplaceScreen;
