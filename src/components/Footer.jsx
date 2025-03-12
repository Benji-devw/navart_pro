import Contact from '@/components/ContactForm';
import '@styles/Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <Contact />
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} - Navarro Benjamin. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
