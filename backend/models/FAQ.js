const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    question: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    shortAnswer: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    detailedAnswer: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    }
});

module.exports = mongoose.model("FAQ", faqSchema);
