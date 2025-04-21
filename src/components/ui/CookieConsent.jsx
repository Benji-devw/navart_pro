// AI generated

import { useState, useEffect } from 'react';
import './CookieConsent.css';
import Button from '@/components/ui/Button';

/**
 * Cookie consent banner component
 * @param {Object} props The component properties
 * @param {boolean} props.forceShow Force the display of the banner even if the user has already consented
 * @param {Function} props.onConsentChange Callback called when the consent status changes (accepted/declined)
 * @returns {JSX.Element} Cookie consent banner
 */
const CookieConsent = ({ forceShow = false, onConsentChange = null }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Cookie expiration time (1 week)
  const COOKIE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

  // Function to save consent with an expiration date
  const saveConsent = (consent) => {
    const consentData = {
      value: consent,
      timestamp: new Date().getTime(),
      expiration: new Date().getTime() + COOKIE_EXPIRATION
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
  };

  // Function to check if the consent is expired
  const isConsentExpired = () => {
    try {
      const consentData = JSON.parse(localStorage.getItem('cookieConsent'));
      if (!consentData) return true;
      
      return new Date().getTime() > consentData.expiration;
    } catch {
      return true;
    }
  };

  // Check the initial consent status at load
  useEffect(() => {
    try {
      const consentData = JSON.parse(localStorage.getItem('cookieConsent'));
      if (consentData && !isConsentExpired()) {
        // Notify the parent of the initial consent status
        if (onConsentChange) {
          onConsentChange(consentData.value === 'accepted');
        }
      } else {
        // If the consent is expired, remove it
        localStorage.removeItem('cookieConsent');
      }
    } catch {
      localStorage.removeItem('cookieConsent');
    }
  }, [onConsentChange]);

  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
      return;
    }

    try {
      const consentData = JSON.parse(localStorage.getItem('cookieConsent'));
      const hasValidConsent = consentData && !isConsentExpired();

      if (!hasValidConsent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, [forceShow]);

    // Modify the handlers
  const handleAccept = () => {
    saveConsent('accepted');
    enableAnalyticsCookies();
    setIsVisible(false);

    if (onConsentChange) {
      onConsentChange(true);
    }
  };

  const handleDecline = () => {
    saveConsent('declined');
    setIsVisible(false);

    if (onConsentChange) {
      onConsentChange(false);
    }
  };

  // Modify the check function
  window.checkCookieConsent = () => {
    try {
      const consentData = JSON.parse(localStorage.getItem('cookieConsent'));
      return consentData && !isConsentExpired() && consentData.value === 'accepted';
    } catch {
      return false;
    }
  };

  // Function to enable analytics cookies
  const enableAnalyticsCookies = () => {
    // TODO: Implement analytics cookies
    console.log('Analytics cookies enabled');
  };

  // Export the function to allow other components to reopen the banner
  window.openCookieConsent = () => setIsVisible(true);

  if (!isVisible) return null;

  return (
    <div className={`cookie-consent ${isVisible ? 'visible' : ''}`}>
      <div className="cookie-content">
        <div className="cookie-icon">
          <i className="fas fa-cookie-bite"></i>
        </div>
        <div className="cookie-text">
          <h3>Utilisation des cookies</h3>
          <p>
            Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre
            utilisation des cookies.
            {/* <a href="/privacy-policy" className="privacy-link">
              Politique de confidentialité
            </a> */}
          </p>
        </div>
        <div className="cookie-buttons">
          <Button
            variant="primary"
            size="small"
            className="cookie-button accept"
            onClick={handleAccept}
            aria-label="Accepter les cookies"
          >
            Accepter
          </Button>
          <Button
            variant="primary"
            size="small"
            className="cookie-button decline"
            onClick={handleDecline}
            aria-label="Refuser les cookies non essentiels"
          >
            Refuser
          </Button>
          {/* <button 
            className="cookie-button customize"
            onClick={() => window.open('/cookies', '_blank')}
            aria-label="Personnaliser les cookies"
          >
            Personnaliser
          </button> */}
        </div>
      </div>
    </div>
  );
};

// Cookie settings button component to reopen the cookie banner
export const CookieSettingsButton = () => {
  const handleClick = () => {
    if (window.openCookieConsent) {
      window.openCookieConsent();
    }
  };

  return (
    <button className="cookie-settings-button" onClick={handleClick} aria-label="Paramètres des cookies">
      <i className="fas fa-cookie"></i> Paramètres des cookies
    </button>
  );
};

export default CookieConsent;
