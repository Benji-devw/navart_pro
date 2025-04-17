import React, { useState, useEffect, useContext } from 'react';
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

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, [projects]);

  const handleVisitClick = (event, link) => {
    event.stopPropagation();
    window.open(link, '_blank');
  };

  return (
    <div id="app-store" ref={appStoreRef}>
      <ul className={`card-list gallery-content ${inView ? 'animate' : 'not-active'}`} ref={ref}>
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
      <div
        className={`gallery-overlay ${overlayVisible ? 'visible' : 'hiding'}`}
        onClick={handleOverlayClick}
        tabIndex="0"
      />
    </div>
  );
};

export default Gallery;
