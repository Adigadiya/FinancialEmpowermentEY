import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { ProgressBar } from "react-native-paper";

export default function SpendPlannerScreen() {
  const [expenses, setExpenses] = useState([
    { name: "Food", amount: 5000, color: "#FFD700" },
    { name: "Transport", amount: 2000, color: "#FF5733" },
    { name: "Rent", amount: 10000, color: "#33FF57" },
    { name: "Misc", amount: 3000, color: "#3357FF" },
  ]);

  const [goals, setGoals] = useState([
    { name: "Buy a House", amount: 1000000, saved: 200000 },
    { name: "Education Fund", amount: 500000, saved: 100000 },
  ]);

  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });
  const [newGoal, setNewGoal] = useState({ name: "", amount: "", saved: "" });

  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      setExpenses([...expenses, { name: newExpense.name, amount: parseInt(newExpense.amount), color: "#FFFFFF" }]);
      setNewExpense({ name: "", amount: "" });
    }
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const editExpense = (index, newAmount) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = newAmount;
    setExpenses(updatedExpenses);
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.amount && newGoal.saved) {
      setGoals([...goals, { name: newGoal.name, amount: parseInt(newGoal.amount), saved: parseInt(newGoal.saved) }]);
      setNewGoal({ name: "", amount: "", saved: "" });
    }
  };

  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const editGoal = (index, newSavedAmount) => {
    const updatedGoals = [...goals];
    updatedGoals[index].saved = newSavedAmount;
    setGoals(updatedGoals);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/Ey.jpg")} style={styles.eyLogo} />
      </View>

      <Text style={styles.title}>📊 Budget Overview</Text>
      <PieChart
        data={expenses.map(expense => ({ ...expense, legendFontColor: "#FFF", legendFontSize: 14 }))}
        width={350}
        height={200}
        chartConfig={{ backgroundColor: "#000", backgroundGradientFrom: "#000", backgroundGradientTo: "#000", color: () => `#FFF` }}
        accessor="amount"
        paddingLeft="15"
        absolute
      />
      
      <Text style={styles.sectionTitle}>💸 Expenses</Text>
      {expenses.map((expense, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.expenseItem}>{expense.name}: ₹</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={String(expense.amount)}
            onChangeText={text => editExpense(index, parseInt(text) || 0)}
          />
          <TouchableOpacity onPress={() => deleteExpense(index)}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      
      <Text style={styles.sectionTitle}>🎯 Financial Goals</Text>
      {goals.map((goal, index) => (
        <View key={index} style={styles.goalContainer}>
          <Text style={styles.goalItem}>{goal.name} - ₹{goal.saved} / ₹{goal.amount}</Text>
          <ProgressBar progress={goal.saved / goal.amount} color="#FFD700" style={styles.progressBar} />
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={String(goal.saved)}
            onChangeText={text => editGoal(index, parseInt(text) || 0)}
          />
          <TouchableOpacity onPress={() => deleteGoal(index)}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  eyLogo: { width: 100, height: 50, resizeMode: "contain" },
  title: { fontSize: 22, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#FFD700", marginTop: 20, marginBottom: 10 },
  itemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5 },
  goalContainer: { marginVertical: 10 },
  expenseItem: { fontSize: 16, color: "#FFF" },
  goalItem: { fontSize: 16, color: "#FFD700", marginBottom: 5 },
  progressBar: { height: 10, borderRadius: 5, marginTop: 5 },
  input: { backgroundColor: "#333", color: "#FFF", padding: 10, borderRadius: 5, marginBottom: 10, width: 100 },
  addButton: { backgroundColor: "#FFD700", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 20 },
  addButtonText: { fontSize: 16, fontWeight: "bold", color: "#000" }
});
