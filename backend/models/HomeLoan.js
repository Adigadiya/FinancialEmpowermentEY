const mongoose = require("mongoose");

const homeLoanSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    description: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    amount: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    interestRate: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    link: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model("HomeLoan", homeLoanSchema);
