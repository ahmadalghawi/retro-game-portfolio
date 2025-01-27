import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import XPSystem from '../components/XPSystem'
import Footer from '../components/Footer';
import AboutMe from '../components/AboutMe';
import MiniGames from '../components/MiniGames';
import AchievementGallery from '../components/AchievementGallery';
import { XPProvider } from '../context/XPContext'

export default function Home() {
  return (
    <XPProvider>
      <main className="bg-black min-h-screen text-white">
        <XPSystem />
        <Hero />
        <AboutMe />
        <Skills />
        <Experience />
        <Projects />
        <MiniGames />
        <AchievementGallery />
        <Footer />
      </main>
    </XPProvider>
  )
}
