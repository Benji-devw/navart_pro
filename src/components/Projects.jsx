import { useState } from 'react';
import Gallery from '@components/Gallery/Gallery';
import projectsData from '@assets/projectsData.json';
import Button from '@components/ui/Button';

export default function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);

  const filterProjects = (category) => {
    setFilteredProjects(projectsData.filter(project => project.category === category));
  };

  return (
    <div>
      <h1>Projects</h1>
      <div className="projects-container">
        <div className="projects-filter">
          <Button className="btn-tab" variant="transparent" onClick={() => setFilteredProjects(projectsData)}>All</Button>
          <Button className="btn-tab" variant="transparent" onClick={() => setFilteredProjects(projectsData.filter(project => project.category === 'Web'))}>Web</Button>
          <Button className="btn-tab" variant="transparent" onClick={() => setFilteredProjects(projectsData.filter(project => project.category === 'Design'))}>Design</Button>
          <Button className="btn-tab" variant="transparent" onClick={() => setFilteredProjects(projectsData.filter(project => project.category === 'Illustration'))}>Illustration</Button>
        </div>
        <Gallery projects={filteredProjects} isAnimating={false} onProjectClick={() => {}} categories={[]} />
      </div>
    </div>
  );
}
