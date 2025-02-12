const express = require("express");
const Insurance = require("../models/Insurance");
const router = express.Router();

// 📌 GET all insurance schemes
router.get("/", async (req, res) => {
    try {
        const insurance = await Insurance.find();
        res.json(insurance);
    } catch (error) {
        res.status(500).json({ error: "Error fetching insurance data" });
    }
});

module.exports = router;
