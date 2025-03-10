import { useEffect, useRef } from 'react';
import '@styles/Hero.css';

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const currentRef = textRef.current;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content" ref={textRef}>
          <p className="hero-subtitle">Bonjour, je m'appelle</p>
          <h1 className="hero-title">Votre Nom</h1>
          <h2 className="hero-description">Développeur Web Créatif</h2>
          <p className="hero-text">
            Je conçois et développe des expériences numériques qui combinent créativité, 
            esthétique et fonctionnalité pour créer des sites web et des applications 
            performants qui répondent aux besoins des utilisateurs.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn">Voir mes projets</a>
            <a href="#contact" className="btn btn-secondary">Me contacter</a>
          </div>
          <div className="social-links">
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
      <div className="scroll-down">
        <a href="#about">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero; 