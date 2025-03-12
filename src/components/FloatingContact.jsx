import { useState, useRef, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import '@styles/FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className="floating-contact-container">
      <button
        className={`floating-contact-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le formulaire de contact"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-envelope'}`}></i>
      </button>

      {isOpen && (
        <div className="floating-contact-backdrop" onClick={() => setIsOpen(false)}>
          <button className="close-modal-btn" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
          <div className="floating-contact-modal">
            <div className="floating-contact-content">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingContact;
