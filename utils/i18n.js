import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      loans: "LOANS",
      home_loan: "Home Loan",
      education_loan: "Education Loan",
      farmer_loan: "Farmer & Agriculture Loan",
      business_loan: "Business Loan",
      micro_investments: "Micro-Investment Opportunities",
      explore_schemes: "Explore Government Schemes",
      loading: "Loading...",
      min: "Min",
      risk: "Risk",
      low: "Low",   
       invest: "Invest",
      insurance: "Insurance",
      loan_amount: "Loan Amount",
      interest_rate: "Interest Rate",
      see_more: "See More",
        read_in_detail: "Read in Detail",
      quiz_title: "Quick Quiz",
  quiz_question_1: "What is the safest form of investment?",
  quiz_option_1: "Stocks",
  quiz_option_2: "Government Bonds",
  quiz_option_3: "Real Estate",
  quiz_option_4: "Cryptocurrency",
  quiz_correct: "Correct!",
  quiz_correct_msg: "Great job! You got the right answer.",
  quiz_wrong: "Oops!",
  quiz_wrong_msg: "That's not correct. Try again next time!",
  submit_quiz: "Submit Answer",
  no_data: "No data available.",
  Fraud_Detection_Tool:" Fraud Detection Tool",
  fraud_prevention:"FRAUD PREVENTION",
  Fraud_Report:"Report Fraud",
  investment_amount:"Investment amount",
  investment_risk:"Investment risk",
  title: 'Budgeting Calculator',
  basicCalculator: 'Basic Calculator',
  financialCalculator: 'Financial Calculator',
  SI: 'Simple Interest',
  CI: 'Compound Interest',
  EMI: 'EMI',
  Savings: 'Savings Account',
  enterPrincipal: 'Enter Principal (P)',
  enterRate: 'Enter Rate (R)',
  enterTime: 'Enter Time (T)',
  enterMonthlyDeposit: 'Enter Monthly Deposit',
  calculateSI: 'Calculate SI',
  calculateCI: 'Calculate CI',
  calculateEMI: 'Calculate EMI',
  calculateSavingsAccount: 'Calculate Savings Account',
  clear: 'Clear',
  result: 'Result: ',
  error: 'Invalid Input',
  switchLanguage: 'Switch Language'
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
      Fraud_Detection_Tool: "धोखाधड़ी पहचान उपकरण",
      fraud_prevention:"वित्तीय धोखाधड़ी सुरक्षा",
      min: "न्यूनतम",
      risk: "जोखिम",
      low: "कम"  ,
      read_in_detail: "विस्तार से पढ़ें",
      invest: "निवेश",
      insurance: "बीमा",
      loan_amount: "ऋण राशि",
      investment_amount :"निवेश राशि",
investment_risk : "निवेश जोखिम",
      interest_rate: "ब्याज दर",
      see_more: "और देखें",
       Fraud_Report:"धोखाधड़ी की रिपोर्ट करें",
       title: 'बजट कैलकुलेटर',
       basicCalculator: 'बेसिक कैलकुलेटर',
       financialCalculator: 'वित्तीय कैलकुलेटर',
       SI: 'साधारण ब्याज',
       CI: 'संयुग्म ब्याज',
       EMI: 'ईएमआई',
       Savings: 'बचत खाता',
       enterPrincipal: 'प्रारंभिक राशि (P) दर्ज करें',
       enterRate: 'ब्याज दर (R) दर्ज करें',
       enterTime: 'समय (T) दर्ज करें',
       enterMonthlyDeposit: 'मासिक जमा राशि दर्ज करें',
       calculateSI: 'साधारण ब्याज की गणना करें',
       calculateCI: 'संयुग्म ब्याज की गणना करें',
       calculateEMI: 'ईएमआई की गणना करें',
       calculateSavingsAccount: 'बचत खाता की गणना करें',
       clear: 'साफ करें',
       result: 'परिणाम: ',
       error: 'अमान्य इनपुट',
       switchLanguage: 'भाषा बदलें'
   
      
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
