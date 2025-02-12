const mongoose = require("mongoose");
const dotenv = require("dotenv");
const EducationLoan = require("./models/EducationLoan");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((error) => console.log("❌ MongoDB Connection Error:", error));

const educationLoans = [
    // ✅ Government Education Loans
    {
        category: "Government",
        name: { en: "Vidya Lakshmi Education Loan Scheme", hi: "विद्या लक्ष्मी शिक्षा ऋण योजना" },
        description: {
            en: "A government-backed platform for students to apply for multiple education loans from banks.",
            hi: "छात्रों के लिए सरकार द्वारा समर्थित प्लेटफ़ॉर्म जिससे वे कई बैंकों से शिक्षा ऋण के लिए आवेदन कर सकते हैं।"
        },
        amount: { en: "Up to ₹10 Lakh (India) / ₹20 Lakh (Abroad)", hi: "₹10 लाख तक (भारत) / ₹20 लाख तक (विदेश)" },
        interestRate: { en: "8.5% per annum", hi: "8.5% प्रति वर्ष" },
        image: "https://example.com/vidya-lakshmi.png",
        link: "https://www.vidyalakshmi.co.in/"
    },
    {
        category: "Government",
        name: { en: "Dr. Ambedkar Central Sector Scheme", hi: "डॉ. आंबेडकर केंद्रीय क्षेत्र योजना" },
        description: {
            en: "Scholarship-based education loan for students from economically weaker sections.",
            hi: "आर्थिक रूप से कमजोर वर्गों के छात्रों के लिए छात्रवृत्ति आधारित शिक्षा ऋण।"
        },
        amount: { en: "Up to ₹15 Lakh", hi: "₹15 लाख तक" },
        interestRate: { en: "6% per annum", hi: "6% प्रति वर्ष" },
        image: "https://example.com/ambedkar-scheme.png",
        link: "https://socialjustice.gov.in/"
    },

    // ✅ Bank Education Loans
    {
        category: "Bank",
        name: { en: "SBI Student Loan", hi: "SBI स्टूडेंट लोन" },
        description: {
            en: "Education loan for higher studies in India and abroad with easy repayment.",
            hi: "भारत और विदेश में उच्च शिक्षा के लिए शिक्षा ऋण, आसान पुनर्भुगतान विकल्प।"
        },
        amount: { en: "Up to ₹50 Lakh", hi: "₹50 लाख तक" },
        interestRate: { en: "7.5% per annum", hi: "7.5% प्रति वर्ष" },
        image: "https://example.com/sbi-student-loan.png",
        link: "https://sbi.co.in/education-loans"
    },
    {
        category: "Bank",
        name: { en: "HDFC Credila Education Loan", hi: "HDFC क्रेडिला शिक्षा ऋण" },
        description: {
            en: "Customized education loans with flexible repayment options.",
            hi: "लचीले पुनर्भुगतान विकल्पों के साथ अनुकूलित शिक्षा ऋण।"
        },
        amount: { en: "Up to ₹75 Lakh", hi: "₹75 लाख तक" },
        interestRate: { en: "8% per annum", hi: "8% प्रति वर्ष" },
        image: "https://example.com/hdfc-credila.png",
        link: "https://www.hdfccredila.com/"
    }
];

const seedEducationLoans = async () => {
    try {
        await EducationLoan.deleteMany({});
        await EducationLoan.insertMany(educationLoans);
        console.log("✅ Education Loans Data Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedEducationLoans();
