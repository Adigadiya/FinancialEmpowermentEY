const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// ✅ GET all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Server error fetching expenses" });
    }
});

// ✅ ADD a new expense
router.post("/", async (req, res) => {
    try {
        const newExpense = new Expense(req.body);
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: "Error creating expense" });
    }
});

// ✅ UPDATE an existing expense
router.put("/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: "Error updating expense" });
    }
});

// ✅ DELETE an expense
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting expense" });
    }
});

module.exports = router;
