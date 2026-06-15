import { motion } from 'framer-motion'
import projectImg from '../assets/project_placeholder.png'

/* ── Viewport config: repeatable on every scroll pass ──────────── */
const VP = { once: false, amount: 0.15 }

/* ── Spring transition ──────────────────────────────────────────── */
const SPRING = { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }

/* ── Project data ────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 0,
    img: projectImg,
    title: 'Multimodal AI Smart Glasses',
    subtitle: 'Real-Time Translation Framework',
    tag: 'AI / ML',
    description:
      'A framework developed for real-time translation and communication using multimodal AI. Integrates computer vision, NLP, and edge inference to enable seamless human-computer interaction via wearable hardware.',
    stack: ['Python', 'PyTorch', 'OpenCV', 'Raspberry Pi', 'Whisper AI'],
    github: 'https://github.com',
    live: null,
    year: '2024',
  },
  {
    id: 1,
    img: projectImg,
    title: 'AI-Driven Agriculture Monitoring',
    subtitle: 'Smart Farm Operations Website',
    tag: 'WEB / AI',
    description:
      'A final project website integrating AI to monitor agriculture machine operations in real time. Provides dashboards, anomaly alerts, and predictive maintenance insights for modern smart farming.',
    stack: ['Laravel', 'Python', 'TensorFlow', 'MySQL', 'Chart.js'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2024',
  },
  {
    id: 2,
    img: projectImg,
    title: 'Secure File Encryption Tool',
    subtitle: 'C++ Cybersecurity Academic Project',
    tag: 'CYBERSECURITY',
    description:
      'An academic cybersecurity tool developed purely in C++ based on strict constraints. Implements AES-256 encryption, RSA key exchange, and SHA-3 hashing for secure file transmission and storage.',
    stack: ['C++', 'OpenSSL', 'AES-256', 'RSA', 'SHA-3'],
    github: 'https://github.com',
    live: null,
    year: '2023',
  },
]

/* ── P5R Background Ornaments ────────────────────────────────────── */
function ProjectsBgOrnaments({ dark }) {
  const col     = dark ? 'rgba(220,38,38,0.18)' : 'rgba(220,38,38,0.14)'
  const colGray = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Large rotating diamond — bottom-left */}
      <motion.div
        className="absolute -bottom-28 -left-28"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 130, ease: 'linear', repeat: Infinity }}
      >
        <svg width="340" height="340" viewBox="0 0 340 340">
          <polygon
            points="170,10 330,170 170,330 10,170"
            fill="none" stroke={col} strokeWidth="14"
          />
        </svg>
      </motion.div>

      {/* Medium pentagon — top-right */}
      <motion.div
        className="absolute -top-12 -right-12"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 95, ease: 'linear', repeat: Infinity }}
      >
        <svg width="260" height="260" viewBox="0 0 260 260">
          <polygon
            points="130,10 250,100 205,240 55,240 10,100"
            fill="none" stroke={col} strokeWidth="11"
          />
        </svg>
      </motion.div>

      {/* Diagonal slash strip — left edge */}
      <div
        className="absolute top-0 left-[6%] h-full w-16 opacity-[0.16]"
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

      {/* Halftone dots — top right */}
      <div
        className="absolute top-0 right-0 w-72 h-72 opacity-[0.16]"
        style={{
          backgroundImage: `radial-gradient(circle, ${dark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '14px 14px',
        }}
      />

      {/* Oscillating accent line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ top: '55%', background: col }}
        animate={{ scaleX: [0.25, 1, 0.25], opacity: [0.25, 0.85, 0.25] }}
        transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Rotating accent box — center left */}
      <motion.div
        className="absolute top-1/3 left-[8%]"
        animate={{ rotate: [0, -45, 0] }}
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
      >
        <div className="w-14 h-14 border-4" style={{ borderColor: colGray }} />
      </motion.div>
    </div>
  )
}

/* ── Tag color map ───────────────────────────────────────────────── */
const TAG_COLORS = {
  'AI / ML':       { bg: '#7c3aed', text: '#fff' },
  'WEB / AI':      { bg: '#0891b2', text: '#fff' },
  CYBERSECURITY:   { bg: '#dc2626', text: '#fff' },
}
function tagStyle(tag) {
  const t = TAG_COLORS[tag] ?? { bg: '#dc2626', text: '#fff' }
  return { background: t.bg, color: t.text }
}

/* ── GitHub icon ─────────────────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
        0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
        -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
        .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
        -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004
        1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7
        1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
        0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484
        17.522 2 12 2z"
      />
    </svg>
  )
}

/* ── External link icon ──────────────────────────────────────────── */
function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

/* ── Project Card ────────────────────────────────────────────────── */
function ProjectCard({ project, dark, index }) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.12 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden
        ${dark ? 'bg-zinc-900' : 'bg-zinc-100'}`}
      style={{
        border: `2px solid ${dark ? '#27272a' : '#d4d4d8'}`,
      }}
    >
      {/* Image column — swaps sides on even/odd index */}
      <motion.div
        className={`relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ minHeight: '240px' }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ minHeight: '240px' }}
          draggable={false}
        />
        {/* Diagonal overlay — P5R accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isEven
              ? 'linear-gradient(135deg, rgba(220,38,38,0.18) 0%, transparent 55%)'
              : 'linear-gradient(225deg, rgba(220,38,38,0.18) 0%, transparent 55%)',
          }}
        />
        {/* Year badge */}
        <span
          className="absolute top-4 right-4 bg-black/70 text-white text-[10px]
            font-black tracking-[0.25em] uppercase px-2.5 py-1
            border border-red-600"
        >
          {project.year}
        </span>
      </motion.div>

      {/* Content column */}
      <div
        className={`flex flex-col justify-between p-8 lg:p-10
          ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div>
          {/* Tag */}
          <span
            className="inline-block text-[10px] font-black tracking-[0.2em]
              uppercase px-2.5 py-0.5 mb-4"
            style={tagStyle(project.tag)}
          >
            {project.tag}
          </span>

          {/* Title */}
          <h3
            className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase
              tracking-tight leading-tight mb-1
              ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)' }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="text-red-500 text-xs font-black tracking-[0.18em] uppercase mb-4">
            {project.subtitle}
          </p>

          {/* Red accent rule */}
          <div className="h-0.5 w-10 bg-red-600 mb-5" />

          {/* Description */}
          <p className={`text-sm leading-relaxed mb-6
            ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1
                  border transition-colors duration-150
                  ${dark
                    ? 'border-zinc-700 text-zinc-400 hover:border-red-600 hover:text-red-400'
                    : 'border-zinc-300 text-zinc-600 hover:border-red-600 hover:text-red-600'
                  }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className={`flex items-center gap-2 px-4 py-2 border-2 font-black text-xs
                tracking-widest uppercase transition-colors duration-200
                ${dark
                  ? 'border-zinc-600 text-zinc-300 hover:border-red-600 hover:text-red-500 hover:bg-red-600/10'
                  : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <GithubIcon />
              GitHub
            </motion.a>
          )}

          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live demo"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 border-2
                border-red-600 text-white font-black text-xs tracking-widest uppercase
                hover:bg-red-700 hover:border-red-700 transition-colors duration-200"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <ExternalIcon />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════════════════════ */
export default function Projects({ dark }) {
  return (
    <section
      id="projects"
      className={`relative py-24 px-6 lg:px-10
        ${dark ? 'bg-zinc-900' : 'bg-zinc-100'}`}
    >
      <ProjectsBgOrnaments dark={dark} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-red-600" />
            <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">
              Projects
            </span>
          </div>
          <h2
            className={`font-['Plus_Jakarta_Sans',sans-serif] font-black mb-4 uppercase
              tracking-tighter leading-none ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Things I've{' '}
            <span className="text-red-600">Built</span>
          </h2>
          <p className={`text-sm mb-12 max-w-xl leading-relaxed
            ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A curated selection of projects spanning AI, web development, and cybersecurity —
            each one solving a real problem with clean, purposeful code.
          </p>
        </motion.div>

        {/* ── Project cards (alternating layout) ── */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} dark={dark} index={i} />
          ))}
        </div>

        {/* ── "More on GitHub" footer link ── */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.3 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 px-7 py-3 border-2 font-black
              text-sm tracking-[0.18em] uppercase transition-colors duration-200
              ${dark
                ? 'border-red-600 text-red-500 hover:bg-red-600 hover:text-white'
                : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <GithubIcon />
            More on GitHub
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
