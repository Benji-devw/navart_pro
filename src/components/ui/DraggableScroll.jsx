// Générer par l'IA

import React, { useState, useRef, useEffect } from 'react';
import '@styles/DraggableScroll.css';

/**
 * Composant de défilement horizontal avec drag
 * @param {Object} props
 * @param {React.ReactNode} props.children - Éléments à afficher dans le conteneur défilant
 * @param {string} props.className - Classes CSS additionnelles pour le conteneur
 * @param {string} props.maskGradient - Style de masque (gradient) à appliquer (par défaut: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)")
 * @param {number} props.dragSpeed - Multiplicateur de vitesse de glissement (par défaut: 2)
 * @param {boolean} props.showScrollbar - Afficher la barre de défilement (par défaut: false)
 * @param {string} props.cursor - Style de curseur (par défaut: "grab")
 */
const DraggableScroll = ({
  children,
  className = '',
  maskGradient = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  dragSpeed = 2,
  showScrollbar = false,
  cursor = "grab",
}) => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Détecter si l'appareil est tactile
  useEffect(() => {
    const isTouchEnabled = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouchEnabled);
  }, []);

  // Style pour le masque
  const maskStyle = maskGradient ? {
    WebkitMaskImage: maskGradient,
    maskImage: maskGradient,
  } : {};

  // Style pour la barre de défilement
  const scrollbarStyle = !showScrollbar ? {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  } : {};

  // Gérer le début du glissement
  const handleDragStart = (e) => {
    if (!scrollContainerRef.current) return;

    // Différencier les événements de souris et tactiles
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

    setIsDragging(true);
    setStartX(clientX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);

    // Changer le curseur pendant le glissement
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  // Gérer le déplacement pendant le glissement
  const handleDragMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;

    // Ne pas essayer d'annuler l'événement tactile pendant le défilement natif
    if (e.type !== 'touchmove' || e.cancelable) {
      e.preventDefault();
    }

    // Calculer la position et le déplacement
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const walk = (clientX - startX) * dragSpeed;

    // Appliquer le défilement
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Terminer le glissement
  const handleDragEnd = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = cursor;
    }
  };

  // Attacher les gestionnaires d'événement au document pour permettre 
  // le glissement même si la souris sort du conteneur
  useEffect(() => {
    const handleGlobalMove = (e) => handleDragMove(e);
    const handleGlobalEnd = () => handleDragEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMove);
      
      // Modifier pour les appareils tactiles
      if (isTouchDevice) {
        // Utiliser { passive: true } pour les appareils tactiles pour éviter l'avertissement
        document.addEventListener('touchmove', handleGlobalMove, { passive: true });
      } else {
        document.addEventListener('touchmove', handleGlobalMove, { passive: false });
      }
      
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchend', handleGlobalEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMove);
      document.removeEventListener('touchmove', handleGlobalMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      document.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging, startX, scrollLeft, isTouchDevice]);

  // Configuration du conteneur pour défilement horizontal natif sur mobile
  const containerProps = isTouchDevice ? {
    className: `draggable-scroll-container ${className}`,
    ref: scrollContainerRef,
    style: {
      cursor,
      ...maskStyle,
      ...scrollbarStyle,
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch', // Pour une meilleure inertie sur iOS
    }
  } : {
    className: `draggable-scroll-container ${className}`,
    ref: scrollContainerRef,
    onMouseDown: handleDragStart,
    onTouchStart: handleDragStart,
    style: {
      cursor,
      ...maskStyle,
      ...scrollbarStyle
    }
  };

  return (
    <div {...containerProps}>
      <div className="draggable-scroll-content">
        {children}
      </div>
    </div>
  );
};

export default DraggableScroll; 
