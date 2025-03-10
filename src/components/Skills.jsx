import { useEffect, useRef } from 'react';
import '@styles/Skills.css';

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

  // Liste des compétences avec leurs icônes Devicon
  const frontendSkills = [
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored', level: 85 },
    { name: 'React', icon: 'devicon-react-original colored', level: 80 },
    { name: 'Next.js', icon: 'devicon-nextjs-plain colored', level: 80 },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored', level: 60 },
    { name: 'Vue.js', icon: 'devicon-vuejs-plain colored', level: 55 },
    { name: 'SASS', icon: 'devicon-sass-original colored', level: 85 },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored', level: 85 },
    { name: 'Material UI', icon: 'devicon-materialui-plain colored', level: 85 },
    { name: 'Figma', icon: 'devicon-figma-plain colored', level: 80 },
    { name: 'Storybook', icon: 'devicon-storybook-plain colored', level: 35 },
  ];

  const backendSkills = [
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored', level: 75 },
    { name: 'Express', icon: 'devicon-express-original colored', level: 75 },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', level: 65 },
    { name: 'SQL', icon: 'devicon-mysql-plain colored', level: 70 },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', level: 70 },
    { name: 'Prisma', icon: 'devicon-prisma-plain colored', level: 55 },
    { name: 'Vercel', icon: 'devicon-vercel-plain colored', level: 85 },
    { name: 'AWS', icon: 'devicon-amazonwebservices-plain colored', level: 50 },
    { name: '.NET', icon: 'devicon-dot-net-plain colored', level: 0 },
    { name: 'Linux', icon: 'devicon-linux-plain colored', level: 65 },
  ];

  const toolsSkills = [
    { name: 'Cypress', icon: 'devicon-cypressio-plain colored', level: 75 },
    { name: 'Jest', icon: 'devicon-jest-plain colored', level: 55 },
    { name: 'Selenium', icon: 'devicon-selenium-plain colored', level: 25 },
    { name: 'Cursor', icon: '/icons/th.png', level: 85, isImage: true },
    { name: 'Git', icon: 'devicon-git-plain colored', level: 65 },
    { name: 'GitHub', icon: 'devicon-github-plain colored', level: 85 },
    { name: 'CI/CD', icon: 'devicon-gitlab-plain colored', level: 65 },
    { name: 'Docker', icon: 'devicon-docker-plain colored', level: 60 },
    { name: 'Jira', icon: 'devicon-jira-plain colored', level: 80 },
    { name: 'Monday', icon: '/icons/monday-icon-icon-md.png', level: 75, isImage: true },
    { name: 'Postman', icon: 'devicon-postman-plain colored', level: 85 },
  ];

  // Fonction pour rendre l'icône en fonction de son type (Devicon ou image personnalisée)
  const renderIcon = (skill) => {
    if (skill.isImage) {
      return (
        <img src={skill.icon} alt={skill.name} className="custom-icon" style={{ width: '36px', height: '36px' }} />
      );
    } else {
      return <i className={skill.icon}></i>;
    }
  };

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Mes compétences</h2>
      <div className="skills-content" ref={skillsRef}>
        <div className="skills-description">
          <p>
            J'ai acquis une variété de compétences techniques au cours de mon parcours, me permettant de mener à bien
            des projets de bout en bout, de la conception à la mise en production.
          </p>
        </div>

        <div className="skills-grid">
          <div className="skills-category">
            <h3>Frontend</h3>
            <div className="skills-list">
              {frontendSkills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-icon">{renderIcon(skill)}</div>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
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
                  <div className="skill-icon">{renderIcon(skill)}</div>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
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
                  <div className="skill-icon">{renderIcon(skill)}</div>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
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
