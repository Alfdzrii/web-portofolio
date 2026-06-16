import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { createPortal } from 'react-dom'

import placeholder from '../assets/project_placeholder.png'

/* ── Viewport config ────────────────────────────────────────────── */
const VP     = { once: false, amount: 0.15 }
const SPRING = { type: 'spring', stiffness: 280, damping: 34, mass: 0.9 }

/* ── Certificate data ───────────────────────────────────────────── */
const CERTS = [
  {
    id: 0,
    title: 'Samsung Innovation Campus',
    subtitle: 'Python Programming',
    issuer: 'Samsung · Batch 7',
    date: 'November 2025',
    status: 'COMPLETED',
    statusColor: '#16a34a',
    tag: 'PROGRAMMING',
    tagColor: '#7c3aed',
    description:
      'Completed intensive Python programming curriculum covering data structures, algorithms, and applied machine learning fundamentals.',
    accent: '#7c3aed',
    img: placeholder,
  },
  {
    id: 1,
    title: 'Digital Talent Scholarship',
    subtitle: 'Kominfo Scholarship Program',
    issuer: 'Ministry of Communication · Indonesia',
    date: 'August 2025',
    status: 'REGISTERED',
    statusColor: '#0891b2',
    tag: 'SCHOLARSHIP',
    tagColor: '#0891b2',
    description:
      'Selected participant for the national Digital Talent Scholarship, focusing on cloud computing and digital infrastructure skills.',
    accent: '#0891b2',
    img: placeholder,
  },
  {
    id: 2,
    title: 'International Essay Competition',
    subtitle: 'Technical Communication',
    issuer: 'International Academic Committee',
    date: 'January 2026',
    status: 'TOP 15 FINALIST',
    statusColor: '#dc2626',
    tag: 'ACHIEVEMENT',
    tagColor: '#dc2626',
    description:
      'Ranked Top 15 Finalist globally in technical communication, recognized for clarity, research depth, and analytical writing.',
    accent: '#dc2626',
    img: placeholder,
  },
]

/* ── P5R Background Ornaments ────────────────────────────────────── */
function CertsBgOrnaments({ dark }) {
  const col     = dark ? 'rgba(220,38,38,0.18)' : 'rgba(220,38,38,0.13)'
  const colGray = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Rotating triangle — top-right */}
      <motion.div className="absolute -top-16 -right-16"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 100, ease: 'linear', repeat: Infinity }}>
        <svg width="280" height="280" viewBox="0 0 280 280">
          <polygon points="140,10 270,255 10,255"
            fill="none" stroke={col} strokeWidth="12" />
        </svg>
      </motion.div>
      {/* Rotating square — bottom-left */}
      <motion.div className="absolute -bottom-20 -left-20"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 85, ease: 'linear', repeat: Infinity }}>
        <svg width="260" height="260" viewBox="0 0 260 260">
          <rect x="15" y="15" width="230" height="230"
            fill="none" stroke={col} strokeWidth="12" />
        </svg>
      </motion.div>
      {/* Diagonal slash strip */}
      <div className="absolute top-0 right-[10%] h-full w-12 opacity-[0.15]"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg,${dark?'#fff':'#000'} 0px,${dark?'#fff':'#000'} 1.5px,transparent 1.5px,transparent 14px)` }} />
      {/* Halftone bottom-right */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.15]"
        style={{ backgroundImage: `radial-gradient(circle,${dark?'#fff':'#000'} 1px,transparent 1px)`, backgroundSize: '13px 13px' }} />
      {/* Oscillating line */}
      <motion.div className="absolute left-0 right-0 h-px" style={{ top: '50%', background: col }}
        animate={{ scaleX: [0.2, 1, 0.2], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }} />
      {/* Rotating diamond */}
      <motion.div className="absolute top-1/3 left-[5%]"
        animate={{ rotate: [0, 45, 0] }}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity }}>
        <div className="w-12 h-12 border-4" style={{ borderColor: colGray }} />
      </motion.div>
    </div>
  )
}

/* ── Lightbox Modal ──────────────────────────────────────────────── */
function LightboxModal({ cert, onClose }) {
  return createPortal(
    <AnimatePresence>
      {/* Backdrop — click to close */}
      <motion.div
        key="cert-backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      >
        {/* Modal panel — stop propagation so clicking inside doesn't close */}
        <motion.div
          key="cert-modal"
          className="relative w-full max-w-4xl overflow-hidden"
          style={{
            background: '#0f0f0f',
            border: '2px solid #dc2626',
            boxShadow: '10px 10px 0 #dc2626',
          }}
          initial={{ scale: 0.84, opacity: 0, y: 32 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.84, opacity: 0, y: 32 }}
          transition={SPRING}
          onClick={e => e.stopPropagation()}
        >
          {/* Coloured top accent bar */}
          <div className="h-1 w-full" style={{ background: cert.accent }} />

          {/* Main certificate image — full-size, readable */}
          <div className="relative w-full bg-zinc-950 flex items-center justify-center"
            style={{ minHeight: '300px', maxHeight: '65vh' }}>
            <img
              src={cert.img}
              alt={cert.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: '65vh' }}
              draggable={false}
            />
            {/* Tag badge overlay */}
            <span
              className="absolute bottom-3 left-3 text-white text-[10px] font-black
                tracking-[0.22em] uppercase px-2 py-0.5"
              style={{ background: cert.tagColor }}
            >
              {cert.tag}
            </span>
          </div>

          {/* Info footer */}
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-0.5">
              <h3 className="text-white font-black uppercase tracking-tight text-base leading-tight
                font-['Plus_Jakarta_Sans',sans-serif]">
                {cert.title}
              </h3>
              <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: cert.accent }}>
                {cert.subtitle}
              </p>
              <p className="text-zinc-500 text-[11px]">{cert.issuer}</p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Date */}
              <span className="text-zinc-500 text-[10px] font-semibold">{cert.date}</span>
              {/* Status badge */}
              <span
                className="text-[9px] font-black tracking-[0.18em] uppercase px-2 py-0.5"
                style={{
                  background: cert.statusColor + '22',
                  color: cert.statusColor,
                  border: `1px solid ${cert.statusColor}55`,
                }}
              >
                {cert.status}
              </span>
            </div>
          </div>

          {/* Description strip */}
          <div className="px-6 pb-5">
            <div className="h-px mb-3" style={{ background: cert.accent + '35' }} />
            <p className="text-zinc-400 text-sm leading-relaxed">{cert.description}</p>
          </div>

          {/* Close button — P5R sharp style, top-right */}
          <button
            onClick={onClose}
            aria-label="Close certificate lightbox"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center
              bg-black/70 text-white font-black text-sm border border-zinc-700
              hover:bg-red-600 hover:border-red-600 transition-colors duration-150
              backdrop-blur-sm"
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

/* ── Certificate Thumbnail Card ──────────────────────────────────── */
function CertCard({ cert, dark, onOpen }) {
  return (
    <motion.div
      className="relative flex-shrink-0 overflow-hidden select-none cursor-pointer"
      style={{
        width: '280px',
        border: `2px solid ${dark ? '#27272a' : '#e4e4e7'}`,
        borderRadius: 0,
        background: dark ? '#0f0f0f' : '#f4f4f5',
      }}
      whileHover={{
        scale: 1.02,
        x: -2,
        y: -2,
        boxShadow: `8px 8px 0 #dc2626`,
        borderColor: cert.accent,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={() => onOpen(cert)}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen(cert)}
      aria-label={`View certificate: ${cert.title}`}
    >
      {/* Accent top bar */}
      <div className="h-1 w-full" style={{ background: cert.accent }} />

      {/* Thumbnail image */}
      <div className="relative w-full overflow-hidden bg-zinc-900" style={{ height: '176px' }}>
        <img
          src={cert.img}
          alt={cert.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 55%)' }}
        />
        {/* Tag badge */}
        <span
          className="absolute bottom-2.5 left-2.5 text-white text-[9px] font-black
            tracking-[0.22em] uppercase px-2 py-0.5"
          style={{ background: cert.tagColor }}
        >
          {cert.tag}
        </span>
        {/* Zoom / expand hint */}
        <motion.div
          className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center
            bg-black/60 border border-white/20 text-white backdrop-blur-sm"
          style={{ borderRadius: 0 }}
          whileHover={{ background: '#dc2626', borderColor: '#dc2626' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="w-3.5 h-3.5">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3"  y1="21" x2="10" y2="14" />
          </svg>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="px-4 py-3.5">
        <h3
          className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase
            tracking-tight leading-tight text-[0.9rem] mb-0.5
            ${dark ? 'text-white' : 'text-black'}`}
        >
          {cert.title}
        </h3>
        <p className="text-[10px] font-semibold tracking-wider uppercase mb-0.5"
          style={{ color: cert.accent }}>
          {cert.subtitle}
        </p>
        <p className="text-[10px] text-zinc-500">{cert.issuer}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 pb-3.5">
        <span className="text-[10px] font-semibold text-zinc-500">{cert.date}</span>
        <span
          className="text-[9px] font-black tracking-[0.18em] uppercase px-2 py-0.5"
          style={{
            background: cert.statusColor + '22',
            color: cert.statusColor,
            border: `1px solid ${cert.statusColor}55`,
          }}
        >
          {cert.status}
        </span>
      </div>

      {/* Halftone corner decoration */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage: `radial-gradient(circle, ${cert.accent} 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }}
      />
    </motion.div>
  )
}

/* ── Draggable Horizontal Slider ─────────────────────────────────── */
function CertSlider({ dark, onOpenCert }) {
  const trackRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start end', 'end start'] })
  const xParallax = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <div className="w-full overflow-hidden">
      {/* Drag hint */}
      <motion.div
        className={`flex items-center gap-2 mb-4 text-xs font-black tracking-[0.2em]
          uppercase ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VP}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
        </svg>
        Drag to explore · Click to expand
      </motion.div>

      {/* Draggable track */}
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ right: 0, left: -(CERTS.length - 1) * 300 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 280, bounceDamping: 32 }}
        className="flex gap-5 cursor-grab active:cursor-grabbing w-max pb-4"
        style={{ x: xParallax }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {CERTS.map((cert) => (
          <CertCard key={cert.id} cert={cert} dark={dark} onOpen={onOpenCert} />
        ))}

        {/* Ghost "More coming" card */}
        <motion.div
          className="relative flex-shrink-0 flex flex-col items-center justify-center gap-3"
          style={{
            width: '180px',
            minHeight: '280px',
            border: `2px dashed ${dark ? '#3f3f46' : '#d4d4d8'}`,
            background: 'transparent',
            borderRadius: 0,
          }}
          whileHover={{ borderColor: '#dc2626', scale: 1.02 }}
          transition={{ duration: 0.18 }}
        >
          <div className={`text-4xl font-black ${dark ? 'text-zinc-700' : 'text-zinc-300'}`}>+</div>
          <p className={`text-[10px] font-black tracking-[0.2em] uppercase text-center px-4
            ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>
            More<br />Coming Soon
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll progress indicator */}
      <div className={`h-0.5 w-full mt-1 ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
        <motion.div
          className="h-full bg-red-600"
          style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CERTIFICATES SECTION
═══════════════════════════════════════════════════════════════════ */
export default function Certificates({ dark }) {
  const [activeCert, setActiveCert] = useState(null)

  return (
    <section
      id="certificates"
      className={`relative py-20 px-6 lg:px-10 overflow-hidden
        ${dark ? 'bg-black' : 'bg-white'}`}
    >
      <CertsBgOrnaments dark={dark} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-red-600" />
            <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">
              Certificates
            </span>
          </div>
          <h2
            className={`font-['Plus_Jakarta_Sans',sans-serif] font-black mb-4 uppercase
              tracking-tighter leading-none ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Earned &amp; <span className="text-red-600">Recognized</span>
          </h2>
          <p className={`text-sm mb-10 max-w-xl leading-relaxed
            ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Credentials that validate my skills across programming, AI, and
            professional communication — drag to explore, click to expand.
          </p>
        </motion.div>

        {/* Draggable card slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
        >
          <CertSlider dark={dark} onOpenCert={setActiveCert} />
        </motion.div>

      </div>

      {/* Lightbox */}
      {activeCert && (
        <LightboxModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  )
}
