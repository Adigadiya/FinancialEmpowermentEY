import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const BudgetingCalculator = () => {
  const [P, setP] = useState(""); 
  const [R, setR] = useState(""); 
  const [T, setT] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState(""); 
  const [basicInput, setBasicInput] = useState("");
  const [result, setResult] = useState(null);
  const [calculationType, setCalculationType] = useState("basic"); 
  const [financialType, setFinancialType] = useState("SI"); 

  const handlePress = (value) => {
    if (calculationType === "basic") {
      setBasicInput((prev) => prev + value);
    }
  };

  const clearInput = () => {
    setP("");
    setR("");
    setT("");
    setMonthlyDeposit("");
    setBasicInput("");
    setResult(null);
    setFinancialType("SI"); 
  };

  const evaluateExpression = () => {
    try {
      setResult(eval(basicInput)); 
    } catch (error) {
      setResult("Error");
    }
  };

  const calculateSI = () => {
    const principal = parseFloat(P);
    const rate = parseFloat(R);
    const time = parseFloat(T);
    if (principal && rate && time) setResult((principal * rate * time) / 100);
    else setResult("Invalid Input");
  };

  const calculateCI = () => {
    const principal = parseFloat(P);
    const rate = parseFloat(R);
    const time = parseFloat(T);
    if (principal && rate && time) setResult(principal * Math.pow(1 + rate / 100, time) - principal);
    else setResult("Invalid Input");
  };

  const calculateEMI = () => {
    const principal = parseFloat(P);
    const rate = parseFloat(R);
    const time = parseFloat(T);
    if (principal && rate && time) {
      const monthlyRate = rate / (12 * 100);
      const n = time * 12;
      setResult((principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1));
    } else setResult("Invalid Input");
  };

  const calculateSavingsAccount = () => {
    const principal = parseFloat(P);
    const deposit = parseFloat(monthlyDeposit);
    const rate = parseFloat(R);
    const time = parseFloat(T);
    if (principal && deposit && rate && time) {
      const monthlyRate = rate / (12 * 100);
      const months = time * 12;
      const futureValue = principal * Math.pow(1 + monthlyRate, months) + deposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      setResult(futureValue);
    } else setResult("Invalid Input");
  };

  const renderFinancialFields = () => {
    return (
      <>
        <TextInput
          style={styles.input}
          value={P}
          placeholder="Enter Principal (P)"
          onChangeText={setP}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={R}
          placeholder="Enter Rate (R)"
          onChangeText={setR}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={T}
          placeholder="Enter Time (T)"
          onChangeText={setT}
          keyboardType="numeric"
        />
        {financialType === "Savings" && (
          <TextInput
            style={styles.input}
            value={monthlyDeposit}
            placeholder="Enter Monthly Deposit"
            onChangeText={setMonthlyDeposit}
            keyboardType="numeric"
          />
        )}
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Budgeting Calculator</Text>

      {calculationType === "basic" ? (
        <>
          <TextInput style={styles.input} value={basicInput} placeholder="Enter values..." editable={false} />
          <View style={styles.row}>
            {["7", "8", "9", "/"].map((val) => (
              <TouchableOpacity key={val} style={styles.button} onPress={() => handlePress(val)}>
                <Text style={styles.buttonText}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {["4", "5", "6", "*"].map((val) => (
              <TouchableOpacity key={val} style={styles.button} onPress={() => handlePress(val)}>
                <Text style={styles.buttonText}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {["1", "2", "3", "-"].map((val) => (
              <TouchableOpacity key={val} style={styles.button} onPress={() => handlePress(val)}>
                <Text style={styles.buttonText}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {["0", ".", "+", "="].map((val) => (
              <TouchableOpacity key={val} style={styles.button} onPress={val === "=" ? evaluateExpression : () => handlePress(val)}>
                <Text style={styles.buttonText}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <>
          
          <View style={styles.calculationTypeSelector}>
            {["SI", "CI", "EMI", "Savings"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.calculationTypeButton, financialType === type && styles.activeButton]}
                onPress={() => setFinancialType(type)}
              >
                <Text style={styles.buttonText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderFinancialFields()}

          {financialType === "SI" && (
            <TouchableOpacity style={styles.calculateButton} onPress={calculateSI}>
              <Text style={styles.buttonText}>Calculate SI</Text>
            </TouchableOpacity>
          )}
          {financialType === "CI" && (
            <TouchableOpacity style={styles.calculateButton} onPress={calculateCI}>
              <Text style={styles.buttonText}>Calculate CI</Text>
            </TouchableOpacity>
          )}
          {financialType === "EMI" && (
            <TouchableOpacity style={styles.calculateButton} onPress={calculateEMI}>
              <Text style={styles.buttonText}>Calculate EMI</Text>
            </TouchableOpacity>
          )}
          {financialType === "Savings" && (
            <TouchableOpacity style={styles.calculateButton} onPress={calculateSavingsAccount}>
              <Text style={styles.buttonText}>Calculate Savings Account</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {result !== null && <Text style={styles.result}>Result: {result}</Text>}

      <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>

      <View style={styles.switcher}>
        <TouchableOpacity
          style={[styles.switcherButton, calculationType === "basic" && styles.activeButton]}
          onPress={() => setCalculationType("basic")}
        >
          <Text style={styles.buttonText}>Basic Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switcherButton, (calculationType === "SI" || calculationType === "CI" || calculationType === "EMI" || calculationType === "Savings") && styles.activeButton]}
          onPress={() => setCalculationType("SI")}
        >
          <Text style={styles.buttonText}>Financial Calculator</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BudgetingCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000", 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#ffd700", 
    letterSpacing: 2
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    backgroundColor: "#f7f7f7",
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#e1e1e1",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  button: {
    width: 75,
    height: 75,
    backgroundColor: "#ffd700",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000000", 
    fontWeight: "bold",
  },
  calculateButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  result: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333333", 
  },
  clearButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#dc3545",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  switcher: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  switcherButton: {
    width: "49%",
    paddingVertical: 10,
    backgroundColor: "#708090", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: "#ffd700",
  },
  calculationTypeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  calculationTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#708090", 
    borderRadius: 10,
  },
});
