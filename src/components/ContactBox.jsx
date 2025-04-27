import { useState } from 'react';
import '@styles/ContactBox.css';
import Button from '@/components/ui/Button';

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

  const downloadCV = () => {
    window.open('/CV_Numerique.pdf', '_blank');
  };

  return (
    <div className="contact-box contact-details">
      <div className="detail" tabIndex="0">
        <i className="fas fa-map-marker-alt"></i>
        <span>Gap, France</span>
      </div>
      <div className="detail" onClick={handleCopyEmail} style={{ cursor: 'pointer' }} tabIndex="0">
        <i className="fas fa-envelope"></i>
        <span>***.***@pm.me</span>
        <i className="copy-icon fas fa-copy"></i>
        {copied && <span className="copied-text">Copié !</span>}
      </div>
      <div className="detail" tabIndex="0">
        <i className="fas fa-graduation-cap"></i>
        <span>Développement Web </span>
      </div>
      <Button className="bnt-tab active download-btn" variant="primary" size="small" onClick={() => downloadCV()} tabIndex="0"> 
        Télécharger mon CV <i className="fas fa-download"></i>
      </Button>
    </div>
  );
};
