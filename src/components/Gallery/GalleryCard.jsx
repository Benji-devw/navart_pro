import React, { useEffect, useRef } from 'react';
import RenderIcon from '@hooks/RenderIcon';
import Button from '../ui/Button';
import placeholderImage from '@assets/placeholder.png';
import './GalleryCard.css';

const GalleryCard = ({
  project,
  index,
  transformState,
  descriptionVisible,
  videoRefs,
  loadedImages,
  onCardClick,
  onVisitClick,
  selectedProject,
  cardsRef,
}) => {
  const projectId = project.id || `project-${index}`;
  const cardStyle = transformState[projectId] || {};
  const isDescriptionVisible = descriptionVisible[projectId];
  const isSelected = selectedProject === project;
  const cardRef = useRef(null);

  // Gestionnaire d'événements clavier pour la carte
  const handleKeyDown = (e) => {
    // Si la touche Entrée ou Espace est pressée, cliquer sur la carte
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCardClick(project, index, e);
    }
  };

  // Gérer le focus quand la carte est sélectionnée
  useEffect(() => {
    if (isSelected && cardRef.current) {
      // Stocker les éléments focusables dans la description
      const focusableElements = cardRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      // Si des éléments focusables existent et qu'ils sont visibles, focus sur le premier
      if (focusableElements.length > 0 && isDescriptionVisible) {
        // Délai pour s'assurer que l'animation est terminée
        setTimeout(() => {
          focusableElements[0].focus();
        }, 300);
      }
    }
  }, [isSelected, isDescriptionVisible]);

  // Fonction pour formater la description avec des sauts de ligne
  const formatDescription = (description) => {
    if (!description) return null;

    // Remplacer les tirets suivis d'un espace par des sauts de ligne
    const formattedText = description.split('- ').map((part, i) => {
      // Le premier élément n'a pas de tiret, donc on ne l'affiche pas avec un saut de ligne
      if (i === 0) return part;
      return <React.Fragment key={i}><br />- {part}</React.Fragment>;
    });

    return formattedText;
  };

  const getMediaElement = () => {
    if (!project.image) {
      return (
        <img
          src={placeholderImage}
          alt={`Image de présentation du projet ${project.title || 'sans titre'}`}
          className="card-image"
        />
      );
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
            preload="metadata"
            ref={(el) => {
              if (el) {
                videoRefs.current[projectId] = el;
                // Gestion des erreurs de chargement
                el.onerror = () => {
                  console.error(`Erreur de chargement de la vidéo pour le projet ${project.title}`);
                  el.src = placeholderImage;
                };
              }
            }}
            onClick={(e) => {
              if (transformState[projectId]) {
                e.stopPropagation();
              }
            }}
          >
            <source src={project.image} type="video/mp4" />
            <img
              src={placeholderImage}
              alt={`Vidéo de présentation du projet ${project.title || 'sans titre'}`}
              className="card-image"
            />
          </video>
        </div>
      );
    }

    return (
      <img
        src={placeholderImage}
        data-src={project.image}
        data-id={projectId}
        alt={`Projet: ${project.title}${project.description
          ? ` - ${project.description.substring(0, 50)}${project.description.length > 50 ? '...' : ''}`
          : ''
          }`}
        className={`card-image ${loadedImages[projectId] ? 'loaded' : ''}`}
        onError={(e) => {
          console.error(`Erreur de chargement de l'image pour le projet ${project.title}`);
          e.target.src = placeholderImage;
        }}
      />
    );
  };

  const handleVisitClick = (e) => {
    e.stopPropagation();
    onVisitClick(e, project.link);
  };

  return (
    <li
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={(e) => onCardClick(project, index, e)}
      onKeyDown={handleKeyDown}
      style={cardStyle}
      tabIndex="0"
      ref={(el) => {
        cardsRef.current[index] = el;
        cardRef.current = el;
      }}
      aria-label={`Projet: ${project.title}`}
      aria-expanded={isSelected}
      role="button"
    >
      <div className="card-content">
        <div className="card-image-container">{getMediaElement()}</div>

        <div 
          className={`expanded-description ${isDescriptionVisible ? 'visible' : ''}`} 
          aria-hidden={!isDescriptionVisible}
        >
          <div className="expanded-content">
            <div className="left-content">
              {project.title !== '#' && <h4>{project.title}</h4>}
              {project.description && (
                <p className="card-description">
                  {formatDescription(project.description)}
                </p>
              )}
              {project.icons && (
                <div className="tech-stack" role="list" aria-label="Technologies utilisées">
                  {project.icons.map((icon, iconIndex) => (
                    <span
                      className="tech-icon"
                      key={iconIndex}
                      role="listitem"
                      data-tooltip={icon.name || icon.icon}
                      tabIndex={isDescriptionVisible ? 0 : -1}
                      aria-label={`Technologie: ${icon.name || icon.icon}`}
                    >
                      {RenderIcon(icon.icon, '16px')}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="right-content">
              {project.link !== '#' && project.link != undefined && (
                <Button
                  className="bnt-tab active"
                  size="small"
                  fullWidth={true}
                  onClick={handleVisitClick}
                  aria-label={`Visiter le projet ${project.title}`}
                  title={project.link}
                  tabIndex={isDescriptionVisible ? 0 : -1}
                >
                  {project.status === 'In progress' ? 'En développement' : 'Visiter'}
                </Button>
              )}
              {project.source_code !== '#' && project.source_code != undefined && (
                <a
                  href={project.source_code}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Voir le code source du projet ${project.title}`}
                  title={project.source_code}
                  tabIndex="-1"
                >
                  <Button
                    className="bnt-tab active"
                    size="small"
                    fullWidth={true}
                    tabIndex={isDescriptionVisible ? 0 : -1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        window.open(project.source_code, '_blank');
                      }
                    }}
                  >
                    Voir le code
                  </Button>
                </a>
              )}
              {project.maquette !== '#' && project.maquette != undefined && (
                <a
                  href={project.maquette}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Voir la maquette du projet ${project.title}`}
                  title={project.maquette}
                  tabIndex={isDescriptionVisible ? 0 : -1}
                >
                  <Button className="bnt-tab active" size="small" fullWidth={true}>
                    Voir la maquette
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GalleryCard;
