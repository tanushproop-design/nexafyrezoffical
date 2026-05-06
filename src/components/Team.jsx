import React, { useState, useEffect } from 'react'
import ScrollReveal from './ScrollReveal'
import StaffApplyModal from './StaffApplyModal'

const founders = [
  {
    id: 'velvet',
    discordId: '1451194590072803482',
    name: 'VELVET',
    username: '@o_.9011',
    role: 'Owner',
    roleClass: 'role-founder',
    rankBadge: '👑',
    rankLabel: '#1',
    rankColor: '#ff2a2a',
    desc: 'Driving the vision and creative direction of Nexafyrez.',
    fullDesc: 'Velvet is a cornerstone of the community, managing the top-level staff and ensuring the server stays active and engaging.',
    pfp: '/velvet.png',
    type: 'founder',
    status: 'offline',
    badges: ['Server Booster', 'HypeSquad'],
    instagram: 'https://www.instagram.com/_____velvet.86/?hl=en'
  },
  {
    id: 'obito',
    discordId: '1413339455078662260',
    name: '? OBITO x Espada !',
    username: '@tanush_44',
    role: 'Owner',
    roleClass: 'role-founder',
    rankBadge: '💢',
    rankLabel: '#2',
    rankColor: '#ff007f',
    desc: 'Maintaining order and leading the Espada initiatives.',
    fullDesc: 'Obito manages the Co-Owner duties, handles escalated moderation issues, and supports the Espada gaming division.',
    pfp: '/obito.png',
    type: 'founder',
    status: 'offline',
    badges: ['NX', 'HypeSquad', 'Server Booster'],
    instagram: 'https://www.instagram.com/saku.exe_/'
  }
]

const coFounders = [
  {
    id: 'superior',
    discordId: '',
    name: 'Superior',
    username: '@8wv6',
    role: 'Founder',
    roleClass: 'role-founder',
    rankBadge: '💫',
    rankLabel: '#3',
    rankColor: '#ff007f',
    desc: 'Core Developer and Founder of Nexafyrez.',
    fullDesc: 'Superior is a Core Developer and Founder, actively contributing to the server infrastructure.',
    pfp: 'https://cdn.discordapp.com/embed/avatars/2.png',
    type: 'founder',
    status: 'offline',
    badges: ['Developer', 'Founder'],
    instagram: 'https://www.instagram.com/by_superior_/'
  },
  {
    id: 'strom',
    discordId: '',
    name: 'Strom',
    username: '@stromxd_',
    role: 'Founder',
    roleClass: 'role-founder',
    rankBadge: '⚡',
    rankLabel: '#4',
    rankColor: '#00d2ff',
    desc: 'UX/UI Developer and Founder of Nexafyrez.',
    fullDesc: 'Strom is responsible for the incredible UX/UI design and is a core founder.',
    pfp: 'https://cdn.discordapp.com/embed/avatars/3.png',
    type: 'founder',
    status: 'offline',
    badges: ['Developer', 'Founder'],
    instagram: 'https://www.instagram.com/stromxd_1/'
  },
  {
    id: '4zy0',
    discordId: '',
    name: '4zy0',
    username: '@4zy0',
    role: 'Founder',
    roleClass: 'role-founder',
    rankBadge: '🔥',
    rankLabel: '#5',
    rankColor: '#ff4b2b',
    desc: 'Founder and essential part of the Nexafyrez team.',
    fullDesc: '4zy0 is a Founder, playing a crucial role in managing and expanding the Nexafyrez community.',
    pfp: 'https://cdn.discordapp.com/embed/avatars/4.png',
    type: 'founder',
    status: 'offline',
    badges: ['Founder'],
    instagram: 'https://instagram.com/vanitas.cy'
  }
]

const admins = []


export default function Team() {
  const [activeMember, setActiveMember] = useState(null)
  const [liveMembers, setLiveMembers] = useState([])
  const [liveBots, setLiveBots] = useState([])
  const [isApplyOpen, setIsApplyOpen] = useState(false)

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/members`)
        const data = await res.json()
        setLiveMembers(data)
        // Filter only Nexafyrez bot members
        const allowedBots = ['nexafyrez', 'nf acivity', 'nf activity', 'nf birthday', 'birthday bot', 'nf music', 'nexus ai', 'nexa auth', 'nexa', 'n acivity', 'n birthday', 'n music', 'n acivity™#6276', 'nexa™#1164', 'n music™#0978', 'n birthday™#9924'];
        const serverBots = data.filter(m => m.bot === true)
          .filter(b => {
            const name = (b.displayName || b.username || '').toLowerCase();
            return allowedBots.some(n => name.includes(n));
          })
          .map(b => ({
            id: b.id,
            name: b.displayName || b.username,
            username: `@${b.username}`,
            pfp: b.avatar,
            status: b.status,
            role: b.activities?.length > 0 ? b.activities[0].name : 'Bot',
            rankLabel: 'APP',
            desc: b.activities?.length > 0 ? (b.activities[0].state || b.activities[0].details || b.activities[0].name) : 'Online and ready',
            fullDesc: `${b.displayName || b.username} is a custom Nexafyrez bot serving the community.`,
            badges: ['Bot', 'Verified'],
            liveActivity: b.activities?.length > 0 ? b.activities[0] : null,
            liveAvatar: b.avatar,
            isLiveBot: true
          }))
        setLiveBots(serverBots)
      } catch (e) {
        // Tracker offline
      }
    }
    fetchLive()
    const interval = setInterval(fetchLive, 10000)
    return () => clearInterval(interval)
  }, [])

  const mergeLiveData = (hardcoded) => {
    // Match by exact Discord User ID or username
    const live = liveMembers.find(m => m.id === hardcoded.discordId || ('@' + m.username) === hardcoded.username);

    if (live) {
      return {
        ...hardcoded,
        name: live.displayName || live.username || hardcoded.name,
        status: live.status,
        liveAvatar: live.avatar,
        avatarDecoration: live.avatarDecoration || null,
        customStatus: live.customStatus || null,
        liveActivity: live.activities?.length > 0 ? live.activities[0] : null
      }
    }
    return hardcoded;
  }

  // Block scroll when modal is open
  useEffect(() => {
    if (activeMember) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [activeMember])

  const openModal = (member) => {
    setActiveMember(member)
  }

  const closeModal = () => {
    setActiveMember(null)
  }

  return (
    <section className="team" id="team">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-tag"><i className="fas fa-users"></i> Our Team</span>
            <h2 className="section-title">Meet The <span className="gradient-text">Legends</span></h2>
            <p className="section-desc">The elite team behind Nexafyrez who keep this community running strong. Click on any card to view their full profile.</p>
          </div>
        </ScrollReveal>

        {/* Founder / Owner — Premium Cards with Logo */}
        <div className="team-row team-row-main">
          {founders.map((member, i) => {
            const merged = mergeLiveData(member);
            return (
              <React.Fragment key={merged.id}>
                <ScrollReveal delay={i * 200}>
                  <div 
                    className={`team-card-premium team-card-${merged.type}`}
                    onClick={() => openModal(merged)}
                  >
                    {/* Animated border */}
                    <div className="card-border-anim"></div>
                    <div className="card-inner">
                      {/* Rank badge */}
                      <div className="rank-badge" style={{ '--rank-color': merged.rankColor }}>
                        <span className="rank-emoji">{merged.rankBadge}</span>
                        <span className="rank-number">{merged.rankLabel}</span>
                      </div>
                      {/* Holographic stripe */}
                      <div className="holo-stripe"></div>
                      {/* Avatar with decoration */}
                      <div className="premium-avatar">
                        <div className="avatar-glow-ring" style={{ '--ring-color': merged.rankColor }}></div>
                        <div className="avatar-hex-frame">
                          <img src={merged.liveAvatar || merged.pfp} alt={merged.name} />
                        </div>
                        <div className={`status-indicator ${merged.status}`}>
                          <span className="status-pulse"></span>
                        </div>
                      </div>
                      <h3 className="team-name">{merged.name}</h3>
                      <div className="team-username">{merged.username}</div>
                      <span className={`team-role-badge ${merged.roleClass}`}>
                        {merged.role}
                      </span>
                      {/* Custom Status */}
                      {merged.customStatus?.text && (
                        <p className="owner-custom-status">
                          {merged.customStatus.emoji && <span className="custom-emoji">{merged.customStatus.emoji}</span>}
                          {merged.customStatus.text}
                        </p>
                      )}
                      {/* Live Activity */}
                      {merged.liveActivity && merged.liveActivity.type !== 4 ? (
                        <p className="team-desc" style={{ color: 'var(--primary-light)', fontWeight: 'bold' }}>
                          {merged.liveActivity.type === 0 ? '🎮 Playing ' : merged.liveActivity.type === 2 ? '🎵 Listening to ' : merged.liveActivity.type === 3 ? '📺 Watching ' : ''}
                          {merged.liveActivity.name}
                        </p>
                      ) : !merged.customStatus?.text ? (
                        <p className="team-desc">{merged.desc}</p>
                      ) : null}
                      <div className="card-click-hint">
                        <i className="fas fa-expand"></i> Tap to view profile
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </React.Fragment>
            )})}
        </div>

        {/* Co-Founders Row */}
        <div className="team-row team-row-main" style={{ marginTop: '30px' }}>
          {coFounders.map((member, i) => {
            const merged = mergeLiveData(member);
            return (
              <React.Fragment key={merged.id}>
                <ScrollReveal delay={i * 200}>
                  <div 
                    className={`team-card-premium team-card-${merged.type}`}
                    onClick={() => openModal(merged)}
                  >
                    {/* Animated border */}
                    <div className="card-border-anim"></div>
                    <div className="card-inner">
                      {/* Rank badge */}
                      <div className="rank-badge" style={{ '--rank-color': merged.rankColor }}>
                        <span className="rank-emoji">{merged.rankBadge}</span>
                        <span className="rank-number">{merged.rankLabel}</span>
                      </div>
                      {/* Holographic stripe */}
                      <div className="holo-stripe"></div>
                      {/* Avatar with decoration */}
                      <div className="premium-avatar">
                        <div className="avatar-glow-ring" style={{ '--ring-color': merged.rankColor }}></div>
                        <div className="avatar-hex-frame">
                          <img src={merged.liveAvatar || merged.pfp} alt={merged.name} />
                        </div>
                        <div className={`status-indicator ${merged.status}`}>
                          <span className="status-pulse"></span>
                        </div>
                      </div>
                      <h3 className="team-name">{merged.name}</h3>
                      <div className="team-username">{merged.username}</div>
                      <span className={`team-role-badge ${merged.roleClass}`}>
                        {merged.role}
                      </span>
                      {/* Custom Status */}
                      {merged.customStatus?.text && (
                        <p className="owner-custom-status">
                          {merged.customStatus.emoji && <span className="custom-emoji">{merged.customStatus.emoji}</span>}
                          {merged.customStatus.text}
                        </p>
                      )}
                      {/* Live Activity */}
                      {merged.liveActivity && merged.liveActivity.type !== 4 ? (
                        <p className="team-desc" style={{ color: 'var(--primary-light)', fontWeight: 'bold' }}>
                          {merged.liveActivity.type === 0 ? '🎮 Playing ' : merged.liveActivity.type === 2 ? '🎵 Listening to ' : merged.liveActivity.type === 3 ? '📺 Watching ' : ''}
                          {merged.liveActivity.name}
                        </p>
                      ) : !merged.customStatus?.text ? (
                        <p className="team-desc">{merged.desc}</p>
                      ) : null}
                      <div className="card-click-hint">
                        <i className="fas fa-expand"></i> Tap to view profile
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </React.Fragment>
            )})}
        </div>

        {/* Admin Row */}
        {admins.length > 0 && (
          <>
            <ScrollReveal>
              <h3 className="team-section-subtitle">
                <span className="subtitle-line"></span>
                <i className="fas fa-shield"></i> Administration Team
                <span className="subtitle-line"></span>
              </h3>
            </ScrollReveal>
            <div className="team-row team-row-admins">
              {admins.map((admin, i) => (
                <ScrollReveal key={admin.id} delay={i * 120}>
                  <div 
                    className="team-card-admin"
                    onClick={() => openModal(admin)}
                  >
                    <div className="admin-rank">{admin.rankLabel}</div>
                    <div className="admin-avatar">
                      <img src={admin.pfp} alt={admin.name} />
                      <div className="admin-ring"></div>
                      <div className={`status-indicator ${admin.status} sm`}></div>
                    </div>
                    <h3 className="team-name">{admin.name}</h3>
                    <span className="team-role-badge role-admin">Admin</span>
                    <p className="team-desc">{admin.desc}</p>
                    <div className="card-click-hint">
                      <i className="fas fa-expand"></i> Tap to view
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
        {/* Nexafyrez Team Works (Bots section) */}
        <ScrollReveal>
          <div className="section-header" style={{ marginTop: '60px' }}>
            <span className="section-tag"><i className="fas fa-robot"></i> Custom Integrations</span>
            <h2 className="section-title">Nexafyrez <span className="gradient-text">Team Works</span></h2>
            <p className="section-desc">
              Experience our custom suite of verified Discord bots built in-house to protect, entertain, and manage the community.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="team-grid">
          {liveBots.length > 0 ? liveBots.map((bot, i) => (
              <ScrollReveal key={bot.id} delay={i * 100}>
                <div 
                  className={`team-card role-admin`}
                  onClick={() => setActiveMember(bot)}
                >
                  <div className="card-glow"></div>
                  
                  <div className="card-top">
                    <div className="rank-badge">
                      <span className="rank-number">{bot.rankLabel}</span>
                    </div>
                  </div>
                  
                  <div className="profile-container">
                    <div className={`pfp-wrapper status-${bot.status}`}>
                      <img src={bot.pfp} alt={bot.name} className="pfp" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                      <div className="status-indicator"></div>
                    </div>
                    
                    <h3 className="member-name">{bot.name}</h3>
                    <div className="member-role" style={{ color: 'var(--primary-light)' }}>
                      {bot.role}
                    </div>
                    
                    {bot.liveActivity ? (
                      <p className="member-desc" style={{ color: 'var(--primary-light)', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        {bot.liveActivity.type === 0 ? 'Playing ' : bot.liveActivity.type === 2 ? 'Listening to ' : ''}
                        {bot.liveActivity.name}
                      </p>
                    ) : (
                      <p className="member-desc">{bot.desc}</p>
                    )}
                    
                    <div className="member-badges">
                      {bot.badges.map((badge, j) => (
                        <span key={j} className="badge">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
          )) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', gridColumn: '1 / -1' }}>Loading bots from server...</p>
          )}
        </div>

        <ScrollReveal>
          <div className="apply-staff-banner" style={{ textAlign: 'center', marginTop: '80px', padding: '50px 20px', background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.05), rgba(244, 63, 94, 0.05))', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(225, 29, 72, 0.1)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Want to join the <span className="gradient-text">Nexafyrez</span> Team?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>We're always looking for talented and passionate individuals to help us build the best community possible. If you think you have what it takes, submit an application!</p>
            <button id="staff-apply" onClick={() => setIsApplyOpen(true)} className="staff-apply-btn">
              <i className="fas fa-clipboard-list"></i> Apply For Staff
            </button>
          </div>
        </ScrollReveal>

      </div>

      {/* Profile Modal */}
      <div className={`profile-modal-overlay ${activeMember ? 'active' : ''}`} onClick={closeModal}>
        <div 
          className={`profile-modal ${activeMember ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {activeMember && (
            <>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              
              <div className="modal-header">
                <div className="modal-banner" style={{
                  background: activeMember.rankColor ? 
                    `linear-gradient(135deg, ${activeMember.rankColor}40, var(--bg-card))` : 
                    `linear-gradient(135deg, var(--primary-glow), var(--bg-card))`
                }}></div>
                <div className="modal-avatar-container">
                  <div className="modal-avatar">
                    <img src={activeMember.liveAvatar || activeMember.pfp} alt={activeMember.name} />
                    <div className={`status-indicator ${activeMember.status} lg`}></div>
                  </div>
                  <div className="modal-badges">
                    {(activeMember.badges || []).map((badge, idx) => (
                      <span key={idx} className="profile-badge">{badge}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-user-info">
                  <h2 className="modal-name">
                    {activeMember.name}
                    {activeMember.rankBadge && <span className="modal-rank-icon">{activeMember.rankBadge}</span>}
                  </h2>
                  <div className="modal-username">{activeMember.username}</div>
                  <div className={`team-role-badge ${activeMember.roleClass || 'role-admin'} modal-role`}>
                    {activeMember.role}
                  </div>
                </div>

                <div className="modal-divider"></div>

                <div className="modal-section">
                  <h3><i className="fas fa-user-circle"></i> About {activeMember.name}</h3>
                  <p className="modal-about-text">{activeMember.fullDesc}</p>
                </div>

                {/* Live Activity Section */}
                {activeMember.liveActivity && (
                  <div className="modal-section">
                    <h3><i className="fas fa-gamepad"></i> Current Activity</h3>
                    <div className="modal-live-activity">
                      <div className="live-activity-dot"></div>
                      <div>
                        <p className="live-activity-type">
                          {activeMember.liveActivity.type === 0 ? 'Playing' : activeMember.liveActivity.type === 2 ? 'Listening to' : activeMember.liveActivity.type === 3 ? 'Watching' : 'Active'}
                        </p>
                        <p className="live-activity-name">{activeMember.liveActivity.name}</p>
                        {activeMember.liveActivity.details && <p className="live-activity-details">{activeMember.liveActivity.details}</p>}
                        {activeMember.liveActivity.state && <p className="live-activity-state">{activeMember.liveActivity.state}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Section */}
                <div className="modal-section">
                  <h3><i className="fas fa-circle" style={{ color: activeMember.status === 'online' ? '#3ba55c' : activeMember.status === 'idle' ? '#faa61a' : activeMember.status === 'dnd' ? '#ed4245' : '#747f8d', fontSize: '0.7rem' }}></i> Status: <span style={{ textTransform: 'capitalize', color: activeMember.status === 'online' ? '#3ba55c' : activeMember.status === 'idle' ? '#faa61a' : activeMember.status === 'dnd' ? '#ed4245' : '#747f8d' }}>{activeMember.status}</span></h3>
                </div>

                <div className="modal-section">
                  <h3><i className="fas fa-link"></i> Connections</h3>
                  <div className="modal-socials">
                    <a href="#" className="modal-social-btn discord"><i className="fab fa-discord"></i> Discord</a>
                    {activeMember.instagram && (
                      <a href={activeMember.instagram} target="_blank" rel="noreferrer" className="modal-social-btn instagram">
                        <i className="fab fa-instagram"></i> Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <StaffApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </section>
  )
}
