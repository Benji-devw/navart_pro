import { useState } from 'react';
import '../styles/contact.css';

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ben.nav@pm.me');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <div className="contact-box contact-details">
      <div className="detail">
        <i className="fas fa-map-marker-alt"></i>
        <span>Paris, France</span>
      </div>
      <div className="detail" onClick={handleCopyEmail} style={{ cursor: 'pointer' }}>
        <i className="fas fa-envelope"></i>
        <span>ben.nav@pm.me</span>
        {copied && <span style={{ marginLeft: '10px', color: "var(--primary-color)" }}>Copié !</span>}
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
