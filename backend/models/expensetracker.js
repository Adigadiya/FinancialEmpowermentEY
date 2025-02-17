const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true }, 
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
});

const Expense = mongoose.model("Expense", ExpenseSchema);

const FinancialGoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goalName: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
});

const FinancialGoal = mongoose.model("FinancialGoal", FinancialGoalSchema);

module.exports = { Expense, FinancialGoal };
