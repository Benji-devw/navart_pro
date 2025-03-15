import { useState, useEffect } from 'react';
import '@styles/ContactForm.css';
import Modal from '@components/ui/Modal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gérer le overflow du body
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  // Gérer la touche Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (isModalOpen && event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      // Simulation d'envoi (à remplacer par votre API d'envoi d'emails)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: 'Message envoyé avec succès!' },
      });

      // Réinitialiser le formulaire après envoi réussi
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Réinitialiser le statut après 5 secondes
      setTimeout(() => {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: false, msg: null },
        });
      }, 5000);
    } catch (error) {
      console.log(error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Une erreur s'est produite. Veuillez réessayer." },
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        className={`floating-contact-btn ${isModalOpen ? 'active' : ''}`}
        onClick={() => setIsModalOpen(!isModalOpen)}
        aria-label="Ouvrir le formulaire de contact"
      >
        <i className={`fas ${isModalOpen ? 'fa-times' : 'fa-envelope'}`}></i>
      </button>
      
      {/* Modal de contact */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="medium" showHeader={false} title="Me contacter">
        <div className="contact-container" id="contact">
          <h2 className="contact-title">Me contacter</h2>
          <p className="contact-description">N'hésitez pas à me contacter !</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={status.submitting}>
              {status.submitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>

            {status.info.msg && (
              <div className={`form-status ${status.info.error ? 'error' : 'success'}`}>{status.info.msg}</div>
            )}
          </form>

          {/* <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>contact@example.com</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Paris, France</span>
          </div>
        </div> */}
        </div>
      </Modal>
    </>
  );
};

export default Contact;
