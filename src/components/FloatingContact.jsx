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
        <div className="floating-contact-backdrop" ref={backdropRef}>
          <div className="floating-contact-modal" ref={modalRef}>
            <button className="close-modal-btn" onClick={() => setIsOpen(false)}>
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
