const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BusinessLoan = require("./models/BusinessLoan");

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 30000 // ✅ Increased timeout
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((error) => console.log("❌ MongoDB Connection Error:", error));

const businessLoans = [
    {
        category: "Government",
        name: { en: "Mudra Loan (PMMY)", hi: "मुद्रा लोन (PMMY)" },
        description: {
            en: "Government-backed loan for small businesses & startups.",
            hi: "छोटे व्यवसायों और स्टार्टअप्स के लिए सरकारी लोन।"
        },
        amount: { en: "Up to ₹10 Lakh", hi: "₹10 लाख तक" },
        interestRate: { en: "7% - 9% per annum", hi: "7% - 9% प्रति वर्ष" },
        image: "https://example.com/mudra-loan.png",
        link: "https://mudra.org.in/"
    },
    {
        category: "Bank",
        name: { en: "SBI SME Loan", hi: "SBI SME लोन" },
        description: {
            en: "Special financing for small & medium enterprises.",
            hi: "छोटे और मध्यम उद्यमों के लिए विशेष वित्त।"
        },
        amount: { en: "Up to ₹50 Lakh", hi: "₹50 लाख तक" },
        interestRate: { en: "8% - 10% per annum", hi: "8% - 10% प्रति वर्ष" },
        image: "https://example.com/sbi-sme-loan.png",
        link: "https://sbi.co.in/web/business/sme-loans"
    },
    {
        category: "Microfinance",
        name: { en: "Bandhan Bank MSME Loan", hi: "बंधन बैंक MSME लोन" },
        description: {
            en: "Microloans for small entrepreneurs.",
            hi: "छोटे उद्यमियों के लिए माइक्रोलोन।"
        },
        amount: { en: "Up to ₹5 Lakh", hi: "₹5 लाख तक" },
        interestRate: { en: "9% - 12% per annum", hi: "9% - 12% प्रति वर्ष" },
        image: "https://example.com/bandhan-msme-loan.png",
        link: "https://bandhanbank.com/"
    }
];

const seedBusinessLoans = async () => {
    try {
        await BusinessLoan.deleteMany({}); // ✅ Clear old data
        await BusinessLoan.insertMany(businessLoans);
        console.log("✅ Business Loans Data Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedBusinessLoans();
