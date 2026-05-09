import { useState } from 'react';

export default function StaffApplyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    role: 'Staff',
    experience: '',
    reason: ''
  });
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const webhookUrl = "https://canary.discord.com/api/webhooks/1502634240913707058/X3pnr1a4bBP0fjkv6y0NBT2SUj4H_tUjRo69qJHSps9oZ3mJbS3Rl2wYNmuuLkA2Tntg";

    const payload = {
      embeds: [{
        title: "📝 New Staff Application!",
        color: 0x0066ff,
        timestamp: new Date().toISOString(),
        fields: [
          { name: "Discord Username", value: formData.username, inline: true },
          { name: "Age", value: formData.age || "Not specified", inline: true },
          { name: "Role Applied For", value: formData.role, inline: false },
          { name: "Experience", value: formData.experience || "None", inline: false },
          { name: "Why join us?", value: formData.reason || "No reason specified", inline: false }
        ],
        footer: {
          text: "Helix Automated System"
        }
      }]
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ username: '', age: '', role: 'Staff', experience: '', reason: '' });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="profile-modal-overlay active" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="apply-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="apply-header">
          <h2>Apply for <span className="gradient-text">Staff</span></h2>
          <p>Join the elite Helix moderation and support team.</p>
        </div>
        
        {status === 'success' ? (
          <div className="apply-success">
            <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: '#22c55e', marginBottom: '16px' }}></i>
            <h3>Application Sent!</h3>
            <p>We will review your application and contact you on Discord shortly.</p>
          </div>
        ) : (
          <form className="apply-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Discord Username / Tag</label>
                <input required type="text" placeholder="e.g. tanush_44" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input required type="number" min="13" max="50" placeholder="e.g. 18" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Role</label>
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="Staff">Staff</option>
                <option value="Helper">Helper</option>
              </select>
            </div>

            <div className="form-group">
              <label>Past Experience</label>
              <textarea required rows="2" placeholder="Tell us about any previous servers you've moderated..." value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}></textarea>
            </div>

            <div className="form-group">
              <label>Why do you want to join Helix?</label>
              <textarea required rows="2" placeholder="Why should we choose you?" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})}></textarea>
            </div>

            {status === 'error' && <p className="apply-error" style={{ color: '#ef4444', marginBottom: '16px' }}>Something went wrong. Please try again.</p>}
            
            <button type="submit" className="apply-submit-btn" disabled={status === 'loading'}>
              {status === 'loading' ? <i className="fas fa-spinner fa-spin"></i> : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
