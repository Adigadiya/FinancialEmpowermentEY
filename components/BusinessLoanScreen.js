import React, { useEffect, useState } from "react";
import { 
    View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, StyleSheet, Linking 
} from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../utils/i18n"; 

const BusinessLoanScreen = () => {
    const { t, i18n } = useTranslation();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentLanguage = i18n.language;

    const fetchBusinessLoans = async () => {
        try {
            const response = await axios.get("http://172.20.10.2:5000/api/business-loans");

            if (!response.data || response.data.length === 0) {
                console.warn("⚠️ No business loans found!");
                setLoans([]);
                setLoading(false);
                return;
            }

            setLoans(response.data);
            setLoading(false);
        } catch (error) {
            console.error("🚨 Error fetching business loans:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessLoans();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : (
                <FlatList
                    data={loans}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>
                                    {item.name?.[currentLanguage] || item.name?.en || "N/A"}
                                </Text>
                                <Text style={styles.amount}>
                                    {t("loan_amount")}: {item.amount?.[currentLanguage] || item.amount?.en || "N/A"}
                                </Text>
                                <Text style={styles.interestRate}>
                                    {t("interest_rate")}: {item.interestRate?.[currentLanguage] || item.interestRate?.en || "N/A"}
                                </Text>
                                <Text style={styles.description} numberOfLines={2}>
                                    {item.description?.[currentLanguage] || item.description?.en || "N/A"}
                                </Text>

                                <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.seeMoreContainer}>
                                    <Text style={styles.seeMore}>{t("see_more")}</Text>
                                </TouchableOpacity>
                            </View>

                            <Image source={{ uri: item.image }} style={styles.loanImage} />
                        </View>
                    )}
                />
            )}
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
    card: { flexDirection: "row", alignItems: "center", backgroundColor: "#1c1c1e", padding: 15, borderRadius: 10, marginVertical: 8, borderWidth: 1, borderColor: "#FFD700" },
    textContainer: { flex: 1, marginRight: 10 },
    name: { fontSize: 18, fontWeight: "bold", color: "#FFD700", marginBottom: 5 },
    description: { fontSize: 14, color: "#DDD", lineHeight: 20, marginBottom: 5 },
    amount: { fontSize: 14, color: "#EEE", marginBottom: 5 },
    interestRate: { fontSize: 14, color: "#EEE", marginBottom: 5 },
    seeMoreContainer: { alignSelf: "flex-end" },
    seeMore: { fontSize: 14, color: "#FFC107", fontWeight: "bold", textDecorationLine: "underline" },
    loanImage: { width: 100, height: 100, borderRadius: 10, borderWidth: 1, borderColor: "#FFD700" },
    languageSwitcher: { 
        flexDirection: "row", 
        justifyContent: "center", 
        marginTop: 20 
    },
    
    langButton: { 
        marginHorizontal: 5, 
        paddingVertical: 8, 
        paddingHorizontal: 15, 
        backgroundColor: "#FFC107", 
        borderRadius: 10, 
        elevation: 3, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    
    langText: { 
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#000" 
    }
    
});

export default BusinessLoanScreen;
