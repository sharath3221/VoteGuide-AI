import React from 'react';
import ChatAssistant from './components/ChatAssistant';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import StepGuide from './components/StepGuide';
import { useElectionState } from './hooks/useElectionState';

function App() {
  const { chatHistory, context, isLoading, sendMessage } = useElectionState();

  return (
    <div className="app-container">
      {/* Left Column: Chat Assistant */}
      <aside className="chat-section">
        <ChatAssistant 
          chatHistory={chatHistory} 
          sendMessage={sendMessage} 
          isLoading={isLoading} 
        />
      </aside>

      {/* Right Column: Informational Dashboard */}
      <main className="info-section">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: 'var(--primary-hover)', marginBottom: '8px', fontSize: '2.5rem' }}>
            VoteGuide <span style={{ color: 'var(--secondary)' }}>AI</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>
            Your personal assistant for the election process.
          </p>
        </div>

        <Dashboard context={context} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Timeline />
          <StepGuide context={context} />
        </div>
      </main>
    </div>
  );
}

export default App;
