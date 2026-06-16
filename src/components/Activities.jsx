import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

import ctrlpDoc   from '../assets/CTRLP_doc.jpg'
import compstud   from '../assets/Compstud.jpg'
import eo         from '../assets/EO.jpeg'
import logist     from '../assets/LOGIST.jpeg'
import pufa       from '../assets/PUFA.jpeg'

/* ── Viewport config ────────────────────────────────────────────── */
const VP = { once: false, amount: 0.15 }

/* ── Spring transition ──────────────────────────────────────────── */
const SPRING = { type: 'spring', stiffness: 280, damping: 34, mass: 0.9 }

/* ── Slide data ─────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0, img: ctrlpDoc,
    title: 'CTRL P + CTRL F', subtitle: 'Project Manager & Master of Ceremony', tag: 'Seminar',
    description: 'Serve as Project Manager and Master of Ceremony at CTRL P + CTRL F 2025. Responsible for planning, organizing, leading, and executing the event ',
  },
  {
    id: 2, img: compstud,
    title: 'COMPARATIVE STUDY PUFA 2025', subtitle: 'Student Activity', tag: 'Project Manager',
    description: 'Serve as Project manager at Comstud PUFA 2025 with BEM FMIPA UGM 2025. Responsible for planning, organizing, and executing the event ',
  },
  {
    id: 3, img: eo,
    title: 'Grand Inaugurations', subtitle: 'Member Of EO Teams at Grand Inaugurations', tag: 'Event',
    description: 'Served as an event organizer, coordinating logistics and ensuring seamless execution.',
  },
  {
    id: 4, img: logist,
    title: 'Compsphere 2025', subtitle: 'Person In Charge of Logistics', tag: 'LOGISTICS',
    description: 'Managed logistics operations including resource allocation and on-ground coordination.',
  },
  {
    id: 8, img: pufa,
    title: 'PUFA 2025', subtitle: 'Member of External Division', tag: 'ORGANIZATION',
    description: 'Active member of the President University faculty Association 2025, contributing to Faculty through programs and Events.',
  },
]

/*  Background Ornaments  */
function ActivitiesBgOrnaments({ dark }) {
  const col     = dark ? 'rgba(220,38,38,0.20)' : 'rgba(220,38,38,0.16)'
  const colGray = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute -top-20 -left-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 110, ease: 'linear', repeat: Infinity }}>
        <svg width="320" height="320" viewBox="0 0 320 320">
          <polygon points="160,10 295,82 295,238 160,310 25,238 25,82"
            fill="none" stroke={col} strokeWidth="14" />
        </svg>
      </motion.div>
      <motion.div className="absolute -bottom-16 -right-16"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 80, ease: 'linear', repeat: Infinity }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <rect x="15" y="15" width="210" height="210" fill="none" stroke={col} strokeWidth="12" />
        </svg>
      </motion.div>
      <div className="absolute top-0 right-[8%] h-full w-16 opacity-[0.18]"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg,${dark?'#fff':'#000'} 0px,${dark?'#fff':'#000'} 1.5px,transparent 1.5px,transparent 16px)` }} />
      <div className="absolute top-0 left-0 w-72 h-72 opacity-[0.18]"
        style={{ backgroundImage: `radial-gradient(circle,${dark?'#fff':'#000'} 1px,transparent 1px)`, backgroundSize: '14px 14px' }} />
      <motion.div className="absolute left-0 right-0 h-px" style={{ top: '62%', background: col }}
        animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }} />
      <motion.div className="absolute top-1/2 right-[10%]" style={{ translateY: '-50%' }}
        animate={{ rotate: [0, 45, 0] }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}>
        <div className="w-16 h-16 border-4" style={{ borderColor: colGray }} />
      </motion.div>
    </div>
  )
}

/* Info (universal — desktop + mobile) */
function InfoModal({ slide, onClose }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(5px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      >
        <motion.div
          key="modal-card"
          className="relative w-full max-w-sm overflow-hidden"
          style={{ background: '#18181b', border: '2px solid #dc2626', boxShadow: '8px 8px 0 #dc2626' }}
          initial={{ scale: 0.86, opacity: 0, y: 24 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.86, opacity: 0, y: 24 }}
          transition={SPRING}
          onClick={e => e.stopPropagation()}
        >
          {/* Image header */}
          <div className="relative h-44 overflow-hidden">
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }} />
            <span className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px]
              font-black tracking-[0.2em] uppercase px-2 py-0.5">
              {slide.tag}
            </span>
          </div>
          {/* Body */}
          <div className="p-5 space-y-2">
            <h3 className="text-white font-black text-lg uppercase tracking-tight leading-tight">
              {slide.title}
            </h3>
            <p className="text-zinc-400 text-[11px] font-semibold tracking-wider uppercase">
              {slide.subtitle}
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed pt-1">
              {slide.description}
            </p>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
              bg-black/60 text-white font-black text-sm border border-zinc-700
              hover:bg-red-600 hover:border-red-600 transition-colors duration-150"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

/* ── Inline circular 'i' button ─────────────────────────────────── */
function InfoButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="View activity description"
      className="absolute top-3 right-3 z-40 w-8 h-8 rounded-full
        flex items-center justify-center
        bg-black/60 border-2 border-white/30 text-white
        hover:bg-red-600 hover:border-red-600 transition-colors duration-150
        backdrop-blur-sm"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.12 }}
    >
      {/* Inline 'i' SVG — no react-icons dependency needed */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8"  x2="12.01" y2="8" />
      </svg>
    </motion.button>
  )
}

/* ── Active Card ────────────────────────────────────────────────── */
function ActiveCard({ slide, hovered, onInfoClick }) {
  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ borderRadius: 0 }}>
      {/* Photo */}
      <img src={slide.img} alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* Bottom gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)' }} />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7 z-10">
        <span className="inline-block bg-red-600 text-white text-[10px] font-black
          tracking-[0.2em] uppercase px-2 py-0.5 mb-2">
          {slide.tag}
        </span>
        <h3 className="text-white font-['Plus_Jakarta_Sans',sans-serif] font-black
          text-xl lg:text-2xl leading-tight uppercase tracking-tight">
          {slide.title}
        </h3>
        <p className="text-zinc-300 text-xs font-semibold tracking-wider uppercase mt-0.5">
          {slide.subtitle}
        </p>
      </div>

      {/* Circular 'i' button — top-right, always visible */}
      <InfoButton onClick={onInfoClick} />

      {/* Desktop P5R diagonal reveal (md and up only) */}
      <motion.div
        className="absolute inset-0 bg-red-600 z-20 pointer-events-none hidden md:block"
        animate={{
          clipPath: hovered
            ? 'polygon(100% 0%, 30% 100%, 100% 100%)'
            : 'polygon(100% 0%, 100% 0%, 100% 0%)',
        }}
        transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.p
          className="text-white font-black text-xs lg:text-sm leading-snug"
          style={{
            position: 'absolute', bottom: '12%', right: '5%',
            maxWidth: '9rem', textAlign: 'right',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: hovered ? 0.2 : 0 }}
        >
          {slide.description}
        </motion.p>
      </motion.div>
    </div>
  )
}

/* ── Carousel ───────────────────────────────────────────────────── */
function Carousel({ dark }) {
  const [index,     setIndex] = useState(0)
  const [direction, setDir]   = useState(1)
  const [hovered,   setHov]   = useState(false)
  const [modalOpen, setModal] = useState(false)

  const go = useCallback((next) => {
    const raw = ((next % SLIDES.length) + SLIDES.length) % SLIDES.length
    setDir(next > index ? 1 : -1)
    setIndex(raw)
    setHov(false)
  }, [index])

  const prev = () => go(index - 1)
  const next = () => go(index + 1)

  const prevIdx = (index - 1 + SLIDES.length) % SLIDES.length
  const nextIdx = (index + 1) % SLIDES.length

  const btnBase = `flex items-center justify-center w-11 h-11 border-2 font-black
    text-lg transition-all duration-200 hover:scale-110 select-none`
  const btnStyle = dark
    ? `${btnBase} border-red-600 text-red-500 hover:bg-red-600 hover:text-white`
    : `${btnBase} border-black text-black hover:bg-black hover:text-white`

  const variants = {
    enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0.6 }),
    center: ()    => ({ x: 0, opacity: 1 }),
    exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0.6 }),
  }

  const TRACK_H = 340

  return (
    <div className="flex flex-col items-center gap-6 w-full">

      {/* Three-card fixed-height track */}
      <div className="relative w-full" style={{ height: TRACK_H }}>

        {/* PREV ghost */}
        <motion.div
          key={`prev-${prevIdx}`}
          className="absolute top-1/2 left-0 cursor-pointer overflow-hidden"
          style={{ width: '22%', aspectRatio: '16/9', borderRadius: 0, translateY: '-50%', transformOrigin: 'center center' }}
          animate={{ opacity: 0.45, scale: 0.75 }}
          transition={SPRING}
          onClick={prev} title="Previous"
        >
          <img src={SLIDES[prevIdx].img} alt={SLIDES[prevIdx].title}
            className="w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>

        {/* ACTIVE center card */}
        <div
          className="absolute top-0 bottom-0 overflow-hidden cursor-pointer"
          style={{ left: 'calc(22% + 12px)', right: 'calc(22% + 12px)', borderRadius: 0 }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
        >
          {/* Index counter */}
          <div
            className="absolute top-3 left-3 z-30 bg-black/70 backdrop-blur-sm
              border border-red-600 px-3 py-1 text-white text-xs font-black tracking-widest"
            style={{ pointerEvents: 'none' }}
          >
            {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              className="absolute inset-0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={SPRING}
            >
              <ActiveCard
                slide={SLIDES[index]}
                hovered={hovered}
                onInfoClick={() => setModal(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NEXT ghost */}
        <motion.div
          key={`next-${nextIdx}`}
          className="absolute top-1/2 right-0 cursor-pointer overflow-hidden"
          style={{ width: '22%', aspectRatio: '16/9', borderRadius: 0, translateY: '-50%', transformOrigin: 'center center' }}
          animate={{ opacity: 0.45, scale: 0.75 }}
          transition={SPRING}
          onClick={next} title="Next"
        >
          <img src={SLIDES[nextIdx].img} alt={SLIDES[nextIdx].title}
            className="w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Caption row */}
      <div className={`w-full max-w-3xl px-1 ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-xs lg:text-sm leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {SLIDES[index].description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={prev} className={btnStyle} aria-label="Previous slide">←</button>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-200"
              style={{
                width:      i === index ? '1.5rem' : '0.5rem',
                height:     '0.5rem',
                background: i === index ? '#dc2626' : dark ? '#52525b' : '#a1a1aa',
                display:    'block',
              }}
            />
          ))}
        </div>
        <button onClick={next} className={btnStyle} aria-label="Next slide">→</button>
      </div>

      {/* Universal Info Modal */}
      {modalOpen && (
        <InfoModal slide={SLIDES[index]} onClose={() => setModal(false)} />
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   ACTIVITIES SECTION
═══════════════════════════════════════════════════════════════════ */
export default function Activities({ dark }) {
  return (
    <section
      id="activities"
      className={`relative py-24 px-6 lg:px-10 ${dark ? 'bg-black' : 'bg-white'}`}
    >
      <ActivitiesBgOrnaments dark={dark} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-red-600" />
            <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">Activities</span>
          </div>
          <h2
            className={`font-['Plus_Jakarta_Sans',sans-serif] font-black mb-4 uppercase
              tracking-tighter leading-none ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Beyond the <span className="text-red-600">Keyboard</span>
          </h2>
          <p className={`text-sm mb-12 max-w-xl leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A snapshot of events, organizations, and experiences that shaped who I am
            outside the code editor from campus leadership to community involvement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
        >
          <Carousel dark={dark} />
        </motion.div>
      </div>
    </section>
  )
}
