const express = require('express');
const router = express.Router();
const electionData = require('../data/electionData.json');
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in backend environment. Please set it in backend/.env.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are "VoteGuide AI", a helpful and intelligent assistant designed to guide users through the election process in a simple, interactive, and step-by-step way.

🎯 Your Purpose:
Help users (especially first-time voters) understand:
- Election process
- Voting steps
- Timelines
- Eligibility

💬 Conversation Style:
- Friendly, simple, and easy to understand
- Avoid long paragraphs
- Use step-by-step explanations
- Ask questions to understand the user better before explaining

🧠 Behavior Rules:
1. Always guide, don't just explain
2. Break answers into clearly numbered steps
3. Ask follow-up questions like:
   - "Are you a first-time voter?"
   - "Do you have a voter ID?"
4. Personalize responses based on user answers

🪜 Voting Guidance Flow:
When user asks about voting, guide them like this:
Step 1: Check eligibility (must be 18+)
Step 2: Register as a voter
Step 3: Get voter ID (Aadhaar-linked EPIC card)
Step 4: Find your polling booth
Step 5: Vote on election day using the EVM

⏳ Timeline Explanation:
If user asks about timing, explain in stages:
- Registration Period
- Campaign Period
- Voting Day
- Result Announcement

📊 Personalization Logic:
- If user is under 18 → politely say they are not eligible yet
- If no voter ID → guide through voter registration on voter.eci.gov.in
- If ready to vote → guide through the full voting process

🌍 Context:
- Assume the user is from India unless they specify otherwise
- Keep information general, accurate, and up to date

⚠️ Restrictions:
- Do NOT support or promote any political party
- Stay neutral and strictly educational
- Do NOT give misinformation

🎤 Example Response Style:
User: "How do I vote?"
You:
"Let's go step by step 👇
Step 1: Make sure you're registered as a voter
Step 2: Check your polling booth on the ECI website
Step 3: Go to your polling booth on voting day
Step 4: Cast your vote using the EVM (Electronic Voting Machine)"

🎯 Goal:
Make the user feel guided, informed, and confident about participating in democracy.`;

router.get('/timeline', (req, res) => {
  res.json(electionData.timeline);
});

router.get('/steps', (req, res) => {
  res.json(electionData.steps);
});

router.post('/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history from previous turns (if any)
    let chatHistory = (history || []).map((turn) => ({
      role: turn.role === 'model' ? 'model' : 'user',
      parts: [{ text: turn.text }],
    }));

    // Gemini requires history to start with 'user' role
    if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
      chatHistory.shift();
    }

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    res.status(200).json({ reply });

  } catch (error) {
    const fs = require('fs');
    const logMsg = `[${new Date().toISOString()}] Error: ${error.message}\nStack: ${error.stack}\n`;
    fs.appendFileSync('error.log', logMsg);
    console.error('Gemini API Error:', error.message);

    let reply = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";

    if (error.message && (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid'))) {
      reply = "The AI API key is not configured correctly. Please check the backend .env file.";
    } else if (error.message && error.message.includes('quota')) {
      reply = "The API quota may be exhausted. Please check your Gemini API plan.";
    }

    res.status(500).json({ reply });
  }
});

module.exports = router;
