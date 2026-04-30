import React from 'react';
import './Dashboard.css';

const Dashboard = ({ context }) => {
  const getStatusInfo = () => {
    switch(context.status) {
      case 'eligible':
        return { badge: 'badge-eligible', text: 'Eligible to Register', desc: 'You can now proceed with registration.' };
      case 'not_eligible':
        return { badge: 'badge-ineligible', text: 'Not Eligible', desc: 'You must be 18 or older to vote.' };
      case 'ready':
        return { badge: 'badge-eligible', text: 'Ready to Vote', desc: 'You have a Voter ID and are ready for election day!' };
      default:
        return { badge: 'badge-pending', text: 'Verification Pending', desc: 'Please chat with the assistant to check your status.' };
    }
  };

  const info = getStatusInfo();

  return (
    <div className="dashboard-card glass-panel animate-fade-in">
      <div className="dashboard-info">
        <h3>Your Voting Status</h3>
        <p>{info.desc}</p>
      </div>
      <div className="status-indicator">
        <span className={`badge ${info.badge}`} key={context.status}>{info.text}</span>
      </div>
    </div>
  );
};

export default Dashboard;
