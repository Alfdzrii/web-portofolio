import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import heroImage from '../assets/Alfadzri.jpeg'

const PHRASES = [
  'Cyber Security Enthusiast',
  'Web Developer',
  'Artificial Intelligence Enthusiast',
  'Software Developer',
  'Digital Forensic',
]

/* ── Viewport config: repeatable on every scroll pass ─────────── */
const VP = { once: false, amount: 0.2 }

/* ── Typewriter hook ─────────────────────────────────────────── */
function useTypewriter(phrases, typeSpeed = 70, deleteSpeed = 40, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('')
  const idx      = useRef(0)
  const charIdx  = useRef(0)
  const deleting = useRef(false)
  const timer    = useRef(null)

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

/* ── P5R Background Ornaments ────────────────────────────────── */
function HeroBgOrnaments({ dark }) {
  const col = dark ? 'rgba(220,38,38,0.22)' : 'rgba(220,38,38,0.18)'
  const colGray = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'

  return (
    /* Ornaments sit behind everything — pointer-events-none, overflow clipped */
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Large slow-rotating diamond — top-left */}
      <motion.div
        className="absolute -top-24 -left-24"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
      >
        <svg width="340" height="340" viewBox="0 0 340 340">
          <polygon
            points="170,10 330,170 170,330 10,170"
            fill="none"
            stroke={col}
            strokeWidth="18"
          />
        </svg>
      </motion.div>

      {/* Medium counter-rotating triangle — bottom-right */}
      <motion.div
        className="absolute -bottom-20 -right-16"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 100, ease: 'linear', repeat: Infinity }}
      >
        <svg width="280" height="280" viewBox="0 0 280 280">
          <polygon
            points="140,10 270,260 10,260"
            fill="none"
            stroke={col}
            strokeWidth="14"
          />
        </svg>
      </motion.div>

      {/* Diagonal slash lines strip — mid right */}
      <div
        className="absolute top-0 right-[15%] h-full w-20 opacity-[0.18]"
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

      {/* Small sharp square — center-left accent */}
      <motion.div
        className="absolute top-1/2 left-[8%]"
        style={{ translateY: '-50%' }}
        animate={{ rotate: [12, 57, 12] }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
      >
        <div
          className="w-20 h-20 border-4"
          style={{ borderColor: colGray }}
        />
      </motion.div>

      {/* Tiny halftone dot grid — top right quadrant */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(circle, ${dark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '14px 14px',
        }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════════ */
export default function Hero({ dark }) {
  const text = useTypewriter(PHRASES)

  const photoShadow = dark
    ? '10px 10px 0px rgba(220,38,38,1)'
    : '10px 10px 0px rgba(0,0,0,1)'

  /* Floating loop */
  const floatAnim = {
    y: [0, -14, 0],
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
  }

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-10
        ${dark ? 'bg-zinc-950' : 'bg-white'}`}
    >
      {/* P5R background ornaments — behind content */}
      <HeroBgOrnaments dark={dark} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Photo ─────────────────────────────────────── */}
          <motion.div
            className="flex justify-center lg:justify-start order-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <motion.div
              animate={floatAnim}
              className="relative"
              style={{ willChange: 'transform' }}
            >
              {/* Red vertical accent bar */}
              <div className="absolute -top-3 -left-3 w-10 h-full bg-red-600 opacity-80 -z-10" />

              {/* Photo */}
              <div
                className="relative overflow-hidden p5-scanlines"
                style={{
                  borderRadius: 0,
                  width: 'clamp(270px, 36vw, 400px)',
                  aspectRatio: '4/5',
                  boxShadow: photoShadow,
                }}
              >
                <img
                  src={heroImage}
                  alt="Alfadzri"
                  className="w-full h-full object-cover object-top"
                />
                {/* Bottom fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
                  style={{
                    background: dark
                      ? 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                      : 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)',
                  }}
                />
              </div>

              {/* ALFADZRI watermark — z-20 ensures it sits above the P5 offset shadow */}
              <div className="absolute -bottom-3 -right-3 z-20 bg-red-600 px-3 py-1
                text-white text-xs font-black tracking-widest uppercase">
                ALFADZRI ABHIPRAYA
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Text ─────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-6 text-left order-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-red-600" />
              <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">Portfolio</span>
            </div>

            {/* Name */}
            <h1
              className="font-['Plus_Jakarta_Sans',sans-serif] font-black leading-none tracking-tighter uppercase"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)' }}
            >
              Hi, I'm{' '}
              <span className="text-red-600">Alfadzri.A</span>
            </h1>

            {/* Typewriter */}
            <div className={`text-base lg:text-lg font-black flex items-center gap-1 min-h-[2rem]
              uppercase tracking-widest ${dark ? 'text-yellow-400' : 'text-amber-500'}`}
            >
              <span>{text}</span>
              <span className="animate-blink border-r-2 border-current h-5 inline-block" />
            </div>

            {/* Bio */}
            <p className={`text-sm lg:text-base leading-relaxed max-w-lg
              ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}
            >
              I create{' '}
              <span className={`font-semibold ${dark ? 'text-zinc-100' : 'text-black'}`}>Digital Experiences</span>
              {' '}that minimalist, robust and secure. Focusing on building{' '}
              <span className={`font-semibold ${dark ? 'text-zinc-100' : 'text-black'}`}>Cyber Security and Digital Forensic</span>.
            </p>
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-1">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                id="cta-view-projects"
                className="group relative px-7 py-3 font-black text-sm text-white uppercase
                  tracking-widest bg-red-600 hover:bg-red-700 transition-all duration-200
                  hover:scale-105 shadow-[4px_4px_0px_rgba(0,0,0,0.9)]"
              >
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
                    : 'border-black text-black hover:bg-black/5'}`}
              >
                Let's Talk
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
