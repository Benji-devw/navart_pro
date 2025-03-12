import { useState, useRef, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
import '@styles/FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Gérer le clic en dehors du modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si le modal est ouvert et que le clic est sur le backdrop (mais pas sur le modal)
      if (isOpen && backdropRef.current && backdropRef.current === event.target) {
        setIsOpen(false);
      }
    };

    // Ajouter l'écouteur d'événement
    document.addEventListener('mousedown', handleClickOutside);
    
    // Nettoyer l'écouteur d'événement
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Gérer le overflow du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]); 
  
  // Gérer la touche Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Empêcher la propagation du clic sur le bouton de fermeture
  const handleCloseButtonClick = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  
  return (
    <>
      <button
        className={`floating-contact-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le formulaire de contact"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-envelope'}`}></i>
      </button>
      
      {isOpen && (
        <div 
          className="floating-contact-backdrop" 
          ref={backdropRef}
        >
          <div 
            className="floating-contact-modal" 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()} // Empêcher la propagation du clic
          >
            <button 
              className="close-modal-btn" 
              onClick={handleCloseButtonClick}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="floating-contact-content">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContact;
