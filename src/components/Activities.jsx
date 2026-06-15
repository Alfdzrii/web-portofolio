import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

import ctrlpDoc   from '../assets/CTRLP_doc.jpg'
import ctrlpPost  from '../assets/CTRLP_poster.jpeg'
import compstud   from '../assets/Compstud.jpg'
import eo         from '../assets/EO.jpeg'
import logist     from '../assets/LOGIST.jpeg'
import mc1        from '../assets/MC.jpeg'
import mc2        from '../assets/MC2.jpeg'
import pm         from '../assets/PM.jpeg'
import pufa       from '../assets/PUFA.jpeg'

/* ── Viewport config: repeatable on every scroll pass ──────────── */
const VP = { once: false, amount: 0.15 }

/* ── Spring transition: buttery smooth, no stutter ─────────────── */
const SPRING = {
  type: 'spring',
  stiffness: 280,
  damping: 34,
  mass: 0.9,
}

/* ── Slide data ──────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    img: ctrlpDoc,
    title: 'CTRL+P Workshop',
    subtitle: 'Documentation',
    tag: 'EVENT',
    description:
      'Behind-the-scenes documentation of the CTRL+P tech workshop, capturing every key moment and outcome.',
  },
  {
    id: 1,
    img: ctrlpPost,
    title: 'CTRL+P Workshop',
    subtitle: 'Promotional Poster',
    tag: 'DESIGN',
    description:
      'Official promotional material for the CTRL+P event — bold visuals, strong call-to-action.',
  },
  {
    id: 2,
    img: compstud,
    title: 'CompStud Community',
    subtitle: 'Study Group Activity',
    tag: 'COMMUNITY',
    description:
      'Active participation in the CompStud community, fostering collaborative learning and peer mentorship.',
  },
  {
    id: 3,
    img: eo,
    title: 'Event Operations',
    subtitle: 'Organizer Role',
    tag: 'ORGANIZING',
    description:
      'Served as an event organizer, coordinating logistics and ensuring seamless execution.',
  },
  {
    id: 4,
    img: logist,
    title: 'Logistics Division',
    subtitle: 'Coordination & Supply',
    tag: 'LOGISTICS',
    description:
      'Managed logistics operations including resource allocation and on-ground coordination.',
  },
  {
    id: 5,
    img: mc1,
    title: 'Master of Ceremony',
    subtitle: 'Live Event Hosting',
    tag: 'PUBLIC SPEAKING',
    description:
      'Hosted a major campus event as MC — commanding the stage with energy and professionalism.',
  },
  {
    id: 6,
    img: mc2,
    title: 'Master of Ceremony II',
    subtitle: 'Multi-Event Hosting',
    tag: 'PUBLIC SPEAKING',
    description:
      'Second major hosting role, showcasing growth in stage presence and audience engagement.',
  },
  {
    id: 7,
    img: pm,
    title: 'Project Management',
    subtitle: 'Team Leadership',
    tag: 'LEADERSHIP',
    description:
      'Led a cross-functional student project team, applying agile methods and strategic planning.',
  },
  {
    id: 8,
    img: pufa,
    title: 'PUFA Division',
    subtitle: 'Student Union Activity',
    tag: 'ORGANIZATION',
    description:
      'Active member of the PUFA student division, contributing to campus-wide programs and initiatives.',
  },
]

/* ── P5R Background Ornaments ────────────────────────────────────── */
function ActivitiesBgOrnaments({ dark }) {
  const col     = dark ? 'rgba(220,38,38,0.20)' : 'rgba(220,38,38,0.16)'
  const colGray = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-20 -left-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 110, ease: 'linear', repeat: Infinity }}
      >
        <svg width="320" height="320" viewBox="0 0 320 320">
          <polygon
            points="160,10 295,82 295,238 160,310 25,238 25,82"
            fill="none" stroke={col} strokeWidth="14"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-16 -right-16"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
      >
        <svg width="240" height="240" viewBox="0 0 240 240">
          <rect x="15" y="15" width="210" height="210"
            fill="none" stroke={col} strokeWidth="12"
          />
        </svg>
      </motion.div>

      <div
        className="absolute top-0 right-[8%] h-full w-16 opacity-[0.18]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            ${dark ? '#fff' : '#000'} 0px,
            ${dark ? '#fff' : '#000'} 1.5px,
            transparent 1.5px,
            transparent 16px
          )`,
        }}
      />

      <div
        className="absolute top-0 left-0 w-72 h-72 opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(circle, ${dark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '14px 14px',
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ top: '62%', background: col }}
        animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />

      <motion.div
        className="absolute top-1/2 right-[10%]"
        style={{ translateY: '-50%' }}
        animate={{ rotate: [0, 45, 0] }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
      >
        <div className="w-16 h-16 border-4" style={{ borderColor: colGray }} />
      </motion.div>
    </div>
  )
}

/* ── Mobile Info Modal ───────────────────────────────────────────── */
function InfoModal({ slide, onClose }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        id="modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          className="relative w-full max-w-sm overflow-hidden"
          style={{
            background: '#18181b',
            border: '2px solid #dc2626',
            boxShadow: '8px 8px 0 #dc2626',
          }}
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.88, opacity: 0, y: 20 }}
          transition={SPRING}
          onClick={e => e.stopPropagation()}
        >
          {/* Image header */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
              }}
            />
            {/* Tag badge */}
            <span
              className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px]
                font-black tracking-[0.2em] uppercase px-2 py-0.5"
            >
              {slide.tag}
            </span>
          </div>

          {/* Body */}
          <div className="p-5 space-y-3">
            <h3 className="text-white font-black text-lg uppercase tracking-tight leading-tight">
              {slide.title}
            </h3>
            <p className="text-zinc-400 text-xs font-semibold tracking-wider uppercase">
              {slide.subtitle}
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
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

/* ── ActiveCard ──────────────────────────────────────────────────── */
/*
 * Desktop: diagonal P5R reveal on hover.
 * Mobile:  Info button that opens the InfoModal.
 */
function ActiveCard({ slide, hovered, onInfoClick }) {
  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ borderRadius: 0 }}>

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
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)',
        }}
      />

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

      {/* ── Desktop-only diagonal P5R reveal overlay ── */}
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
            position: 'absolute',
            bottom: '12%',
            right: '5%',
            maxWidth: '9rem',
            textAlign: 'right',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: hovered ? 0.2 : 0 }}
        >
          {slide.description}
        </motion.p>
      </motion.div>

      {/* ── Mobile-only Info button ── */}
      <button
        onClick={onInfoClick}
        className="absolute bottom-16 right-4 z-30 md:hidden
          bg-red-600 text-white font-black text-[11px] tracking-widest uppercase
          px-3 py-1.5 flex items-center gap-1.5
          border-2 border-white/20 hover:bg-red-700 transition-colors duration-150"
        aria-label="View description"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Info
      </button>
    </div>
  )
}

/* ── Carousel ────────────────────────────────────────────────────── */
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

  /* ── slide x-variants driven by direction ── */
  const variants = {
    enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0.6 }),
    center: ()    => ({ x: 0,   opacity: 1   }),
    exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0.6 }),
  }

  const TRACK_H = 340  // px

  return (
    <div className="flex flex-col items-center gap-6 w-full">

      {/* ── Fixed-height three-card track ── */}
      <div className="relative w-full" style={{ height: TRACK_H }}>

        {/* PREV ghost */}
        <motion.div
          key={`prev-${prevIdx}`}
          className="absolute top-1/2 left-0 cursor-pointer overflow-hidden"
          style={{
            width: '22%',
            aspectRatio: '16/9',
            borderRadius: 0,
            translateY: '-50%',
            transformOrigin: 'center center',
          }}
          animate={{ opacity: 0.45, scale: 0.75 }}
          transition={SPRING}
          onClick={prev}
          title="Previous"
        >
          <img
            src={SLIDES[prevIdx].img}
            alt={SLIDES[prevIdx].title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>

        {/* ACTIVE center card */}
        <div
          className="absolute top-0 bottom-0 overflow-hidden cursor-pointer"
          style={{
            left:  'calc(22% + 12px)',
            right: 'calc(22% + 12px)',
            borderRadius: 0,
          }}
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

          {/*
            AnimatePresence mode="popLayout":
            The exiting slide is immediately removed from layout flow so there is
            zero layout shift, then the entering slide springs into place.
          */}
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
          style={{
            width: '22%',
            aspectRatio: '16/9',
            borderRadius: 0,
            translateY: '-50%',
            transformOrigin: 'center center',
          }}
          animate={{ opacity: 0.45, scale: 0.75 }}
          transition={SPRING}
          onClick={next}
          title="Next"
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

      {/* ── Caption row (visible on desktop, hidden on mobile since modal covers it) ── */}
      <div className={`w-full max-w-3xl px-1 ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-xs lg:text-sm leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {SLIDES[index].description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Controls ── */}
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

      {/* ── Mobile Info Modal portal ── */}
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
      className={`relative py-24 px-6 lg:px-10
        ${dark ? 'bg-black' : 'bg-white'}`}
    >
      <ActivitiesBgOrnaments dark={dark} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
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
            Beyond the{' '}
            <span className="text-red-600">Keyboard</span>
          </h2>
          <p className={`text-sm mb-12 max-w-xl leading-relaxed
            ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A snapshot of events, organizations, and experiences that shaped who I am
            outside the code editor — from campus leadership to community involvement.
          </p>
        </motion.div>

        {/* Carousel */}
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
