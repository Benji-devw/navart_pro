import React, { useState, useEffect, useContext, useCallback } from 'react';
import './Projects.css';
import projectsData from '@assets/projectsData.json';
import Modal from '@components/ui/Modal';
import Button from '@components/ui/Button';
import RenderIcon from '@hooks/RenderIcon';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import Gallery from './Gallery/Gallery';

// Liste des catégories pour le filtre
const categories = [
  // { id: 'all', name: 'Tous' },
  { id: 'web', name: 'web' },
  { id: 'design', name: 'design' },
  { id: 'infographie', name: 'infographie' },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('web');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInfoCollapsed, setIsInfoCollapsed] = useState(false);
  const [slideDirection, setSlideDirection] = useState(''); // 'left' ou 'right' pour l'animation de sortie
  const [slideFromDirection, setSlideFromDirection] = useState(''); // 'left' ou 'right' pour l'animation d'entrée
  const [isTransitioning, setIsTransitioning] = useState(false);

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
          autoPlay={false}
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

  const openModal = useCallback((project) => {
    const index = filteredProjects.findIndex(p => p === project);
    setSelectedProjectIndex(index);
    setSelectedProject(project);
    setIsModalOpen(true);
  }, [filteredProjects]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  const toggleInfoCollapse = useCallback(() => {
    setIsInfoCollapsed(!isInfoCollapsed);
  }, [isInfoCollapsed]);

  // Navigation vers le projet précédent
  const goToPreviousProject = useCallback((e) => {
    if (e) e.stopPropagation(); // Empêcher la propagation pour éviter de déclencher toggleInfoCollapse
    if (isTransitioning) return; // Éviter les transitions multiples
    
    // L'image actuelle sort vers la droite
    setSlideDirection('right');
    setIsTransitioning(true);
    
    setTimeout(() => {
      const newIndex = (selectedProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
      setSelectedProjectIndex(newIndex);
      setSelectedProject(filteredProjects[newIndex]);
      
      // La nouvelle image entre depuis la gauche
      setSlideDirection('');
      setSlideFromDirection('left');
      
      setTimeout(() => {
        setSlideFromDirection('');
        setIsTransitioning(false);
      }, 300);
    }, 300);
  }, [filteredProjects, selectedProjectIndex, isTransitioning]);

  // Navigation vers le projet suivant
  const goToNextProject = useCallback((e) => {
    if (e) e.stopPropagation(); // Empêcher la propagation pour éviter de déclencher toggleInfoCollapse
    if (isTransitioning) return; // Éviter les transitions multiples
    
    // L'image actuelle sort vers la gauche
    setSlideDirection('left');
    setIsTransitioning(true);
    
    setTimeout(() => {
      const newIndex = (selectedProjectIndex + 1) % filteredProjects.length;
      setSelectedProjectIndex(newIndex);
      setSelectedProject(filteredProjects[newIndex]);
      
      // La nouvelle image entre depuis la droite
      setSlideDirection('');
      setSlideFromDirection('right');
      
      setTimeout(() => {
        setSlideFromDirection('');
        setIsTransitioning(false);
      }, 300);
    }, 300);
  }, [filteredProjects, selectedProjectIndex, isTransitioning]);

  // Gestion des touches du clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen || isTransitioning) return;
      
      if (e.key === 'ArrowLeft') {
        goToPreviousProject();
      } else if (e.key === 'ArrowRight') {
        goToNextProject();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, goToPreviousProject, goToNextProject, closeModal, isTransitioning]);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Mes projets</h2>
      <div className={`projects-container ${inView ? 'animate' : ''}`} ref={ref}>
        <div className="projects-filter bnt-tabs">
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
        <Gallery 
          projects={filteredProjects} 
          isAnimating={isAnimating} 
          onProjectClick={openModal}
          categories={categories}
        />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large" showHeader={false}>
        {selectedProject && (
          <div className="project-modal-content" onClick={toggleInfoCollapse}>
            {/* Bouton précédent */}
            <button 
              className="modal-nav-button prev-button" 
              onClick={goToPreviousProject}
              disabled={isTransitioning}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className={`modal-image ${isVideo(selectedProject.image) ? 'has-video' : ''} 
              ${slideDirection ? `slide-${slideDirection}` : ''} 
              ${slideFromDirection ? `slide-from-${slideFromDirection}` : ''}`}
            >
              {renderMedia(selectedProject.image, selectedProject.title, true)}
            </div>

            {/* Bouton suivant */}
            <button 
              className="modal-nav-button next-button" 
              onClick={goToNextProject}
              disabled={isTransitioning}
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            <div className={`modal-info ${isInfoCollapsed ? 'collapsed' : ''} ${slideDirection ? `slide-${slideDirection}` : ''}`}>
              <div className="modal-row">
                {/* Zone gauche - Titre et catégorie */}
                <div className="modal-info-left">
                  {selectedProject.title !== '#' && <h3 className="modal-title">{selectedProject.title}</h3>}
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
                  {selectedProject.link !== '#' && (
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
                  )}
                </div>
              </div>

              {/* Description en bas */}
              <div className="modal-description-container">
                <p className="modal-description">{selectedProject.description}</p>
              </div>
              
              {/* Indicateur de navigation */}
              <div className="modal-pagination">
                <span>{selectedProjectIndex + 1} / {filteredProjects.length}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects; 