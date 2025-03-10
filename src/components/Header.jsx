import { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <a href="#home">Portfolio</a>
      </div>
      
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      
      <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Accueil</a></li>
          <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>À propos</a></li>
          <li><a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Compétences</a></li>
          <li><a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projets</a></li>
          <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 