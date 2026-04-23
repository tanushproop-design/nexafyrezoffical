import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Team from './components/Team'
import TopMembers from './components/TopMembers'
import Developers from './components/Developers'
import Stats from './components/Stats'
import CTA from './components/CTA'
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
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={`main-content ${loading ? 'hidden' : 'visible'}`}>
        <ParticleCanvas />
        <Navbar scrolled={scrolled} />
        <Hero />
        <About />
        <Features />
        <Team />
        <TopMembers />
        <Developers />
        <Stats />
        <CTA />
        <Footer />
        <MusicPlayer ready={!loading} />
        <ThemeSwitcher />
        <CookieConsent />
      </div>
    </>
  )
}

export default App
