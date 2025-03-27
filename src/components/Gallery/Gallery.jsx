import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';
import RenderIcon from '@hooks/RenderIcon';

const Gallery = ({ projects, isAnimating, onProjectClick, categories }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [displayClone, setDisplayClone] = useState(false);
  const [cardRect, setCardRect] = useState(null);

  // Fonction pour déterminer si le média est une vidéo ou une image
  const isVideo = (url) => {
    if (!url) return false;
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
  };

  // Effet pour gérer le clic en dehors de la carte
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectedCard && !event.target.closest('.gallery-item.clone')) {
        setSelectedCard(null);
        setDisplayClone(false);
        setCardRect(null);
      }
    };

    if (selectedCard) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedCard]);

  // Effet pour appeler onProjectClick après que la carte est centrée
  useEffect(() => {
    if (selectedCard) {
      // Afficher le clone après un court délai pour s'assurer que les classes selected soient appliquées
      const timer1 = setTimeout(() => {
        setDisplayClone(true);
      }, 50);
      
      const timer2 = setTimeout(() => {
        if (typeof onProjectClick === 'function') {
          onProjectClick(selectedCard);
        }
      }, 300);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [selectedCard, onProjectClick]);

  // Fonction pour rendre le média (image ou vidéo)
  const renderMedia = (mediaUrl, title) => {
    if (isVideo(mediaUrl)) {
      return (
        <video
          src={mediaUrl}
          alt={title}
          autoPlay={false}
          loop={true}
          muted={true}
          playsInline
          className="gallery-video"
        />
      );
    } else {
      return <img src={mediaUrl} alt={title} />;
    }
  };

  // Fonction pour gérer le clic sur une carte
  const handleCardClick = (project, event) => {
    event.stopPropagation();
    
    // Capturer les dimensions et la position de la carte cliquée
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    setCardRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
    
    setSelectedCard(project);
  };

  // Fonction pour rendre une carte
  const renderCard = (project, index, isClone = false) => {
    const cardSize = index % 3 === 0 ? 'large' : index % 3 === 1 ? 'medium' : 'small';
    
    return (
      <div 
        key={`${index}-${isClone ? 'clone' : 'original'}`}
        className={`gallery-item ${cardSize} ${selectedCard === project && !isClone ? 'selected' : ''} ${isClone ? 'clone selected' : ''}`}
        onClick={(e) => !isClone && handleCardClick(project, e)}
        style={isClone && cardRect ? {
          top: `${cardRect.top}px`,
          left: `${cardRect.left}px`,
          width: `${cardRect.width}px`,
          height: `${cardRect.height}px`
        } : undefined}
      >
        <div className="gallery-item-inner">
          <div className={`gallery-img-container ${isVideo(project.image) ? 'has-video' : ''}`}>
            {renderMedia(project.image, project.title)}
          </div>
          <div className="gallery-item-overlay">
            <h3 className="gallery-item-title">{project.title}</h3>
            <div className="gallery-item-category">
              {categories.find((cat) => cat.id === project.category)?.name}
            </div>
            <div className="gallery-item-description">
              {project.description}
            </div>
            {project.icons && (
              <div className="gallery-item-tags">
                {project.icons.map((icon, iconIndex) => (
                  <div className="project-icon" key={iconIndex}>
                    {RenderIcon(icon, '30px')}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`gallery-grid ${isAnimating ? 'animating' : ''}`}>
      {projects.map((project, index) => (
        <React.Fragment key={index}>
          {renderCard(project, index)}
          {selectedCard === project && displayClone && renderCard(project, index, true)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Gallery;
