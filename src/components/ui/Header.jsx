import { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = ({ onFilterChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeIcon, setActiveIcon] = useState(''); // 'home', 'shop', 'projects', 'contact'
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  // Array of items to link to
  const items = [
    {
      name: 'hero',
      subName: 'Accueil',
      icon: 'fas fa-home',
      href: '#hero',
    },
    {
      name: 'about',
      subName: 'A Propos',
      icon: 'fas fa-user',
      href: '#about',
    },
    {
      name: 'skills',
      subName: 'Compétences',
      icon: 'fas fa-cubes-stacked',
      href: '#skills',
    },
    {
      name: 'projects',
      subName: 'Projets',
      icon: 'fas fa-folder-open',
      href: '#projects',
    },
  ];

  // Function to handle view change
  const handleFilterView = (sectionName) => {
    localStorage.setItem('activeIcon', sectionName);    
    setActiveIcon(sectionName);

    // Call the callback function to inform the parent of the change
    if (onFilterChange) {
      onFilterChange(sectionName);
    }
  };

  // Effect to detect scrolling and update the header
  useEffect(() => {
    if (localStorage.getItem('activeIcon')) {
      setActiveIcon(localStorage.getItem('activeIcon'));
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);

      // Logic to hide/show the header when scrolling
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
              data-tooltip={`${item.subName}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default behavior
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
