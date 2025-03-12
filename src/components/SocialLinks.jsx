// import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import '@styles/SocialLinks.css';
const SocialLinks = () => {
  return (
    <div className="social-links">
      <a href="https://github.com/Benji-devw" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <i className="fab fa-github"></i>
      </a>
      <a href="https://gitlab.com/" target="_blank" rel="noopener noreferrer" aria-label="GitLab">
        <i className="fab fa-gitlab"></i>
      </a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  );
};

export default SocialLinks;