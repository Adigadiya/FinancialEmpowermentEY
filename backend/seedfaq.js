const mongoose = require("mongoose");
const FAQ = require("./models/FAQ");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const seedFAQs = async () => {
    try {
        await FAQ.deleteMany();

        const faqs = [
            {
                question: { en: "How to open a savings account?", hi: "बचत खाता कैसे खोलें?" },
                shortAnswer: {
                    en: "Visit a bank with ID proof and minimum deposit.",
                    hi: "पहचान प्रमाण और न्यूनतम जमा राशि के साथ बैंक जाएं।"
                },
                detailedAnswer: {
                    en: "To open a savings account, visit the nearest bank, carry ID proof, address proof, and passport-size photos...",
                    hi: "बचत खाता खोलने के लिए, निकटतम बैंक जाएं, पहचान प्रमाण, पता प्रमाण, और पासपोर्ट आकार के फोटो ले जाएं..."
                }
            },
            {
                question: { en: "What is a fixed deposit?", hi: "फिक्स्ड डिपॉजिट क्या है?" },
                shortAnswer: {
                    en: "A fixed deposit is an investment with a fixed interest rate.",
                    hi: "फिक्स्ड डिपॉजिट एक निश्चित ब्याज दर के साथ निवेश है।"
                },
                detailedAnswer: {
                    en: "A fixed deposit (FD) allows you to invest money for a fixed term and earn interest at a predetermined rate...",
                    hi: "फिक्स्ड डिपॉजिट (एफडी) आपको एक निश्चित अवधि के लिए पैसा निवेश करने और एक पूर्व निर्धारित दर पर ब्याज अर्जित करने की अनुमति देता है..."
                }
            }
        ];

        await FAQ.insertMany(faqs);
        console.log("✅ FAQs Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedFAQs();
