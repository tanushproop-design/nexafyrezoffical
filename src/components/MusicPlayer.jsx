import { useState, useRef, useEffect } from 'react'

import bgmUrl from '../assets/music/bgm.mp3'

export default function MusicPlayer({ ready }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isHovered, setIsHovered] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (ready) {
      const hasChosen = sessionStorage.getItem('musicPromptResolved');
      if (!hasChosen) {
        setTimeout(() => setShowPrompt(true), 800);
      }
    }
  }, [ready]);

  const handleStartMusic = () => {
    sessionStorage.setItem('musicPromptResolved', 'true');
    setShowPrompt(false);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error(e));
    }
  };

  const handleKeepPaused = () => {
    sessionStorage.setItem('musicPromptResolved', 'true');
    setShowPrompt(false);
    setIsPlaying(false);
  };

  // Update native audio volume whenever the state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error("Autoplay/Playback prevented:", error);
            setIsPlaying(false);
          });
        }
      }
    }
  }

  return (
    <>
    {showPrompt && (
      <div className="music-prompt-overlay">
        <div className="music-prompt-box">
          <div className="music-prompt-icon">
            <i className="fas fa-play"></i>
          </div>
          <h3>Play Auto-Music?</h3>
          <p>This website features lo-fi background vibes.</p>
          <div className="music-prompt-actions">
            <button className="prompt-btn decline" onClick={handleKeepPaused}>Keep Paused</button>
            <button className="prompt-btn accept" onClick={handleStartMusic}>Play Music</button>
          </div>
        </div>
      </div>
    )}
    <div 
      className={`music-player-widget ${isHovered || isPlaying ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef} 
        src={bgmUrl} 
        loop 
        style={{ display: 'none' }} 
      />
      
      <div className="music-player-inner">
        <button 
          className="music-play-btn" 
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        
        <div className="music-player-controls">
          <div className="music-player-info">
            <span className="music-title">
              <i className="fas fa-music"></i> Lofi Study (Chill Hop)
            </span>
            {isPlaying && <span className="music-equalizer">
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
            </span>}
          </div>
          
          <div className="music-volume-container">
            <button className="vol-btn" onClick={() => setVolume(Math.max(0, volume - 0.1))}><i className="fas fa-volume-down"></i></button>
            <input 
              type="range"
              className="music-vol-bar"
              min={0} max={1} step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ '--volume': `${volume * 100}%` }}
            />
            <button className="vol-btn" onClick={() => setVolume(Math.min(1, volume + 0.1))}><i className="fas fa-volume-up"></i></button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
