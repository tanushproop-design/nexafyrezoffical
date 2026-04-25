import ScrollReveal from './ScrollReveal'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="cta-section" style={{ paddingBottom: '6rem' }}>
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <ScrollReveal>
          <div className="cta-box">
            <div className="cta-glow"></div>
            <h2 className="cta-title">Ready to Join the <span className="gradient-text">Revolution</span>?</h2>
            <p className="cta-desc">
              Don't miss out on the action. Join Nexafyrez today and become part of the most fire community on Discord!
            </p>
            <a href="https://discord.gg/JUraGygA" target="_blank" rel="noreferrer" className="btn btn-primary btn-large">
              <i className="fab fa-discord"></i> Join Nexafyrez Now
              <span className="btn-glow"></span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="cta-box" style={{ background: 'rgba(225, 29, 72, 0.05)', borderColor: 'rgba(225, 29, 72, 0.2)' }}>
            <div className="cta-glow" style={{ background: 'radial-gradient(circle, rgba(255, 0, 127, 0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>
            <h2 className="cta-title">Want Your <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #ff007f 0%, #e11d48 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Own Bot</span>?</h2>
            <p className="cta-desc" style={{ maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              Discover our powerful suite of Discord bots. Whether you need advanced moderation, engaging leveling systems, or high-fidelity music playback, we provide state-of-the-art solutions for your server.
            </p>
            <Link to="/bots" className="btn btn-primary btn-large" style={{ background: 'linear-gradient(135deg, #ff007f 0%, #e11d48 100%)', border: 'none', color: '#fff' }}>
              <i className="fas fa-robot"></i> Explore & Create Bot
              <span className="btn-glow"></span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
