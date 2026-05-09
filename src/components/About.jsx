import ScrollReveal from './ScrollReveal'

const cards = [
  {
    icon: 'fas fa-shield-halved',
    title: 'Safe Community',
    desc: 'Anti-nuke protection, active moderation, and strict rules to keep our community safe and toxic-free.',
  },
  {
    icon: 'fas fa-headset',
    title: '24/7 Active',
    desc: 'Our server is always active with voice channels, music bots, and constant engagement round the clock.',
  },
  {
    icon: 'fas fa-star',
    title: 'Premium Bots',
    desc: 'Custom-built bots with music, moderation, leveling, birthday tracking, and much more exclusive features.',
  },
  {
    icon: 'fas fa-gift',
    title: 'Giveaways & Events',
    desc: 'Regular giveaways, tournaments, and community events with amazing prizes for active members.',
  },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-tag"><i className="fas fa-info-circle"></i> About Us</span>
            <h2 className="section-title">What is <span className="gradient-text">Helix</span>?</h2>
            <p className="section-desc">
              We're not just a Discord server — we're a family. Helix is the ultimate hangout spot 
              for gamers, creators, and vibers who want to be part of something legendary.
            </p>
          </div>
        </ScrollReveal>
        <div className="about-grid">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="about-card">
                <div className="about-card-icon">
                  <i className={card.icon}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
