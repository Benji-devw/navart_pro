import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';
import { projects } from '../../assets/featuredProjects.json';
import Modal from '../ui/Modal';

// Liste des catégories pour le filtre
const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'web', name: 'Web' },
  { id: 'Design', name: 'Design' },
  { id: 'Infographie', name: 'Infographie' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const galleryRef = useRef(null);

  // Effet d'apparition au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  // Filtrer les projets lorsque la catégorie change
  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      if (selectedCategory === 'all') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter((project) => project.category === selectedCategory));
      }
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

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container" ref={galleryRef}>
        <h2 className="section-title">Mes projets</h2>

        <div className="gallery-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={`gallery-grid ${isAnimating ? 'animating' : ''}`}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="gallery-item" onClick={() => openModal(project)}>
              <div className="gallery-item-inner">
                <div className="gallery-img-container">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="gallery-item-overlay">
                  <h3 className="gallery-item-title">{project.title}</h3>
                  <div className="gallery-item-category">
                    {categories.find((cat) => cat.id === project.category)?.name}
                  </div>
                  <div className="gallery-item-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="view-details-btn">
                    <span>Voir les détails</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de projet */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="large"
        title={selectedProject?.title}
      >
        {selectedProject && (
          <>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="modal-info">
              <h2 className="modal-title">{selectedProject.title}</h2>

              <div className="modal-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="modal-category">
                Catégorie: {categories.find((cat) => cat.id === selectedProject.category)?.name}
              </div>

              <p className="modal-description">{selectedProject.description}</p>

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
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Gallery;
