import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import moonIcon from '../assets/moon.svg'
import sunIcon  from '../assets/sun.svg'

/* ── Nav links ───────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',         id: 'home'         },
  { label: 'About',        id: 'about'        },
  { label: 'Activities',   id: 'activities'   },
  { label: 'Projects',     id: 'projects'     },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact',      id: 'contact'      },
]

/* ── Social links ────────────────────────────────────────────────── */
const SOCIALS = [
  {
    label: 'GitHub',
    href:  'https://github.com/Alfdzrii',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/alfadzri-abhipraya/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

/* ── Framer Motion variants ──────────────────────────────────────── */
const overlayVariants = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0,      opacity: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] } },
}

const linkVariants = {
  hidden:  { opacity: 0, x: 32 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.12 + i * 0.065 },
  }),
  exit: { opacity: 0, x: 24, transition: { duration: 0.18 } },
}

const footerVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.55 } },
  exit:    { opacity: 0, y: 16, transition: { duration: 0.2 } },
}

/* ── ScrollSpy hook ──────────────────────────────────────────────── */
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

/* ── Theme Toggle ────────────────────────────────────────────────── */
function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
      className={`w-9 h-9 flex items-center justify-center transition-all duration-300 border-2
        ${dark
          ? 'bg-transparent border-red-600 hover:bg-red-600/15'
          : 'bg-transparent border-black hover:bg-black/5'}`}
    >
      <img
        src={dark ? sunIcon : moonIcon}
        alt={dark ? 'Light mode' : 'Dark mode'}
        className="w-4 h-4 transition-transform duration-300 hover:scale-110"
        style={{ filter: dark ? 'invert(1) brightness(1.2)' : 'none' }}
      />
    </button>
  )
}

/* ── Full-Screen Mobile Menu (portal) ────────────────────────────── */
function MobileMenu({ open, onClose, scrollTo, active }) {
  /* Lock body scroll while open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-overlay"
          className="fixed inset-0 z-[999] flex flex-col w-full h-[100dvh] bg-zinc-950"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* ── P5R diagonal accent strip (top-left) */}
          <div
            className="absolute top-0 left-0 w-1.5 h-full bg-red-600 opacity-80"
            aria-hidden="true"
          />
          {/* Halftone dot pattern — bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
          {/* Rotating P5R triangle ornament */}
          <motion.div
            className="absolute -top-16 -right-16 pointer-events-none opacity-[0.06]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
            aria-hidden="true"
          >
            <svg width="280" height="280" viewBox="0 0 280 280">
              <polygon points="140,10 270,255 10,255" fill="none" stroke="#dc2626" strokeWidth="10" />
            </svg>
          </motion.div>

          {/* ── Header bar ── */}
          <div className="relative z-10 flex items-center justify-between px-7 pt-5 pb-4 border-b border-white/10">
            {/* Brand */}
            <span className="font-['Bebas_Neue',sans-serif] text-2xl tracking-widest select-none">
              <span className="text-red-600">{'{'}</span>
              <span className="text-white">ALFADZRI</span>
              <span className="text-red-600">{'}'}</span>
            </span>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center border-2 border-zinc-700
                text-zinc-400 hover:border-red-600 hover:text-white hover:bg-red-600/10
                transition-colors duration-150"
              style={{ borderRadius: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
            >
              {/* X icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6"  y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          </div>

          {/* ── Nav links ── */}
          <nav className="relative z-10 flex flex-col justify-center flex-1 px-10 gap-1">
            {/* Eyebrow label */}
            <motion.p
              className="text-red-600 text-[10px] font-black tracking-[0.3em] uppercase mb-6"
              custom={-1}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Navigation
            </motion.p>

            {NAV_LINKS.map(({ label, id }, i) => {
              const isActive = active === id
              return (
                <motion.button
                  key={id}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => { onClose(); scrollTo(id) }}
                  className={`group relative text-left py-3 transition-all duration-200
                    flex items-center gap-4 border-b
                    ${isActive ? 'border-red-600/30' : 'border-white/[0.06]'}`}
                >
                  {/* Active / hover left indicator */}
                  <motion.span
                    className="flex-shrink-0 w-0.5 h-7 bg-red-600"
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.2 }}
                  />

                  <span
                    className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase
                      tracking-[0.08em] leading-none select-none
                      transition-all duration-200
                      group-hover:text-red-500 group-hover:translate-x-1
                      ${isActive ? 'text-red-500' : 'text-white/70'}`}
                    style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)' }}
                  >
                    {label}
                  </span>

                  {/* Trailing number */}
                  <span className={`ml-auto text-[11px] font-black tracking-wider tabular-nums
                    transition-colors duration-200
                    ${isActive ? 'text-red-600' : 'text-zinc-700 group-hover:text-zinc-500'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.button>
              )
            })}
          </nav>

          {/* ── Social footer ── */}
          <motion.div
            className="relative z-10 pb-8 pt-4 px-10 flex flex-col items-center gap-4"
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-1" />
            <div className="flex justify-center items-center gap-5">
              {SOCIALS.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 hover:text-red-500 transition-colors duration-200
                    p-2 border border-white/10 hover:border-red-600/50"
                  style={{ borderRadius: 0 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
            <p className="text-zinc-700 text-[10px] font-black tracking-[0.2em] uppercase">
              alfadzri.portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════ */
export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const sectionIds = NAV_LINKS.map(l => l.id)
  const active     = useActiveSection(['home', ...sectionIds])

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Cross-page navigation */
  const scrollTo = (id) => {
    if (id === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
      }
      return
    }
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  /* Handle hash after cross-page nav */
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '')
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [location])

  const navBg = scrolled
    ? dark
      ? 'bg-black/95 border-b-2 border-red-600 shadow-lg shadow-red-900/30'
      : 'bg-white/95 border-b-2 border-red-600 shadow-lg shadow-red-200/40'
    : 'bg-transparent border-b border-transparent'

  const isActive = (id) => active === id

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  navigate('/')
                }
              }}
              className="font-['Bebas_Neue',sans-serif] text-2xl tracking-widest select-none flex items-center gap-0.5"
            >
              <span className="text-red-600">{'{'}</span>
              <span className={dark ? 'text-white' : 'text-black'}>ALFADZRI</span>
              <span className="text-red-600">{'}'}</span>
            </button>

            {/* Centered desktop links */}
            <div className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.filter(l => l.id !== 'home').map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-1.5 text-xs font-black tracking-widest uppercase transition-all duration-150
                    ${isActive(id)
                      ? 'text-red-600 bg-red-600/10'
                      : dark
                        ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                        : 'text-zinc-600 hover:text-black hover:bg-black/5'}`}
                >
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

            {/* Right: theme toggle + hamburger */}
            <div className="flex items-center gap-3">
              <ThemeToggle dark={dark} setDark={setDark} />

              {/* Hamburger — morphs to X when open */}
              <motion.button
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className={`md:hidden p-2 transition-colors duration-200 ${dark ? 'hover:bg-red-600/10' : 'hover:bg-red-50'}`}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <motion.span
                    className={`block h-0.5 origin-center ${dark ? 'bg-white' : 'bg-black'}`}
                    animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    className={`block h-0.5 ${dark ? 'bg-white' : 'bg-black'}`}
                    animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className={`block h-0.5 origin-center ${dark ? 'bg-white' : 'bg-black'}`}
                    animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu — rendered in a portal */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        scrollTo={scrollTo}
        active={active}
      />
    </>
  )
}
