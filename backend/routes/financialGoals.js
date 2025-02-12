const express = require("express");
const router = express.Router();
const FinancialGoal = require("../models/FinancialGoal");

// ✅ GET all financial goals
router.get("/", async (req, res) => {
    try {
        const goals = await FinancialGoal.find();
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: "Server error fetching goals" });
    }
});

// ✅ ADD a new financial goal
router.post("/", async (req, res) => {
    try {
        const newGoal = new FinancialGoal(req.body);
        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ error: "Error creating goal" });
    }
});

// ✅ UPDATE an existing goal
router.put("/:id", async (req, res) => {
    try {
        const updatedGoal = await FinancialGoal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGoal);
    } catch (error) {
        res.status(500).json({ error: "Error updating goal" });
    }
});

// ✅ DELETE a goal
router.delete("/:id", async (req, res) => {
    try {
        await FinancialGoal.findByIdAndDelete(req.params.id);
        res.json({ message: "Goal deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting goal" });
    }
});

module.exports = router;
