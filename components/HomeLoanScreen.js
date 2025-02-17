import React, { useEffect, useState } from "react";
import { 
    View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, StyleSheet, Linking 
} from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../utils/i18n"; 

const HomeLoanScreen = () => {
    const { t, i18n } = useTranslation();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentLanguage = i18n.language;

    const fetchHomeLoans = async () => {
        try {
            console.log("Fetching Home Loans..."); 
            const response = await axios.get("https://dhansangini-backend.onrender.com/api/home-loans");
    
            console.log("API Response:", response.data); 
    
            if (!response.data || response.data.length === 0) {
                console.warn("⚠️ No home loans found!");
                setLoans([]); 
                setLoading(false);
                return;
            }
    
            setLoans(response.data);
            setLoading(false);
        } catch (error) {
            console.error("🚨 Error fetching home loans:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeLoans();
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
                            
                            <Image source={{ uri: item.image }} style={styles.loanImage} />
                            
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
                                
                                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                                    <Text style={styles.seeMore}>{t("see_more")}</Text>
                                </TouchableOpacity>
                            </View>
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

    card: { 
        flexDirection: "row-reverse",
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

    textContainer: { 
        flex: 1, 
        marginRight: 10 
    },

    name: { fontSize: 18, fontWeight: "bold", color: "#FFD700", marginBottom: 5 },
    description: { fontSize: 14, color: "#DDD", lineHeight: 20, marginBottom: 5 },
    amount: { fontSize: 14, color: "#EEE", marginBottom: 5 },
    interestRate: { fontSize: 14, color: "#EEE", marginBottom: 5 },

    seeMore: { 
        fontSize: 14, 
        color: "#FFC107", 
        fontWeight: "bold", 
        textDecorationLine: "underline",
        alignSelf: "flex-end",  
        marginTop: 5
    },

    loanImage: { 
        width: 90,  
        height: 90, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: "#FFD700"
    },

    languageSwitcher: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
    langButton: { marginHorizontal: 5, padding: 10, backgroundColor: "#FFC107", borderRadius: 5 },
    langText: { fontSize: 16, fontWeight: "bold", color: "#000" }
});

export default HomeLoanScreen;
