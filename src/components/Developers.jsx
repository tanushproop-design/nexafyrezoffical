import { useState, useEffect } from 'react'
import ScrollReveal from './ScrollReveal'

export default function Developers() {
  const [liveDevs, setLiveDevs] = useState([])
  const [showComingSoon, setShowComingSoon] = useState(false)

  const hardcoded = [
    {
      username: 'tanush_44',
      name: 'Tanush',
      role: 'Founder & Lead Developer',
      url: null,
      comingSoon: true,
      avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
      color: '#ffffffff'
    },
    {
      username: '4zy0',
      name: 'Dark',
      role: 'Co-Developer',
      url: null,
      comingSoon: true,
      avatar: 'https://cdn.discordapp.com/embed/avatars/4.png',
      color: '#00d2ff'
    },
    {
      username: '8wv6',
      name: 'Superior',
      role: 'Core Developer',
      url: 'https://superior01.netlify.app/',
      avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
      color: '#ffffffff'
    },
    {
      username: 'stromxd_',
      name: 'Darsh Id',
      role: 'UX / UI Developer',
      url: 'https://darsh-next-portfolio.vercel.app/',
      avatar: 'https://cdn.discordapp.com/embed/avatars/3.png',
      color: '#ffffffff'
    }
  ]

  useEffect(() => {
    const fetchDevs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/members`)
        if (res.ok) {
          const members = await res.json()
          setLiveDevs(members)
        }
      } catch (err) {
        console.error('Failed to fetch developer live data:', err)
      }
    }

    fetchDevs()
    const interval = setInterval(fetchDevs, 15000)
    return () => clearInterval(interval)
  }, [])

  const displayDevs = hardcoded.map(dev => {
    // Case-insensitive username match to pull live avatar and status
    const live = liveDevs.find(m => m.username.toLowerCase() === dev.username.toLowerCase())
    if (live) {
      return {
        ...dev,
        name: live.displayName || dev.name,
        avatar: live.avatar || dev.avatar,
        decoration: live.avatarDecoration,
        status: live.status
      }
    }
    return { ...dev, status: 'offline' }
  })

  // get explicit status color helper map
  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#22c55e';
      case 'idle': return '#f59e0b';
      case 'dnd': return '#ef4444';
      default: return '#71717a';
    }
  }

  return (
    <section className="developers-section" id="developers" style={{ padding: '100px 0', position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-gradient">Meet The</span> Developers
            </h2>
            <p className="section-subtitle">The brilliant minds behind Helix. Click to view our portfolios.</p>
          </div>
        </ScrollReveal>

        <div className="dev-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {displayDevs.map((dev, i) => {
            const handleClick = (e) => {
              if (dev.comingSoon) {
                e.preventDefault();
                setShowComingSoon(true);
                setTimeout(() => setShowComingSoon(false), 2500);
              }
            };

            const CardTag = dev.url ? 'a' : 'div';
            const cardProps = dev.url
              ? { href: dev.url, target: '_blank', rel: 'noopener noreferrer' }
              : { onClick: handleClick, style: { cursor: 'pointer' } };

            return (
              <ScrollReveal key={i} delay={i * 150}>
                <CardTag {...cardProps} className="dev-card" style={{
                  display: 'block',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '40px 24px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  ...(dev.url ? {} : { cursor: 'pointer' })
                }}>
                  <div className="dev-glow" style={{
                    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                    background: `radial-gradient(circle at center, ${dev.color}20, transparent 70%)`,
                    opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: 0
                  }}></div>
                  <div className="dev-avatar-wrapper" style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 20px', zIndex: 1 }}>
                    <img src={dev.avatar} alt={dev.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)', transition: 'transform 0.5s ease', position: 'relative', zIndex: 2 }} />
                    <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', background: `linear-gradient(135deg, transparent, ${dev.color}, transparent)`, animation: 'ringRotate 3s linear infinite', opacity: 0.6, zIndex: 1 }}></div>
                    <div className={`status-indicator ${dev.status}`} style={{ position: 'absolute', bottom: '-4px', right: '-4px', zIndex: 6, width: '22px', height: '22px', borderRadius: '50%', border: '4px solid var(--bg-card)', background: getStatusColor(dev.status) }}></div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 1 }}>{dev.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: dev.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>{dev.role}</p>
                  <div className="dev-hover-text" style={{ marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.6, transition: 'all 0.3s ease', position: 'relative', zIndex: 1 }}>
                    <span>{dev.comingSoon ? 'Coming Soon' : 'View Portfolio'}</span>
                    <i className={`fas ${dev.comingSoon ? 'fa-clock' : 'fa-external-link-alt'}`} style={{ fontSize: '0.75rem' }}></i>
                  </div>
                </CardTag>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Coming Soon Toast */}
      {showComingSoon && (
        <div className="coming-soon-toast" style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, var(--primary), var(--violet))',
          color: '#fff',
          padding: '14px 32px',
          borderRadius: '100px',
          fontWeight: 700,
          fontSize: '1rem',
          zIndex: 99999,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px var(--primary-glow)',
          animation: 'toastSlideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-rocket"></i> Portfolio Coming Soon!
        </div>
      )}

      <style>{`
        .dev-card:hover {
          transform: translateY(-10px) scale(1.05) perspective(1000px) rotateX(4deg);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 20px var(--primary-glow);
          z-index: 10;
        }
        .dev-card:hover .dev-glow { opacity: 1; }
        .dev-card:hover .dev-hover-text { opacity: 1; color: #fff; transform: translateY(-3px); }
        .dev-card:hover .dev-avatar-wrapper img { transform: scale(1.1); }
        @keyframes toastSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  )
}
