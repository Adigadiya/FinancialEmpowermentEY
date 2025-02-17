const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { OpenAI } = require("openai");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port =  8082;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


const ScamSchema = new mongoose.Schema({
  schemeName: String,
  description: String,
  website: String,
  contact: String,
  riskScore: Number,
  status: String,
  reason: String,
  date: { type: Date, default: Date.now },
});

const Scam = mongoose.model("Scam", ScamSchema);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/check-fraud", async (req, res) => {
  const { schemeName, description, website, contact } = req.body;

  if (!schemeName || !description) {
    return res.status(400).json({ error: "Scheme name and description are required." });
  }

  try {
    const scamDoc = await Scam.findOne({ schemeName });
    
    if (scamDoc) {
      return res.json({
        status: scamDoc.status,
        riskScore: scamDoc.riskScore,
        reason: scamDoc.reason,
      });
    }
    const prompt = `
      You are an AI expert in fraud detection. Analyze the following financial scheme and determine if it is safe or a scam.

      Scheme Name: ${schemeName}
      Description: ${description}
      Website: ${website || "Not Provided"}
      Contact Info: ${contact || "Not Provided"}

      Provide:
      - A risk score (1-100) [100 = High Scam Risk]
      - Classification: SAFE ✅, SUSPICIOUS ⚠️, or SCAM ❌
      - A brief explanation

      Format Response:
      Risk Score: [number]
      Status: [SAFE/SUSPICIOUS/SCAM]
      Reason: [explanation]
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "system", content: prompt }],
    });

    const resultText = response.choices[0].message.content;
    const match = resultText.match(/Risk Score: (\d+).*?Status: (SAFE|SUSPICIOUS|SCAM).*?Reason: (.*)/s);

    if (!match) {
      return res.status(500).json({ error: "Failed to analyze risk." });
    }

    const riskScore = parseInt(match[1]);
    const status = match[2];
    const reason = match[3];

    if (status !== "SAFE") {
      await Scam.create({ schemeName, description, website, contact, riskScore, status, reason });
    }

    res.json({ riskScore, status, reason });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
