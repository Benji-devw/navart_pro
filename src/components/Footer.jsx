import '@styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>Benjamin Navarro</h3>
          <p>Développeur Web Fullstack</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-links-column">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#about">À propos</a></li>
              <li><a href="#skills">Compétences</a></li>
              <li><a href="#projects">Projets</a></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4>Social</h4>
            <div className="footer-social-links">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} - Navarro Benjamin. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
