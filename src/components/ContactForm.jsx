import { useState } from 'react';
import '@styles/ContactForm.css';

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
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Une erreur s'est produite. Veuillez réessayer." },
      });
    }
  };

  return (
    <div className="contact-container" id="contact">
      <h2 className="contact-title">Me contacter</h2>
      <p className="contact-description">
        Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter !
      </p>

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

      <div className="contact-info">
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <span>contact@example.com</span>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>Paris, France</span>
        </div>

      </div>
    </div>
  );
};

export default Contact;
