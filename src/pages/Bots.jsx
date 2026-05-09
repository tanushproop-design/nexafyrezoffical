import { useState, useEffect } from 'react';
import './Bots.css';
import TicketWidget from '../components/TicketWidget';

const botsData = [
  {
    id: 'helix-main',
    name: 'Helix',
    icon: 'fas fa-shield-alt',
    desc: "S P A C E's Premium Bot — the ultimate multi-purpose bot with 200+ commands.",
    fullDesc: "Helix is the powerhouse behind the community with over 200 commands. It handles auto-moderation, anti-nuke protection, role management, leveling, welcome/goodbye, giveaways, tickets, logging, fun commands, and much more.",
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1130456108137357413&permissions=8&scope=bot%20applications.commands',
    tags: ['Moderation', 'Leveling', 'Anti-Nuke', 'Utility', 'Fun', 'Logging', 'Welcome', 'Giveaway', 'Tickets', 'Automod'],
    totalCommands: 200,
    commands: [
      { name: 'ban', desc: 'Ban a member from the server', category: 'Moderation' },
      { name: 'unban', desc: 'Unban a member by ID', category: 'Moderation' },
      { name: 'kick', desc: 'Kick a member from the server', category: 'Moderation' },
      { name: 'mute', desc: 'Mute a member in the server', category: 'Moderation' },
      { name: 'unmute', desc: 'Unmute a muted member', category: 'Moderation' },
      { name: 'timeout', desc: 'Timeout a member', category: 'Moderation' },
      { name: 'jail', desc: 'Jail a member, stripping all roles', category: 'Moderation' },
      { name: 'unjail', desc: 'Release a jailed member', category: 'Moderation' },
      { name: 'warn', desc: 'Warn a member', category: 'Moderation' },
      { name: 'purge', desc: 'Bulk delete messages', category: 'Moderation' },
      { name: 'lock', desc: 'Lock a channel', category: 'Moderation' },
      { name: 'unlock', desc: 'Unlock a channel', category: 'Moderation' },
      { name: 'nuke', desc: 'Nuke and recreate a channel', category: 'Moderation' },
      { name: 'softban', desc: 'Ban and immediately unban', category: 'Moderation' },
      { name: 'massban', desc: 'Ban multiple users at once', category: 'Moderation' },
      { name: 'antinuke', desc: 'Toggle anti-nuke protection', category: 'Anti-Nuke' },
      { name: 'whitelist add', desc: 'Add user to whitelist', category: 'Anti-Nuke' },
      { name: 'whitelist remove', desc: 'Remove user from whitelist', category: 'Anti-Nuke' },
      { name: 'antibot', desc: 'Prevent unauthorized bots', category: 'Anti-Nuke' },
      { name: 'antispam', desc: 'Toggle anti-spam', category: 'Anti-Nuke' },
      { name: 'antiraid', desc: 'Toggle anti-raid', category: 'Anti-Nuke' },
      { name: 'rank', desc: 'View your level and XP', category: 'Leveling' },
      { name: 'leaderboard', desc: 'View XP leaderboard', category: 'Leveling' },
      { name: 'setlevel', desc: "Set a member's level", category: 'Leveling' },
      { name: 'levelrole add', desc: 'Set a role reward for a level', category: 'Leveling' },
      { name: 'welcome channel', desc: 'Set welcome channel', category: 'Welcome' },
      { name: 'welcome message', desc: 'Set welcome message', category: 'Welcome' },
      { name: 'goodbye channel', desc: 'Set goodbye channel', category: 'Welcome' },
      { name: 'gstart', desc: 'Start a giveaway', category: 'Giveaway' },
      { name: 'gend', desc: 'End a giveaway', category: 'Giveaway' },
      { name: 'greroll', desc: 'Reroll giveaway winner', category: 'Giveaway' },
      { name: 'ticket setup', desc: 'Setup ticket system', category: 'Tickets' },
      { name: 'ticket close', desc: 'Close a ticket', category: 'Tickets' },
      { name: 'userinfo', desc: 'View user info', category: 'Utility' },
      { name: 'serverinfo', desc: 'View server info', category: 'Utility' },
      { name: 'avatar', desc: "View a user's avatar", category: 'Utility' },
      { name: 'ping', desc: 'Check bot latency', category: 'Utility' },
      { name: 'help', desc: 'View all commands', category: 'Utility' },
    ]
  },
  {
    id: 'h-music',
    name: 'H Music™',
    icon: 'fas fa-headphones',
    desc: 'Secondary music bot for simultaneous playback across multiple channels.',
    fullDesc: 'H Music™ is the secondary music bot that allows multiple voice channels to have music playing simultaneously. Supports all major platforms with high quality audio.',
    inviteUrl: '#',
    tags: ['Music', 'Multi-Channel', 'HQ Audio', 'Playlists'],
    commands: [
      { name: 'play', desc: 'Play a song by name or URL', category: 'Music' },
      { name: 'stop', desc: 'Stop the music', category: 'Music' },
      { name: 'skip', desc: 'Skip the current track', category: 'Music' },
      { name: 'pause', desc: 'Pause playback', category: 'Music' },
      { name: 'resume', desc: 'Resume playback', category: 'Music' },
      { name: 'queue', desc: 'View the queue', category: 'Music' },
      { name: 'volume', desc: 'Adjust volume', category: 'Music' },
      { name: 'nowplaying', desc: 'Show current track', category: 'Music' },
      { name: 'loop', desc: 'Toggle loop mode', category: 'Music' },
      { name: 'shuffle', desc: 'Shuffle the queue', category: 'Music' },
      { name: 'support', desc: 'Get support info', category: 'Utility' },
    ]
  },
  {
    id: 'helixx',
    name: 'HeliXx',
    icon: 'fas fa-star',
    desc: 'The Best All in One Bot! 600+ commands and 100+ Games.',
    fullDesc: 'HeliXx is the ultimate all-in-one Discord bot with 600+ commands and 100+ games. It covers moderation, music, fun, games, economy, leveling, giveaways, and much more. The best bot you can ever find!',
    inviteUrl: '#',
    tags: ['All-in-One', 'Moderation', 'Music', 'Games', 'Economy', 'Fun', 'Leveling', 'Giveaways'],
    totalCommands: 600,
    commands: [
      { name: 'ban', desc: 'Ban a member from the server', category: 'Moderation' },
      { name: 'kick', desc: 'Kick a member', category: 'Moderation' },
      { name: 'mute', desc: 'Mute a member', category: 'Moderation' },
      { name: 'warn', desc: 'Warn a member', category: 'Moderation' },
      { name: 'purge', desc: 'Bulk delete messages', category: 'Moderation' },
      { name: 'lock', desc: 'Lock a channel', category: 'Moderation' },
      { name: 'antinuke', desc: 'Toggle anti-nuke protection', category: 'Moderation' },
      { name: 'play', desc: 'Play a song', category: 'Music' },
      { name: 'skip', desc: 'Skip current track', category: 'Music' },
      { name: 'queue', desc: 'View the queue', category: 'Music' },
      { name: 'volume', desc: 'Adjust volume', category: 'Music' },
      { name: 'nowplaying', desc: 'Show current track', category: 'Music' },
      { name: 'tictactoe', desc: 'Play Tic Tac Toe', category: 'Games' },
      { name: 'connect4', desc: 'Play Connect 4', category: 'Games' },
      { name: 'hangman', desc: 'Play Hangman', category: 'Games' },
      { name: 'trivia', desc: 'Play Trivia quiz', category: 'Games' },
      { name: 'rps', desc: 'Rock Paper Scissors', category: 'Games' },
      { name: 'snake', desc: 'Play Snake game', category: 'Games' },
      { name: 'balance', desc: 'Check your balance', category: 'Economy' },
      { name: 'daily', desc: 'Claim daily reward', category: 'Economy' },
      { name: 'work', desc: 'Work to earn coins', category: 'Economy' },
      { name: 'shop', desc: 'View the shop', category: 'Economy' },
      { name: 'rank', desc: 'View your level and XP', category: 'Leveling' },
      { name: 'leaderboard', desc: 'View XP leaderboard', category: 'Leveling' },
      { name: 'gstart', desc: 'Start a giveaway', category: 'Giveaway' },
      { name: 'meme', desc: 'Get a random meme', category: 'Fun' },
      { name: 'joke', desc: 'Get a random joke', category: 'Fun' },
      { name: '8ball', desc: 'Ask the magic 8ball', category: 'Fun' },
    ]
  },
  {
    id: 'h-activity',
    name: 'H Activity',
    icon: 'fas fa-chart-line',
    desc: 'Tracks member activity, voice time, and engagement metrics in real-time.',
    fullDesc: 'H Activity monitors and tracks all member engagement metrics including message activity, voice channel time, and overall participation. Perfect for identifying your most active community members.',
    inviteUrl: '#',
    tags: ['Tracking', 'Analytics', 'Voice Time', 'Activity', 'Leaderboard'],
    commands: [
      { name: 'activity', desc: "View a member's activity stats", category: 'Tracking' },
      { name: 'voicetime', desc: 'Check voice channel time', category: 'Tracking' },
      { name: 'top', desc: 'View most active members', category: 'Analytics' },
      { name: 'leaderboard', desc: 'Activity leaderboard', category: 'Analytics' },
      { name: 'stats', desc: 'Server activity statistics', category: 'Analytics' },
      { name: 'weekly', desc: 'View weekly activity', category: 'Analytics' },
    ]
  },

  {
    id: 'helix-auth',
    name: 'HeliX Auth',
    icon: 'fas fa-lock',
    desc: 'Verification and authentication system — 24 Guilds · 340+ Verified Members.',
    fullDesc: 'HeliX Auth provides a robust verification system to prevent raids, bot accounts, and unwanted users. Features captcha verification, alt detection, and currently serves 24 guilds with 340+ verified members.',
    inviteUrl: '#',
    tags: ['Verification', 'Security', 'Anti-Raid', 'Captcha', 'Alt Detection'],
    commands: [
      { name: 'verify', desc: 'Verify yourself in the server', category: 'Auth' },
      { name: 'setup-verify', desc: 'Setup verification system', category: 'Admin' },
      { name: 'verifyrole', desc: 'Set the verified role', category: 'Admin' },
      { name: 'verifychannel', desc: 'Set verification channel', category: 'Admin' },
      { name: 'verifylog', desc: 'Set verification log channel', category: 'Admin' },
      { name: 'altdetect', desc: 'Toggle alt account detection', category: 'Security' },
      { name: 'captcha', desc: 'Toggle captcha verification', category: 'Security' },
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

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/members`);
        const data = await res.json();
        const bots = data.filter(m => m.bot === true);
        const statusMap = {};
        const nameToId = {
          'h music': 'h-music',
          'h activity': 'h-activity',
          'h acivity': 'h-activity',
          'helix auth': 'helix-auth',
          'helixx': 'helixx',
        };
        bots.forEach(bot => {
          const name = (bot.displayName || bot.username || '').toLowerCase();
          // Special: match "helix" exactly (not helixx) for main bot
          if (name === 'helix' || name.includes("s p a c e")) {
            statusMap['helix-main'] = {
              status: bot.status || 'online',
              avatar: bot.avatar,
              activity: bot.activities?.[0] || null,
            };
            return;
          }
          for (const [search, id] of Object.entries(nameToId)) {
            if (name.includes(search)) {
              statusMap[id] = {
                status: bot.status || 'online',
                avatar: bot.avatar,
                activity: bot.activities?.[0] || null,
              };
              break;
            }
          }
        });
        setLiveStatuses(statusMap);
      } catch (e) { /* API offline */ }
    };
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedBot) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedBot]);

  const getStatus = (botId) => liveStatuses[botId]?.status || 'offline';
  const getAvatar = (botId) => liveStatuses[botId]?.avatar || null;
  const getActivity = (botId) => liveStatuses[botId]?.activity || null;

  const statusColor = (s) => {
    if (s === 'online') return '#22c55e';
    if (s === 'idle') return '#f59e0b';
    if (s === 'dnd') return '#ef4444';
    return '#71717a';
  };

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
          <span className="gradient-text">Helix</span> Bots
        </h1>
        <p className="hero-subtitle">Our complete suite of Discord bots. Click any card to see full details.</p>
      </div>
      
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
                <span className="bot-cmd-count"><i className="fas fa-terminal"></i> {bot.totalCommands || bot.commands.length}+ Commands</span>
                <span className="bot-click-hint"><i className="fas fa-expand"></i> Details</span>
              </div>
            </div>
          );
        })}
      </div>

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
                <div className="bot-modal-tabs">
                  <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                    <i className="fas fa-info-circle"></i> Overview
                  </button>
                  <button className={`tab-btn ${activeTab === 'commands' ? 'active' : ''}`} onClick={() => setActiveTab('commands')}>
                    <i className="fas fa-terminal"></i> Commands ({selectedBot.totalCommands || selectedBot.commands.length}+)
                  </button>
                </div>
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
                            <span className="status-block-val">{selectedBot.totalCommands || selectedBot.commands.length}+</span>
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
