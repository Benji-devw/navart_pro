import React from 'react';
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
            ref={(el) => (videoRefs.current[projectId] = el)}
            onClick={(e) => {
              if (transformState[projectId]) {
                e.stopPropagation();
              }
            }}
          >
            <source src={project.image} type="video/mp4" loading="lazy" />
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
        alt={`Projet: ${project.title}${
          project.description
            ? ` - ${project.description.substring(0, 50)}${project.description.length > 50 ? '...' : ''}`
            : ''
        }`}
        className={`card-image ${loadedImages[projectId] ? 'loaded' : ''}`}
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
      style={cardStyle}
      tabIndex={index}
      ref={(el) => (cardsRef.current[index] = el)}
      aria-label={`Projet: ${project.title}`}
    >
      <div className="card-content">
        <div className="card-image-container">{getMediaElement()}</div>

        <div className={`expanded-description ${isDescriptionVisible ? 'visible' : ''}`}>
          <div className="expanded-content">
            <div className="left-content">
              {project.title !== '#' && <h4>{project.title}</h4>}
              {project.description && (
                <p className="card-description">
                  {formatDescription(project.description)}
                </p>
              )}
              {project.icons && (
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
              {project.link !== '#' && project.link != undefined && (
                <Button
                  className="bnt-tab active"
                  size="small"
                  fullWidth={true}
                  onClick={handleVisitClick}
                  aria-label={`Visiter le projet ${project.title}`}
                  title={project.link}
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
                >
                  <Button
                    className="bnt-tab active"
                    size="small"
                    fullWidth={true}
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
