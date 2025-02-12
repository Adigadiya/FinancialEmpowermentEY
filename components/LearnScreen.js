import React, { useEffect, useState } from "react";
import { 
    View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Image 
} from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // ✅ Import Icons
import "../utils/i18n";

const LearnScreen = () => {
    const { t, i18n } = useTranslation();
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const currentLanguage = i18n.language;
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await axios.get("http://172.20.10.2:5000/api/faqs");
                setFaqs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
                setLoading(false);
            }
        };
        fetchFAQs();
    }, []);

    return (
        <View style={styles.container}>
            {/* 🟡 Header with Logo */}
            <View style={styles.header}>
                <Image source={require("../assets/Ey.jpg")} style={styles.logo} />
                
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : (
                <FlatList
                    data={faqs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.card}>
                            <TouchableOpacity 
                                style={styles.questionRow} 
                                onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            >
                                <Text style={styles.question}>
                                    {item.question?.[currentLanguage] || item.question?.en || "N/A"}
                                </Text>
                                {/* 🔽🔼 Arrow Icon */}
                                <Ionicons 
                                    name={expandedIndex === index ? "chevron-up-outline" : "chevron-down-outline"} 
                                    size={24} 
                                    color="#FFD700" 
                                />
                            </TouchableOpacity>
                            
                            {expandedIndex === index && (
                                <>
                                    <Text style={styles.answer}>
                                        {item.shortAnswer?.[currentLanguage] || item.shortAnswer?.en || "N/A"}
                                    </Text>
                                    <TouchableOpacity 
                                        onPress={() => navigation.navigate("FAQDetailScreen", { faq: item })}
                                    >
                                        <Text style={styles.readMore}>{t("read_in_detail")}</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )}
                />
            )}

            {/* 🌍 Language Switcher */}
            <View style={styles.languageSwitcher}>
                <TouchableOpacity onPress={() => i18n.changeLanguage("en")} style={styles.langButton}>
                    <Text style={styles.langText}>🇬🇧 English</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => i18n.changeLanguage("hi")} style={styles.langButton}>
                    <Text style={styles.langText}>🇮🇳 हिन्दी</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#000" },

    // 🟡 Header Styling
    header: { 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
        marginBottom: 20 
    },
    logo: { width: 50, height: 50,top:50,marginBottom:50, marginRight: 10 },
    headerText: { fontSize: 24, fontWeight: "bold", color: "#FFD700" },

    // 🟡 FAQ Cards
    card: { 
        backgroundColor: "#1c1c1e", 
        padding: 15, 
        borderRadius: 10, 
        marginVertical: 8, 
        borderWidth: 1, 
        borderColor: "#FFD700" 
    },

    // 🔽🔼 Arrow and Question Layout
    questionRow: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },
    
    question: { fontSize: 18, fontWeight: "bold", color: "#FFD700" },
    answer: { fontSize: 14, color: "#DDD", marginTop: 5 },

    readMore: { 
        fontSize: 14, 
        color: "#FFC107", 
        fontWeight: "bold", 
        textDecorationLine: "underline", 
        marginTop: 5 
    },

    // 🌍 Language Switcher
    languageSwitcher: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
    langButton: { marginHorizontal: 5, padding: 10, backgroundColor: "#FFC107", borderRadius: 5 },
    langText: { fontSize: 16, fontWeight: "bold", color: "#000" }
});

export default LearnScreen;
