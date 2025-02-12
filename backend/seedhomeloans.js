const mongoose = require("mongoose");
const dotenv = require("dotenv");
const HomeLoan = require("./models/HomeLoan");

dotenv.config(); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("MongoDB Connection Error:", error));

const homeLoans = [
    
    {
        category: "Government",
        name: { en: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)", hi: "प्रधानमंत्री आवास योजना - ग्रामीण (PMAY-G)" },
        description: {
            en: "Financial assistance for rural housing with subsidies on home loans.",
            hi: "ग्रामीण आवास के लिए वित्तीय सहायता, होम लोन पर सब्सिडी के साथ।"
        }, 
        amount: { en: "Up to ₹6 Lakh", hi: "₹6 लाख तक" },
        interestRate: { en: "6.5% per annum", hi: "6.5% प्रति वर्ष" },
        image: "https://example.com/pmay-g.png",
        link: "https://pmayg.nic.in/"
    },
    {
        category: "Government",
        name: { en: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)", hi: "प्रधानमंत्री आवास योजना - शहरी (PMAY-U)" },
        description: {
            en: "Subsidized loans for home construction/purchase in urban areas.",
            hi: "शहरी क्षेत्रों में होम निर्माण/खरीद के लिए सब्सिडी वाले ऋण।"
        },
        amount: { en: "Up to ₹12 Lakh", hi: "₹12 लाख तक" },
        interestRate: { en: "6.5% per annum", hi: "6.5% प्रति वर्ष" },
        image: "https://example.com/pmay-u.png",
        link: "https://pmaymis.gov.in/"
    },
    {
        category: "Government",
        name: { en: "Rural Housing Interest Subsidy Scheme (RHISS)", hi: "ग्रामीण आवास ब्याज सब्सिडी योजना (RHISS)" },
        description: {
            en: "Interest subsidy for rural families constructing or buying homes.",
            hi: "ग्रामीण परिवारों के लिए घर बनाने या खरीदने पर ब्याज सब्सिडी।"
        },
        amount: { en: "Up to ₹3 Lakh", hi: "₹3 लाख तक" },
        interestRate: { en: "4% per annum", hi: "4% प्रति वर्ष" },
        image: "https://example.com/rhiss.png",
        link: "https://nhb.org.in/"
    },
    
    // ✅ Bank & Financial Institution Home Loans
    {
        category: "Bank",
        name: { en: "SBI Regular Home Loan", hi: "SBI रेगुलर होम लोन" },
        description: {
            en: "Low-interest rates, PMAY subsidy available.",
            hi: "कम ब्याज दरें, PMAY सब्सिडी उपलब्ध।"
        },
        amount: { en: "Up to ₹50 Lakh", hi: "₹50 लाख तक" },
        interestRate: { en: "6.5% per annum", hi: "6.5% प्रति वर्ष" },
        image: "https://example.com/sbi-loan.png",
        link: "https://sbi.co.in/home-loans"
    },
    {
        category: "Bank",
        name: { en: "HDFC Home Loan", hi: "HDFC होम लोन" },
        description: {
            en: "Customized repayment options for easy financing.",
            hi: "आसान वित्तपोषण के लिए अनुकूलित पुनर्भुगतान विकल्प।"
        },
        amount: { en: "Up to ₹75 Lakh", hi: "₹75 लाख तक" },
        interestRate: { en: "8% per annum", hi: "8% प्रति वर्ष" },
        image: "https://example.com/hdfc-loan.png",
        link: "https://hdfc.com/home-loans"
    },
    {
        category: "Bank",
        name: { en: "ICICI Bank Home Loan", hi: "ICICI बैंक होम लोन" },
        description: {
            en: "Instant loan approvals with low processing fees.",
            hi: "त्वरित ऋण स्वीकृति, कम प्रसंस्करण शुल्क।"
        },
        amount: { en: "Up to ₹60 Lakh", hi: "₹60 लाख तक" },
        interestRate: { en: "7.5% per annum", hi: "7.5% प्रति वर्ष" },
        image: "https://example.com/icici-loan.png",
        link: "https://icicibank.com/home-loans"
    },
    
    // ✅ Microfinance & Cooperative Housing Loans
    {
        category: "Microfinance",
        name: { en: "SEWA Housing Finance", hi: "SEWA हाउसिंग फाइनेंस" },
        description: {
            en: "Housing finance for informal sector women workers.",
            hi: "अनौपचारिक क्षेत्र की महिला श्रमिकों के लिए हाउसिंग फाइनेंस।"
        },
        amount: { en: "Up to ₹5 Lakh", hi: "₹5 लाख तक" },
        interestRate: { en: "9% per annum", hi: "9% प्रति वर्ष" },
        image: "https://example.com/sewa-loan.png",
        link: "https://sewahousing.org/"
    },
    {
        category: "Microfinance",
        name: { en: "Gruh Finance (Now Bandhan Bank Home Loans)", hi: "गृह फाइनेंस (अब बंधन बैंक होम लोन)" },
        description: {
            en: "Loans for low-income households.",
            hi: "कम आय वाले परिवारों के लिए ऋण।"
        },
        amount: { en: "Up to ₹7 Lakh", hi: "₹7 लाख तक" },
        interestRate: { en: "8.5% per annum", hi: "8.5% प्रति वर्ष" },
        image: "https://example.com/gruh-loan.png",
        link: "https://bandhanbank.com/"
    }
];

const seedHomeLoans = async () => {
    try {
        await HomeLoan.deleteMany({});
        await HomeLoan.insertMany(homeLoans);
        console.log("✅ Home Loans Data Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedHomeLoans();
