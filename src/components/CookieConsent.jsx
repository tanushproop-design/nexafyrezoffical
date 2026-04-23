import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Small delay before showing
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-modal">
        <div className="cookie-icon">🍪</div>
        <h3>We Value Your Privacy</h3>
        <p>Nexafyrez uses cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
        <div className="cookie-buttons">
          <button className="cookie-btn decline-btn" onClick={handleDecline}>Decline</button>
          <button className="cookie-btn accept-btn" onClick={handleAccept}>Accept All</button>
        </div>
      </div>
    </div>
  );
}
