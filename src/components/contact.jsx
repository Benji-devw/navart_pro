import '../styles/contact.css';

export const Contact = () => {
  return (
    <div className="contact-box contact-details">
      <div className="detail">
        <i className="fas fa-map-marker-alt"></i>
        <span>Paris, France</span>
      </div>
      <div className="detail">
        <i className="fas fa-envelope"></i>
        <span>votre.email@example.com</span>
      </div>
      <div className="detail">
        <i className="fas fa-graduation-cap"></i>
        <span>Master en Développement Web</span>
      </div>
      <a href="/cv.pdf" className="btn download-btn" target="_blank" rel="noopener noreferrer">
        Télécharger mon CV <i className="fas fa-download"></i>
      </a>
    </div>
  );
};
