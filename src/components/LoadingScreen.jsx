import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0) // 0=loading, 1=logo reveal, 2=exit

  const [hexDots] = useState(() => {
    return Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }))
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setPhase(1)
          setTimeout(() => {
            setPhase(2)
            setTimeout(() => onComplete(), 600)
          }, 1200)
          return 100
        }
        return prev + Math.random() * 8 + 2
      })
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`loading-screen ${phase === 2 ? 'exit' : ''}`}>
      <div className="loading-inner">
        {/* Animated hex grid background */}
        <div className="loading-bg-grid">
          {hexDots.map((style, i) => (
            <div key={i} className="hex-dot" style={style} />
          ))}
        </div>

        {/* Logo */}
        <div className={`loading-logo ${phase >= 1 ? 'revealed' : ''}`}>
          <img src="/helix_logo.png" alt="Helix Logo" className="logo-svg" style={{ objectFit: 'cover', borderRadius: '50%' }} />
        </div>

        <h2 className={`loading-title ${phase >= 1 ? 'revealed' : ''}`}>
          <span className="char" style={{animationDelay: '0s'}}>H</span>
          <span className="char" style={{animationDelay: '0.05s'}}>E</span>
          <span className="char" style={{animationDelay: '0.1s'}}>L</span>
          <span className="char" style={{animationDelay: '0.15s'}}>I</span>
          <span className="char" style={{animationDelay: '0.2s'}}>X</span>
        </h2>

        {/* Progress bar */}
        <div className="loading-progress-wrap">
          <div className="loading-progress-track">
            <div className="loading-progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}>
              <div className="loading-progress-glow"></div>
            </div>
          </div>
          <span className="loading-percent">{Math.min(Math.floor(progress), 100)}%</span>
        </div>

        <p className="loading-status">
          {progress < 30 ? 'Initializing systems...' : 
           progress < 60 ? 'Loading community data...' : 
           progress < 90 ? 'Preparing the experience...' : 
           'Welcome to Helix'}
        </p>
      </div>
    </div>
  )
}
