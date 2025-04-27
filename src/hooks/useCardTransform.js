import { useState, useCallback, useRef } from 'react';

export const useCardTransform = (projects) => {
  const [transformState, setTransformState] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState({});
  const cardsRef = useRef([]);
  const appStoreRef = useRef(null);
  const videoRefs = useRef({});
  const previousFocusRef = useRef(null);

  const pauseAllVideosExcept = useCallback((exceptProjectId) => {
    Object.entries(videoRefs.current).forEach(([projectId, videoElement]) => {
      if (projectId !== exceptProjectId && videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });
  }, []);

  const captureAndTransform = useCallback(
    (project, index, e, isMobile) => {
      const projectId = project.id || `project-${index}`;
      const card = cardsRef.current[index];
      const appStore = appStoreRef.current;

      if (!card || !appStore || e.target.closest('.video-controls')) return;

      // Stocker l'élément actuellement focusé pour restaurer le focus plus tard
      previousFocusRef.current = document.activeElement;

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
        scale = Math.min(scale, 2);

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
    [transformState, pauseAllVideosExcept]
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

    // Restaurer le focus à l'élément précédemment focusé
    if (previousFocusRef.current) {
      setTimeout(() => {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }, 100);
    }
  }, []);

  const handleOverlayClick = useCallback(() => {
    if (selectedProject) {
      const projectId = selectedProject.id || `project-${projects.findIndex((p) => p === selectedProject)}`;
      closeCard(projectId);
    }
  }, [selectedProject, projects, closeCard]);

  // Fonction pour naviguer entre les cartes avec les touches de clavier
  const handleKeyboardNavigation = useCallback((direction) => {
    if (!selectedProject) return;
    
    const currentIndex = projects.findIndex(p => p === selectedProject);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % projects.length;
    } else if (direction === 'prev') {
      newIndex = (currentIndex - 1 + projects.length) % projects.length;
    }
    
    // Fermer la carte actuelle et ouvrir la nouvelle
    const projectId = selectedProject.id || `project-${currentIndex}`;
    closeCard(projectId);
    
    // Simuler un clic sur la nouvelle carte après un petit délai
    setTimeout(() => {
      if (cardsRef.current[newIndex]) {
        cardsRef.current[newIndex].click();
      }
    }, 200);
  }, [selectedProject, projects, closeCard]);

  return {
    transformState,
    selectedProject,
    overlayVisible,
    descriptionVisible,
    cardsRef,
    appStoreRef,
    videoRefs,
    captureAndTransform,
    closeCard,
    handleOverlayClick,
    handleKeyboardNavigation,
  };
}; 