const express = require('express');
const router = express.Router();
const electionData = require('../data/electionData.json');
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in backend environment. Please set it in backend/.env.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

router.get('/timeline', (req, res) => {
  res.json(electionData.timeline);
});

router.get('/steps', (req, res) => {
  res.json(electionData.steps);
});

router.post('/chat', async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro"
  });

  const { message, context } = req.body;

  try {
    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.status(200).json({ reply, context: context || {} });

  } catch (error) {
    console.error("Gemini API Error:", error.message);
    
    let reply = "I'm sorry, I'm having trouble connecting to my brain right now. Please try again.";
    
    if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid')) {
      reply = "I'm sorry, the AI API key is invalid or not configured correctly. Please check your Gemini API key in the backend.";
    } else if (error.message.includes('quota')) {
      reply = "I'm sorry, I'm having trouble connecting to my brain right now. The API quota may be exhausted. Please check your plan.";
    }
    
    res.status(500).json({ reply, context: context || {} });
  }
});

module.exports = router;
