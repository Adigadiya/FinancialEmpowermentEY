const mongoose = require("mongoose");
const Investment = require("./models/Investment");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const seedInvestments = async () => {
    try {
        await Investment.deleteMany(); 

        const investments = [
            {
                name: { en: "Small Savings Scheme", hi: "छोटी बचत योजना" },
                description: {
                    en: "A government-backed savings plan with low risk and steady returns.",
                    hi: "एक सरकारी समर्थित बचत योजना, जिसमें कम जोखिम और स्थिर रिटर्न होता है।"
                },
                amount: 50,
                risk: { en: "Low", hi: "कम" },
                image: "https://th.bing.com/th/id/OIP.XzkIzYEZRP2W49cTFMJ0IAHaEK?w=294&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                link: "https://www.investing.com/"
            },
            {
                name: { en: "Recurring Deposit", hi: "आवर्ती जमा" },
                description: {
                    en: "An easy way to save money every month and earn interest.",
                    hi: "हर महीने पैसा बचाने और ब्याज अर्जित करने का एक आसान तरीका।"
                },
                amount: 100,
                risk: { en: "Medium", hi: "मध्यम" },
                image: "https://th.bing.com/th/id/OIP._zpw0HctzV28P4-F9-ASsQHaDt?w=328&h=174&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                link: "https://www.investing.com/"
            },
            {
                name: { en: "Mutual Funds", hi: "म्यूचुअल फंड्स" },
                description: {
                    en: "Invest in mutual funds with secure returns and risk assessment.",
                    hi: "सुरक्षित रिटर्न और जोखिम आकलन के साथ म्यूचुअल फंड्स में निवेश करें।"
                },
                amount: 500,
                risk: { en: "High", hi: "उच्च" },
                image: "https://th.bing.com/th/id/OIP.4vfWMv9mcBsQ8N29HsICaQHaE8?w=232&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                link: "https://www.investing.com/"
            }
        ];

        await Investment.insertMany(investments);
        console.log("✅ Database Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedInvestments();
