import { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Composant Modal réutilisable
 * @param {Object} props - Les propriétés du modal
 * @param {boolean} props.isOpen - Si le modal est ouvert ou fermé
 * @param {Function} props.onClose - Fonction à appeler pour fermer le modal
 * @param {string} [props.title] - Titre du modal
 * @param {React.ReactNode} props.children - Contenu du modal
 * @param {string} [props.size='medium'] - Taille du modal (small, medium, large, fullscreen)
 * @param {boolean} [props.closeOnOverlayClick=true] - Si le modal se ferme en cliquant sur l'overlay
 * @param {boolean} [props.showCloseButton=true] - Si le bouton de fermeture est affiché
 * @param {boolean} [props.showHeader=true] - Si le header est affiché
 * @param {React.ReactNode} [props.footer] - Contenu du footer du modal
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  showHeader = true,
  footer,
}) => {
  const modalRef = useRef(null);

  // Fermer le modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; // Rétablir le défilement
    };
  }, [isOpen, onClose]);

  // Gérer le clic sur l'overlay
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Animation d'entrée/sortie
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const timer = setTimeout(() => {
        modalRef.current.classList.add('modal-visible');
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal modal-${size}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {showHeader && (
          <div className="modal-header">
            {title && (
              <h3 id="modal-title" className="modal-title">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button className="modal-close" onClick={onClose} aria-label="Fermer">
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        )}

        <div className="modal-content">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
