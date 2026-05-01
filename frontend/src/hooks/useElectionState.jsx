import { useState } from 'react';

export const useElectionState = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Welcome to VoteGuide AI! I'm here to guide you through the election process. Are you a first-time voter?",
    }
  ]);
  
  const [context, setContext] = useState({
    step: 'ask_first_time',
    status: 'pending', // pending, eligible, not_eligible, ready
    age: null,
    hasVoterId: null,
    isFirstTimeVoter: null
  });

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to history
    const newUserMsg = { id: Date.now(), sender: 'user', text: message };
    setChatHistory(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, context, chatHistory }),
      });
      
      const data = await response.json();
      
      // Update context and add bot response
      setContext(data.context);
      
      const newBotMsg = { id: Date.now() + 1, sender: 'bot', text: data.reply };
      setChatHistory(prev => [...prev, newBotMsg]);
      
    } catch (error) {
      console.error("Error communicating with backend:", error);
      const errorMsg = { id: Date.now() + 1, sender: 'bot', text: "Sorry, I'm having trouble connecting right now." };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatHistory,
    context,
    isLoading,
    sendMessage
  };
};
