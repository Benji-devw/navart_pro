import { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = ({ onFilterChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeIcon, setActiveIcon] = useState('hero'); // 'home', 'shop', 'projects', 'contact'
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  // Créer des refs pour chaque section
  const sectionRefs = useRef({
    hero: null,
    about: null,
    skills: null,
    projects: null,
  });

  // Array of items to link to
  const items = [
    {
      name: 'hero',
      icon: 'fas fa-home',
      href: '#hero',
    },
    {
      name: 'about',
      icon: 'fas fa-user',
      href: '#about',
    },
    {
      name: 'skills',
      icon: 'fas fa-cubes-stacked',
      href: '#skills',
    },
    {
      name: 'projects',
      icon: 'fas fa-folder-open',
      href: '#projects',
    },
  ];

  // Effet pour initialiser les refs des sections
  useEffect(() => {
    // Initialiser les refs avec les éléments DOM
    Object.keys(sectionRefs.current).forEach((section) => {
      sectionRefs.current[section] = document.getElementById(section);
    });
  }, []);

  // Fonction pour gérer le changement de vue
  const handleFilterView = (sectionName) => {
    setActiveIcon(sectionName);

    // Appeler la fonction de callback pour informer le parent du changement
    if (onFilterChange) {
      onFilterChange(sectionName);
    }
  };

  // Effet pour détecter le défilement et mettre à jour le header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);

      // Logique pour masquer/afficher le header lors du défilement
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setIsVisible(lastScrollY.current > currentScrollY);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="icon-menu-container">
        <nav className="icon-menu" ref={navRef}>
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`menu-icon ${activeIcon === item.name ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault(); // Empêcher le comportement par défaut
                handleFilterView(item.name);
              }}
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
