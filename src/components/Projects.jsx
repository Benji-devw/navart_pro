import { useState, useEffect, useMemo } from 'react';
import '@styles/Projects.css';
import Gallery from '@components/Gallery/Gallery';
import webDataFile from '@assets/projectsData/webData.json';
import designDataFile from '@assets/projectsData/designData.json';
import infographieDataFile from '@assets/projectsData/infographieData.json';
import Button from '@components/ui/Button';

export default function Projects() {
  // Extraire les données de chaque fichier
  const webData = webDataFile.web || [];
  const designData = designDataFile.design || [];
  const infographieData = infographieDataFile.infographie || [];

  // Organiser les projets par catégorie - utiliser useMemo pour éviter les recalculs inutiles
  const allProjects = useMemo(() => ({
    web: webData,
    design: designData,
    infographie: infographieData
  }), []);
  
  // Préparer les projets "all" une seule fois
  const allCombinedProjects = useMemo(() => 
    Object.values(allProjects).flat()
  , [allProjects]);

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('web');

  // Extraire dynamiquement les catégories disponibles
  const uniqueCategories = useMemo(() => 
    ['all', ...Object.keys(allProjects)]
  , [allProjects]);

  useEffect(() => {
    // Initialiser avec les projets de la catégorie active
    if (activeTab === 'all') {
      setFilteredProjects(allCombinedProjects);
    } else {
      setFilteredProjects(allProjects[activeTab] || []);
    }
  }, [activeTab, allProjects, allCombinedProjects]);

  const filterProjects = (category) => {
    setActiveTab(category);
  };

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Portfolio</h2>

      {/* <div className={`projects-content ${inView ? 'animate' : ''}`} ref={ref}> */}
        <div className="bnt-tabs">
          {uniqueCategories.map((category, index) => (
            <Button
              key={index}
              size="small"
              className={`bnt-tab ${activeTab === category ? 'active' : ''}`}
              variant="transparent"
              onClick={() => filterProjects(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <Gallery key={activeTab} projects={filteredProjects} />
      {/* </div> */}
    </section>
  );
}
