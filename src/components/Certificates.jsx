import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ── Viewport config ────────────────────────────────────────────── */
const VP = { once: false, amount: 0.15 }

/* ── Certificate data ───────────────────────────────────────────── */
const CERTS = [
  {
    id: 0,
    title: 'Samsung Innovation Campus',
    subtitle: 'Python Programming',
    issuer: 'Samsung · Batch 7',
    date: 'November 2025',
    status: 'COMPLETED',
    statusColor: '#16a34a',   // green
    tag: 'PROGRAMMING',
    tagColor: '#7c3aed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description:
      'Completed intensive Python programming curriculum covering data structures, algorithms, and applied machine learning fundamentals.',
    accent: '#7c3aed',
  },
  {
    id: 1,
    title: 'Digital Talent Scholarship',
    subtitle: 'Kominfo Scholarship Program',
    issuer: 'Ministry of Communication · Indonesia',
    date: 'August 2025',
    status: 'REGISTERED',
    statusColor: '#0891b2',  // cyan
    tag: 'SCHOLARSHIP',
    tagColor: '#0891b2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    description:
      'Selected participant for the national Digital Talent Scholarship, focusing on cloud computing and digital infrastructure skills.',
    accent: '#0891b2',
  },
  {
    id: 2,
    title: 'International Essay Competition',
    subtitle: 'Technical Communication',
    issuer: 'International Academic Committee',
    date: 'January 2026',
    status: 'TOP 15 FINALIST',
    statusColor: '#dc2626',  // red — P5R accent
    tag: 'ACHIEVEMENT',
    tagColor: '#dc2626',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    description:
      'Ranked Top 15 Finalist globally in technical communication, recognized for clarity, research depth, and analytical writing.',
    accent: '#dc2626',
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

/* ── Certificate Card ────────────────────────────────────────────── */
function CertCard({ cert, dark }) {
  return (
    <motion.div
      className="relative flex-shrink-0 flex flex-col overflow-hidden select-none"
      style={{
        width: '300px',
        background: dark ? '#18181b' : '#ffffff',
        border: `2px solid ${dark ? '#27272a' : '#e4e4e7'}`,
        borderRadius: 0,
      }}
      whileHover={{
        y: -6,
        boxShadow: `6px 6px 0 ${cert.accent}`,
        borderColor: cert.accent,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Coloured top accent bar */}
      <div className="h-1 w-full" style={{ background: cert.accent }} />

      {/* Header: icon + tag */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div
          className="p-2.5 border"
          style={{
            color: cert.accent,
            borderColor: cert.accent + '55',
            background: cert.accent + '14',
          }}
        >
          {cert.icon}
        </div>
        <span
          className="text-[9px] font-black tracking-[0.2em] uppercase px-2 py-0.5"
          style={{ background: cert.tagColor, color: '#fff' }}
        >
          {cert.tag}
        </span>
      </div>

      {/* Title + issuer */}
      <div className="px-5 pb-3">
        <h3
          className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase
            tracking-tight leading-tight text-[1rem] mb-0.5
            ${dark ? 'text-white' : 'text-black'}`}
        >
          {cert.title}
        </h3>
        <p className="text-xs font-semibold tracking-wider uppercase mb-0.5"
          style={{ color: cert.accent }}>
          {cert.subtitle}
        </p>
        <p className={`text-[10px] ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>
          {cert.issuer}
        </p>
      </div>

      {/* Red accent divider */}
      <div className="mx-5 h-px mb-3" style={{ background: cert.accent + '40' }} />

      {/* Description */}
      <p className={`px-5 text-[11px] leading-relaxed flex-1
        ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {cert.description}
      </p>

      {/* Footer: date + status badge */}
      <div className="flex items-center justify-between px-5 py-4 mt-3">
        <div className="flex items-center gap-1.5">
          {/* Calendar icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className={`w-3.5 h-3.5 ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className={`text-[10px] font-semibold ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {cert.date}
          </span>
        </div>
        <span
          className="text-[9px] font-black tracking-[0.18em] uppercase px-2 py-0.5"
          style={{ background: cert.statusColor + '22', color: cert.statusColor, border: `1px solid ${cert.statusColor}55` }}
        >
          {cert.status}
        </span>
      </div>

      {/* Halftone corner decoration */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, ${cert.accent} 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }}
      />
    </motion.div>
  )
}

/* ── Draggable Horizontal Slider ─────────────────────────────────── */
function CertSlider({ dark }) {
  const trackRef   = useRef(null)

  /* Subtle parallax on the track itself when it scrolls into view */
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start end', 'end start'] })
  const xParallax = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <div className="w-full overflow-hidden">
      {/* Drag hint label */}
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
        Drag to explore
      </motion.div>

      {/*
        motion.div with drag="x" — framer-motion handles momentum + bounds automatically.
        dragConstraints clamps the x travel so you can't pull past the first/last card.
      */}
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ right: 0, left: -(CERTS.length - 1) * 320 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 280, bounceDamping: 32 }}
        className="flex gap-5 cursor-grab active:cursor-grabbing w-max pb-4"
        style={{ x: xParallax }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {CERTS.map((cert) => (
          <CertCard key={cert.id} cert={cert} dark={dark} />
        ))}

        {/* "More coming" ghost card */}
        <motion.div
          className="relative flex-shrink-0 flex flex-col items-center justify-center gap-3"
          style={{
            width: '200px',
            border: `2px dashed ${dark ? '#3f3f46' : '#d4d4d8'}`,
            background: 'transparent',
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
          viewport={VP}
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
            professional communication — drag to explore.
          </p>
        </motion.div>

        {/* Draggable card slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
        >
          <CertSlider dark={dark} />
        </motion.div>

      </div>
    </section>
  )
}
