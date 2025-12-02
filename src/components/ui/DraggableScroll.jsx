// Générer par l'IA

import React, { useRef, useEffect } from 'react';
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

  // Utiliser useRef pour l'état mutable afin d'éviter les re-rendus inutiles pendant le drag
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  // Gérer le début du glissement (Souris uniquement)
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;

    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;

    // Changer le curseur
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  // Gérer le déplacement (Souris uniquement)
  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * dragSpeed;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Terminer le glissement
  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = cursor;
    }
  };

  // Attacher les événements globaux pour mouseup/mouseleave n'est plus strictement nécessaire
  // si on gère mouseleave sur le conteneur, mais pour une UX fluide (si on sort en draggant),
  // on peut garder une logique globale ou simplifier en arrêtant le drag sur mouseleave du conteneur.
  // Ici, pour simplifier et rester robuste, on attache mousemove/up au document quand on drag.

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging.current) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        handleMouseUpOrLeave();
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [dragSpeed, cursor]); // Dépendances minimales

  return (
    <div
      ref={scrollContainerRef}
      className={`draggable-scroll-container ${className}`}
      onMouseDown={handleMouseDown}
      // On garde le scroll natif pour le tactile, donc pas de onTouchStart ici
      style={{
        cursor,
        ...maskStyle,
        ...scrollbarStyle,
        overflowX: 'auto', // Toujours permettre le scroll natif
      }}
    >
      <div className="draggable-scroll-content">
        {children}
      </div>
    </div>
  );
};

export default DraggableScroll; 
