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
        <div className="app-header" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img 
            src="/logo.png" 
            alt="VoteGuide AI Logo" 
            style={{ 
              width: '100px', 
              height: '100px', 
              objectFit: 'contain',
              borderRadius: '50%',
              boxShadow: 'var(--shadow-sm)'
            }} 
          />
          <div>
            <h1 style={{ color: 'var(--text-main)', marginBottom: '4px', fontSize: '2.5rem' }}>
              VoteGuide <span style={{ color: 'var(--primary)' }}>AI</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>
              Your Smart Guide to Elections
            </p>
          </div>
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
