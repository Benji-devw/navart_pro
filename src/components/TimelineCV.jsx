import React from 'react';
import '../styles/TimelineCV.css';

const TimelineCV = ({experiences}) => {
  return (
    <div className="experience-timeline-container">
      <h3>Mon parcours professionnel</h3>
      <div className="experience-timeline">
        <div className="timeline-center-line"></div>
        
        {experiences.map((experience, index) => (
          <div 
            className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'}`} 
            key={experience.id}
          >
            <div className="timeline-content">
              <div className="timeline-date">{experience.date}</div>
              <h4>{experience.title}</h4>
              <h5>{experience.company}</h5>
              <p>{experience.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineCV; 