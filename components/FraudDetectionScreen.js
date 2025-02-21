import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Keyboard,
  Animated,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const FraudDetectionScreen = () => {
  const [schemeName, setSchemeName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en"); 
  const fadeAnim = useState(new Animated.Value(0))[0];

  const checkFraud = async () => {
    if (!schemeName || !description) {
      Alert.alert(language === "en" ? "Error" : "त्रुटि", language === "en" ? "Please enter scheme name and description." : "कृपया योजना का नाम और विवरण दर्ज करें।");
      return;
    }

    Keyboard.dismiss();

    try {
      const response = await axios.post("http://192.168.60.131:8082/check-fraud", {
        schemeName,
        description,
      });

      console.log("API Response:", response.data);
      setResult(response.data);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    } catch (error) {
      console.error("Error checking fraud:", error);
      Alert.alert(language === "en" ? "Error" : "त्रुटि", language === "en" ? "Failed to check fraud. Try again later." : "धोखाधड़ी की जांच करने में विफल। बाद में पुनः प्रयास करें।");
    }
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "SAFE":
        return {
          color: "#2E7D32",
          backgroundColor: "#E8F5E9",
          icon: <Ionicons name="shield-checkmark-outline" size={18} color="#2E7D32" />,
        };
      case "SUSPICIOUS":
        return {
          color: "#FF8F00",
          backgroundColor: "#FFF3E0",
          icon: <MaterialIcons name="warning" size={18} color="#FF8F00" />,
        };
      case "SCAM":
        return {
          color: "#D32F2F",
          backgroundColor: "#FFEBEE",
          icon: <MaterialIcons name="dangerous" size={18} color="#D32F2F" />,
        };
      default:
        return { color: "#000", backgroundColor: "#f5f5f5", icon: null };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>{language === "en" ? "Fraud Detection Portal" : "धोखाधड़ी जांच पोर्टल"}</Text>

        <TextInput
          style={styles.input}
          placeholder={language === "en" ? "Enter Scheme Name" : "योजना का नाम दर्ज करें"}
          placeholderTextColor="#666"
          value={schemeName}
          onChangeText={setSchemeName}
        />

        <TextInput
          style={styles.input}
          placeholder={language === "en" ? "Enter Description" : "विवरण दर्ज करें"}
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={checkFraud}>
          <Text style={styles.buttonText}>{language === "en" ? "Check Fraud" : "धोखाधड़ी जांचें"}</Text>
          <Ionicons name="shield-checkmark-outline" size={16} color="black" />
        </TouchableOpacity>

        {result && (
          <Animated.View
            style={[
              styles.resultContainer,
              { backgroundColor: getStatusDetails(result.status).backgroundColor, opacity: fadeAnim },
            ]}
          >
            <View style={styles.resultHeader}>
              {getStatusDetails(result.status).icon}
              <Text style={[styles.resultText, { color: getStatusDetails(result.status).color }]}>
                {language === "en" ? `Status: ${result.status}` : `स्थिति: ${result.status}`}
              </Text>
            </View>
            <Text style={styles.resultSubText}>{language === "en" ? `Risk: ${result.riskScore}%` : `जोखिम: ${result.riskScore}%`}</Text>
            <Text style={styles.resultSubText}>{language === "en" ? `Reason: ${result.reason}` : `कारण: ${result.reason}`}</Text>
          </Animated.View>
        )}
      </ScrollView>

      <View style={styles.languageSwitcher}>
        <TouchableOpacity onPress={() => setLanguage("en")} style={language === "en" ? styles.activeLang : styles.langButton}>
          <FontAwesome5 name="language" size={14} color={language === "en" ? "black" : "gray"} />
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("hi")} style={language === "hi" ? styles.activeLang : styles.langButton}>
          <FontAwesome5 name="language" size={14} color={language === "hi" ? "black" : "gray"} />
          <Text style={styles.langText}>हिंदी</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1, padding: 15 },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    color: "#000",
    backgroundColor: "#F5F5F5",
    fontSize: 14,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  resultContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  resultText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  resultSubText: {
    fontSize: 12,
    color: "#333",
  },
  languageSwitcher: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  langButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
  },
  activeLang: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  langText: {
    fontSize: 14,
    color: "black",
  },
});

export default FraudDetectionScreen;
