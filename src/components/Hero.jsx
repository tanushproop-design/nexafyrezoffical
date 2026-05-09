import { useEffect, useRef } from 'react'
import useCountUp from '../hooks/useCountUp'

export default function Hero() {
  const members = useCountUp(400, 2000)
  const active = useCountUp(150, 2000)
  const hours = useCountUp(24, 2000)

  return (
    <section className="hero" id="home">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <i className="fas fa-bolt"></i> Official Discord Community
        </div>
        <h1 className="hero-title">
          <span className="title-line">Welcome to</span>
          <span className="title-gradient">Helix</span>
        </h1>
        <p className="hero-subtitle">
          The Ultimate Gaming & Community Hub — Where legends are made and friendships are forged. 
          Join the most elite community on Discord.
        </p>
        <div className="hero-buttons">
          <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer" className="btn btn-primary">
            <i className="fab fa-discord"></i> Join Our Server
            <span className="btn-glow"></span>
          </a>
          <a href="#about" className="btn btn-outline">
            <i className="fas fa-arrow-down"></i> Learn More
          </a>
        </div>
        <div className="hero-stats-mini">
          <div className="stat-mini">
            <span className="stat-mini-value">{members}</span>+
            <span className="stat-mini-label">Members</span>
          </div>
          <div className="stat-mini-divider"></div>
          <div className="stat-mini">
            <span className="stat-mini-value">{active}</span>+
            <span className="stat-mini-label">Active Daily</span>
          </div>
          <div className="stat-mini-divider"></div>
          <div className="stat-mini">
            <span className="stat-mini-value">{hours}</span>/7
            <span className="stat-mini-label">Online</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="floating-card card-1">
          <i className="fas fa-gamepad"></i>
          <span>Gaming</span>
        </div>
        <div className="floating-card card-2">
          <i className="fas fa-music"></i>
          <span>Music</span>
        </div>
        <div className="floating-card card-3">
          <i className="fas fa-comments"></i>
          <span>Chat</span>
        </div>
        <div className="floating-card card-4">
          <i className="fas fa-trophy"></i>
          <span>Events</span>
        </div>
      </div>
    </section>
  )
}
