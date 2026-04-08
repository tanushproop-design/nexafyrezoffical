import ScrollReveal from './ScrollReveal'

const features = [
  {
    num: '01',
    icon: 'fas fa-robot',
    title: 'Custom Bots',
    desc: 'Our in-house built bots provide music, moderation, leveling, birthdays, anti-nuke and much more.',
    featured: true,
  },
  {
    num: '02',
    icon: 'fas fa-gamepad',
    title: 'Gaming Zone',
    desc: 'Dedicated channels for Valorant, GTA, Minecraft, Free Fire and more popular games.',
  },
  {
    num: '03',
    icon: 'fas fa-music',
    title: 'Music 24/7',
    desc: 'Premium music bots playing your favorite tracks in high quality voice channels.',
  },
  {
    num: '04',
    icon: 'fas fa-ranking-star',
    title: 'Leveling System',
    desc: 'Earn XP, level up, unlock exclusive roles and compete on the leaderboard.',
  },
  {
    num: '05',
    icon: 'fas fa-shield-virus',
    title: 'Anti-Nuke',
    desc: 'Military-grade server protection against raids, nukes, and malicious attacks.',
  },
  {
    num: '06',
    icon: 'fas fa-crown',
    title: 'VIP Access',
    desc: 'Special roles, exclusive channels, and premium perks for our most active members.',
  },
]

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-tag"><i className="fas fa-rocket"></i> Features</span>
            <h2 className="section-title">Why Choose <span className="gradient-text">Nexafyrez</span>?</h2>
            <p className="section-desc">We offer the best features to make your Discord experience unforgettable.</p>
          </div>
        </ScrollReveal>
        <div className="features-grid">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className={`feature-card ${f.featured ? 'featured' : ''}`}>
                <div className="feature-number">{f.num}</div>
                <div className="feature-icon"><i className={f.icon}></i></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
