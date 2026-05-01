import { useState } from 'react';

export const useElectionState = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Welcome to VoteGuide AI! I'm here to guide you through the entire election process.\n\nLet's get started — are you a **first-time voter**? 🗳️",
    }
  ]);

  const [context, setContext] = useState({
    step: 'ask_first_time',
    status: 'pending',
    age: null,
    hasVoterId: null,
    isFirstTimeVoter: null
  });

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    const newUserMsg = { id: Date.now(), sender: 'user', text: message };
    setChatHistory(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';

      // Build Gemini-compatible history from current chat
      // Only include turns that have already been completed (exclude the new user message just added)
      const geminiHistory = [];
      const turns = [...chatHistory]; // snapshot before adding the new message
      for (const msg of turns) {
        geminiHistory.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          text: msg.text,
        });
      }

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: geminiHistory }),
      });

      const data = await response.json();

      // Detect context clues from AI reply to update UI state
      const replyLower = data.reply.toLowerCase();
      setContext(prev => {
        const updated = { ...prev };
        if (replyLower.includes('not eligible') || replyLower.includes('not old enough')) {
          updated.status = 'not_eligible';
        } else if (replyLower.includes('voter id') || replyLower.includes('epic card') || replyLower.includes('register')) {
          updated.step = 'check_voter_id';
        } else if (replyLower.includes('polling booth') || replyLower.includes('evm') || replyLower.includes('election day')) {
          updated.status = 'ready';
          updated.step = 'ready_to_vote';
        }
        if (message.toLowerCase().includes('18') || message.match(/\b(1[8-9]|[2-9]\d)\b/)) {
          updated.status = 'eligible';
        }
        if (message.toLowerCase().includes('yes') && prev.step === 'check_voter_id') {
          updated.hasVoterId = true;
        }
        if (message.toLowerCase().includes('first time') || message.toLowerCase() === 'yes') {
          if (prev.step === 'ask_first_time') updated.isFirstTimeVoter = true;
        }
        return updated;
      });

      const newBotMsg = { id: Date.now() + 1, sender: 'bot', text: data.reply };
      setChatHistory(prev => [...prev, newBotMsg]);

    } catch (error) {
      console.error('Error communicating with backend:', error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again.",
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return { chatHistory, context, isLoading, sendMessage };
};
