const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    amount: String,
    risk: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    description: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    image: { type: String, required: true },
    link: { type: String, required: true }
});

module.exports = mongoose.model("Investment", InvestmentSchema);
