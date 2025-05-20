import { useContext, useState } from 'react';
import '@styles/Skills.css';
import { frontendSkills, backendSkills, toolsSkills } from '@assets/skillsData.json';
import RenderIcon from '@hooks/RenderIcon';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import Button from './ui/Button';

const Skills = () => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView(defaultInViewOptions);
  const [activeTab, setActiveTab] = useState('frontend');
  const categories = ['frontend', 'backend', 'tools'];

  // Function to render a list of skills
  const renderSkillsList = (skills) => (
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div 
          className="skill-item" 
          key={index}
          style={{ 
            animationDelay: `${index * 0.08}s`,
            opacity: 0,
            transform: 'translateY(20px)'
          }}
        >
          <div className="skill-icon">{RenderIcon(skill.icon, '36px')}</div>
          <div className="skill-info">
            <span className="skill-name">{skill.name}</span>
            {/* <span className="skill-level">{skill.level}%</span> */}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Ma Stack</h2>
      <div className={` skills-content ${inView ? 'animate' : 'not-active'}`} ref={ref}>
        <div className="skills-description">
          <p>
            J'ai acquis une variété de compétences techniques au cours de mon parcours, me permettant de mener à bien
            des projets de bout en bout, de la conception à la mise en production.
          </p>
        </div>

        <div className="skills-tabs bnt-tabs">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="transparent"
              size="small"
              className={`bnt-tab ${activeTab === category ? 'active' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="skills-tab-content">
          {activeTab === 'frontend' && <>{renderSkillsList(frontendSkills)}</>}
          {activeTab === 'backend' && <>{renderSkillsList(backendSkills)}</>}
          {activeTab === 'tools' && <>{renderSkillsList(toolsSkills)}</>}
        </div>
      </div>
    </section>
  );
};

export default Skills;
