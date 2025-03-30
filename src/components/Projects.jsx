import { useState, useEffect } from 'react';
import Gallery from '@components/Gallery/Gallery';
import projectsData from '@assets/projectsData.json';
import Button from '@components/ui/Button';

export default function Projects() {
  // Combiner toutes les catégories dans un seul tableau
  const allProjects = [
    ...projectsData.web || [],
    ...projectsData.design || [],
    ...projectsData.infographie || []
  ];
  
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('design');
  
  // Extraire dynamiquement les catégories disponibles
  const uniqueCategories = ['all', ...new Set(Object.keys(projectsData))];

  useEffect(() => {
    // Initialiser avec les projets de la catégorie active
    if (activeTab === 'all') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(projectsData[activeTab] || []);
    }
  }, [activeTab]);

  const filterProjects = (category) => {
    if (category === 'all') {
      setFilteredProjects(allProjects);
    } else {
      // Utiliser directement la catégorie du JSON sans filtrer par propriété category
      setFilteredProjects(projectsData[category] || []);
    }
    setActiveTab(category);
  };

  return (
    <section id="projects">
      <h2 className="section-title">Portfolio</h2>

      <div className="projects-container">
        <div className="bnt-tabs">
          {uniqueCategories.map((category, index) => (
            <Button
              key={index}
              className={`bnt-tab ${activeTab === category ? 'active' : ''}`}
              variant="transparent"
              onClick={() => filterProjects(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <Gallery projects={filteredProjects} />
      </div>
    </section>
  );
}
