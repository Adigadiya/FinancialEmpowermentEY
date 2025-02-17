const mongoose = require("mongoose");
const dotenv = require("dotenv");
const FarmerLoan = require("./models/farmerloan");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((error) => console.log("❌ MongoDB Connection Error:", error));

const farmerLoans = [
    
    {
        category: "Government",
        name: { en: "Kisan Credit Card (KCC) Scheme", hi: "किसान क्रेडिट कार्ड (KCC) योजना" },
        description: {
            en: "Provides short-term credit for farmers at low interest rates.",
            hi: "किसानों को कम ब्याज दर पर अल्पकालिक ऋण प्रदान करता है।"
        },
        amount: { en: "Up to ₹3 Lakh", hi: "₹3 लाख तक" },
        interestRate: { en: "4% per annum", hi: "4% प्रति वर्ष" },
        image: "https://th.bing.com/th/id/OIP.SVWxDVFlc1TyAKihiQbhuwHaFj?w=218&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        link: "https://pmkisan.gov.in/"
    },
    {
        category: "Government",
        name: { en: "NABARD Rural Agricultural Loan", hi: "नाबार्ड ग्रामीण कृषि ऋण" },
        description: {
            en: "Loans for farmers to invest in agriculture and allied activities.",
            hi: "किसानों के लिए कृषि और संबंधित गतिविधियों में निवेश के लिए ऋण।"
        },
        amount: { en: "Up to ₹10 Lakh", hi: "₹10 लाख तक" },
        interestRate: { en: "6% per annum", hi: "6% प्रति वर्ष" },
        image: "https://th.bing.com/th/id/OIP.P6vGve8z0ezsXgaPRPoLIgHaE_?w=262&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        link: "https://nabard.org/"
    },
    
    {
        category: "Bank",
        name: { en: "SBI Agriculture Loan", hi: "SBI कृषि ऋण" },
        description: {
            en: "Loans for farm machinery, irrigation, and crop production.",
            hi: "कृषि मशीनरी, सिंचाई और फसल उत्पादन के लिए ऋण।"
        },
        amount: { en: "Up to ₹15 Lakh", hi: "₹15 लाख तक" },
        interestRate: { en: "7.5% per annum", hi: "7.5% प्रति वर्ष" },
        image: "https://th.bing.com/th/id/OIP.ZOF5Qml7MTkiTbcR0TWfUQHaEp?w=225&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        link: "https://www.icicibank.com/rural/loans/farmer-finance"
    },
    {
        category: "Bank",
        name: { en: "HDFC Green Agriculture Loan", hi: "HDFC ग्रीन कृषि ऋण" },
        description: {
            en: "Special financing for sustainable and organic farming.",
            hi: "सतत और जैविक खेती के लिए विशेष वित्तपोषण।"
        },
        amount: { en: "Up to ₹20 Lakh", hi: "₹20 लाख तक" },
        interestRate: { en: "7% per annum", hi: "7% प्रति वर्ष" },
        image: "https://th.bing.com/th/id/OIP.s3f3m_DT9mutDUwiJG5swgHaE8?w=225&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        link: "https://www.icicibank.com/rural/loans/farmer-finance"
    }
];

const seedFarmerLoans = async () => {
    try {
        await FarmerLoan.deleteMany({});
        await FarmerLoan.insertMany(farmerLoans);
        console.log("✅ Farmer Loans Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedFarmerLoans();
