import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Bots from './pages/Bots'
import Footer from './components/Footer'
import ParticleCanvas from './components/ParticleCanvas'
import LoadingScreen from './components/LoadingScreen'
import ThemeSwitcher from './components/ThemeSwitcher'
import MusicPlayer from './components/MusicPlayer'
import CookieConsent from './components/CookieConsent'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
    document.body.style.overflow = 'auto'
  }, [])

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    }
  }, [loading])

  return (
    <Router>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={`main-content ${loading ? 'hidden' : 'visible'}`}>
        <ParticleCanvas />
        <Navbar scrolled={scrolled} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bots" element={<Bots />} />
        </Routes>

        <Footer />
        <MusicPlayer ready={!loading} />
        <ThemeSwitcher />
        <CookieConsent />
      </div>
    </Router>
  )
}

export default App
