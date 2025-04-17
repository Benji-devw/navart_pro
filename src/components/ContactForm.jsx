import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import '@styles/ContactForm.css';
import Modal from '@components/ui/Modal';
import emailjs from '@emailjs/browser';

const ReCAPTCHA = lazy(() => import('react-google-recaptcha'));

export const ContactForm = () => {
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
  const [sendStatus, setSendStatus] = useState({
    check: false,
    valid: false,
    error: false,
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const recaptchaRef = useRef();

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

    if (!recaptchaValue) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Veuillez valider le reCAPTCHA' },
      });
      return;
    }

    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          e.target,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            setTimeout(() => {
              setSendStatus({
                check: true,
                valid: true,
                error: false,
              });
              setFormData({ name: '', email: '', message: '' });
              e.target.reset();
              recaptchaRef.current.reset();
              setRecaptchaValue(null);
              setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: 'Message envoyé avec succès!' },
              });
              setTimeout(() => {
                closeModal();
              }, 2000);
            }, 2000);
          },
          () => {
            setTimeout(() => {
              setSendStatus({
                check: false,
                valid: false,
                error: true,
              });
              setStatus({
                submitted: false,
                submitting: false,
                info: { error: true, msg: "Une erreur s'est produite. Veuillez réessayer." },
              });
            }, 1000);
          }
        );
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Une erreur s'est produite. Veuillez réessayer." },
      });
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={`floating-contact-btn ${isModalOpen ? 'active' : ''}`}
        onClick={() => setIsModalOpen(!isModalOpen)}
        aria-label="Ouvrir le formulaire de contact"
      >
        <i className={`fas ${isModalOpen ? 'fa-times' : 'fa-envelope'}`}></i>
      </button>

      {/* Modal de contact */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="medium" showHeader={true} title="Me contacter">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
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

            {sendStatus.check ? (
              <div className={`form-status ${sendStatus.valid ? 'success' : 'error'}`}>
                {sendStatus.valid ? 'Message envoyé avec succès!' : "Une erreur s'est produite"}
              </div>
            ) : (
              <div className="form-group">
                <Suspense fallback={<div>Chargement...</div>}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                  />
                </Suspense>
                {recaptchaValue && (
                  <button type="submit" className="form-submit-btn" disabled={status.submitting}>
                    {status.submitting ? 'Envoi...' : 'Envoyer'}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
};
