import { useEffect } from 'react';
import './Bots.css';
import TicketWidget from '../components/TicketWidget';

export default function Bots() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="bots" className="bots-page">
      <div className="bots-header">
        <h1 className="hero-title">
          <span className="gradient-text">NexafyreZ</span> Bots
        </h1>
        <p className="hero-subtitle">Elevate your Discord experience with our state-of-the-art bots.</p>
      </div>
      
      <div className="bots-container">
        {/* NexafyreZ Main Bot */}
        <div className="bot-showcase-card">
          <div className="bot-glow-effect"></div>
          <div className="bot-image-wrapper">
            <img src="/nexafyre_logo.png" alt="NexafyreZ" className="bot-avatar main-bot-avatar" />
          </div>
          <div className="bot-content">
            <h2 className="bot-name gradient-text">NexafyreZ</h2>
            <p className="bot-description">
              The ultimate multi-purpose bot designed to keep your community safe, active, and entertained. 
              Features advanced moderation, leveling system, and detailed logging.
            </p>
            <div className="bot-tags">
              <span className="glass-tag"><i className="fas fa-shield-alt"></i> Moderation</span>
              <span className="glass-tag"><i className="fas fa-level-up-alt"></i> Leveling</span>
              <span className="glass-tag"><i className="fas fa-tools"></i> Utility</span>
            </div>
            <div className="bot-stats">
              <div className="stat-item">
                <span className="stat-val">24/7</span>
                <span className="stat-label">Uptime</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">0ms</span>
                <span className="stat-label">Latency</span>
              </div>
            </div>
            <div className="bot-action-group">
              <a href="https://discord.com/oauth2/authorize?client_id=1130456108137357413&permissions=8&scope=bot%20applications.commands" target="_blank" rel="noreferrer" className="btn btn-primary pulse-btn">
                <i className="fab fa-discord"></i> Invite Bot
              </a>
              <button className="btn btn-secondary">
                <i className="fas fa-book"></i> Documentation
              </button>
            </div>
          </div>
        </div>

        {/* NexafyreZ Music Bot */}
        <div className="bot-showcase-card reverse">
          <div className="bot-glow-effect secondary"></div>
          <div className="bot-image-wrapper">
            <div className="music-bot-icon">
              <i className="fas fa-music"></i>
            </div>
          </div>
          <div className="bot-content">
            <h2 className="bot-name secondary-gradient">NexafyreZ Music</h2>
            <p className="bot-description">
              Immersive, high-fidelity audio playback. Supports a wide variety of sources with zero lag.
              Equipped with a comprehensive set of audio filters to customize your listening experience.
            </p>
            <div className="bot-tags">
              <span className="glass-tag"><i className="fas fa-headphones"></i> High Quality</span>
              <span className="glass-tag"><i className="fas fa-sliders-h"></i> Audio Filters</span>
              <span className="glass-tag"><i className="fas fa-volume-up"></i> Volume Control</span>
            </div>
            <div className="bot-stats">
              <div className="stat-item">
                <span className="stat-val">99%</span>
                <span className="stat-label">Reliability</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">HQ</span>
                <span className="stat-label">Audio</span>
              </div>
            </div>
            <div className="bot-action-group">
              <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary">
                <i className="fab fa-discord"></i> Invite Music Bot
              </a>
            </div>
          </div>
        </div>
      </div>
      <TicketWidget />
    </section>
  )
}
