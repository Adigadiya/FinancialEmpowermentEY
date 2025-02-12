
const express = require("express");
const router = express.Router();
const FarmerLoan = require("../models/farmerloan");

// 📌 GET all farmer loans
router.get("/", async (req, res) => {
    try {
        const loans = await FarmerLoan.find();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching farmer loans" });
    }
});

module.exports = router;
