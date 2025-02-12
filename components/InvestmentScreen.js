import React, { useEffect, useState } from "react";
import { 
    View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, StyleSheet, Linking 
} from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../utils/i18n"; 

const InvestmentScreen = () => {
    const { t, i18n } = useTranslation();
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentLanguage = i18n.language;

    // Fetch Investments from API
    const fetchInvestments = async () => {
        try {
            console.log("Fetching Investment Data...");
            const response = await axios.get("http://172.20.10.2:5000/api/investments");

            console.log("API Response:", response.data);

            if (!response.data || response.data.length === 0) {
                console.warn("⚠️ No investments found!");
                setInvestments([]);
                setLoading(false);
                return;
            }

            setInvestments(response.data);
            setLoading(false);
        } catch (error) {
            console.error("🚨 Error fetching investments:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : (
                <FlatList
                    data={investments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image || "https://example.com/default.png" }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>
                                    {item.name?.[currentLanguage] || item.name?.en || "N/A"}
                                </Text>
                                <Text style={styles.amount}>
                                    {t("investment_amount")}: ₹{item.amount}
                                </Text>
                                <Text style={styles.risk}>
                                    {t("investment_risk")}: {item.risk?.[currentLanguage] || item.risk?.en || "N/A"}
                                </Text>
                                <Text style={styles.description} numberOfLines={2}>
                                    {item.description?.[currentLanguage] || item.description?.en || "N/A"}
                                </Text>
                                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                                    <Text style={styles.seeMore}>{t("see_more")}</Text>
                                </TouchableOpacity>
                            </View>
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
    title: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: "#FFD700", marginBottom: 20 },

    card: { 
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1c1c1e", 
        padding: 15, 
        borderRadius: 10, 
        marginVertical: 8, 
        borderWidth: 1, 
        borderColor: "#FFD700", 
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },

    textContainer: { flex: 1, marginRight: 10 },

    name: { fontSize: 18, fontWeight: "bold", color: "#FFD700", marginBottom: 5 },
    description: { fontSize: 14, color: "#DDD", lineHeight: 20, marginBottom: 5 },
    amount: { fontSize: 14, color: "#EEE", marginBottom: 5 },
    risk: { fontSize: 14, color: "#EEE", marginBottom: 5 },

    seeMore: { 
        fontSize: 14, 
        color: "#FFC107", 
        fontWeight: "bold", 
        textDecorationLine: "underline",
        marginTop: 5
    },

    image: { 
        width: 80, 
        height: 80, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: "#FFD700"
    },

    languageSwitcher: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
    langButton: { marginHorizontal: 5, padding: 10, backgroundColor: "#FFC107", borderRadius: 5 },
    langText: { fontSize: 16, fontWeight: "bold", color: "#000" }
});

export default InvestmentScreen;
