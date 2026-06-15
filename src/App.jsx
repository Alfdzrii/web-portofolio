import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Activities from './components/Activities'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import ProjectsPage from './pages/ProjectsPage'
import './index.css'

/* ── Google Fonts ────────────────────────────────────────────── */
const fl = document.createElement('link')
fl.rel  = 'stylesheet'
fl.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@400;600;800;900&display=swap'
document.head.appendChild(fl)

/* ── Home page composite layout ──────────────────────────────── */
function HomePage({ dark, setDark }) {
  const bg = dark ? 'bg-zinc-950 text-white' : 'bg-white text-black'
  return (
    <div className={`min-h-screen font-[Inter,system-ui,sans-serif] transition-colors duration-300 ${bg}`}>
      <Navbar dark={dark} setDark={setDark} />
      <Hero  dark={dark} />
      <About dark={dark} />
      <Activities dark={dark} />
      <Projects dark={dark} />
      <Certificates dark={dark} />
      <Contact dark={dark} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage dark={dark} setDark={setDark} />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
