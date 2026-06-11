import { useState, useEffect, useRef } from 'react'
import moonIcon from './assets/moon.svg'
import sunIcon from './assets/sun.svg'
import heroImage from './assets/Alfadzri.jpeg'
import './index.css'

/* ── Google Fonts ─────────────────────────────────────────────── */
const fl = document.createElement('link')
fl.rel = 'stylesheet'
fl.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap'
document.head.appendChild(fl)

/* ── Nav links with their target IDs ─────────────────────────── */
const NAV_LINKS = [
  { label: 'About',        id: 'about' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Activities',   id: 'activities' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact',      id: 'contact' },
]

/* ── Typewriter phrases ───────────────────────────────────────── */
const PHRASES = [
  'Cyber Security Enthusiast',
  'Web Developer',
  'Artificial Intelligence Enthusiast',
  'Frontend Developer',
]

/* ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const bg = dark
    ? 'bg-gradient-to-br from-[#060608] via-[#0d0d14] to-[#13131e] text-white'
    : 'bg-gradient-to-br from-white via-[#f9f6ff] to-[#ede8ff] text-gray-900'

  return (
    <div className={`min-h-screen font-[Inter,system-ui,sans-serif] transition-colors duration-500 ${bg}`}>
      <Navbar dark={dark} setDark={setDark} />
      <HeroSection dark={dark} />
      <AboutSection dark={dark} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const glassDark = 'bg-[#0d0d14]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
  const glassLight = 'bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-lg shadow-purple-100/40'
  const navBg = scrolled ? (dark ? glassDark : glassLight) : 'bg-transparent'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-[Plus_Jakarta_Sans,sans-serif] font-extrabold text-xl tracking-tight select-none">
            <span className="text-purple-500">&lt;</span>
            <span className={dark ? 'text-white' : 'text-gray-900'}>Alfadzri</span>
            <span className="text-purple-500">/&gt;</span>
          </button>

          {/* Centered links — desktop */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg group transition-colors duration-200
                  ${dark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-purple-500/5'}`}>
                {label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-purple-500 rounded-full transition-all duration-300 group-hover:w-4" />
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <ThemeToggle dark={dark} setDark={setDark} />
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg hover:bg-purple-500/10 transition-colors duration-200">
              {[0, 1, 2].map(i => (
                <span key={i} className={`block w-5 h-0.5 transition-all duration-300 ${dark ? 'bg-white' : 'bg-gray-800'}
                  ${i !== 2 ? 'mb-1' : ''}
                  ${open && i === 0 ? 'rotate-45 translate-y-1.5' : ''}
                  ${open && i === 1 ? 'opacity-0' : ''}
                  ${open && i === 2 ? '-rotate-45 -translate-y-1.5' : ''}`} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                  ${dark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-purple-500/5'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

function ThemeToggle({ dark, setDark }) {
  return (
    <button onClick={() => setDark(!dark)} aria-label="Toggle theme"
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group
        ${dark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-purple-50 hover:bg-purple-100 border border-purple-200/60'}`}>
      <img
        src={dark ? sunIcon : moonIcon}
        alt={dark ? 'Light mode' : 'Dark mode'}
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
        style={{ filter: dark ? 'invert(1) brightness(1.2)' : 'invert(0.35) sepia(1) saturate(3) hue-rotate(255deg)' }}
      />
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER HOOK
═══════════════════════════════════════════════════════════════ */
function useTypewriter(phrases, typeSpeed = 70, deleteSpeed = 40, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('')
  const idx = useRef(0)
  const charIdx = useRef(0)
  const deleting = useRef(false)
  const timer = useRef(null)

  useEffect(() => {
    const tick = () => {
      const phrase = phrases[idx.current]
      if (!deleting.current) {
        charIdx.current++
        setDisplayed(phrase.slice(0, charIdx.current))
        if (charIdx.current === phrase.length) {
          deleting.current = true
          timer.current = setTimeout(tick, pauseMs)
          return
        }
        timer.current = setTimeout(tick, typeSpeed)
      } else {
        charIdx.current--
        setDisplayed(phrase.slice(0, charIdx.current))
        if (charIdx.current === 0) {
          deleting.current = false
          idx.current = (idx.current + 1) % phrases.length
          timer.current = setTimeout(tick, typeSpeed)
          return
        }
        timer.current = setTimeout(tick, deleteSpeed)
      }
    }
    timer.current = setTimeout(tick, typeSpeed)
    return () => clearTimeout(timer.current)
  }, [phrases, typeSpeed, deleteSpeed, pauseMs])

  return displayed
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION  (id="home")
═══════════════════════════════════════════════════════════════ */
function HeroSection({ dark }) {
  const text = useTypewriter(PHRASES)

  const photoShadow = dark
    ? '0 0 40px rgba(155,93,229,0.15)'
    : '0 0 30px rgba(106,27,154,0.3)'

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Photo ────────────────────────────────────── */}
          <div className="flex justify-center lg:justify-start animate-fade-in-left order-1">
            <div className="relative" style={{ willChange: 'transform' }}>

              {/* Ambient blob */}
              <div className="absolute -inset-10 rounded-[40px] blur-3xl opacity-50 pointer-events-none"
                style={{
                  background: dark
                    ? 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.35) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 70%)',
                }} />

              {/* Photo */}
              <div className="relative overflow-hidden"
                style={{
                  borderRadius: '22px',
                  width: 'clamp(270px, 36vw, 420px)',
                  aspectRatio: '4/5',
                  boxShadow: photoShadow,
                  willChange: 'transform',
                }}>
                <img src={heroImage} alt="Alfadzri"
                  className="w-full h-full object-cover object-top" />

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{
                    background: dark
                      ? 'linear-gradient(to top, rgba(6,6,8,0.55), transparent)'
                      : 'linear-gradient(to top, rgba(255,255,255,0.25), transparent)',
                  }} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text ────────────────────────────────────── */}
          <div className="flex flex-col gap-6 text-left order-2 animate-fade-in-right" style={{ animationDelay: '0.12s' }}>

            {/* Heading */}
            <h1 className="font-[Plus_Jakarta_Sans,sans-serif] font-extrabold leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}>
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Alfadzri
              </span>
            </h1>

            {/* Typewriter */}
            <div className={`text-lg lg:text-xl font-semibold flex items-center gap-1 min-h-[2rem]
              ${dark ? 'text-purple-400' : 'text-purple-600'}`}>
              <span>{text}</span>
              <span className="animate-blink border-r-2 border-purple-500 h-5 inline-block" />
            </div>

            {/* Description */}
            <p className={`text-base lg:text-lg leading-relaxed max-w-lg ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              I craft{' '}
              <span className={`font-medium ${dark ? 'text-gray-100' : 'text-gray-800'}`}>elegant digital experiences</span>
              {' '}that combine minimalist aesthetics with robust engineering. Focusing on building{' '}
              <span className={`font-medium ${dark ? 'text-gray-100' : 'text-gray-800'}`}>intuitive and dynamic</span>
              {' '}web applications.
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js'].map(t => (
                <span key={t}
                  className={`px-3 py-1 text-xs font-medium rounded-full border cursor-default
                    transition-all duration-200 hover:scale-105
                    ${dark ? 'bg-purple-500/10 border-purple-500/25 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-1">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                id="cta-view-projects"
                className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden
                  bg-gradient-to-r from-purple-600 to-violet-600
                  shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105
                  transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                id="cta-lets-talk"
                className={`px-7 py-3.5 rounded-xl font-semibold text-sm border-2
                  transition-all duration-300 hover:scale-105
                  ${dark
                    ? 'border-purple-500/60 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400'
                    : 'border-purple-500 text-purple-600 hover:bg-purple-50 hover:border-purple-600'}`}>
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT SECTION  (id="about")
═══════════════════════════════════════════════════════════════ */
function AboutSection({ dark }) {
  const card = dark
    ? 'bg-white/5 border border-white/10'
    : 'bg-white border border-purple-100 shadow-md shadow-purple-100/40'

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Built' },
    { value: '10+', label: 'Technologies' },
  ]

  return (
    <section id="about" className="py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-purple-500" />
          <span className={`text-sm font-semibold tracking-widest uppercase text-purple-500`}>
            About Me
          </span>
        </div>

        <h2 className={`font-[Plus_Jakarta_Sans,sans-serif] font-bold mb-12
          ${dark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
          Passionate about building the web
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: bio text */}
          <div className={`space-y-4 text-base leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>
              I'm a <span className={`font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Frontend Developer</span> and
              {' '}<span className={`font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Cyber Security Enthusiast</span> based
              in Indonesia. I love turning complex problems into simple, beautiful, and intuitive designs.
            </p>
            <p>
              My interest spans across web development, artificial intelligence, and cyber security — always exploring
              where these disciplines intersect to create secure, intelligent, and delightful user experiences.
            </p>
            <p>
              When I'm not coding, you'll find me reading about the latest in security research or experimenting
              with new frameworks and AI tools.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-4">
              {[
                { name: 'GitHub', href: 'https://github.com', svg: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /> },
                { name: 'LinkedIn', href: 'https://linkedin.com', svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
                { name: 'Twitter', href: 'https://x.com', svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.243 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
              ].map(({ name, href, svg }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
                  className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-110
                    ${dark
                      ? 'text-gray-500 border-white/10 hover:text-purple-400 hover:bg-white/5 hover:border-purple-500/30'
                      : 'text-gray-400 border-gray-200 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-300'}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">{svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: stats cards */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className={`${card} rounded-2xl p-5 text-center transition-all duration-200 hover:scale-105`}>
                  <div className="text-2xl font-extrabold text-purple-500 font-[Plus_Jakarta_Sans,sans-serif]">{value}</div>
                  <div className={`text-xs mt-1 font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className={`${card} rounded-2xl p-6`}>
              <h3 className={`text-sm font-semibold mb-4 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Core Skills</h3>
              <div className="space-y-3">
                {[
                  { skill: 'Frontend Development', pct: 90 },
                  { skill: 'Cyber Security', pct: 72 },
                  { skill: 'Artificial Intelligence', pct: 65 },
                ].map(({ skill, pct }) => (
                  <div key={skill}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={dark ? 'text-gray-400' : 'text-gray-600'}>{skill}</span>
                      <span className="text-purple-500 font-semibold">{pct}%</span>
                    </div>
                    <div className={`h-1.5 rounded-full ${dark ? 'bg-white/10' : 'bg-gray-100'}`}>
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-violet-500 transition-all duration-700"
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
