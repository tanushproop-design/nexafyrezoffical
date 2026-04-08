import { useState, useEffect } from 'react'

export default function LiveMembers() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/members`)
        if (!res.ok) throw new Error('API offline')
        const data = await res.json()
        setMembers(data)
        setError(false)
      } catch (err) {
        console.error('Failed to fetch live members:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchMembers()
    
    // Refresh every 15 seconds
    const interval = setInterval(fetchMembers, 15000)
    return () => clearInterval(interval)
  }, [])

  if (error && members.length === 0) {
    return null; // hide section if bot is fully offline and we have no cache
  }

  // Group members into online/idle/dnd and offline
  const activeMembers = members.filter(m => m.status !== 'offline')
  const offlineMembers = members.filter(m => m.status === 'offline')

  return (
    <section className="live-members-section" id="live-members">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-gradient">Live</span> Server Activity
          </h2>
          <p className="section-subtitle">Real-time status of our members in the Nexafyrez Discord Server.</p>
        </div>

        {loading && members.length === 0 ? (
          <div className="members-loading">
            <div className="loading-spinner"></div>
            <p>Connecting to Discord Gateway...</p>
          </div>
        ) : (
          <div className="members-grid">
            {activeMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
            {/* Optionally show offline or hide them. We will hide them for now unless they are bots? Let's just show active members */}
            {activeMembers.length === 0 && (
              <p className="no-members-msg">No members are currently online.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function MemberCard({ member }) {
  // Determine highest priority activity
  const activity = member.activities.length > 0 ? member.activities[0] : null;
  
  let statusColor = '#747f8d'; // offline
  if (member.status === 'online') statusColor = '#3ba55c';
  else if (member.status === 'idle') statusColor = '#faa61a';
  else if (member.status === 'dnd') statusColor = '#ed4245';

  return (
    <div className="member-card">
      <div className="member-avatar-wrapper">
        <img src={member.avatar || '/bot-avatar.png'} alt={member.username} className="member-avatar" />
        <div className="member-status-dot" style={{ backgroundColor: statusColor }}></div>
      </div>
      <div className="member-info">
        <h3 className="member-username">
          {member.displayName || member.username}
          {member.bot && <span className="bot-tag">BOT</span>}
        </h3>
        {activity ? (
          <p className="member-activity">
            {activity.type === 0 ? 'Playing ' : activity.type === 2 ? 'Listening to ' : activity.type === 3 ? 'Watching ' : ''}
            <strong>{activity.name}</strong>
            {activity.details && <span className="activity-details"> - {activity.details}</span>}
          </p>
        ) : (
          <p className="member-activity">No active status</p>
        )}
      </div>
    </div>
  )
}
