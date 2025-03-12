import { useState, useEffect, useRef } from 'react';
import '@styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeIcon, setActiveIcon] = useState('home'); // 'home', 'shop', 'projects', 'contact'
  const menuRef = useRef(null);
  const lastScrollY = useRef(0);
  
  // Créer des refs pour chaque section
  const sectionRefs = useRef({
    home: null,
    about: null,
    projects: null,
    skills: null
  });

  // Effet pour initialiser les refs des sections
  useEffect(() => {
    // Initialiser les refs avec les éléments DOM
    Object.keys(sectionRefs.current).forEach(section => {
      sectionRefs.current[section] = document.getElementById(section);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Détermine si on a scrollé vers le bas ou vers le haut
      if (currentScrollY > lastScrollY.current) {
        // Scroll vers le bas - cache le menu
        setIsVisible(false);
      } else {
        // Scroll vers le haut - montre le menu
        setIsVisible(true);
      }
      
      // Met à jour la position du dernier scroll
      lastScrollY.current = currentScrollY;
      
      // Détermine si la page a été scrollée pour l'effet de fond
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    // Utiliser la ref pour accéder à la section
    const sectionElement = sectionRefs.current[icon];
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Obtient toutes les sections
      const sections = ['home', 'about', 'projects', 'skills'];
      
      // Trouve la section actuellement visible en utilisant les refs
      const current = sections.find(section => {
        const element = sectionRefs.current[section];
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveIcon(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="icon-menu-container">
        <nav className="icon-menu" ref={menuRef}>
          <a 
            href="#home" 
            className={`menu-icon ${activeIcon === 'home' ? 'active' : ''}`}
            onClick={() => handleIconClick('home')}
          >
            <i className="fas fa-home"></i>
          </a>
          
          <a 
            href="#about" 
            className={`menu-icon ${activeIcon === 'about' ? 'active' : ''}`}
            onClick={() => handleIconClick('about')}
          >
            {/* <i className="fas fa-user"></i> */}
            <i class="fa-solid fa-address-card"></i>
          </a>
          
          <a 
            href="#projects" 
            className={`menu-icon ${activeIcon === 'projects' ? 'active' : ''}`}
            onClick={() => handleIconClick('projects')}
          >
            <i className="fas fa-tools"></i>
          </a>
          
          <a 
            href="#skills" 
            className={`menu-icon ${activeIcon === 'skills' ? 'active' : ''}`}
            onClick={() => handleIconClick('skills')}
          >
            <i className="fas fa-cubes-stacked"></i>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
