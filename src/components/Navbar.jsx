import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#features', label: 'Features' },
    { href: '/#team', label: 'Team' },
    { href: '/#stats', label: 'Stats' },
    { href: '/#staff-apply', label: 'Staff Apply', icon: 'fas fa-clipboard-list' },
  ]

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/helix_logo.png" alt="Helix" style={{ width: '42px', height: '42px', objectFit: 'contain' }} className="nexa-logo" />
            <span className="logo-text">Helix</span>
          </Link>
          <ul className="nav-links">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">{link.label}</a>
              </li>
            ))}
          </ul>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/bots" className="nav-join-btn nav-bot-btn">
              <i className="fas fa-robot"></i> Create Own Bot
            </Link>
            <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer" className="nav-join-btn">
              <i className="fab fa-discord"></i> Join Server
            </a>
          </div>

          <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
          <i className="fas fa-xmark"></i>
        </button>
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={handleNavClick}>{link.label}</a>
        ))}
        <Link to="/bots" className="btn btn-primary nav-bot-btn-mobile" onClick={handleNavClick}>
          <i className="fas fa-robot"></i> Create Own Bot
        </Link>
        <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer" className="btn btn-primary" onClick={handleNavClick}>
          <i className="fab fa-discord"></i> Join Server
        </a>
      </div>
    </>
  )
}
