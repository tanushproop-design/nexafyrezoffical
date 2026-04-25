import { useState, useRef, useEffect } from 'react';
import './TicketWidget.css';

export default function TicketWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [username, setUsername] = useState('');
  const [issue, setIssue] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const WEBHOOK_URL = "https://discord.com/api/webhooks/1497607821188141188/rmhMdQJ31rgXoW9u-_Y6EBZyq70PmvtNg1bWcuOsuwFoOY8BQFoaRtfikdtVCLoiGnjr";

  const handlers = ['superior.asm_', 'tanush_44', 'saku.exe_', 'o_.9011', '4zy0', '1._o.'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = async (e) => {
    e.preventDefault();
    if (!username.trim() || !issue.trim()) return;

    setChatStarted(true);
    const welcomeMsg = {
      sender: 'system',
      text: `Welcome ${username}! A ticket has been created for: "${issue}". Our handlers will assist you shortly.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMsg]);

    // Send initial webhook
    await sendToDiscord(`**New Ticket Created**\n**User:** ${username}\n**Issue:** ${issue}`);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    const newMsg = {
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsSending(true);

    const success = await sendToDiscord(`**${username}:** ${newMsg.text}`);
    
    if (!success) {
      setMessages(prev => [...prev, {
        sender: 'system',
        text: "Failed to send message to server. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
    
    setIsSending(false);
  };

  const sendToDiscord = async (content) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: "NexafyreZ Website Tickets",
          avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
          content: content
        })
      });
      return response.ok;
    } catch (error) {
      console.error("Webhook error:", error);
      return false;
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button className="ticket-float-btn pulse-btn-red" onClick={() => setIsOpen(true)}>
          <i className="fas fa-ticket-alt"></i>
          <span>Create Ticket</span>
        </button>
      )}

      {/* Chat Widget */}
      <div className={`ticket-widget-container ${isOpen ? 'open' : ''}`}>
        <div className="ticket-header">
          <div className="ticket-header-info">
            <h3><i className="fas fa-headset"></i> NexafyreZ Support</h3>
            <span className="status-dot"></span>
          </div>
          <button className="close-ticket-btn" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {!chatStarted ? (
          <div className="ticket-body setup-mode">
            <div className="handlers-info">
              <p><strong><i className="fas fa-shield-alt"></i> Handlers:</strong></p>
              <div className="handlers-list">
                {handlers.map(h => (
                  <span key={h} className="handler-badge">@{h}</span>
                ))}
              </div>
              <p className="admin-note"><i className="fas fa-key"></i> Only <strong>tanush_44</strong> can grant ticket access.</p>
            </div>
            
            <form onSubmit={startChat} className="ticket-setup-form">
              <div className="form-group">
                <label>Discord Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="e.g. tanush_44"
                  required
                />
              </div>
              <div className="form-group">
                <label>Describe your issue</label>
                <textarea 
                  value={issue} 
                  onChange={(e) => setIssue(e.target.value)} 
                  placeholder="How can we help you today?"
                  required
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary start-chat-btn">
                Start Chat <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="ticket-body chat-mode">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.sender}`}>
                  <div className="msg-bubble">
                    {msg.text}
                  </div>
                  <div className="msg-time">{msg.time}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={sendMessage} className="ticket-input-area">
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Type a message..."
                disabled={isSending}
              />
              <button type="submit" disabled={isSending || !inputValue.trim()} className="send-msg-btn">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
