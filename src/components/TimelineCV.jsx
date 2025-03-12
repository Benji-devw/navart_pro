import React, { useState } from 'react';
import '@styles/TimelineCV.css';

const TimelineCV = ({ experiences }) => {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' ou 'list'

  const changeViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <article className="experience-timeline-container">
      <div className="timeline-header">
        <h3>Mon parcours professionnel</h3>
        <div className="timeline-controls">
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => changeViewMode('timeline')}
              aria-label="Afficher en mode timeline"
            >
              <i className="fas fa-stream"></i>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => changeViewMode('list')}
              aria-label="Afficher en mode liste"
            >
              <i className="fas fa-th-list"></i>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <div className={`experience-timeline ${viewMode ? 'horizontal' : 'vertical'}`}>
          {viewMode === 'timeline' && <div className="timeline-center-line"></div>}

          {experiences.map((experience, index) => (
            <div
              className={`timeline-item ${viewMode ? (index % 2 === 0 ? 'right' : 'left') : ''}`}
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
      ) : (
        <div className="experience-list">
          {experiences.map((experience) => (
            <div className="list-item" key={experience.id}>
              <div className="list-date">{experience.date}</div>
              <div className="list-content">
                <h4>{experience.title}</h4>
                <h5>{experience.company}</h5>
                <p>{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default TimelineCV;
