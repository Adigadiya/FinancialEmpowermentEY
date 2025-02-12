import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import "../utils/i18n";

const loans = [
    { id: 1, name: "home_loan", icon: "home-outline", screen: "HomeLoanScreen" },
    { id: 2, name: "education_loan", icon: "school-outline", screen: "EducationLoanScreen" },
    { id: 3, name: "farmer_loan", icon: "leaf-outline", screen: "FarmerLoanScreen" },
    { id: 4, name: "business_loan", icon: "car-outline", screen: "BusinessLoanScreen" }
];

const MarketplaceScreen = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {/* EY Logo */}
            <View style={styles.logoContainer}>
                <Image source={require("../assets/Ey.jpg")} style={styles.eyLogo} />
            </View>
            
            {/* 🏡 Loans Section */}
            <Text style={styles.title}>{t("loans")}</Text>
            <View style={styles.loanGrid}>
                {loans.map((loan) => (
                    <TouchableOpacity key={loan.id} style={styles.loanButton} onPress={() => navigation.navigate(loan.screen)}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={loan.icon} size={32} color="#FFD700" />
                        </View>
                        <Text style={styles.loanText}>{t(loan.name)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 📜 Explore Government Schemes */}
            <TouchableOpacity style={styles.schemeButton} onPress={() => navigation.navigate("MySchemeScreen")}>
                <Text style={styles.schemeText}>📜 {t("explore_schemes")}</Text>
            </TouchableOpacity>

            {/* 📈 Invest & Insurance Section */}
            <Text style={styles.heading}>{t("invest_insurance")}</Text>
            <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("InvestmentScreen")}>
                    <Ionicons name="trending-up-outline" size={40} color="#FFD700" />
                    <Text style={styles.boxText}>{t("invest")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("InsuranceScreen")}>
                    <Ionicons name="shield-checkmark-outline" size={40} color="#FFD700" />
                    <Text style={styles.boxText}>{t("insurance")}</Text>
                </TouchableOpacity>
            </View>
            {/* 🌍 Language Switcher */}
            <View style={styles.languageSwitcher}>
                <TouchableOpacity onPress={() => i18n.changeLanguage("en")} style={styles.langButton}>
                    <Text style={styles.langText}>🇬🇧 English</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => i18n.changeLanguage("hi")} style={styles.langButton}>
                    <Text style={styles.langText}>🇮🇳 हिन्दी</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#000" },
    logoContainer: { alignItems: "center", marginBottom: 20 },
    eyLogo: { width: 100, height: 50, resizeMode: "contain",marginTop:100,marginBottom:-80 },
    title: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: "#FFD700", marginBottom: 20, top:60 },

    /* 📌 Loan Section */
    loanGrid: { flexDirection: "row", marginTop:38, flexWrap: "wrap", justifyContent: "space-between" },
    loanButton: {
        width: "48%",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#222",
        padding: 18,
        borderRadius: 15,
        marginVertical: 10,
        justifyContent: "center",
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 2,
        borderColor: "#FFD700"
    },
    iconContainer: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#FFD700"
    },
    loanText: { fontSize: 18, fontWeight: "bold", color: "#FFD700", textAlign: "center" },

    /* 📜 Government Schemes */
    schemeButton: {
        backgroundColor: "#FFC107",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    schemeText: { fontSize: 18, fontWeight: "bold", color: "#000" },

    /* 📈 Investment & Insurance Boxes */
    rowContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: -10 },
    box: {
        width: "48%",
        backgroundColor: "#222",
        paddingVertical: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 2,
        borderColor: "#FFD700"
    },
    boxText: { fontSize: 18, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginTop: 10 },

    /* 🌍 Language Switcher */
    languageSwitcher: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
    langButton: { marginHorizontal: 5, padding: 10, backgroundColor: "#FFC107", borderRadius: 5 },
    langText: { fontSize: 16, fontWeight: "bold", color: "#000" }
});

export default MarketplaceScreen;
