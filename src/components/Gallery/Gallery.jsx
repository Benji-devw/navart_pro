import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Gallery.css';
import RenderIcon from '@hooks/RenderIcon';
import Button from '../ui/Button';

const Gallery = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [transformState, setTransformState] = useState({});
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const appStoreRef = useRef(null);
  const cardsRef = useRef([]);
  const overlayRef = useRef(null);

  // Détecter si l'appareil est mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Vérifier au chargement
    checkIfMobile();
    
    // Vérifier lors du redimensionnement de la fenêtre
    window.addEventListener('resize', checkIfMobile);
    
    // Nettoyer
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const getMediaElement = (project) => {
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
            onClick={(e) => {
              const projectId = project.id || `project-${projects.findIndex((p) => p === project)}`;
              // Si la carte est déjà transformée, permettre aux contrôles de fonctionner
              if (transformState[projectId]) {
                e.stopPropagation();
              }
            }}
          >
            <source src={project.image} type="video/mp4" />
          </video>
        </div>
      );
    }
    return <img src={project.image} alt={project.title} className="card-image" />;
  };

  const captureAndTransform = useCallback(
    (project, index, event) => {
      const projectId = project.id || `project-${index}`;
      const card = cardsRef.current[index];
      const appStore = appStoreRef.current;

      if (!card || !appStore || event.target.closest('.video-controls')) return;

      if (event.target.tagName === 'VIDEO' && transformState[projectId]) {
        event.stopPropagation();
        return;
      }

      if (transformState[projectId]) {
        setDescriptionVisible((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
        return;
      }

      // Pour les appareils mobiles, ne pas appliquer la transformation scale/position
      if (isMobile) {
        setTransformState((prev) => ({
          ...prev,
          [projectId]: {
            zIndex: 900,
            position: 'relative',
            transition: 'all 0.3s ease',
          },
        }));
      } else {
        // Pour les desktop, appliquer la transformation complète
        const { left, width, top, height } = card.getBoundingClientRect();
        const { left: appLeft, width: appWidth } = appStore.getBoundingClientRect();

        const centerX = appLeft + appWidth / 2;
        const centerY = window.innerHeight / 2;

        const scale = Math.min(appWidth / width, (appWidth * 0.5) / height);

        setTransformState((prev) => ({
          ...prev,
          [projectId]: {
            transform: `translate3d(${centerX - (left + width / 2)}px, ${
              centerY - (top + height / 2)
            }px, 0) scale(${scale})`,
            zIndex: 900,
            position: 'relative',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          },
        }));
      }

      setDescriptionVisible((prev) => ({ ...prev, [projectId]: true }));
      setSelectedProject(project);
      setOverlayVisible(true);
    },
    [transformState, isMobile]
  );

  const closeCard = useCallback((projectId) => {
    setTransformState((prev) => {
      const newState = { ...prev };
      delete newState[projectId];
      return newState;
    });

    setDescriptionVisible((prev) => {
      const newState = { ...prev };
      delete newState[projectId];
      return newState;
    });

    setOverlayVisible(false);
    setSelectedProject(null);
  }, []);

  const handleOverlayClick = useCallback(() => {
    if (selectedProject) {
      const projectId = selectedProject.id || `project-${projects.findIndex((p) => p === selectedProject)}`;
      closeCard(projectId);
    }
  }, [selectedProject, projects, closeCard]);

  const visite = (event) => {
    event.stopPropagation();
    window.open(event.target.href, '_blank');
  };

  return (
    <div id="app-store" ref={appStoreRef}>
      <div
        ref={overlayRef}
        className={`gallery-overlay ${overlayVisible ? 'visible' : 'hiding'}`}
        onClick={handleOverlayClick}
      ></div>
      <ul className="card-list">
        {projects.map((project, index) => {
          const projectId = project.id || `project-${index}`;
          const cardStyle = transformState[projectId] || {};
          const isDescriptionVisible = descriptionVisible[projectId];

          return (
            <li
              className={`card ${selectedProject === project ? 'selected' : ''}`}
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={(e) => captureAndTransform(project, index, e)}
              style={cardStyle}
            >
              <div className="card-content">
                <div className="card-image-container">{getMediaElement(project)}</div>

                <div className={`expanded-description ${isDescriptionVisible ? 'visible' : ''}`}>
                  <div className="expanded-content">
                    <div className="left-content">
                      {project.title != '#' && (
                        <h4>{project.title}</h4>
                      )}
                      {project && (
                        <div className="tech-stack">
                          {project.icons.map((icon, iconIndex) => (
                            <span className="tech-icon" key={iconIndex}>
                              {RenderIcon(icon.icon, '12px')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="right-content">
                      {project.link !== '#' && (
                        <Button className="bnt-tab active" fullWidth={true} onClick={visite}>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            Visiter
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button className="bnt-tab active" fullWidth={true} onClick={visite}>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            Voir le code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Gallery;
