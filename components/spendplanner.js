import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ExpensesScreen from "./ExpensesScreen";
import BudgetScreen from "./BudgetScreen";
import GoalsScreen from "./GoalsScreen";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const SpendPlannerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#000" },
        tabBarIndicatorStyle: { backgroundColor: "#FFD700" },
        tabBarLabelStyle: { fontSize: 14, color: "#FFD700", fontWeight: "bold" },
      }}
    >
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SpendPlanner"
          component={SpendPlannerTabs}
          options={{
            headerStyle: { backgroundColor: "#000" },
            headerTitleStyle: { color: "#FFD700", fontSize: 20 },
            headerTitle: "Spend & Planner",
            headerRight: () => (
              <Ionicons name="add-circle-outline" size={28} color="#FFD700" style={{ marginRight: 15 }} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginBottom: 20 },
});
