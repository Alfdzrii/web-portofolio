import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

import ctrlpDoc   from '../assets/CTRLP_doc.jpg'
import compstud   from '../assets/Compstud.jpg'
import eo         from '../assets/EO.jpeg'
import logist     from '../assets/LOGIST.jpeg'
import pufa       from '../assets/PUFA.jpeg'
import CTF1       from '../assets/CTF1.jpeg'
import CTF2       from '../assets/CTF2.png'

/* ── Viewport config ────────────────────────────────────────────── */
const VP     = { once: false, amount: 0.15 }
const SPRING = { type: 'spring', stiffness: 280, damping: 34, mass: 0.9 }

/* ── Slide data ─────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0, img: ctrlpDoc,
    title: 'CTRL P + CTRL F',
    subtitle: 'Project Manager & Master of Ceremony',
    tag: 'Seminar',
    date: '2025',
    description:
      'Serve as Project Manager and Master of Ceremony at CTRL P + CTRL F 2025. Responsible for planning, organizing, leading, and executing the event — from initial concept to final delivery.',
  },
  {
    id: 2, img: compstud,
    title: 'COMPARATIVE STUDY PUFA 2025',
    subtitle: 'Project Manager',
    tag: 'Student Activity',
    date: '2025',
    description:
      'Serve as Project Manager at Comstud PUFA 2025 with BEM FMIPA UGM 2025. Responsible for planning, organizing, and executing the event, coordinating cross-team communication and logistics.',
  },
  {
    id: 3, img: eo,
    title: 'Grand Inaugurations',
    subtitle: 'Member of EO Team',
    tag: 'Event',
    date: '2024',
    description:
      'Served as an event organizer at the Grand Inaugurations ceremony, coordinating logistics and ensuring seamless execution from setup through closedown.',
  },
  {
    id: 4, img: logist,
    title: 'Compsphere 2025',
    subtitle: 'Person In Charge of Logistics',
    tag: 'Logistics',
    date: '2025',
    description:
      'Managed logistics operations including resource allocation, vendor coordination, on-ground execution, and ensuring all materials were available and deployed on schedule.',
  },
  {
    id: 8, img: pufa,
    title: 'PUFA 2025',
    subtitle: 'Member of External Division',
    tag: 'Organization',
    date: '2025',
    description:
      'Active member of the President University Faculty Association 2025, contributing to faculty programs and events through the External Division — handling outreach, partnerships, and inter-faculty coordination.',
  },
  {
    id: 9, img: CTF1,
    title: 'PU CTF BATCH 2024 — ETHICAL HACKING',
    subtitle: 'Rank 6 Competitor',
    tag: 'Competition',
    date: '2024',
    description:
      'Ranked 6th in the President University CTF Batch 2024 — Ethical Hacking category. Demonstrated strong skills in vulnerability analysis, privilege escalation, and web application security challenges.',
  },
  {
    id: 10, img: CTF2,
    title: 'PU CTF BATCH 2024 — DIGITAL FORENSIC',
    subtitle: 'Rank 4 Competitor',
    tag: 'Competition',
    date: '2024',
    description:
      'Ranked 4th in the President University CTF Batch 2024 — Digital Forensics category. Applied memory forensics, file carving, log analysis, and chain-of-custody methodology to recover and present digital evidence.',
  },
]

/* ── Tag colour map ─────────────────────────────────────────────── */
const TAG_COLORS = {
  Seminar:       '#7c3aed',
  'Student Activity': '#0891b2',
  Event:         '#dc2626',
  Logistics:     '#d97706',
  Organization:  '#059669',
  Competition:   '#dc2626',
}
const tagBg = (tag) => TAG_COLORS[tag] ?? '#dc2626'

/* ── Background Ornaments ───────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════════
   P5R ACTIVITY DETAIL MODAL
═══════════════════════════════════════════════════════════════════ */
function ActivityModal({ slide, onClose }) {
  return createPortal(
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        key="activity-backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* ── Modal panel ── */}
        <motion.div
          key="activity-modal"
          className="relative w-full max-w-2xl overflow-hidden"
          style={{
            background: '#0a0a0a',
            border: '2px solid #dc2626',
            boxShadow: '10px 10px 0 #dc2626',
            borderRadius: 0,
          }}
          initial={{ scale: 0.88, opacity: 0, y: 40 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.88, opacity: 0, y: 40 }}
          transition={SPRING}
          onClick={e => e.stopPropagation()}
        >
          {/* Red top accent bar */}
          <div className="h-1.5 w-full bg-red-600" />

          {/* Hero image */}
          <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Gradient over image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }}
            />
            {/* Tag badge */}
            <span
              className="absolute top-4 left-4 text-white text-[10px] font-black tracking-[0.22em] uppercase px-3 py-1"
              style={{ background: tagBg(slide.tag) }}
            >
              {slide.tag}
            </span>
            {/* Year badge */}
            <span className="absolute top-4 right-12 bg-black/70 border border-red-600 text-white text-[10px] font-black tracking-widest uppercase px-2 py-1">
              {slide.date}
            </span>
          </div>

          {/* Body */}
          <div className="px-7 pt-5 pb-7">
            {/* Red rule */}
            <div className="h-0.5 w-10 bg-red-600 mb-4" />

            {/* Title */}
            <h2
              className="font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase tracking-tighter leading-none text-white mb-2"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)' }}
            >
              {slide.title}
            </h2>

            {/* Role / Subtitle */}
            <p className="text-red-500 text-xs font-black tracking-[0.2em] uppercase mb-5">
              {slide.subtitle}
            </p>

            {/* Divider */}
            <div className="h-px w-full bg-zinc-800 mb-5" />

            {/* Description */}
            <p className="text-zinc-300 text-base leading-relaxed">
              {slide.description}
            </p>

            {/* Bottom meta row */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-zinc-800">
              <span
                className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1"
                style={{ background: tagBg(slide.tag) + '22', color: tagBg(slide.tag), border: `1px solid ${tagBg(slide.tag)}55` }}
              >
                {slide.tag}
              </span>
              <span className="text-zinc-600 text-[11px] font-semibold tracking-wider uppercase">
                {slide.date}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close activity modal"
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center
              bg-black/70 text-white font-black text-sm border border-zinc-700
              hover:bg-red-600 hover:border-red-600 transition-colors duration-150"
            style={{ borderRadius: 0 }}
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}

/* ── Active Card ────────────────────────────────────────────────── */
function ActiveCard({ slide, hovered, onCardClick }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer select-none"
      style={{ borderRadius: 0 }}
      onClick={onCardClick}
    >
      {/* Photo */}
      <img
        src={slide.img}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)' }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7 z-10 pointer-events-none">
        <span
          className="inline-block text-white text-[10px] font-black tracking-[0.2em] uppercase px-2 py-0.5 mb-2"
          style={{ background: tagBg(slide.tag) }}
        >
          {slide.tag}
        </span>
        <h3 className="text-white font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl lg:text-2xl leading-tight uppercase tracking-tight">
          {slide.title}
        </h3>
        <p className="text-zinc-300 text-xs font-semibold tracking-wider uppercase mt-0.5">
          {slide.subtitle}
        </p>
        {/* Click hint */}
        <motion.p
          className="text-red-400 text-[10px] font-black tracking-[0.18em] uppercase mt-2 flex items-center gap-1.5"
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Click to view details
        </motion.p>
      </div>

      {/* P5R diagonal reveal on hover */}
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
  const [index,            setIndex]           = useState(0)
  const [direction,        setDir]             = useState(1)
  const [hovered,          setHov]             = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)

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

        {/* PREV ghost — navigation only */}
        <motion.div
          key={`prev-${prevIdx}`}
          className="absolute top-1/2 left-0 cursor-pointer overflow-hidden"
          style={{ width: '22%', aspectRatio: '16/9', borderRadius: 0, translateY: '-50%' }}
          animate={{ opacity: 0.45, scale: 0.75 }}
          transition={SPRING}
          onClick={prev}
          title="Previous"
          aria-label="Previous activity"
        >
          <img
            src={SLIDES[prevIdx].img}
            alt={SLIDES[prevIdx].title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>

        {/* ACTIVE center card — opens modal on click */}
        <div
          className="absolute top-0 bottom-0 overflow-hidden"
          style={{ left: 'calc(22% + 12px)', right: 'calc(22% + 12px)', borderRadius: 0 }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
        >
          {/* Slide counter */}
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
                onCardClick={() => setSelectedActivity(SLIDES[index])}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NEXT ghost — navigation only */}
        <motion.div
          key={`next-${nextIdx}`}
          className="absolute top-1/2 right-0 cursor-pointer overflow-hidden"
          style={{ width: '22%', aspectRatio: '16/9', borderRadius: 0, translateY: '-50%' }}
          animate={{ opacity: 0.45, scale: 0.75 }}
          transition={SPRING}
          onClick={next}
          title="Next"
          aria-label="Next activity"
        >
          <img
            src={SLIDES[nextIdx].img}
            alt={SLIDES[nextIdx].title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Caption row */}
      <div className={`w-full max-w-3xl px-1 cursor-default ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
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
                borderRadius: 0,
              }}
            />
          ))}
        </div>
        <button onClick={next} className={btnStyle} aria-label="Next slide">→</button>
      </div>

      {/* Activity detail modal */}
      {selectedActivity && (
        <ActivityModal
          slide={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
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
      className={`relative w-full py-24 px-6 lg:px-10 ${dark ? 'bg-black' : 'bg-white'}`}
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
          <p className={`text-sm mb-12 max-w-xl leading-relaxed cursor-default ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A snapshot of events, organizations, and experiences that shaped who I am
            outside the code editor — from campus leadership to community involvement.
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
