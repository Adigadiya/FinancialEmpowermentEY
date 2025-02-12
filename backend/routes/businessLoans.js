const express = require("express");
const router = express.Router();
const BusinessLoan = require("../models/BusinessLoan");

// 📌 GET all business loans
router.get("/", async (req, res) => {
    try {
        const loans = await BusinessLoan.find();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching business loans" });
    }
});

module.exports = router;
