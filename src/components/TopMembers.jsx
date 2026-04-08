import { useState, useEffect } from 'react'
import ScrollReveal from './ScrollReveal'

export default function TopMembers() {
  const [leaderboard, setLeaderboard] = useState([])
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTopMembers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/top-members`)
        if (!res.ok) throw new Error('API offline')
        const data = await res.json()
        setLeaderboard(data.top || [])
        setDate(data.date || new Date().toLocaleDateString())
        setError(false)
      } catch (err) {
        console.error('Failed to fetch top members:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchTopMembers()
    const interval = setInterval(fetchTopMembers, 10000) // Update every 10s
    return () => clearInterval(interval)
  }, [])

  if (error && leaderboard.length === 0) return null

  return (
    <section className="top-members-section" id="top-members">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-gradient">Top 5</span> Active Daily
            </h2>
            <p className="section-subtitle">The most highly active members in the server today ({date}).</p>
          </div>
        </ScrollReveal>

        {loading && leaderboard.length === 0 ? (
          <div className="members-loading">
            <div className="loading-spinner"></div>
            <p>Loading Leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <p className="no-members-msg">No activity recorded today yet. Be the first to send a message!</p>
        ) : (
          <div className="leaderboard-container">
            {leaderboard.map((entry, index) => {
              const { count, member } = entry;
              const rank = index + 1;
              const isOwner = member.roles?.some(r => r.name.toLowerCase().includes('owner'));
              
              let statusColor = '#747f8d'; // offline
              if (member.status === 'online') statusColor = '#3ba55c';
              else if (member.status === 'idle') statusColor = '#faa61a';
              else if (member.status === 'dnd') statusColor = '#ed4245';

              return (
                <ScrollReveal key={member.id} delay={index * 100}>
                  <div className={`leaderboard-card rank-${rank} ${isOwner ? 'owner-highlight' : ''}`}>
                    
                    <div className="member-avatar-wrapper">
                      <img src={member.avatar || '/bot-avatar.png'} alt={member.username} className="member-avatar" />
                      <div className="member-status-dot" style={{ backgroundColor: statusColor }}></div>
                    </div>
                    
                    <div className="member-info">
                      <h3 className="member-username">
                        {member.displayName || member.username}
                        {member.roles && member.roles.length > 0 && (
                          <span className="owner-badge" style={{ backgroundColor: member.roles[0].hexColor && member.roles[0].hexColor !== '#000000' ? member.roles[0].hexColor : 'var(--primary)', color: '#fff', border: 'none' }}>
                            <i className="fas fa-certificate"></i> {member.roles[0].name}
                          </span>
                        )}
                      </h3>
                      <p className="member-activity">
                        <strong>{count}</strong> messages sent today
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  )
}
