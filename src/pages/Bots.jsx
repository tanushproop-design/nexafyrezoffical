import { useState, useEffect } from 'react';
import './Bots.css';
import TicketWidget from '../components/TicketWidget';

const botsData = [
  {
    id: 'Helix',
    name: 'Helix',
    icon: 'fas fa-shield-alt',
    desc: 'The ultimate multi-purpose bot with 200+ commands. Moderation, leveling, anti-nuke & more.',
    fullDesc: 'Helix is the powerhouse behind the community with over 200 commands. It handles auto-moderation, anti-nuke protection, role management, leveling, welcome/goodbye, giveaways, tickets, logging, fun commands, and much more. Built to keep your server safe 24/7.',
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1130456108137357413&permissions=8&scope=bot%20applications.commands',
    tags: ['Moderation', 'Leveling', 'Anti-Nuke', 'Utility', 'Fun', 'Logging', 'Welcome', 'Giveaway', 'Tickets', 'Automod'],
    totalCommands: 200,
    commands: [
      // Moderation (40+)
      { name: 'ban', desc: 'Ban a member from the server', category: 'Moderation' },
      { name: 'unban', desc: 'Unban a member by ID', category: 'Moderation' },
      { name: 'kick', desc: 'Kick a member from the server', category: 'Moderation' },
      { name: 'mute', desc: 'Mute a member in the server', category: 'Moderation' },
      { name: 'unmute', desc: 'Unmute a muted member', category: 'Moderation' },
      { name: 'timeout', desc: 'Timeout a member (30s, 5m, 2h, 1d)', category: 'Moderation' },
      { name: 'untimeout', desc: 'Remove timeout from a member', category: 'Moderation' },
      { name: 'jail', desc: 'Jail a member, stripping all roles', category: 'Moderation' },
      { name: 'unjail', desc: 'Release a jailed member', category: 'Moderation' },
      { name: 'jailsetup', desc: 'Setup the jail role and channel', category: 'Moderation' },
      { name: 'jailunsetup', desc: 'Remove the jail system', category: 'Moderation' },
      { name: 'warn', desc: 'Warn a member', category: 'Moderation' },
      { name: 'warnings', desc: 'View all warnings for a member', category: 'Moderation' },
      { name: 'clearwarnings', desc: 'Clear all warnings for a member', category: 'Moderation' },
      { name: 'purge', desc: 'Bulk delete messages', category: 'Moderation' },
      { name: 'purge user', desc: 'Delete messages from a specific user', category: 'Moderation' },
      { name: 'purge bots', desc: 'Delete messages from bots only', category: 'Moderation' },
      { name: 'purge embeds', desc: 'Delete messages with embeds', category: 'Moderation' },
      { name: 'purge images', desc: 'Delete messages with images', category: 'Moderation' },
      { name: 'purge links', desc: 'Delete messages with links', category: 'Moderation' },
      { name: 'slowmode', desc: 'Set channel slowmode', category: 'Moderation' },
      { name: 'lock', desc: 'Lock a channel', category: 'Moderation' },
      { name: 'unlock', desc: 'Unlock a channel', category: 'Moderation' },
      { name: 'lockdown', desc: 'Lock all channels in server', category: 'Moderation' },
      { name: 'unlockdown', desc: 'Unlock all channels', category: 'Moderation' },
      { name: 'nuke', desc: 'Nuke and recreate a channel', category: 'Moderation' },
      { name: 'vcmuteall', desc: 'Server mute everyone in a VC', category: 'Moderation' },
      { name: 'vcunmuteall', desc: 'Unmute everyone in a VC', category: 'Moderation' },
      { name: 'vcdeafenall', desc: 'Deafen everyone in a VC', category: 'Moderation' },
      { name: 'vcundeafenall', desc: 'Undeafen everyone in a VC', category: 'Moderation' },
      { name: 'vckick', desc: 'Kick a member from voice', category: 'Moderation' },
      { name: 'vcmove', desc: 'Move a member to another VC', category: 'Moderation' },
      { name: 'softban', desc: 'Ban and immediately unban (clear msgs)', category: 'Moderation' },
      { name: 'massban', desc: 'Ban multiple users at once', category: 'Moderation' },
      { name: 'masskick', desc: 'Kick multiple users at once', category: 'Moderation' },
      { name: 'nickname', desc: 'Change a member\'s nickname', category: 'Moderation' },
      { name: 'resetnick', desc: 'Reset a member\'s nickname', category: 'Moderation' },
      { name: 'hide', desc: 'Hide a channel from everyone', category: 'Moderation' },
      { name: 'unhide', desc: 'Unhide a channel', category: 'Moderation' },
      // Anti-Nuke (15+)
      { name: 'antinuke', desc: 'Toggle anti-nuke protection', category: 'Anti-Nuke' },
      { name: 'antinukesetup', desc: 'Setup anti-nuke system with logging', category: 'Anti-Nuke' },
      { name: 'whitelist add', desc: 'Add a user to the anti-nuke whitelist', category: 'Anti-Nuke' },
      { name: 'whitelist remove', desc: 'Remove a user from the whitelist', category: 'Anti-Nuke' },
      { name: 'whitelist list', desc: 'View all whitelisted users', category: 'Anti-Nuke' },
      { name: 'antibot', desc: 'Prevent unauthorized bot additions', category: 'Anti-Nuke' },
      { name: 'antispam', desc: 'Toggle anti-spam protection', category: 'Anti-Nuke' },
      { name: 'antilink', desc: 'Toggle anti-link protection', category: 'Anti-Nuke' },
      { name: 'antiraid', desc: 'Toggle anti-raid protection', category: 'Anti-Nuke' },
      { name: 'antimassban', desc: 'Prevent mass ban attempts', category: 'Anti-Nuke' },
      { name: 'antimasskick', desc: 'Prevent mass kick attempts', category: 'Anti-Nuke' },
      { name: 'antichanneldelete', desc: 'Prevent mass channel deletion', category: 'Anti-Nuke' },
      { name: 'antiroledelete', desc: 'Prevent mass role deletion', category: 'Anti-Nuke' },
      { name: 'antiwebhook', desc: 'Prevent webhook spam', category: 'Anti-Nuke' },
      { name: 'securitylog', desc: 'View recent security actions', category: 'Anti-Nuke' },
      // Leveling (15+)
      { name: 'rank', desc: 'View your current level and XP', category: 'Leveling' },
      { name: 'leaderboard', desc: 'View the server XP leaderboard', category: 'Leveling' },
      { name: 'setlevel', desc: 'Set a member\'s level', category: 'Leveling' },
      { name: 'setxp', desc: 'Set a member\'s XP', category: 'Leveling' },
      { name: 'addxp', desc: 'Add XP to a member', category: 'Leveling' },
      { name: 'removexp', desc: 'Remove XP from a member', category: 'Leveling' },
      { name: 'resetxp', desc: 'Reset a member\'s XP', category: 'Leveling' },
      { name: 'xprate', desc: 'Set XP earn rate', category: 'Leveling' },
      { name: 'levelrole add', desc: 'Set a role reward for a level', category: 'Leveling' },
      { name: 'levelrole remove', desc: 'Remove a level role reward', category: 'Leveling' },
      { name: 'levelrole list', desc: 'List all level role rewards', category: 'Leveling' },
      { name: 'levelchannel', desc: 'Set level-up announcement channel', category: 'Leveling' },
      { name: 'levelmessage', desc: 'Customize level-up message', category: 'Leveling' },
      { name: 'noxp', desc: 'Disable XP in a channel/role', category: 'Leveling' },
      { name: 'xpreset all', desc: 'Reset all server XP data', category: 'Leveling' },
      // Role Management (15+)
      { name: 'role add', desc: 'Add a role to a member', category: 'Roles' },
      { name: 'role remove', desc: 'Remove a role from a member', category: 'Roles' },
      { name: 'role create', desc: 'Create a new role', category: 'Roles' },
      { name: 'role delete', desc: 'Delete a role', category: 'Roles' },
      { name: 'role color', desc: 'Change a role\'s color', category: 'Roles' },
      { name: 'role rename', desc: 'Rename a role', category: 'Roles' },
      { name: 'role info', desc: 'View role information', category: 'Roles' },
      { name: 'role all', desc: 'Give a role to all members', category: 'Roles' },
      { name: 'role removeall', desc: 'Remove a role from all members', category: 'Roles' },
      { name: 'role humans', desc: 'Give a role to all humans', category: 'Roles' },
      { name: 'role bots', desc: 'Give a role to all bots', category: 'Roles' },
      { name: 'autorole set', desc: 'Set auto-role for new members', category: 'Roles' },
      { name: 'autorole remove', desc: 'Remove the auto-role', category: 'Roles' },
      { name: 'selfrole add', desc: 'Create a self-assignable role', category: 'Roles' },
      { name: 'selfrole remove', desc: 'Remove a self-assignable role', category: 'Roles' },
      // Welcome & Goodbye (10+)
      { name: 'welcome channel', desc: 'Set welcome message channel', category: 'Welcome' },
      { name: 'welcome message', desc: 'Set custom welcome message', category: 'Welcome' },
      { name: 'welcome test', desc: 'Test the welcome message', category: 'Welcome' },
      { name: 'welcome toggle', desc: 'Toggle welcome messages', category: 'Welcome' },
      { name: 'welcome image', desc: 'Toggle welcome image cards', category: 'Welcome' },
      { name: 'goodbye channel', desc: 'Set goodbye message channel', category: 'Welcome' },
      { name: 'goodbye message', desc: 'Set custom goodbye message', category: 'Welcome' },
      { name: 'goodbye test', desc: 'Test the goodbye message', category: 'Welcome' },
      { name: 'goodbye toggle', desc: 'Toggle goodbye messages', category: 'Welcome' },
      { name: 'greet', desc: 'Send a DM greeting to a member', category: 'Welcome' },
      // Logging (10+)
      { name: 'setlog', desc: 'Set the logging channel', category: 'Logging' },
      { name: 'removelog', desc: 'Remove the logging channel', category: 'Logging' },
      { name: 'modlog', desc: 'Set the moderation log channel', category: 'Logging' },
      { name: 'messagelog', desc: 'Set message edit/delete log', category: 'Logging' },
      { name: 'joinlog', desc: 'Set join/leave log channel', category: 'Logging' },
      { name: 'voicelog', desc: 'Set voice activity log channel', category: 'Logging' },
      { name: 'rolelog', desc: 'Set role changes log channel', category: 'Logging' },
      { name: 'channellog', desc: 'Set channel changes log', category: 'Logging' },
      { name: 'auditlog', desc: 'View the server audit log', category: 'Logging' },
      { name: 'snipe', desc: 'Snipe the last deleted message', category: 'Logging' },
      { name: 'editsnipe', desc: 'Snipe the last edited message', category: 'Logging' },
      // Giveaway (8+)
      { name: 'gstart', desc: 'Start a giveaway', category: 'Giveaway' },
      { name: 'gend', desc: 'End a giveaway early', category: 'Giveaway' },
      { name: 'greroll', desc: 'Reroll a giveaway winner', category: 'Giveaway' },
      { name: 'gpause', desc: 'Pause a giveaway', category: 'Giveaway' },
      { name: 'gresume', desc: 'Resume a paused giveaway', category: 'Giveaway' },
      { name: 'gdelete', desc: 'Delete a giveaway', category: 'Giveaway' },
      { name: 'glist', desc: 'List all active giveaways', category: 'Giveaway' },
      { name: 'gcreate', desc: 'Interactive giveaway creator', category: 'Giveaway' },
      // Ticket System (8+)
      { name: 'ticket setup', desc: 'Setup the ticket system', category: 'Tickets' },
      { name: 'ticket close', desc: 'Close a ticket', category: 'Tickets' },
      { name: 'ticket add', desc: 'Add a user to a ticket', category: 'Tickets' },
      { name: 'ticket remove', desc: 'Remove a user from a ticket', category: 'Tickets' },
      { name: 'ticket rename', desc: 'Rename a ticket channel', category: 'Tickets' },
      { name: 'ticket transcript', desc: 'Save a ticket transcript', category: 'Tickets' },
      { name: 'ticket claim', desc: 'Claim a ticket as staff', category: 'Tickets' },
      { name: 'ticket panel', desc: 'Create a ticket panel embed', category: 'Tickets' },
      // Utility (25+)
      { name: 'userinfo', desc: 'View information about a user', category: 'Utility' },
      { name: 'serverinfo', desc: 'View server information', category: 'Utility' },
      { name: 'avatar', desc: 'View a user\'s avatar', category: 'Utility' },
      { name: 'banner', desc: 'View a user\'s banner', category: 'Utility' },
      { name: 'ping', desc: 'Check bot latency', category: 'Utility' },
      { name: 'uptime', desc: 'Check bot uptime', category: 'Utility' },
      { name: 'botinfo', desc: 'View bot information & stats', category: 'Utility' },
      { name: 'invite', desc: 'Get the bot invite link', category: 'Utility' },
      { name: 'help', desc: 'View all commands', category: 'Utility' },
      { name: 'say', desc: 'Make the bot say something', category: 'Utility' },
      { name: 'embed', desc: 'Create a custom embed message', category: 'Utility' },
      { name: 'poll', desc: 'Create a poll', category: 'Utility' },
      { name: 'remind', desc: 'Set a reminder', category: 'Utility' },
      { name: 'timer', desc: 'Set a countdown timer', category: 'Utility' },
      { name: 'afk', desc: 'Set your AFK status', category: 'Utility' },
      { name: 'membercount', desc: 'View server member count', category: 'Utility' },
      { name: 'roleinfo', desc: 'View role information', category: 'Utility' },
      { name: 'channelinfo', desc: 'View channel information', category: 'Utility' },
      { name: 'emojiinfo', desc: 'View emoji information', category: 'Utility' },
      { name: 'emojilist', desc: 'List all server emojis', category: 'Utility' },
      { name: 'stickerinfo', desc: 'View sticker information', category: 'Utility' },
      { name: 'steal', desc: 'Steal an emoji from another server', category: 'Utility' },
      { name: 'enlarge', desc: 'Enlarge an emoji', category: 'Utility' },
      { name: 'translate', desc: 'Translate text to another language', category: 'Utility' },
      { name: 'weather', desc: 'Check the weather', category: 'Utility' },
      // Fun (25+)
      { name: '8ball', desc: 'Ask the magic 8ball', category: 'Fun' },
      { name: 'coinflip', desc: 'Flip a coin', category: 'Fun' },
      { name: 'dice', desc: 'Roll a dice', category: 'Fun' },
      { name: 'rps', desc: 'Rock Paper Scissors', category: 'Fun' },
      { name: 'meme', desc: 'Get a random meme', category: 'Fun' },
      { name: 'joke', desc: 'Get a random joke', category: 'Fun' },
      { name: 'fact', desc: 'Get a random fact', category: 'Fun' },
      { name: 'quote', desc: 'Get an inspirational quote', category: 'Fun' },
      { name: 'ship', desc: 'Ship two users together', category: 'Fun' },
      { name: 'roast', desc: 'Roast a member', category: 'Fun' },
      { name: 'compliment', desc: 'Compliment a member', category: 'Fun' },
      { name: 'hug', desc: 'Hug a member', category: 'Fun' },
      { name: 'slap', desc: 'Slap a member', category: 'Fun' },
      { name: 'pat', desc: 'Pat a member', category: 'Fun' },
      { name: 'kiss', desc: 'Kiss a member', category: 'Fun' },
      { name: 'wink', desc: 'Wink at a member', category: 'Fun' },
      { name: 'bite', desc: 'Bite a member', category: 'Fun' },
      { name: 'cuddle', desc: 'Cuddle a member', category: 'Fun' },
      { name: 'poke', desc: 'Poke a member', category: 'Fun' },
      { name: 'gayrate', desc: 'Rate how gay someone is (joke)', category: 'Fun' },
      { name: 'simprate', desc: 'Rate how simp someone is', category: 'Fun' },
      { name: 'iq', desc: 'Check someone\'s IQ (joke)', category: 'Fun' },
      { name: 'howcute', desc: 'Rate cuteness level', category: 'Fun' },
      { name: 'rate', desc: 'Rate anything 1-10', category: 'Fun' },
      { name: 'reverse', desc: 'Reverse a text', category: 'Fun' },
      // Config (15+)
      { name: 'prefix', desc: 'Change the bot prefix', category: 'Config' },
      { name: 'setprefix', desc: 'Set a custom prefix', category: 'Config' },
      { name: 'language', desc: 'Change bot language', category: 'Config' },
      { name: 'automod', desc: 'Configure auto-moderation', category: 'Config' },
      { name: 'automod badwords', desc: 'Set banned words list', category: 'Config' },
      { name: 'automod caps', desc: 'Toggle caps detection', category: 'Config' },
      { name: 'automod invites', desc: 'Toggle invite link detection', category: 'Config' },
      { name: 'automod mentions', desc: 'Toggle mass mention detection', category: 'Config' },
      { name: 'ignorechannel', desc: 'Ignore a channel from logging', category: 'Config' },
      { name: 'ignorerole', desc: 'Ignore a role from moderation', category: 'Config' },
      { name: 'setup', desc: 'Interactive server setup wizard', category: 'Config' },
      { name: 'resetconfig', desc: 'Reset all bot settings', category: 'Config' },
      { name: 'backup create', desc: 'Create a server backup', category: 'Config' },
      { name: 'backup load', desc: 'Load a server backup', category: 'Config' },
      { name: 'backup list', desc: 'List all backups', category: 'Config' },
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
        const bots = data.filter(m => m.bot === true);
        const statusMap = {};
        
        // Map API bot names to our bot IDs
        const nameToId = {
          'Helix': 'Helix',
          'nexafyre': 'Helix',
          'nf music': 'nf-music',
          'nf activity': 'nf-activity',
          'nf acivity': 'nf-activity',
          'nf birthday': 'nf-birthday',
          'birthday bot': 'nf-birthday',
          'nexus ai': 'nexus-ai',
          'nexa auth': 'nexa-auth',
        };
        
        bots.forEach(bot => {
          const name = (bot.displayName || bot.username || '').toLowerCase();
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
          <span className="gradient-text">Helix</span> Bots
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
                <span className="bot-cmd-count"><i className="fas fa-terminal"></i> {bot.totalCommands || bot.commands.length}+ Commands</span>
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
                    <i className="fas fa-terminal"></i> Commands ({selectedBot.totalCommands || selectedBot.commands.length}+)
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
