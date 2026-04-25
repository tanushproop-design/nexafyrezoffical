import { useState, useEffect } from 'react';
import './Bots.css';
import TicketWidget from '../components/TicketWidget';

const botsData = [
  {
    id: 'nexafyrez',
    name: 'NexafyreZ',
    icon: 'fas fa-shield-alt',
    desc: 'The ultimate multi-purpose bot. Advanced moderation, leveling, logging & more.',
    fullDesc: 'NexafyreZ is the powerhouse behind the community. It handles everything from auto-moderation, anti-nuke protection, custom role management, leveling systems, and detailed audit logging. Built to keep your server safe 24/7.',
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1130456108137357413&permissions=8&scope=bot%20applications.commands',
    tags: ['Moderation', 'Leveling', 'Utility', 'Anti-Nuke'],
    commands: [
      { name: 'ban', desc: 'Ban a member from the server', category: 'Moderation' },
      { name: 'kick', desc: 'Kick a member from the server', category: 'Moderation' },
      { name: 'mute', desc: 'Mute a member in the server', category: 'Moderation' },
      { name: 'timeout', desc: 'Timeout a member (supports 30s, 5m, 2h, 1d)', category: 'Moderation' },
      { name: 'jail', desc: 'Jail a member, stripping all roles', category: 'Moderation' },
      { name: 'unjail', desc: 'Release a jailed member', category: 'Moderation' },
      { name: 'jailsetup', desc: 'Setup the jail role and channel', category: 'Moderation' },
      { name: 'vcmuteall', desc: 'Server mute everyone in a VC', category: 'Moderation' },
      { name: 'vcunmuteall', desc: 'Unmute everyone in a VC', category: 'Moderation' },
      { name: 'purge', desc: 'Bulk delete messages', category: 'Moderation' },
      { name: 'warn', desc: 'Warn a member', category: 'Moderation' },
      { name: 'rank', desc: 'View your current level and XP', category: 'Leveling' },
      { name: 'leaderboard', desc: 'View the server XP leaderboard', category: 'Leveling' },
      { name: 'userinfo', desc: 'View information about a user', category: 'Utility' },
      { name: 'serverinfo', desc: 'View server information', category: 'Utility' },
      { name: 'avatar', desc: 'View a user\'s avatar', category: 'Utility' },
      { name: 'ping', desc: 'Check bot latency', category: 'Utility' },
    ]
  },
  {
    id: 'nf-music',
    name: 'NF Music',
    icon: 'fas fa-music',
    desc: 'High-fidelity music playback with audio filters and queue management.',
    fullDesc: 'NF Music delivers immersive audio playback supporting YouTube, Spotify, SoundCloud, and more. Equipped with bass boost, nightcore, vaporwave, and other audio filters for a premium listening experience.',
    inviteUrl: '#',
    tags: ['Music', 'Audio Filters', 'Queue', 'Playlists'],
    commands: [
      { name: 'play', desc: 'Play a song by name or URL', category: 'Music' },
      { name: 'stop', desc: 'Stop the music and clear queue', category: 'Music' },
      { name: 'skip', desc: 'Skip the current track', category: 'Music' },
      { name: 'pause', desc: 'Pause the current track', category: 'Music' },
      { name: 'resume', desc: 'Resume playback', category: 'Music' },
      { name: 'queue', desc: 'View the current queue', category: 'Music' },
      { name: 'loop', desc: 'Toggle loop mode (track/queue)', category: 'Music' },
      { name: 'volume', desc: 'Adjust the playback volume', category: 'Music' },
      { name: 'nowplaying', desc: 'Show the currently playing track', category: 'Music' },
      { name: 'shuffle', desc: 'Shuffle the queue', category: 'Music' },
      { name: 'filter', desc: 'Apply audio filters (bass, nightcore, etc.)', category: 'Filters' },
      { name: 'lofi', desc: 'Toggle 24/7 lofi radio stream', category: 'Music' },
      { name: 'join', desc: 'Join your voice channel', category: 'Utility' },
      { name: 'leave', desc: 'Leave the voice channel', category: 'Utility' },
    ]
  },
  {
    id: 'nf-activity',
    name: 'NF Activity',
    icon: 'fas fa-chart-line',
    desc: 'Tracks member activity, voice time, and engagement metrics.',
    fullDesc: 'NF Activity monitors and tracks all member engagement metrics including message activity, voice channel time, and overall participation. Perfect for identifying your most active community members.',
    inviteUrl: '#',
    tags: ['Tracking', 'Analytics', 'Voice', 'Activity'],
    commands: [
      { name: 'activity', desc: 'View a member\'s activity stats', category: 'Tracking' },
      { name: 'voicetime', desc: 'Check voice channel time', category: 'Tracking' },
      { name: 'top', desc: 'View most active members', category: 'Analytics' },
    ]
  },
  {
    id: 'nf-birthday',
    name: 'NF Birthday',
    icon: 'fas fa-birthday-cake',
    desc: 'Automated birthday reminders and celebrations for your community.',
    fullDesc: 'NF Birthday keeps track of all member birthdays and sends automated birthday wishes with special role assignments. Never miss a community member\'s special day again!',
    inviteUrl: '#',
    tags: ['Birthday', 'Celebrations', 'Auto-Role'],
    commands: [
      { name: 'setbirthday', desc: 'Set your birthday', category: 'Birthday' },
      { name: 'birthday', desc: 'Check someone\'s birthday', category: 'Birthday' },
      { name: 'upcoming', desc: 'View upcoming birthdays', category: 'Birthday' },
    ]
  },
  {
    id: 'nexus-ai',
    name: 'Nexus AI',
    icon: 'fas fa-brain',
    desc: 'AI-powered chatbot with intelligent responses and image generation.',
    fullDesc: 'Nexus AI is an advanced artificial intelligence bot capable of natural conversations, answering questions, generating images, and providing intelligent assistance to your community.',
    inviteUrl: '#',
    tags: ['AI', 'ChatBot', 'Image Gen', 'Smart'],
    commands: [
      { name: 'ask', desc: 'Ask the AI a question', category: 'AI' },
      { name: 'imagine', desc: 'Generate an image from text', category: 'AI' },
      { name: 'chat', desc: 'Start a conversation with AI', category: 'AI' },
    ]
  },
  {
    id: 'nexa-auth',
    name: 'Nexa Auth',
    icon: 'fas fa-lock',
    desc: 'Verification and authentication system to protect your server.',
    fullDesc: 'Nexa Auth provides a robust verification system to prevent raids, bot accounts, and unwanted users from accessing your server. Features captcha verification and alt account detection.',
    inviteUrl: '#',
    tags: ['Verification', 'Security', 'Anti-Raid', 'Captcha'],
    commands: [
      { name: 'verify', desc: 'Verify yourself in the server', category: 'Auth' },
      { name: 'setup-verify', desc: 'Setup the verification system', category: 'Admin' },
    ]
  }
];

export default function Bots() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [liveStatuses, setLiveStatuses] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch live bot statuses from the API
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/members`);
        const data = await res.json();
        const botNames = ['nexafyrez', 'nf music', 'nf activity', 'nf birthday', 'nexus ai', 'nexa auth'];
        const bots = data.filter(m => m.bot === true);
        const statusMap = {};
        bots.forEach(bot => {
          const name = (bot.displayName || bot.username || '').toLowerCase();
          botNames.forEach(bn => {
            if (name.includes(bn)) {
              const matchId = bn.replace(/\s+/g, '-');
              statusMap[matchId] = {
                status: bot.status,
                avatar: bot.avatar,
                activity: bot.activities?.[0] || null,
              };
            }
          });
        });
        setLiveStatuses(statusMap);
      } catch (e) { /* API offline */ }
    };
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 10000);
    return () => clearInterval(interval);
  }, []);

  // Block scroll when modal is open
  useEffect(() => {
    if (selectedBot) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedBot]);

  const getStatus = (botId) => {
    return liveStatuses[botId]?.status || 'offline';
  };

  const getAvatar = (botId) => {
    return liveStatuses[botId]?.avatar || null;
  };

  const getActivity = (botId) => {
    return liveStatuses[botId]?.activity || null;
  };

  const statusColor = (s) => {
    if (s === 'online') return '#22c55e';
    if (s === 'idle') return '#f59e0b';
    if (s === 'dnd') return '#ef4444';
    return '#71717a';
  };

  // Group commands by category
  const groupCommands = (commands) => {
    return commands.reduce((acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    }, {});
  };

  return (
    <section id="bots" className="bots-page">
      <div className="bots-header">
        <h1 className="hero-title">
          <span className="gradient-text">NexafyreZ</span> Bots
        </h1>
        <p className="hero-subtitle">Our complete suite of Discord bots. Click any card to see full details.</p>
      </div>
      
      {/* Bot Cards Grid */}
      <div className="bot-cards-grid">
        {botsData.map((bot) => {
          const status = getStatus(bot.id);
          const avatar = getAvatar(bot.id);
          const activity = getActivity(bot.id);
          return (
            <div 
              key={bot.id} 
              className="bot-mini-card"
              onClick={() => { setSelectedBot(bot); setActiveTab('overview'); }}
            >
              <div className="bot-mini-glow"></div>
              <div className="bot-mini-header">
                <div className="bot-mini-icon-wrap">
                  {avatar ? (
                    <img src={avatar} alt={bot.name} className="bot-mini-avatar" />
                  ) : (
                    <i className={bot.icon}></i>
                  )}
                  <span className="bot-status-dot" style={{ background: statusColor(status) }}></span>
                </div>
                <div>
                  <h3 className="bot-mini-name">{bot.name}</h3>
                  <span className="bot-mini-status" style={{ color: statusColor(status) }}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="bot-mini-desc">{bot.desc}</p>
              <div className="bot-mini-tags">
                {bot.tags.slice(0, 3).map(t => (
                  <span key={t} className="glass-tag-sm">{t}</span>
                ))}
              </div>
              {activity && (
                <div className="bot-mini-activity">
                  <span className="activity-pulse"></span>
                  {activity.type === 0 ? 'Playing ' : activity.type === 2 ? 'Listening to ' : ''}
                  {activity.name}
                </div>
              )}
              <div className="bot-mini-footer">
                <span className="bot-cmd-count"><i className="fas fa-terminal"></i> {bot.commands.length} Commands</span>
                <span className="bot-click-hint"><i className="fas fa-expand"></i> Details</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bot Detail Modal */}
      <div className={`bot-modal-overlay ${selectedBot ? 'active' : ''}`} onClick={() => setSelectedBot(null)}>
        <div className={`bot-modal ${selectedBot ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          {selectedBot && (() => {
            const status = getStatus(selectedBot.id);
            const avatar = getAvatar(selectedBot.id);
            const activity = getActivity(selectedBot.id);
            const grouped = groupCommands(selectedBot.commands);
            return (
              <>
                <button className="bot-modal-close" onClick={() => setSelectedBot(null)}>
                  <i className="fas fa-times"></i>
                </button>

                {/* Modal Header */}
                <div className="bot-modal-header">
                  <div className="bot-modal-icon-wrap">
                    {avatar ? (
                      <img src={avatar} alt={selectedBot.name} className="bot-modal-avatar" />
                    ) : (
                      <div className="bot-modal-icon-fallback">
                        <i className={selectedBot.icon}></i>
                      </div>
                    )}
                    <span className="bot-modal-status-dot" style={{ background: statusColor(status) }}></span>
                  </div>
                  <div className="bot-modal-title-area">
                    <h2>{selectedBot.name}</h2>
                    <div className="bot-modal-status-row">
                      <span className="bot-modal-status-text" style={{ color: statusColor(status) }}>
                        <i className="fas fa-circle" style={{ fontSize: '0.5rem' }}></i> {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      {activity && (
                        <span className="bot-modal-activity-text">
                          — {activity.type === 0 ? 'Playing ' : activity.type === 2 ? 'Listening to ' : ''}{activity.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bot-modal-tabs">
                  <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                    <i className="fas fa-info-circle"></i> Overview
                  </button>
                  <button className={`tab-btn ${activeTab === 'commands' ? 'active' : ''}`} onClick={() => setActiveTab('commands')}>
                    <i className="fas fa-terminal"></i> Commands ({selectedBot.commands.length})
                  </button>
                </div>

                {/* Tab Content */}
                <div className="bot-modal-body">
                  {activeTab === 'overview' && (
                    <div className="bot-overview-tab">
                      <div className="bot-overview-section">
                        <h4><i className="fas fa-file-alt"></i> Description</h4>
                        <p>{selectedBot.fullDesc}</p>
                      </div>
                      <div className="bot-overview-section">
                        <h4><i className="fas fa-tags"></i> Features</h4>
                        <div className="bot-modal-tags">
                          {selectedBot.tags.map(t => (
                            <span key={t} className="glass-tag"><i className="fas fa-check"></i> {t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bot-overview-section">
                        <h4><i className="fas fa-signal"></i> Status</h4>
                        <div className="bot-status-grid">
                          <div className="status-block">
                            <span className="status-block-val" style={{ color: statusColor(status) }}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                            <span className="status-block-label">Current</span>
                          </div>
                          <div className="status-block">
                            <span className="status-block-val">{selectedBot.commands.length}</span>
                            <span className="status-block-label">Commands</span>
                          </div>
                          <div className="status-block">
                            <span className="status-block-val">{selectedBot.tags.length}</span>
                            <span className="status-block-label">Features</span>
                          </div>
                        </div>
                      </div>
                      <div className="bot-modal-actions">
                        <a href={selectedBot.inviteUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                          <i className="fab fa-discord"></i> Invite Bot
                        </a>
                      </div>
                    </div>
                  )}

                  {activeTab === 'commands' && (
                    <div className="bot-commands-tab">
                      {Object.entries(grouped).map(([category, cmds]) => (
                        <div key={category} className="cmd-category-block">
                          <h4 className="cmd-category-title">{category}</h4>
                          <div className="cmd-list">
                            {cmds.map(cmd => (
                              <div key={cmd.name} className="cmd-item">
                                <code className="cmd-name">/{cmd.name}</code>
                                <span className="cmd-desc">{cmd.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      <TicketWidget />
    </section>
  );
}
