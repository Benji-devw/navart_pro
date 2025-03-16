import React from 'react';
import './Gallery.css';
import RenderIcon from '@hooks/RenderIcon';

const Gallery = ({ projects, isAnimating, onProjectClick, categories }) => {
  // Fonction pour déterminer si le média est une vidéo ou une image
  const isVideo = (url) => {
    if (!url) return false;
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
  };

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

  return (
    <div className={`gallery-grid ${isAnimating ? 'animating' : ''}`}>
      {projects.map((project, index) => (
        <div key={index} className="gallery-item" onClick={() => onProjectClick(project)}>
          <div className="gallery-item-inner">
            <div className={`gallery-img-container ${isVideo(project.image) ? 'has-video' : ''}`}>
              {renderMedia(project.image, project.title)}
            </div>
            <div className="gallery-item-overlay">
              <h3 className="gallery-item-title">{project.title}</h3>
              <div className="gallery-item-category">
                {categories.find((cat) => cat.id === project.category)?.name}
              </div>
              <div className="gallery-item-tags">
                {project.icons &&
                  project.icons.map((icon, index) => (
                    <div className="project-icon" key={index}>
                      {RenderIcon(icon, '30px')}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
