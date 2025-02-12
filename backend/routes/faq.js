const express = require("express");
const FAQ = require("../models/FAQ");
const router = express.Router();

// 📌 Get all FAQs
router.get("/", async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching FAQs" });
    }
});

module.exports = router;
