import { useState } from 'react';
import '@styles/ContactBox.css';
import Button from '@components/Button';

export const ContactBox = () => {
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
        <span>***.***@pm.me</span>
        <i className="copy-icon fas fa-copy"></i>
        {copied && <span className="copied-text">Copié !</span>}
      </div>
      <div className="detail">
        <i className="fas fa-graduation-cap"></i>
        <span>Master en Développement Web</span>
      </div>
      <Button
        variant="primary"
        size="large"
        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
      >
        {/* <a href="/cv.pdf" className="btn download-btn" target="_blank" rel="noopener noreferrer"> */}
        Télécharger mon CV <i className="fas fa-download"></i>
        {/* </a> */}
      </Button>
    </div>
  );
};
