import React, { useEffect, useState } from 'react';
import './StepGuide.css';

const StepGuide = ({ context }) => {
  const [steps, setSteps] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${apiUrl}/api/steps`)
      .then(res => res.json())
      .then(data => setSteps(data))
      .catch(err => console.error(err));
  }, [apiUrl]);

  return (
    <div className="step-guide-container glass-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <h3>Step-by-Step Voting Guide</h3>
      <div className="steps-grid">
        {steps.map((step, index) => {
          let isActive = false;
          // Basic logic to highlight steps based on context
          if (context.status === 'eligible' && step.id === 2) isActive = true;
          if (context.status === 'ready' && step.id >= 4) isActive = true;
          if (context.status === 'pending' && step.id === 1) isActive = true;

          return (
            <div key={step.id} className={`step-card ${isActive ? 'active' : ''}`}>
              <div className="step-number">{step.id}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepGuide;
