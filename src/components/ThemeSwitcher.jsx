import { useState, useEffect, useRef } from 'react'

const themes = [
  { id: 'red', color: '#e11d48', icon: 'fas fa-fire' },
  { id: 'purple', color: '#9b51e0', icon: 'fas fa-bolt' },
  { id: 'green', color: '#10b981', icon: 'fas fa-leaf' },
  { id: 'orange', color: '#f97316', icon: 'fas fa-fire' },
  { id: 'yellow', color: '#eab308', icon: 'fas fa-sun' },
  { id: 'pink', color: '#ec4899', icon: 'fas fa-heart' },
  { id: 'lightblue', color: '#3b82f6', icon: 'fas fa-tint' }
]

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('Helix-theme') || 'red'
  })
  const menuRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme)
  }, [activeTheme])

  const applyTheme = (themeId) => {
    setActiveTheme(themeId)
    localStorage.setItem('Helix-theme', themeId)
  }

  useEffect(() => {
    // Click outside to close
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <div className="theme-switcher" ref={menuRef}>
        <button 
          className="theme-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Theme Options"
        >
          <i className="fas fa-palette"></i>
        </button>
        
        <div className={`theme-options ${isOpen ? 'open' : ''}`}>
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${activeTheme === theme.id ? 'active' : ''}`}
              style={{ backgroundColor: theme.color, color: 'white' }}
              title={`${theme.id.charAt(0).toUpperCase() + theme.id.slice(1)} Theme`}
              onClick={() => {
                applyTheme(theme.id)
                setIsOpen(false)
              }}
            >
              {activeTheme === theme.id && <i className="fas fa-check" style={{ fontSize: '0.8rem' }}></i>}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
