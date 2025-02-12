import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      loans: "Loans",
      home_loan: "Home Loan",
      education_loan: "Education Loan",
      farmer_loan: "Farmer & Agriculture Loan",
      business_loan: "Business Loan",
      micro_investments: "Micro-Investment Opportunities",
      explore_schemes: "Explore Government Schemes",
      loading: "Loading...",
      min: "Min",
      risk: "Risk",
      low: "Low",   // ✅ Added "Low"
       invest: "Invest",
      insurance: "Insurance",
      loan_amount: "Loan Amount",
      interest_rate: "Interest Rate",
      see_more: "See More",

    }
  },
  hi: {
    translation: {
      loans: "ऋण",
      home_loan: "होम लोन",
      education_loan: "शिक्षा ऋण",
      farmer_loan: "किसान एवं कृषि ऋण",
      business_loan: "व्यापार ऋण",
      micro_investments: "सूक्ष्म निवेश के अवसर",
      explore_schemes: "सरकारी योजनाएँ देखें",
      loading: "लोड हो रहा है...",
      min: "न्यूनतम",
      risk: "जोखिम",
      low: "कम"  , // ✅ Added "Low" in Hindi,
      invest: "निवेश",
      insurance: "बीमा",
      loan_amount: "ऋण राशि",
      interest_rate: "ब्याज दर",
      see_more: "और देखें",
       
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
