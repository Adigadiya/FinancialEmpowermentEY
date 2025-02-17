import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export default function SpendPlannerScreen() {
  const navigation = useNavigation();
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

  const [income, setIncome] = useState([{ source: "Salary", amount: 30000 }]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });
  const [newGoal, setNewGoal] = useState({ name: "", amount: "", saved: "" });
  const [newIncome, setNewIncome] = useState({ source: "", amount: "" });
  const [suggestions, setSuggestions] = useState("");

  const totalBudget = 20000;
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const totalIncome = income.reduce((total, incomeSource) => total + incomeSource.amount, 0);

  const editExpense = (index, newAmount) => {
    setExpenses(expenses.map((expense, i) => {
      if (i === index) {
        return { ...expense, amount: newAmount };
      }
      return expense;
    }));
  };
  
  const editGoal = (index, newSavedAmount) => {
    setGoals(goals.map((goal, i) => {
      if (i === index) {
        return { ...goal, saved: newSavedAmount };
      }
      return goal;
    }));
  };
  
  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      setExpenses([...expenses, { name: newExpense.name, amount: parseInt(newExpense.amount), color: "#FFFFFF" }]);
      setNewExpense({ name: "", amount: "" });
    }
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.amount && newGoal.saved) {
      setGoals([...goals, { name: newGoal.name, amount: parseInt(newGoal.amount), saved: parseInt(newGoal.saved) }]);
      setNewGoal({ name: "", amount: "", saved: "" });
    }
  };

  const addIncome = () => {
    if (newIncome.source && newIncome.amount) {
      setIncome([...income, { source: newIncome.source, amount: parseInt(newIncome.amount) }]);
      setNewIncome({ source: "", amount: "" });  // Reset inputs after adding
    }
  };

  const generateSuggestions = () => {
    let suggestionText = "";

    const highestExpense = expenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), expenses[0]);
    if (highestExpense.amount > 8000) {
      suggestionText += `Consider reducing your spending on ${highestExpense.name} to save more! \n`;
    }

    if (remainingBudget > 10000) {
      suggestionText += "You have a significant remaining budget. Consider increasing your savings or funding a financial goal! \n";
    }

    const totalSaved = goals.reduce((total, goal) => total + goal.saved, 0);
    const totalGoalAmount = goals.reduce((total, goal) => total + goal.amount, 0);
    if (totalSaved / totalGoalAmount < 0.5) {
      suggestionText += "You're making good progress on your financial goals, but consider putting more towards your goals. \n";
    }

    const nonEssentialSpending = expenses.filter(expense => expense.name !== 'Rent' && expense.name !== 'Transport');
    const nonEssentialTotal = nonEssentialSpending.reduce((total, expense) => total + expense.amount, 0);
    if (nonEssentialTotal / totalBudget > 0.5) {
      suggestionText += "Consider cutting back on non-essential expenses to save more for your goals! \n";
    }

    setSuggestions(suggestionText);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    generateSuggestions();
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
        height={220}
        chartConfig={{
          backgroundColor: "#1e1e1e",
          backgroundGradientFrom: "#1e1e1e",
          backgroundGradientTo: "#333",
          color: () => `#FFF`,
          decimalPlaces: 2,
          style: { borderRadius: 16 },
        }}
        accessor="amount"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.sectionTitle}>💸 Expenses</Text>
      {expenses.map((expense, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.expenseItem}>{expense.name}</Text>
          <TextInput
            style={[styles.input, styles.showing]}
            keyboardType="numeric"
            value={String(expense.amount)}
            onChangeText={(text) => editExpense(index, parseInt(text) || 0)}
          />
          <TouchableOpacity onPress={() => deleteExpense(index)} style={styles.iconButton}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        placeholderTextColor="#808080"
        value={newExpense.name}
        onChangeText={(text) => setNewExpense({ ...newExpense, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        placeholderTextColor="#808080"
        value={newExpense.amount}
        onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={addExpense}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>💰 Income</Text>
      {income.map((inc, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.expenseItem}>{inc.source} - ₹{inc.amount}</Text>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Income Source"
        placeholderTextColor="#808080"
        value={newIncome.source}
        onChangeText={(text) => setNewIncome({ ...newIncome, source: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#808080" 
        keyboardType="numeric"
        value={newIncome.amount}
        onChangeText={(text) => setNewIncome({ ...newIncome, amount: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={addIncome}>
        <Text style={styles.addButtonText}>Add Income</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>🎯 Financial Goals</Text>
      {goals.map((goal, index) => (
        <View key={index} style={styles.goalContainer}>
          <Text style={styles.goalItem}>{goal.name} - ₹{goal.saved} / ₹{goal.amount}</Text>
          <ProgressBar progress={goal.saved / goal.amount} color="#FFD700" style={styles.progressBar} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(goal.saved)}
            onChangeText={(text) => editGoal(index, parseInt(text) || 0)}
          />
          <TouchableOpacity onPress={() => deleteGoal(index)} style={styles.iconButton}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Goal Name"
        placeholderTextColor="#808080"
        value={newGoal.name}
        onChangeText={(text) => setNewGoal({ ...newGoal, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Goal Amount"
        placeholderTextColor="#808080"
        keyboardType="numeric"
        value={newGoal.amount}
        onChangeText={(text) => setNewGoal({ ...newGoal, amount: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount Saved"
        keyboardType="numeric"
        placeholderTextColor="#808080"
        value={newGoal.saved}
        onChangeText={(text) => setNewGoal({ ...newGoal, saved: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={addGoal}>
        <Text style={styles.addButtonText}>Add Goal</Text>
      </TouchableOpacity>

      <Text style={styles.remainingBudgetText}>💰 Remaining Budget: ₹{remainingBudget}</Text>

      <Text style={styles.suggestionsText}>💡 Suggestions:</Text>
      <Text style={styles.suggestions}>{suggestions}</Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.addButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button,styles.budgetingcalculator]} 
        onPress={() => navigation.navigate('BudgetingCalculator')}
      >
        <Text style={styles.buttonText}>Budgeting Calculator</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  budgetingcalculator:{
    marginTop:10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    padding: 15,
    backgroundColor: "#000", // Dark background
  },
  showing:{
width:100,
position: "absolute",  // Enables manual positioning
left: 200,     
  },
  logoContainer: {
    alignItems: "center",
  },
  eyLogo: {
    top:55,marginBottom:55,
    width: 70,
    height: 35,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#fff", // White text for contrast
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#fff", // White section titles
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    marginHorizontal: 10,
    backgroundColor: "#333", // Dark input background
    color: "#fff", // White text for input fields
  },
  addButton: {
    backgroundColor: "#FFC107", // EY's signature yellow for add button
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "black", // Black text on yellow button for better readability
    textAlign: "center",
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  expenseItem: {
    fontSize: 16,
    color: "#fff", // White text for list items
  },
  iconButton: {
    marginLeft: 10,
    padding: 8,
  },
  goalContainer: {
    marginVertical: 12,
  },
  goalItem: {
    fontSize: 16,
    color: "#fff", // White text for goal items
  },
  progressBar: {
    marginVertical: 10,
  },
  remainingBudgetText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#fff", // White text for remaining budget
  },
  suggestionsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#fff", // White text for suggestions heading
  },
  suggestions: {
    fontSize: 16,
    color: "#aaa", // Lighter color for suggestion text
  },
  saveButton: {
    backgroundColor: "#2196F3", // Blue button for save
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
