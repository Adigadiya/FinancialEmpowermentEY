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
                question: { 
                    en: "What is a budget?", 
                    hi: "बजट क्या होता है?" 
                },
                shortAnswer: { 
                    en: "A budget is a financial plan that outlines income and expenses over a specific period.", 
                    hi: "बजट एक वित्तीय योजना है जो एक विशिष्ट अवधि में आय और खर्चों को दर्शाती है।" 
                },
                detailedAnswer: { 
                    en: "A budget helps individuals and businesses track their finances by setting limits on spending and ensuring that income is used efficiently.",
                    hi: "बजट व्यक्तियों और व्यवसायों को उनकी वित्तीय स्थिति पर नज़र रखने में मदद करता है और सुनिश्चित करता है कि आय कुशलतापूर्वक उपयोग हो।"
                }
            },
            {
                question: { 
                    en: "What is compound interest?", 
                    hi: "चक्रवृद्धि ब्याज क्या होता है?" 
                },
                shortAnswer: { 
                    en: "Compound interest is interest calculated on both the initial principal and the accumulated interest.", 
                    hi: "चक्रवृद्धि ब्याज वह ब्याज है जो मूलधन और पहले अर्जित ब्याज दोनों पर लगाया जाता है।" 
                },
                detailedAnswer: { 
                    en: "Compound interest helps investments grow exponentially over time. The formula is A = P(1 + r/n)^(nt).",
                    hi: "चक्रवृद्धि ब्याज समय के साथ निवेश को तेजी से बढ़ाने में मदद करता है। इसका सूत्र A = P(1 + r/n)^(nt) है।"
                }
            },
            {
                question: { 
                    en: "How can I start investing?", 
                    hi: "मैं निवेश कैसे शुरू कर सकता हूँ?" 
                },
                shortAnswer: { 
                    en: "Start by setting financial goals, researching investment options, and diversifying your portfolio.", 
                    hi: "वित्तीय लक्ष्य निर्धारित करके, निवेश विकल्पों पर शोध करके, और अपने पोर्टफोलियो में विविधता लाकर निवेश शुरू करें।" 
                },
                detailedAnswer: { 
                    en: "Define your financial goals, explore options like stocks, bonds, and real estate, and diversify to manage risk.",
                    hi: "अपने वित्तीय लक्ष्य निर्धारित करें, स्टॉक, बॉन्ड और रियल एस्टेट जैसे विकल्पों की खोज करें, और जोखिम प्रबंधन के लिए विविधता अपनाएं।"
                }
            },
            {
                question: { 
                    en: "What is an emergency fund?", 
                    hi: "आपातकालीन निधि क्या होती है?" 
                },
                shortAnswer: { 
                    en: "An emergency fund is money set aside to cover unexpected expenses, such as medical bills or job loss.", 
                    hi: "आपातकालीन निधि अप्रत्याशित खर्चों को कवर करने के लिए रखी गई धनराशि होती है, जैसे चिकित्सा बिल या नौकरी छूटना।" 
                },
                detailedAnswer: { 
                    en: "An emergency fund should ideally cover 3-6 months of expenses. It prevents taking on debt during crises.",
                    hi: "आपातकालीन निधि को 3-6 महीनों के खर्चों को कवर करना चाहिए। यह वित्तीय संकट के दौरान ऋण लेने से बचाता है।"
                }
            },
            {
                question: { 
                    en: "What is a credit score and why is it important?", 
                    hi: "क्रेडिट स्कोर क्या होता है और यह क्यों महत्वपूर्ण है?" 
                },
                shortAnswer: { 
                    en: "A credit score represents a person's creditworthiness, impacting loan approvals and interest rates.", 
                    hi: "क्रेडिट स्कोर किसी व्यक्ति की ऋण योग्यता को दर्शाता है और ऋण स्वीकृति तथा ब्याज दरों को प्रभावित करता है।" 
                },
                detailedAnswer: { 
                    en: "A higher credit score improves chances of getting loans with lower interest rates. It's based on payment history and debt levels.",
                    hi: "उच्च क्रेडिट स्कोर बेहतर ब्याज दरों के साथ ऋण प्राप्त करने की संभावना को बढ़ाता है। यह भुगतान इतिहास और ऋण स्तरों पर आधारित होता है।"
                }
            },
            {
                question: { 
                    en: "What is inflation?", 
                    hi: "मुद्रास्फीति क्या होती है?" 
                },
                shortAnswer: { 
                    en: "Inflation is the rate at which the general level of prices for goods and services rises over time.", 
                    hi: "मुद्रास्फीति वह दर है जिस पर समय के साथ वस्तुओं और सेवाओं की सामान्य कीमतें बढ़ती हैं।" 
                },
                detailedAnswer: { 
                    en: "Inflation decreases purchasing power. It is influenced by demand, supply, and government policies.",
                    hi: "मुद्रास्फीति क्रय शक्ति को कम करती है। यह मांग, आपूर्ति, और सरकारी नीतियों से प्रभावित होती है।"
                }
            },
            {
                question: { 
                    en: "What are mutual funds?", 
                    hi: "म्यूचुअल फंड क्या होते हैं?" 
                },
                shortAnswer: { 
                    en: "A mutual fund pools money from multiple investors to invest in stocks, bonds, and other assets.", 
                    hi: "म्यूचुअल फंड कई निवेशकों से पैसा इकट्ठा करता है और इसे स्टॉक्स, बॉन्ड्स और अन्य संपत्तियों में निवेश करता है।" 
                },
                detailedAnswer: { 
                    en: "Mutual funds offer diversification and professional management, making investing accessible to beginners.",
                    hi: "म्यूचुअल फंड विविधता और पेशेवर प्रबंधन प्रदान करते हैं, जिससे निवेशकों के लिए यह एक अच्छा विकल्प बन जाता है।"
                }
            },
            {
                question: { 
                    en: "What is the difference between stocks and bonds?", 
                    hi: "स्टॉक्स और बॉन्ड्स में क्या अंतर है?" 
                },
                shortAnswer: { 
                    en: "Stocks represent ownership in a company, while bonds are loans given to a company or government.", 
                    hi: "स्टॉक्स किसी कंपनी में स्वामित्व को दर्शाते हैं, जबकि बॉन्ड्स किसी कंपनी या सरकार को दिया गया ऋण होते हैं।" 
                },
                detailedAnswer: { 
                    en: "Stocks offer higher returns but come with more risk. Bonds provide stable returns with lower risk.",
                    hi: "स्टॉक्स उच्च रिटर्न प्रदान करते हैं लेकिन जोखिम अधिक होता है, जबकि बॉन्ड्स स्थिर रिटर्न देते हैं और जोखिम कम होता है।"
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
