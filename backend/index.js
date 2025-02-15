const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');  // Correct import syntax for OpenAI v4.73.0

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Client Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use the API key from the environment variables
});

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Chatbot API Endpoint
app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Send the user message to OpenAI for a response
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // You can use 'gpt-4' if you have access
      messages: [{ role: 'user', content: message }],
    });

    // Extract the bot's reply from the response
    const botResponse = response.choices[0].message.content;

    res.json({ reply: botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
