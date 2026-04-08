import ScrollReveal from './ScrollReveal'

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="section-container">
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
      </div>
    </section>
  )
}
