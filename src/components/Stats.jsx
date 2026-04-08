import ScrollReveal from './ScrollReveal'
import useCountUp from '../hooks/useCountUp'

const stats = [
  { icon: 'fas fa-users', value: 400, label: 'Total Members' },
  { icon: 'fas fa-circle-dot', value: 150, label: 'Online Now' },
  { icon: 'fas fa-server', value: 24, label: 'Hours Uptime' },
  { icon: 'fas fa-bolt', value: 100, label: 'Custom Roles' },
]

function StatCard({ icon, value, label }) {
  const count = useCountUp(value, 2500)

  return (
    <div className="stat-card">
      <div className="stat-icon"><i className={icon}></i></div>
      <div className="stat-value">{count}+</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="stats-section" id="stats">
      <div className="section-container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <StatCard {...stat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
