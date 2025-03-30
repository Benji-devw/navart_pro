import React, { useState, useRef, useCallback } from 'react';
import './Gallery.css';
import RenderIcon from '@hooks/RenderIcon';

const Gallery = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [transformState, setTransformState] = useState({});
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState({});
  const appStoreRef = useRef(null);
  const cardsRef = useRef([]);
  const overlayRef = useRef(null);

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
              const projectId = project.id || `project-${projects.findIndex(p => p === project)}`;
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

  const captureAndTransform = useCallback((project, index, event) => {
    // Vérifier si le clic est spécifiquement sur les contrôles de la vidéo
    if (event.target.closest('.video-controls') || 
        (event.target.tagName === 'VIDEO' && transformState[project.id || `project-${index}`])) {
      // Ne pas propager l'événement seulement si la carte est déjà transformée
      event.stopPropagation();
      return;
    }
    
    const card = cardsRef.current[index];
    const appStore = appStoreRef.current;
    if (!card || !appStore) return;
    
    const projectId = project.id || `project-${index}`;
    
    if (transformState[projectId]) {
      // Toggle l'affichage de la description
      setDescriptionVisible(prev => ({
        ...prev,
        [projectId]: !prev[projectId]
      }));
      return;
    }

    // Sinon, c'est une nouvelle sélection
    const rect = card.getBoundingClientRect();
    const appStoreRect = appStore.getBoundingClientRect();

    const centerX = appStoreRect.left + appStoreRect.width / 2;
    const centerY = window.innerHeight / 2;

    const diffX = centerX - (rect.left + rect.width / 2);
    const diffY = centerY - (rect.top + rect.height / 2);

    const targetWidth = appStoreRect.width * 0.9;
    const targetHeight = targetWidth * 0.65;

    const scaleX = targetWidth / rect.width;
    const scaleY = targetHeight / rect.height;
    const scale = Math.min(scaleX, scaleY);

    // Appliquer la transformation
    setTransformState((prev) => ({
      ...prev,
      [projectId]: {
        transform: `translate3d(${diffX}px, ${diffY}px, 0) scale(${scale})`,
        zIndex: 900,
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    }));

    // Afficher la description par défaut quand on sélectionne une nouvelle carte
    setDescriptionVisible(prev => ({
      ...prev,
      [projectId]: true
    }));

    setSelectedProject(project);
    setOverlayVisible(true);
  }, [transformState]);

  const closeCard = useCallback((projectId) => {
    setTransformState((prev) => {
      const newState = { ...prev };
      delete newState[projectId];
      return newState;
    });

    setDescriptionVisible(prev => {
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

  return (
    <div id="app-store" ref={appStoreRef}>
      <ul className="card-list">
        <div
          ref={overlayRef}
          className={`gallery-overlay ${overlayVisible ? 'visible' : 'hiding'}`}
          onClick={handleOverlayClick}
        ></div>

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
                <div className="card-image-container">
                  {getMediaElement(project)}
                </div>
                
                <div className={`expanded-description ${isDescriptionVisible ? 'visible' : ''}`}>
                  <p>{project.title != '#' ? project.title : ''}</p>
                  {project && (
                    <div className="tech-stack">
                      {project.icons.map((icon, iconIndex) => (
                        <span className="tech-icon" key={iconIndex}>
                          {RenderIcon(icon.icon, '24px')}
                        </span>
                      ))}
                    </div>
                  )}
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
