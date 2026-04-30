import React, { useEffect, useState } from 'react';
import './Timeline.css';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/timeline')
      .then(res => res.json())
      .then(data => setTimelineData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="timeline-container glass-panel animate-fade-in" style={{animationDelay: '0.2s'}}>
      <h3>Election Timeline</h3>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>{item.stage}</h4>
              <span className="timeline-date">{item.date}</span>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
