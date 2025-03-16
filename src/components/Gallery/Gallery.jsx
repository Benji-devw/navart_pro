import React, { useState, useEffect, useContext } from 'react';
import './Gallery.css';
import projectsData from '@assets/projectsData.json';
import Modal from '@components/ui/Modal';
import Button from '@components/ui/Button';
import RenderIcon from '@hooks/RenderIcon';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';

// Liste des catégories pour le filtre
const categories = [
  // { id: 'all', name: 'Tous' },
  { id: 'web', name: 'web' },
  { id: 'design', name: 'design' },
  { id: 'infographie', name: 'infographie' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('web');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInfoCollapsed, setIsInfoCollapsed] = useState(false);
  
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  
  // Utiliser useInView au lieu du contexte personnalisé
  const [ref, inView] = useInView(defaultInViewOptions);

  // Fonction pour déterminer si le média est une vidéo ou une image
  const isVideo = (url) => {
    if (!url) return false;
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
  };

  // Fonction pour rendre le média (image ou vidéo)
  const renderMedia = (mediaUrl, title, isInModal = false) => {
    if (isVideo(mediaUrl)) {
      return (
        <video 
          src={mediaUrl} 
          alt={title} 
          controls={isInModal}
          autoPlay={isInModal}
          loop={true}
          muted={true}
          playsInline
          className={isInModal ? 'modal-video' : 'gallery-video'}
        />
      );
    } else {
      return <img src={mediaUrl} alt={title} />;
    }
  };

  // Filtrer les projets lorsque la catégorie change
  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setFilteredProjects(projectsData.filter((project) => project.category === selectedCategory));
      setIsAnimating(false);
    }, 300);
  }, [selectedCategory]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const toggleInfoCollapse = () => {
    setIsInfoCollapsed(!isInfoCollapsed);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className={`gallery-container ${inView ? 'animate' : ''}`} ref={ref}>
        <h2 className="section-title">Mes projets</h2>

        <div className="gallery-filter bnt-tabs">
          {categories.map((category) => (
            <Button
              variant="transparent"
              key={category.id}
              className={`bnt-tab ${selectedCategory === category.id ? 'active' : ''}`} 
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

          {/* Gallery */}
        <div className={`gallery-grid ${isAnimating ? 'animating' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div key={index} className="gallery-item" onClick={() => openModal(project)}>
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
                    {/* {project.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))} */}
                    {project.icons &&
                      project.icons.map((icon, index) => (
                        <div className="project-icon" key={index}>
                          {RenderIcon(icon, '30px')}
                        </div>
                      ))}
                  </div>
                  {/* <button className="view-details-btn">
                    <span>Voir les détails</span>
                    <i className="fas fa-arrow-right"></i>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large" showHeader={false}>
        {selectedProject && (
          <div className="project-modal-content" onClick={toggleInfoCollapse}>
            <div className={`modal-image ${isVideo(selectedProject.image) ? 'has-video' : ''}`}>
              {renderMedia(selectedProject.image, selectedProject.title, true)}
            </div>

            <div className={`modal-info ${isInfoCollapsed ? 'collapsed' : ''}`}>
              <div className="modal-row">
                {/* Zone gauche - Titre et catégorie */}
                <div className="modal-info-left">
                  {selectedProject.title !== '#' && <h3 className="modal-title">{selectedProject.title}</h3>}
                  {/* <div className="modal-category">
                    <i className="fas fa-folder"></i>
                    Catégorie: {categories.find((cat) => cat.id === selectedProject.category)?.name}
                  </div> */}
                </div>
                
                {/* Zone centrale - Icônes */}
                <div className="modal-info-center">
                  <div className="modal-tags">
                    {selectedProject.icons &&
                      selectedProject.icons.map((icon, index) => (
                        <div className="project-icon" key={index}>
                          {RenderIcon(icon, '36px')}
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Zone droite - Boutons */}
                <div className="modal-info-right">
                  {
                    selectedProject.link !== '#' && (
                      <div className="modal-links">
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="modal-link">
                      <i className="fas fa-external-link-alt"></i>
                      <span>Voir le site</span>
                    </a>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="modal-link">
                      <i className="fab fa-github"></i>
                      <span>Code source</span>
                        </a>
                      </div>
                    )
                  }
                </div>
              </div>
              
              {/* Description en bas */}
              <div className="modal-description-container">
                <p className="modal-description">{selectedProject.description}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Gallery;
