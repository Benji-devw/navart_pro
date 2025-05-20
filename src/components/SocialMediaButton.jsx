import '@/styles/SocialMediaButton.css';

export default function SocialMediaButton() {
  const items = [
    { name: 'Github', icon: 'devicon-github-plain', link: 'https://github.com/Benji-devw' },
    { name: 'Gitlab', icon: 'devicon-gitlab-plain', link: 'https://gitlab.com/Benji-devw/' },
    { name: 'Linkedin', icon: 'devicon-linkedin-plain', link: 'https://www.linkedin.com/in/b-navarro/' },
  ];

  return (
    <div className="social-button">
      <div className={`social-icons`}>
        {items.map((item, index) => (
          <a className="social-icon" key={index} href={item.link} target="_blank" rel="noopener noreferrer">
            <i className={item.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
}
