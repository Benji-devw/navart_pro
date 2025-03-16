import { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeIcon, setActiveIcon] = useState('hero'); // 'home', 'shop', 'projects', 'contact'
  const menuRef = useRef(null);
  const lastScrollY = useRef(0);
  
  // Créer des refs pour chaque section
  const sectionRefs = useRef({
    hero: null,
    about: null,
    skills: null,
    projects: null
  });

  // Array of items to link to
  const items = [
    {
      name: 'hero',
      icon: 'fas fa-home',
      href: '#hero'
    },
    {
      name: 'about',
      icon: 'fas fa-user',
      href: '#about'
    },
    {
      name: 'skills',
      icon: 'fas fa-cubes-stacked',
      href: '#skills'
    },
    {
      name: 'projects',
      icon: 'fas fa-folder-open',
      href: '#projects'
    },
  ];

  // Effet pour initialiser les refs des sections
  useEffect(() => {
    // Initialiser les refs avec les éléments DOM
    Object.keys(sectionRefs.current).forEach(section => {
      sectionRefs.current[section] = document.getElementById(section);
    });
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
      const sections = ['hero', 'about', 'skills', 'projects'];
      
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
          {items.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className={`menu-icon ${activeIcon === item.name ? 'active' : ''}`}
              onClick={() => handleIconClick(item.name)}
            >
              <i className={item.icon}></i>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
