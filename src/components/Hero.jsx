import { useEffect, useRef } from 'react';
import Button from './ui/Button';
import '@styles/Hero.css';
import SocialLinks from './SocialLinks';

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
          <div className="hero-left">
            <div className="hero-text-container">
              <p className="hero-greeting">Bonjour, je suis</p>
              <h1 className="hero-title">Benjamin <span className="hero-title-highlight">Navarro</span></h1>
              <div className="hero-roles">
                <div className="role-container">
                  <h2 className="hero-role">Développeur full stack</h2>
                  <h2 className="hero-role">Testeur QA</h2>
                </div>
              </div>
              <p className="hero-bio">
                Je conçois et développe des <span className="hero-highlight">expériences numériques</span> innovantes qui combinent créativité, 
                esthétique et fonctionnalité pour créer des sites web et des applications 
                performants qui <span className="hero-highlight">répondent aux besoins</span> des utilisateurs.
              </p>
              <div className="hero-buttons">
                <Button variant="primary" size="large" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                  <i className="fas fa-eye"></i> Voir mes projets
                </Button>
                <Button variant="outline" size="large" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  <i className="fas fa-paper-plane"></i> Me contacter
                </Button>
              </div>
            </div>
          </div>
          
          <div className="hero-right">
            <SocialLinks />
            
            <div className="tech-stack">
              <div className="tech-badge">React</div>
              <div className="tech-badge">Node.js</div>
              <div className="tech-badge">TypeScript</div>
              <div className="tech-badge">MongoDB</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-down">
        <a href="#about" aria-label="Scroll down">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
      

    </section>
  );
};

export default Hero; 