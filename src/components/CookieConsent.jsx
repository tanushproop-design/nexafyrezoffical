import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentData = localStorage.getItem('cookieConsentData');
    if (consentData) {
      try {
        const parsed = JSON.parse(consentData);
        const now = new Date().getTime();
        // 24 hours in ms = 24 * 60 * 60 * 1000 = 86400000
        if (now - parsed.timestamp > 86400000) {
          setTimeout(() => setIsVisible(true), 1500);
        }
      } catch (e) {
        setTimeout(() => setIsVisible(true), 1500);
      }
    } else {
      setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }
  }, []);

  const saveConsent = (status) => {
    const data = { status, timestamp: new Date().getTime() };
    localStorage.setItem('cookieConsentData', JSON.stringify(data));
    setIsVisible(false);
  };

  const handleAccept = () => saveConsent('accepted');
  const handleDecline = () => saveConsent('declined');

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-modal">
        <div className="cookie-icon">🍪</div>
        <h3>We Value Your Privacy</h3>
        <p>Helix uses cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
        <div className="cookie-buttons">
          <button className="cookie-btn decline-btn" onClick={handleDecline}>Decline</button>
          <button className="cookie-btn accept-btn" onClick={handleAccept}>Accept All</button>
        </div>
      </div>
    </div>
  );
}
