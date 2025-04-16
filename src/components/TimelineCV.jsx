import React, { useState } from 'react';
import '@styles/TimelineCV.css';

const TimelineCV = ({ experiences, viewMode }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleCollapse = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <article className="experience-timeline-container">
      {viewMode === 'timeline' ? (
        <div className={`experience-timeline ${viewMode ? 'horizontal' : 'vertical'}`}>
          {viewMode === 'timeline' && <div className="timeline-center-line"></div>}

          {experiences.map((experience, index) => (
            <div className={`timeline-item ${viewMode ? (index % 2 === 0 ? 'right' : 'left') : ''}`} key={index}>
              <div className="timeline-content">
                <div className="timeline-date" data-tooltip={experience.type}>
                  {experience.type === 'formation' ? (
                    <i className="fas fa-graduation-cap status-icon"></i>
                  ) : (
                    <i className="fas fa-briefcase status-icon"></i>
                  )}
                  {experience.date}
                </div>
                <h4>{experience.title}</h4>
                <h5>
                  {' '}
                  <i className="fa-solid fa-building"></i> {experience.company}
                </h5>
                <h5>
                  {' '}
                  <i className="fa-solid fa-location-dot"></i> {experience.location}
                </h5>
                <a href={experience.link} target="_blank" rel="noopener noreferrer">
                  <img src={`/logos/${experience.logo}`} alt={experience.company} />
                </a>
                <p>{experience.description}</p>
                {experience.case && experience.case.length > 0 && (
                  <div className="stack-list">
                    <h5
                      className={`stack-list-toggle ${openDropdowns[index] ? 'open' : ''}`}
                      onClick={() => toggleCollapse(index)}
                      aria-expanded={openDropdowns[index] ? 'true' : 'false'}
                    >
                      Détails
                      <i className="fa-solid fa-chevron-down"></i>
                    </h5>
                    <ul className={`stack-list-collapse ${openDropdowns[index] ? 'open' : ''}`}>
                      {experience.case.map((item, itemIndex) => (
                        <li key={itemIndex}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <div className="list-item" key={index}>
              <div className="list-date" data-tooltip={experience.type}>
                {experience.type === 'formation' ? (
                  <i className="fas fa-graduation-cap status-icon"></i>
                ) : (
                  <i className="fas fa-briefcase status-icon"></i>
                )}
                {experience.date}
              </div>
              <div className="list-content">
                {/* <a className="list-item-logo" href={experience.link} target="_blank" rel="noopener noreferrer"> */}
                  <img src={`/logos/${experience.logo}`} alt={experience.company} />
                {/* </a> */}
                <h4>{experience.title}</h4>
                <h5>
                  {' '}
                  <i className="fa-solid fa-building"></i> {experience.company}
                </h5>
                <h5>
                  {' '}
                  <i className="fa-solid fa-location-dot"></i> {experience.location}
                </h5>
                <p>{experience.description}</p>

                {experience.case && experience.case.length > 0 && (
                  <div className="stack-list">
                    <h5
                      className={`stack-list-toggle ${openDropdowns[index] ? 'open' : ''}`}
                      onClick={() => toggleCollapse(index)}
                      aria-expanded={openDropdowns[index] ? 'true' : 'false'}
                    >
                      Détails
                      <i className="fa-solid fa-chevron-down"></i>
                    </h5>
                    <ul className={`stack-list-collapse ${openDropdowns[index] ? 'open' : ''}`}>
                      {experience.case.map((item, itemIndex) => (
                        <li key={itemIndex}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default TimelineCV;
