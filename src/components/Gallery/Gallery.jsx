import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import './Gallery.css';
import RenderIcon from '@hooks/RenderIcon';
import Button from '../ui/Button';
import { useInView } from 'react-intersection-observer';
import { ScrollObserverContext } from '@/App';

const Gallery = ({ projects }) => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView(defaultInViewOptions);

  const [selectedProject, setSelectedProject] = useState(null);
  const [transformState, setTransformState] = useState({});
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const appStoreRef = useRef(null);
  const cardsRef = useRef([]);
  const overlayRef = useRef(null);
  const videoRefs = useRef({});

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Get the media element
  const getMediaElement = (project) => {
    if (project.image?.endsWith('.mp4')) {
      const projectId = project.id || `project-${projects.findIndex((p) => p === project)}`;
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
            <source src={project.image} type="video/mp4" />
          </video>
        </div>
      );
    }
    return <img src={project.image} alt={project.title} className="card-image" />;
  };

  // Pause when overlay is closed
  const pauseAllVideosExcept = useCallback((exceptProjectId) => {
    Object.entries(videoRefs.current).forEach(([projectId, videoElement]) => {
      if (projectId !== exceptProjectId && videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });
  }, []);

  // Capture and transform the card
  const captureAndTransform = useCallback(
    (project, index, e) => {
      const projectId = project.id || `project-${index}`;
      const card = cardsRef.current[index];
      const appStore = appStoreRef.current;

      if (!card || !appStore || e.target.closest('.video-controls')) return;

      if (e.target.tagName === 'VIDEO' && transformState[projectId]) {
        e.stopPropagation();
        return;
      }

      if (transformState[projectId]) {
        setDescriptionVisible((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
        return;
      }

      // Pause all other videos
      pauseAllVideosExcept(projectId);

      // Mobile behavior
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
        // Desktop behavior
        const rect = card.getBoundingClientRect();
        const appStoreRect = appStore.getBoundingClientRect();

        const centerX = appStoreRect.left + appStoreRect.width / 2;
        const centerY = window.innerHeight / 2;

        const diffX = centerX - (rect.left + rect.width / 2);
        const diffY = centerY - (rect.top + rect.height / 2);

        const targetWidth = appStoreRect.width * 0.8;
        const targetHeight = targetWidth * .8;

        const scaleX = targetWidth / rect.width;
        const scaleY = targetHeight / rect.height;

        // Calculer le scale et le limiter à 2
        let scale = Math.min(scaleX, scaleY);
        scale = Math.min(scale, 2); // Limite maximale ajoutée ici

        setTransformState((prev) => ({
          ...prev,
          [projectId]: {
            transform: `translate3d(${diffX}px, ${diffY}px, 0) scale(${scale})`,
            zIndex: 900,
            position: 'relative',
            minWidth: `${rect.width}px`,
            minHeight: `${rect.height}px`,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          },
        }));
      }

      setDescriptionVisible((prev) => ({ ...prev, [projectId]: true }));
      setSelectedProject(project);
      setOverlayVisible(true);
    },
    [transformState, isMobile, pauseAllVideosExcept]
  );

  const closeCard = useCallback((projectId) => {
    // Pause the video and remove the transform state
    const videoElement = videoRefs.current[projectId];
    if (videoElement) {
      videoElement.pause();
    }

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

  // Close the card when the overlay is clicked
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
    <div id={`app-store`} ref={appStoreRef}>
      <ul className={`card-list gallery-content ${inView ? 'animate' : 'not-active'}`} ref={ref}>
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
              tabIndex={index}
            >
              <div className="card-content">
                <div className="card-image-container">{getMediaElement(project)}</div>

                <div className={`expanded-description ${isDescriptionVisible ? 'visible' : ''}`}>
                  <div className="expanded-content">
                    <div className="left-content">
                      {project.title != '#' && <h4>{project.title}</h4>}
                      {project.description && <p className="card-description">{project.description}</p>}
                      {project && (
                        <div className="tech-stack">
                          {project.icons.map((icon, iconIndex) => (
                            <span
                              className="tech-icon"
                              key={iconIndex}
                              // title={icon.name || icon.icon}
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
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button className="bnt-tab active" size="small" fullWidth={true} onClick={visite}>
                            Visiter
                          </Button>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button className="bnt-tab active" size="small" fullWidth={true} onClick={visite}>
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
        })}
      </ul>
      <div
        ref={overlayRef}
        className={`gallery-overlay ${overlayVisible ? 'visible' : 'hiding'}`}
        onClick={handleOverlayClick}
        tabIndex="0"
      ></div>
    </div>
  );
};

export default Gallery;
