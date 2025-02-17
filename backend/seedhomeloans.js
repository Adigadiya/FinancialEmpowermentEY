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
        image: "https://4.bp.blogspot.com/-b31Z8dvrLB0/W4awhD1k6jI/AAAAAAACXno/4xIxoNZvkJcEmJQ7lKDEO6rvXik_g2UjwCEwYBhgL/s1600/mygov_1472668171222745.jpg",
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
        image: "https://th.bing.com/th/id/OIP.MJhK0VeXxwXDHdwbu7a10AHaEq?rs=1&pid=ImgDetMain",
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
        image: "https://computergyaan.in/wp-content/uploads/2022/06/1-16.jpg",
        link: "https://nhb.org.in/"
    },
    
    {
        category: "Bank",
        name: { en: "SBI Regular Home Loan", hi: "SBI रेगुलर होम लोन" },
        description: {
            en: "Low-interest rates, PMAY subsidy available.",
            hi: "कम ब्याज दरें, PMAY सब्सिडी उपलब्ध।"
        },
        amount: { en: "Up to ₹50 Lakh", hi: "₹50 लाख तक" },
        interestRate: { en: "6.5% per annum", hi: "6.5% प्रति वर्ष" },
        image: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2023/01/SBI-Logo-new-removebg-preview.png",
        link: "https://www.onlinesbi.sbi/"
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
        image: "https://th.bing.com/th/id/OIP.mEn1lVK_39-aGX5v0h6mAgHaF6?w=196&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        link: "https://www.hdfc.com/housing-loans/home-loans?utm_campaign=HDFC_Bank&utm_medium=personal-popular-home-loan"
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
        image: "https://th.bing.com/th/id/OIP.4PVHQOcXGrOr2WCHqJb-qAHaHa?w=150&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        link: "https://www.hdfc.com/housing-loans/home-loans?utm_campaign=HDFC_Bank&utm_medium=personal-popular-home-loan"
    },
    
    {
        category: "Microfinance",
        name: { en: "SEWA Housing Finance", hi: "SEWA हाउसिंग फाइनेंस" },
        description: {
            en: "Housing finance for informal sector women workers.",
            hi: "अनौपचारिक क्षेत्र की महिला श्रमिकों के लिए हाउसिंग फाइनेंस।"
        },
        amount: { en: "Up to ₹5 Lakh", hi: "₹5 लाख तक" },
        interestRate: { en: "9% per annum", hi: "9% प्रति वर्ष" },
        image: "https://th.bing.com/th/id/OIP.lCztplpJ7ULW60K7aq4YjAHaD4?rs=1&pid=ImgDetMain",
        link: "https://www.hdfc.com/housing-loans/home-loans?utm_campaign=HDFC_Bank&utm_medium=personal-popular-home-loan"
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
        image: "https://th.bing.com/th/id/OIP.bx59U1LXvZVUToXJBzwpcgHaEi?w=294&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        link: "https://www.hdfc.com/housing-loans/home-loans?utm_campaign=HDFC_Bank&utm_medium=personal-popular-home-loan"
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
