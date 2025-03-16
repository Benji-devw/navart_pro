import { useContext, useState } from 'react';
import '@styles/Skills.css';
import { frontendSkills, backendSkills, toolsSkills } from '@assets/skills.json';
import RenderIcon from '@hooks/RenderIcon';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import Button from './ui/Button';

const Skills = () => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView(defaultInViewOptions);
  const [activeTab, setActiveTab] = useState('frontend');

  // Fonction pour regrouper les compétences par niveau
  const groupSkillsByLevel = (skills) => {
    const advanced = skills.filter(skill => skill.level >= 80);
    const intermediate = skills.filter(skill => skill.level >= 60 && skill.level < 80);
    const basic = skills.filter(skill => skill.level < 60);
    return { advanced, intermediate, basic };
  };

  // Regrouper les compétences par niveau
  const frontendGroups = groupSkillsByLevel(frontendSkills);
  const backendGroups = groupSkillsByLevel(backendSkills);
  const toolsGroups = groupSkillsByLevel(toolsSkills);

  // Fonction pour rendre un groupe de compétences
  const renderSkillGroup = (skills, title) => (
    <div className="skill-group">
      <h4 className="skill-group-title">{title}</h4>
      <div className="skill-group-grid">
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="skill-icon">{RenderIcon(skill, '36px')}</div>
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Ma Stack</h2>
      <div className={`skills-content ${inView ? 'animate' : ''}`} ref={ref}>
        <div className="skills-description">
          <p>
            J'ai acquis une variété de compétences techniques au cours de mon parcours, me permettant de mener à bien
            des projets de bout en bout, de la conception à la mise en production.
          </p>
        </div>

        <div className="skills-tabs bnt-tabs">
          <Button
            variant="transparent"
            className={`bnt-tab ${activeTab === 'frontend' ? 'active' : ''}`} 
            onClick={() => setActiveTab('frontend')}
          >
            Frontend
          </Button>
          <Button 
            variant="transparent"
            className={`bnt-tab ${activeTab === 'backend' ? 'active' : ''}`} 
            onClick={() => setActiveTab('backend')}
          >
            Backend
          </Button>
          <Button 
            variant="transparent"
            className={`bnt-tab ${activeTab === 'tools' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tools')}
          >
            Outils & Autres
          </Button>
        </div>

        <div className="skills-tab-content">
          {activeTab === 'frontend' && (
            <div className="skills-category">
              {frontendGroups.advanced.length > 0 && renderSkillGroup(frontendGroups.advanced, 'Avancé')}
              {frontendGroups.intermediate.length > 0 && renderSkillGroup(frontendGroups.intermediate, 'Intermédiaire')}
              {frontendGroups.basic.length > 0 && renderSkillGroup(frontendGroups.basic, 'Basique')}
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="skills-category">
              {backendGroups.advanced.length > 0 && renderSkillGroup(backendGroups.advanced, 'Avancé')}
              {backendGroups.intermediate.length > 0 && renderSkillGroup(backendGroups.intermediate, 'Intermédiaire')}
              {backendGroups.basic.length > 0 && renderSkillGroup(backendGroups.basic, 'Basique')}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="skills-category">
              {toolsGroups.advanced.length > 0 && renderSkillGroup(toolsGroups.advanced, 'Avancé')}
              {toolsGroups.intermediate.length > 0 && renderSkillGroup(toolsGroups.intermediate, 'Intermédiaire')}
              {toolsGroups.basic.length > 0 && renderSkillGroup(toolsGroups.basic, 'Basique')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
