require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const insuranceRoutes = require("./routes/insurance"); // ✅ Import insurance routes
// ✅ Add insurance API route
const faqRoutes = require("./routes/faq");
const financialGoalRoutes = require("./routes/financialGoals");
const expenseRoutes = require("./routes/expenses");




// Import Models
const Investment = require("./models/Investment");

// Import Routes
const investmentRoutes = require("./routes/investments");
const homeLoanRoutes = require("./routes/homeLoans");
const businessLoanRoutes = require("./routes/businessLoans");
const educationLoanRoutes = require("./routes/educationLoans");
const farmerLoanRoutes = require("./routes/farmerLoans");
const authRoutes = require('./routes/auth'); // ✅ Import Authentication Routes

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/api/faqs", faqRoutes);
app.use("/api/insurance", insuranceRoutes); 
// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ API Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/farmer-loans", farmerLoanRoutes);
app.use("/api/business-loans", businessLoanRoutes);
app.use("/api/education-loans", educationLoanRoutes);
app.use("/api/home-loans", homeLoanRoutes);
app.use("/api/investments", investmentRoutes);
app.use('/auth', authRoutes);

app.use("/api/financial-goals", financialGoalRoutes);
app.use("/api/expenses", expenseRoutes);
// ✅ Fetch Investments (Avoid Duplicate Route Issues)
app.get("/api/investments", async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
