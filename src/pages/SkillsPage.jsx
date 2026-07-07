import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiX } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'
import { skillCategories } from '../data/skills'

const VP = { once: false, amount: 0.08 }

/* ── Background ornaments ────────────────────────────────────────── */
function PagesBgOrnaments({ dark }) {
  const col = dark ? 'rgba(220,38,38,0.15)' : 'rgba(220,38,38,0.10)'
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
      <motion.div className="absolute -top-24 -right-24"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}>
        <svg width="360" height="360" viewBox="0 0 360 360">
          <polygon points="180,10 350,180 180,350 10,180" fill="none" stroke={col} strokeWidth="14" />
        </svg>
      </motion.div>
      <motion.div className="absolute -bottom-20 -left-20"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 95, ease: 'linear', repeat: Infinity }}>
        <svg width="260" height="260" viewBox="0 0 260 260">
          <polygon points="130,8 252,80 208,200 52,200 8,80" fill="none" stroke={col} strokeWidth="11" />
        </svg>
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg,${dark ? '#fff' : '#000'} 0px,${dark ? '#fff' : '#000'} 1px,transparent 1px,transparent 18px)` }} />
    </div>
  )
}

/* ── Skill Info Modal ────────────────────────────────────────────── */
function SkillModal({ skill, dark, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!skill) return null
  const { name, Icon, color, description } = skill
  const resolveColor = (c) => c === '__theme__' ? (dark ? '#ffffff' : '#111111') : c

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'rgba(0,0,0,0.82)' }}
        onClick={onClose}
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-sm p-8 ${dark ? 'bg-zinc-900' : 'bg-white'}`}
          style={{
            border: '2px solid #dc2626',
            boxShadow: '6px 6px 0px 0px #dc2626',
            borderRadius: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`absolute top-3 right-3 p-1.5 border-2 transition-colors duration-150
              ${dark
                ? 'border-zinc-700 text-zinc-400 hover:border-red-600 hover:text-red-500'
                : 'border-zinc-300 text-zinc-500 hover:border-red-600 hover:text-red-600'}`}
          >
            <FiX className="w-4 h-4" strokeWidth={2.5} />
          </button>

          {/* Red accent bar */}
          <div className="h-0.5 w-10 bg-red-600 mb-6" />

          {/* Icon — large */}
          <div className="flex items-center justify-center w-20 h-20 mb-6"
            style={{ border: '2px solid', borderColor: resolveColor(color) }}>
            <Icon style={{ color: resolveColor(color), fontSize: '2.8rem' }} />
          </div>

          {/* Name */}
          <h2
            className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase tracking-tighter leading-none mb-3 ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}
          >
            {name}
          </h2>

          {/* Description */}
          <p className={`text-base leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {description}
          </p>

          {/* Bottom accent */}
          <div className="mt-6 h-px w-full" style={{ background: 'linear-gradient(to right, #dc2626, transparent)' }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Skill Card ──────────────────────────────────────────────────── */
function SkillCard({ skill, dark, index, onInfo }) {
  const { name, Icon, color } = skill
  const resolveColor = (c) => c === '__theme__' ? (dark ? '#ffffff' : '#111111') : c
  const cardBase = dark ? 'bg-zinc-800/80 text-zinc-300' : 'bg-zinc-200 text-zinc-700'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      whileHover={{ scale: 1.05, border: '2px solid #dc2626' }}
      transition={{
        duration: 0.35, delay: index * 0.025, ease: 'easeOut',
        scale: { duration: 0.15, ease: 'easeOut' },
        border: { duration: 0.15, ease: 'easeOut' },
      }}
      className={`relative flex flex-col items-center gap-2 p-4 select-none cursor-default ${cardBase}`}
      style={{ border: '2px solid transparent', borderRadius: 0 }}
    >
      <Icon style={{ color: resolveColor(color), fontSize: '2rem' }} />
      <span className="text-xs font-black uppercase tracking-wider text-center leading-tight">{name}</span>

      {/* Info button */}
      <button
        onClick={() => onInfo(skill)}
        aria-label={`Info about ${name}`}
        className={`absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center
          text-[9px] font-black border transition-colors duration-150
          ${dark
            ? 'border-zinc-600 text-zinc-500 hover:border-red-600 hover:text-red-500 bg-zinc-900'
            : 'border-zinc-300 text-zinc-500 hover:border-red-600 hover:text-red-600 bg-white'}`}
        style={{ borderRadius: 0 }}
      >
        i
      </button>
    </motion.div>
  )
}

/* ── Category Section Header ─────────────────────────────────────── */
function CategoryHeader({ title, accent, dark, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
      className="flex items-center gap-4 mb-5 mt-12 first:mt-0"
    >
      {/* Accent slash */}
      <div className="flex-shrink-0 w-1 h-7" style={{ background: accent }} />
      <h2
        className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase tracking-tight leading-none
          ${dark ? 'text-white' : 'text-black'}`}
        style={{ fontSize: 'clamp(1rem, 2.2vw, 1.35rem)' }}
      >
        {title}
      </h2>
      {/* Trailing rule */}
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }} />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SKILLS PAGE
═══════════════════════════════════════════════════════════════════ */
export default function SkillsPage() {
  const { dark, setDark } = useTheme()
  const [selected, setSelected] = useState(null)

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [])

  const bg = dark ? 'bg-zinc-950 text-white' : 'bg-white text-black'

  return (
    <div className={`min-h-screen font-[Inter,system-ui,sans-serif] transition-colors duration-300 ${bg}`}>
      <Navbar dark={dark} setDark={setDark} />
      <PagesBgOrnaments dark={dark} />

      <main className="relative z-10 pt-28 pb-24 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-10"
          >
            <motion.div
              whileHover={{ x: -3, y: -3, boxShadow: '4px 4px 0px 0px #dc2626' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
              className="inline-block"
            >
              <Link
                to="/"
                id="back-to-home"
                className={`group inline-flex items-center gap-2.5 px-5 py-2.5 border-2 font-black
                  text-xs tracking-[0.2em] uppercase transition-colors duration-150
                  ${dark
                    ? 'bg-black border-white text-white hover:border-red-600 hover:text-red-500'
                    : 'bg-black border-black text-white hover:border-red-600'}`}
              >
                <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.8} />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Page Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-red-600" />
              <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">All Skills</span>
            </div>
            <h1
              className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase tracking-tighter leading-none ${dark ? 'text-white' : 'text-black'}`}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              My <span className="text-red-600">Arsenal</span>
            </h1>
            <p className={`text-base mt-4 max-w-xl leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              A complete overview of technologies, frameworks, and tools I've worked with across
              web development, cybersecurity, and software engineering. Click the{' '}
              <span className={`font-black text-xs px-1 border ${dark ? 'border-zinc-600 text-zinc-300' : 'border-zinc-400 text-zinc-600'}`}>i</span>{' '}
              on any card to learn more.
            </p>

            {/* Skill count badge row */}
            <div className="flex flex-wrap gap-2 mt-6">
              {skillCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black
                    tracking-[0.18em] uppercase border-2 transition-colors duration-150 no-underline
                    ${dark
                      ? 'border-zinc-700 text-zinc-400 hover:border-red-600 hover:text-white'
                      : 'border-zinc-300 text-zinc-500 hover:border-red-600 hover:text-black'}`}
                  style={{ borderRadius: 0 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.accent }} />
                  {cat.title}
                  <span
                    className="ml-1 text-[9px] px-1.5 py-px font-black"
                    style={{ background: cat.accent + '22', color: cat.accent }}
                  >
                    {cat.skills.length}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Categorised skill sections ── */}
          {skillCategories.map((cat, catIdx) => (
            <section key={cat.id} id={`cat-${cat.id}`}>
              <CategoryHeader
                title={cat.title}
                accent={cat.accent}
                dark={dark}
                index={catIdx}
              />

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {cat.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    dark={dark}
                    index={i}
                    onInfo={setSelected}
                  />
                ))}
              </motion.div>
            </section>
          ))}

        </div>
      </main>

      {/* Info Modal */}
      {selected && (
        <SkillModal skill={selected} dark={dark} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
