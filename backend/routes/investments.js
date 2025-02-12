const express = require("express");
const Investment = require("../models/Investment");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const investments = await Investment.find();
        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching investments" });
    }
});

module.exports = router;
