const express = require("express");
const router = express.Router();
const HomeLoan = require("../models/HomeLoan");

// 📌 GET all home loans
router.get("/", async (req, res) => {
    try {
        const loans = await HomeLoan.find();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching home loans" });
    }
});

module.exports = router;
