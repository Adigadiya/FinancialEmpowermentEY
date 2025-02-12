const express = require("express"); 
const router = express.Router();
const EducationLoan = require("../models/EducationLoan");

// 📌 GET all education loans
router.get("/", async (req, res) => {
    try {
        const loans = await EducationLoan.find();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching education loans" });
    }
});

module.exports = router;
