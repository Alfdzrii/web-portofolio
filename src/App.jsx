import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import moonIcon from './assets/moon.svg'
import sunIcon from './assets/sun.svg'
import heroImage from './assets/Alfadzri.jpeg'
import './index.css'

const fl = document.createElement('link')
fl.rel = 'stylesheet'
fl.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@400;600;800;900&display=swap'
document.head.appendChild(fl)

const NAV_LINKS = [
  { label: 'About',        id: 'about' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Activities',   id: 'activities' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact',      id: 'contact' },
]

const PHRASES = [
  'Cyber Security Enthusiast',
  'Web Developer',
  'Artificial Intelligence Enthusiast',
  'Frontend Developer',
]

/* ── Reveal animation wrapper ─────────────────────────────────── */
function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── ScrollSpy hook ────────────────────────────────────────────── */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [ids])
  return active
}

/* ── Typewriter hook ───────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const bg = dark ? 'bg-zinc-950 text-white' : 'bg-white text-black'

  return (
    <div className={`min-h-screen font-[Inter,system-ui,sans-serif] transition-colors duration-300 ${bg}`}>
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
  const sectionIds = NAV_LINKS.map(l => l.id)
  const active = useActiveSection(['home', ...sectionIds])

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

  const navBg = scrolled
    ? dark
      ? 'bg-black/95 border-b-2 border-red-600 shadow-lg shadow-red-900/30'
      : 'bg-white/95 border-b-2 border-red-600 shadow-lg shadow-red-200/40'
    : 'bg-transparent border-b border-transparent'

  const isActive = (id) => active === id

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-['Bebas_Neue',sans-serif] text-2xl tracking-widest select-none flex items-center gap-0.5">
            <span className="text-red-600">{'<'}</span>
            <span className={dark ? 'text-white' : 'text-black'}>ALFADZRI</span>
            <span className="text-red-600">{'/>'}</span>
          </button>

          {/* Centered links — desktop */}
          <div className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`relative px-4 py-1.5 text-xs font-black tracking-widest uppercase transition-all duration-150
                  ${isActive(id)
                    ? 'text-red-600 bg-red-600/10'
                    : dark
                      ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                      : 'text-zinc-600 hover:text-black hover:bg-black/5'
                  }`}>
                {label}
                {isActive(id) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <ThemeToggle dark={dark} setDark={setDark} />
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
              className={`md:hidden p-2 transition-colors duration-200 ${dark ? 'hover:bg-red-600/10' : 'hover:bg-red-50'}`}>
              {[0, 1, 2].map(i => (
                <span key={i} className={`block w-5 h-0.5 transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'}
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
          <div className={`flex flex-col gap-0 pt-2 border-t-2 border-red-600`}>
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`text-left px-4 py-3 text-xs font-black tracking-widest uppercase transition-colors duration-150
                  ${isActive(id)
                    ? 'text-red-600 bg-red-600/10 border-l-2 border-red-600'
                    : dark ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-black hover:bg-black/5'
                  }`}>
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
      className={`w-9 h-9 flex items-center justify-center transition-all duration-300 border-2
        ${dark
          ? 'bg-transparent border-red-600 hover:bg-red-600/15'
          : 'bg-transparent border-black hover:bg-black/5'}`}>
      <img
        src={dark ? sunIcon : moonIcon}
        alt={dark ? 'Light mode' : 'Dark mode'}
        className="w-4 h-4 transition-transform duration-300 hover:scale-110"
        style={{ filter: dark ? 'invert(1) brightness(1.2)' : 'none' }}
      />
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION  (id="home")
═══════════════════════════════════════════════════════════════ */
function HeroSection({ dark }) {
  const text = useTypewriter(PHRASES)

  /* Persona 5 sharp offset shadow */
  const photoShadow = dark
    ? '10px 10px 0px rgba(220,38,38,1)'
    : '10px 10px 0px rgba(0,0,0,1)'

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  const textVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: 'easeOut', delay: 0.15 } }
  }

  const floatAnim = {
    y: [0, -14, 0],
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT: Photo */}
          <motion.div
            className="flex justify-center lg:justify-start order-1"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              animate={floatAnim}
              className="relative"
              style={{ willChange: 'transform' }}
            >
              {/* Red diagonal accent bar */}
              <div className="absolute -top-3 -left-3 w-10 h-full bg-red-600 opacity-80 -z-10" />

              {/* Photo */}
              <div className="relative overflow-hidden p5-scanlines"
                style={{
                  borderRadius: 0,
                  width: 'clamp(270px, 36vw, 400px)',
                  aspectRatio: '4/5',
                  boxShadow: photoShadow,
                }}>
                <img src={heroImage} alt="Alfadzri"
                  className="w-full h-full object-cover object-top" />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
                  style={{
                    background: dark
                      ? 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                      : 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)',
                  }} />
              </div>

              {/* Corner tag */}
              <div className="absolute -bottom-3 -right-3 bg-red-600 px-3 py-1 text-white text-xs font-black tracking-widest uppercase">
                ALFADZRI
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            className="flex flex-col gap-6 text-left order-2"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-red-600" />
              <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">Portfolio</span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black leading-none tracking-tighter uppercase"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)' }}>
              Hi, I'm{' '}
              <span className="text-red-600">
                Alfadzri
              </span>
            </h1>

            {/* Typewriter */}
            <div className={`text-base lg:text-lg font-black flex items-center gap-1 min-h-[2rem] uppercase tracking-widest
              ${dark ? 'text-yellow-400' : 'text-amber-500'}`}>
              <span>{text}</span>
              <span className="animate-blink border-r-2 border-current h-5 inline-block" />
            </div>

            <p className={`text-sm lg:text-base leading-relaxed max-w-lg ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              I craft{' '}
              <span className={`font-semibold ${dark ? 'text-zinc-100' : 'text-black'}`}>elegant digital experiences</span>
              {' '}that combine minimalist aesthetics with robust engineering. Focusing on building{' '}
              <span className={`font-semibold ${dark ? 'text-zinc-100' : 'text-black'}`}>intuitive and dynamic</span>
              {' '}web applications.
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js'].map(t => (
                <span key={t}
                  className={`px-3 py-1 text-xs font-black uppercase tracking-widest border-2 cursor-default
                    transition-all duration-200 hover:scale-105
                    ${dark
                      ? 'bg-transparent border-red-600/60 text-red-400 hover:bg-red-600/10'
                      : 'bg-transparent border-black text-black hover:bg-black/5'}`}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-1">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                id="cta-view-projects"
                className="group relative px-7 py-3 font-black text-sm text-white uppercase tracking-widest
                  bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105
                  shadow-[4px_4px_0px_rgba(0,0,0,0.9)]">
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                id="cta-lets-talk"
                className={`px-7 py-3 font-black text-sm uppercase tracking-widest border-2
                  transition-all duration-200 hover:scale-105
                  shadow-[4px_4px_0px_rgba(220,38,38,0.8)]
                  ${dark
                    ? 'border-white text-white hover:bg-white/10'
                    : 'border-black text-black hover:bg-black/5'}`}>
                Let's Talk
              </button>
            </div>
          </motion.div>
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
    ? 'bg-zinc-900 border-2 border-zinc-800 hover:border-red-600/50'
    : 'bg-white border-2 border-black hover:border-red-600'

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Built' },
    { value: '10+', label: 'Technologies' },
  ]

  return (
    <section id="about" className={`py-24 px-6 lg:px-10 ${dark ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
      <div className="max-w-7xl mx-auto">

        <RevealSection>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-red-600" />
            <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">About Me</span>
          </div>

          <h2 className={`font-['Plus_Jakarta_Sans',sans-serif] font-black mb-12 uppercase tracking-tighter leading-none
            ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Passionate about{' '}
            <span className="text-red-600">building the web</span>
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: bio */}
          <RevealSection delay={0.1}>
            <div className={`space-y-4 text-sm leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p>
                I'm a <span className={`font-black ${dark ? 'text-white' : 'text-black'}`}>Frontend Developer</span> and
                {' '}<span className={`font-black ${dark ? 'text-white' : 'text-black'}`}>Cyber Security Enthusiast</span> based
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

              {/* Social icons */}
              <div className="flex items-center gap-3 pt-4">
                {[
                  { name: 'GitHub', href: 'https://github.com', svg: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /> },
                  { name: 'LinkedIn', href: 'https://linkedin.com', svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
                  { name: 'Twitter', href: 'https://x.com', svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.243 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                ].map(({ name, href, svg }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
                    className={`p-2.5 border-2 transition-all duration-200 hover:scale-110
                      ${dark
                        ? 'text-zinc-500 border-zinc-700 hover:text-red-500 hover:border-red-600 hover:bg-red-600/10'
                        : 'text-zinc-500 border-black hover:text-red-600 hover:border-red-600'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">{svg}</svg>
                  </a>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Right: stats + skills */}
          <RevealSection delay={0.2}>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {stats.map(({ value, label }) => (
                  <div key={label} className={`${card} p-5 text-center transition-all duration-200 hover:scale-105`}>
                    <div className="text-2xl font-black text-red-600 font-['Plus_Jakarta_Sans',sans-serif]">{value}</div>
                    <div className={`text-xs mt-1 font-semibold uppercase tracking-wider ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>{label}</div>
                  </div>
                ))}
              </div>

              <div className={`${card} p-6 transition-all duration-200`}>
                <h3 className={`text-xs font-black mb-5 uppercase tracking-widest ${dark ? 'text-zinc-300' : 'text-black'}`}>Core Skills</h3>
                <div className="space-y-4">
                  {[
                    { skill: 'Frontend Development', pct: 90 },
                    { skill: 'Cyber Security',        pct: 72 },
                    { skill: 'Artificial Intelligence', pct: 65 },
                  ].map(({ skill, pct }) => (
                    <div key={skill}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className={`font-semibold uppercase tracking-wider ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>{skill}</span>
                        <span className="text-red-600 font-black">{pct}%</span>
                      </div>
                      <div className={`h-2 ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                        <div className="h-full bg-red-600 transition-all duration-700"
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
