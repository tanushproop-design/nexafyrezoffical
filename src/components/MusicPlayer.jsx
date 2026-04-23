import { useState, useRef } from 'react'
import ReactPlayer from 'react-player'

const localTracks = import.meta.glob('../assets/music/*.{mp3,wav,ogg,m4a}', { eager: true })
const trackUrls = Object.values(localTracks).map(module => module.default || module)

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isHovered, setIsHovered] = useState(false)
  const playerRef = useRef(null)

  // Use the first local track if present, else fallback to YouTube default
  const url = trackUrls.length > 0 ? trackUrls[0] : 'https://youtu.be/HyHNuVaZJ-k'

  return (
    <div 
      className={`music-player-widget ${isHovered || isPlaying ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        loop={true}
        volume={volume}
        width="0"
        height="0"
        config={{ youtube: { playerVars: { showinfo: 0, autoplay: 1 } } }}
        style={{ display: 'none' }}
      />
      
      <div className="music-player-inner">
        <button 
          className="music-play-btn" 
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        
        <div className="music-player-controls">
          <div className="music-player-info">
            <span className="music-title">
              <i className="fas fa-music"></i> {trackUrls.length > 0 ? 'Lofi Study (Chill Hop)' : 'Let Me Down Slowly'}
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
  )
}
