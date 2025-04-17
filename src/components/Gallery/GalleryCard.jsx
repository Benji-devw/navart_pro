import React from 'react';
import RenderIcon from '@hooks/RenderIcon';
import Button from '../ui/Button';
import placeholderImage from '@assets/placeholder.png';
import './GalleryCard.css';

const GalleryCard = ({
  project,
  index,
  transformState,
  descriptionVisible,
  videoRefs,
  loadedImages,
  onCardClick,
  onVisitClick,
  selectedProject,
  cardsRef,
}) => {
  const projectId = project.id || `project-${index}`;
  const cardStyle = transformState[projectId] || {};
  const isDescriptionVisible = descriptionVisible[projectId];
  const isSelected = selectedProject === project;

  const getMediaElement = () => {
    if (!project.image) {
      return <img src={placeholderImage} alt="Placeholder" className="card-image" />;
    }
    
    if (project.image?.endsWith('.mp4')) {
      return (
        <div className="video-wrapper">
          <video
            className="card-image"
            autoPlay={false}
            loop={true}
            muted={true}
            playsInline={true}
            controls={true}
            ref={(el) => (videoRefs.current[projectId] = el)}
            onClick={(e) => {
              if (transformState[projectId]) {
                e.stopPropagation();
              }
            }}
          >
            <source src={project.image} type="video/mp4" loading="lazy"/>
            <img src={placeholderImage} alt="Video fallback" className="card-image" />
          </video>
        </div>
      );
    }

    return (
      <img 
        src={placeholderImage}
        data-src={project.image}
        data-id={projectId}
        alt={project.title}
        className={`card-image ${loadedImages[projectId] ? 'loaded' : ''}`}
      />
    );
  };

  const handleVisitClick = (e) => {
    e.stopPropagation();
    onVisitClick(e, project.link);
  };

  return (
    <li
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={(e) => onCardClick(project, index, e)}
      style={cardStyle}
      tabIndex={index}
      ref={(el) => (cardsRef.current[index] = el)}
    >
      <div className="card-content">
        <div className="card-image-container">{getMediaElement()}</div>

        <div className={`expanded-description ${isDescriptionVisible ? 'visible' : ''}`}>
          <div className="expanded-content">
            <div className="left-content">
              {project.title !== '#' && <h4>{project.title}</h4>}
              {project.description && <p className="card-description">{project.description}</p>}
              {project.icons && (
                <div className="tech-stack">
                  {project.icons.map((icon, iconIndex) => (
                    <span
                      className="tech-icon"
                      key={iconIndex}
                      alt={icon.name || icon.icon}
                      data-tooltip={icon.name || icon.icon}
                    >
                      {RenderIcon(icon.icon, '16px')}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="right-content">
              {project.link !== '#' && (
                <Button 
                  className="bnt-tab active" 
                  size="small" 
                  fullWidth={true} 
                  onClick={handleVisitClick}
                >
                  Visiter
                </Button>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button className="bnt-tab active" size="small" fullWidth={true}>
                    Voir le code
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GalleryCard; 