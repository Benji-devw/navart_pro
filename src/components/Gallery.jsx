import React, { useState, useEffect, useContext, useCallback } from 'react';
import '@styles/Gallery.css';
import { useInView } from 'react-intersection-observer';
import { ScrollObserverContext } from '@/App';
import { useCardTransform } from '@hooks/useCardTransform';
import GalleryCard from './Gallery/GalleryCard';

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
    closeCard,
    handleKeyboardNavigation,
  } = useCardTransform(projects);

  // Gérer l'échappement avec la touche Escape et la navigation avec les flèches
  const handleKeyDown = useCallback((e) => {
    // Si la touche Escape est pressée et qu'un projet est sélectionné
    if (e.key === 'Escape' && selectedProject) {
      const projectId = selectedProject.id || `project-${projects.findIndex((p) => p === selectedProject)}`;
      closeCard(projectId);
    }
    
    // Navigation avec les flèches lorsqu'un projet est sélectionné
    if (selectedProject) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleKeyboardNavigation('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleKeyboardNavigation('prev');
      }
    }
  }, [selectedProject, projects, closeCard, handleKeyboardNavigation]);

  // Ajouter un écouteur d'événement pour les touches du clavier
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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

          const tempImage = new Image();
          tempImage.onload = () => {
            img.src = actualSrc;
            setLoadedImages((prev) => ({
              ...prev,
              [img.dataset.id]: true,
            }));
          };
          tempImage.src = actualSrc;

          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, [projects]);

  const handleVisitClick = (event, link) => {
    event.stopPropagation();
    window.open(link, '_blank');
  };

  // Gérer la navigation entre les éléments avec les touches clavier
  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOverlayClick();
    }
  };

  return (
    <>
      <div id="app-store" ref={appStoreRef} role="region" aria-label="Galerie de projets">
        <ul 
          className={`card-list gallery-content ${inView ? 'animate' : 'not-active'}`} 
          ref={ref}
          role="list"
          aria-live="polite"
        >
          {projects.map((project, index) => (
            <GalleryCard
              key={index}
              project={project}
              index={index}
              transformState={transformState}
              descriptionVisible={descriptionVisible}
              videoRefs={videoRefs}
              loadedImages={loadedImages}
              selectedProject={selectedProject}
              cardsRef={cardsRef}
              onCardClick={(project, index, e) => captureAndTransform(project, index, e, isMobile)}
              onVisitClick={handleVisitClick}
            />
          ))}
        </ul>
      </div>
      <div
        className={`gallery-overlay ${overlayVisible ? 'visible' : 'hiding'}`}
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayKeyDown}
        tabIndex={overlayVisible ? 0 : -1}
        role="button"
        aria-label="Fermer la vue détaillée du projet"
        aria-hidden={!overlayVisible}
      >
        {overlayVisible && (
          <div className="keyboard-navigation-info" aria-hidden="true">
            <span>Utilisez les flèches ← → pour naviguer entre les projets</span>
            <span>Appuyez sur Échap pour fermer</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
