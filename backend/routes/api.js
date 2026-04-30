const express = require('express');
const router = express.Router();
const electionData = require('../data/electionData.json');
const { OpenAI } = require('openai'); // Fixed import for CommonJS

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/timeline', (req, res) => {
  res.json(electionData.timeline);
});

router.get('/steps', (req, res) => {
  res.json(electionData.steps);
});

router.post('/chat', async (req, res) => {
  const { message, context, chatHistory } = req.body;
  
  const MASTER_PROMPT = `You are VoteGuide AI, a helpful, simple, and encouraging election assistant guiding users through the voting process.

You must ALWAYS respond with a JSON object. Do not return markdown, just the raw JSON object.
Structure:
{
  "reply": "Your conversational response to the user. Keep it friendly, short, and beginner-friendly.",
  "context": {
    "step": "Current logical step",
    "status": "MUST be exactly one of: 'pending', 'eligible', 'not_eligible', 'ready'",
    "age": "User's age if known (number) or null",
    "hasVoterId": "true if they have one, false if they don't, or null if unknown",
    "isFirstTimeVoter": "true if they are, false if they aren't, or null if unknown"
  }
}

Rules to determine 'status':
1. If they are under 18 -> "not_eligible"
2. If they are 18+ but do NOT have a Voter ID -> "eligible"
3. If they already have a Voter ID -> "ready"
4. Otherwise, or if you are still asking -> "pending"

IMPORTANT PERSONALIZATION RULES:
- If 'isFirstTimeVoter', 'hasVoterId', or 'age' is already known, do NOT ask for them again.
- Use the provided context to answer intelligently and skip unnecessary questions.

Current Context State: ${JSON.stringify(context)}
Update the context fields based on the user's latest message and the conversation history.`;

  // Convert custom chat history to OpenAI messages format
  const formattedHistory = (chatHistory || []).map(msg => ({
    role: msg.sender === 'bot' ? 'assistant' : 'user',
    content: msg.text
  }));

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: MASTER_PROMPT },
        ...formattedHistory,
        { role: "user", content: message }
      ],
    });

    const aiResponse = JSON.parse(response.choices[0].message.content);
    
    // Fallback if AI messes up the structure
    if (!aiResponse.reply || !aiResponse.context) {
      throw new Error("Invalid response structure from AI");
    }

    res.json(aiResponse);

  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({
      reply: "I'm sorry, I'm having trouble connecting to my brain right now. Please make sure the OPENAI_API_KEY is set in the backend.",
      context: context // Keep the old context
    });
  }
});

module.exports = router;
