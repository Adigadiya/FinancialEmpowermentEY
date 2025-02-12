const mongoose = require('mongoose');

const FinancialGoalSchema = new mongoose.Schema({
  goalName: { type: String, required: true },
  amount: { type: Number, required: true },
  targetDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('FinancialGoal', FinancialGoalSchema);
