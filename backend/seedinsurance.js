const mongoose = require("mongoose");
const Insurance = require("./models/Insurance");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const seedInsurance = async () => {
    try {
        await Insurance.deleteMany(); // Clear old data

        const insuranceData = [
            // 🔹 Life Insurance
            {
                category: "Life Insurance",
                name: { en: "LIC Jeevan Anand", hi: "एलआईसी जीवन आनंद" },
                description: {
                    en: "A lifelong insurance plan with bonuses and death benefits.",
                    hi: "बोनस और मृत्यु लाभ के साथ एक आजीवन बीमा योजना।"
                },
                amount: { en: "₹10 Lakh - ₹50 Lakh", hi: "₹10 लाख - ₹50 लाख" },
                premium: { en: "₹500/month onwards", hi: "₹500/माह से शुरू" },
                link: "https://licindia.in",
                image: "https://example.com/lic-jeevan-anand.png"
            },
            // 🔹 Health Insurance
            {
                category: "Health Insurance",
                name: { en: "Ayushman Bharat Yojana", hi: "आयुष्मान भारत योजना" },
                description: {
                    en: "Government-backed free health insurance up to ₹5 Lakh.",
                    hi: "सरकारी सहायता प्राप्त ₹5 लाख तक मुफ्त स्वास्थ्य बीमा।"
                },
                amount: { en: "₹5 Lakh Coverage", hi: "₹5 लाख कवरेज" },
                premium: { en: "Free for eligible families", hi: "योग्य परिवारों के लिए मुफ्त" },
                link: "https://pmjay.gov.in",
                image: "https://example.com/ayushman-bharat.png"
            },
            // 🔹 Crop Insurance
            {
                category: "Crop Insurance",
                name: { en: "Pradhan Mantri Fasal Bima Yojana", hi: "प्रधानमंत्री फसल बीमा योजना" },
                description: {
                    en: "Low-cost crop insurance for farmers in case of crop failure.",
                    hi: "फसल विफलता के मामले में किसानों के लिए कम लागत वाली फसल बीमा।"
                },
                amount: { en: "Up to ₹2 Lakh", hi: "₹2 लाख तक" },
                premium: { en: "2% of the insured amount", hi: "बीमित राशि का 2%" },
                link: "https://pmfby.gov.in",
                image: "https://example.com/pmfby.png"
            }
        ];

        await Insurance.insertMany(insuranceData);
        console.log("✅ Insurance Data Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedInsurance();
