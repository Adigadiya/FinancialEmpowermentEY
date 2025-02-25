import 'dotenv/config';

export default {
  expo: {
    name: "FinancialEmpowermentApp",
    slug: "FinancialEmpowermentApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: { supportsTablet: true },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    "plugins": [
    "expo-video"
  ],
    web: { favicon: "./assets/favicon.png" },
    extra: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY
    }
  }
};