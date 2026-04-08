export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon"><i className="fas fa-fire-flame-curved"></i></span>
              <span className="logo-text">Nexafyrez</span>
            </div>
            <p className="footer-desc">
              The Ultimate Gaming & Community Hub on Discord. Built with passion, powered by the community.
            </p>
            <div className="footer-socials">
              <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer" className="footer-social">
                <i className="fab fa-discord"></i>
              </a>
              <a href="https://www.instagram.com/nexa.official_1011/" target="_blank" rel="noreferrer" className="footer-social"><i className="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com/@NexafyreZ1011" target="_blank" rel="noreferrer" className="footer-social"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#team">Team</a>
          </div>
          <div className="footer-links">
            <h4>Community</h4>
            <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer">Join Discord</a>
            <a href="#">Rules</a>
            <a href="#">Support</a>
            <a href="#">Partners</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Nexafyrez. All rights reserved. Made with <i className="fas fa-heart"></i> by the Nexafyrez Team</p>
        </div>
      </div>
    </footer>
  )
}
