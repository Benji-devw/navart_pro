import { useEffect, useRef } from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const currentRef = skillsRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Liste des compétences
  const frontendSkills = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3 / SASS', level: 85 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 80 },
    { name: 'Vue.js', level: 75 },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'PHP', level: 65 },
    { name: 'MySQL', level: 70 },
    { name: 'MongoDB', level: 65 },
  ];

  const toolsSkills = [
    { name: 'Git', level: 85 },
    { name: 'Docker', level: 70 },
    { name: 'Webpack', level: 75 },
    { name: 'Adobe XD', level: 70 },
    { name: 'Figma', level: 80 },
  ];

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Mes compétences</h2>
      <div className="skills-content" ref={skillsRef}>
        <div className="skills-description">
          <p>
            J'ai acquis une variété de compétences techniques au cours de mon parcours, 
            me permettant de mener à bien des projets de bout en bout, de la conception 
            à la mise en production.
          </p>
        </div>
        
        <div className="skills-grid">
          <div className="skills-category">
            <h3>Frontend</h3>
            <div className="skills-list">
              {frontendSkills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="skills-category">
            <h3>Backend</h3>
            <div className="skills-list">
              {backendSkills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="skills-category">
            <h3>Outils & Autres</h3>
            <div className="skills-list">
              {toolsSkills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 