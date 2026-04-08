import { useState } from 'react'

export default function Navbar({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#features', label: 'Features' },
    { href: '#team', label: 'Team' },
    { href: '#stats', label: 'Stats' },
    { href: '#staff-apply', label: 'Staff Apply', icon: 'fas fa-clipboard-list' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <img src="/nexafyre_logo.png" alt="Nexafyrez" style={{ width: '42px', height: '42px', objectFit: 'contain' }} className="nexa-logo" />
            <span className="logo-text">Nexafyrez</span>
          </a>
          <ul className="nav-links">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer" className="nav-join-btn">
            <i className="fab fa-discord"></i> Join Server
          </a>
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
          <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
        ))}
        <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
          <i className="fab fa-discord"></i> Join Server
        </a>
      </div>
    </>
  )
}
