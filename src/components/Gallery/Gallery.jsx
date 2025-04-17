import React, { useState, useEffect, useContext } from 'react';
import './Gallery.css';
import RenderIcon from '@hooks/RenderIcon';
import Button from '../ui/Button';
import { useInView } from 'react-intersection-observer';
import { ScrollObserverContext } from '@/App';
import { useCardTransform } from '@hooks/useCardTransform';
import placeholderImage from '@assets/placeholder.png';

const Gallery = ({ projects }) => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView({ ...defaultInViewOptions, initialInView: true });
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const {
    transformState,
    selectedProject,
    overlayVisible,
    descriptionVisible,
    cardsRef,
    appStoreRef,
    videoRefs,
    captureAndTransform,
    handleOverlayClick,
  } = useCardTransform(projects);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Check if the image is loaded with lazy method
  useEffect(() => {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const actualSrc = img.dataset.src;
          
          // Créer une nouvelle image pour précharger
          const tempImage = new Image();
          tempImage.onload = () => {
            img.src = actualSrc;
            setLoadedImages(prev => ({
              ...prev,
              [img.dataset.id]: true
            }));
          };
          tempImage.src = actualSrc;
          
          imageObserver.unobserve(img);
        }
      });
    });

    // Observer toutes les images avec data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, [projects]);

  // Get the media element
  const getMediaElement = (project, index) => {
    const projectId = project.id || `project-${index}`;
    
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

  const visite = (event, link) => {
    event.stopPropagation();
    window.open(link, '_blank');
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
              onClick={(e) => captureAndTransform(project, index, e, isMobile)}
              style={cardStyle}
              tabIndex={index}
            >
              <div className="card-content">
                <div className="card-image-container">{getMediaElement(project, index)}</div>

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
                        <Button className="bnt-tab active" size="small" fullWidth={true} onClick={(e) => visite(e, project.link)}>
                          Visiter
                        </Button>
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
        className={`gallery-overlay ${overlayVisible ? 'visible' : 'hiding'}`}
        onClick={handleOverlayClick}
        tabIndex="0"
      ></div>
    </div>
  );
};

export default Gallery;
