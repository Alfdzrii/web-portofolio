import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import moonIcon from '../assets/moon.svg'
import sunIcon from '../assets/sun.svg'

const NAV_LINKS = [
  { label: 'About',        id: 'about' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Activities',   id: 'activities' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact',      id: 'contact' },
]

/* ── ScrollSpy hook ──────────────────────────────────────────── */
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

/* ── Theme Toggle ────────────────────────────────────────────── */
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

/* ── Navbar ──────────────────────────────────────────────────── */
export default function Navbar({ dark, setDark }) {
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-['Bebas_Neue',sans-serif] text-2xl tracking-widest select-none flex items-center gap-0.5"
          >
            <span className="text-red-600">{'<'}</span>
            <span className={dark ? 'text-white' : 'text-black'}>ALFADZRI</span>
            <span className="text-red-600">{'/>'}</span>
          </button>

          {/* Centered desktop links */}
          <div className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, id }) => (
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
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 transition-colors duration-200 ${dark ? 'hover:bg-red-600/10' : 'hover:bg-red-50'}`}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className={`block w-5 h-0.5 transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'}
                    ${i !== 2 ? 'mb-1' : ''}
                    ${open && i === 0 ? 'rotate-45 translate-y-1.5' : ''}
                    ${open && i === 1 ? 'opacity-0' : ''}
                    ${open && i === 2 ? '-rotate-45 -translate-y-1.5' : ''}`}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-0 pt-2 border-t-2 border-red-600">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left px-4 py-3 text-xs font-black tracking-widest uppercase transition-colors duration-150
                  ${isActive(id)
                    ? 'text-red-600 bg-red-600/10 border-l-2 border-red-600'
                    : dark
                      ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                      : 'text-zinc-600 hover:text-black hover:bg-black/5'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
