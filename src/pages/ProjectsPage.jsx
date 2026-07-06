import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'
import supervised from '../assets/supervised.png'
import unsupervised from '../assets/unsupervised.png'
import thisimg from '../assets/this.png'
import wazuh from '../assets/wazuh.png'
import pentest from '../assets/pentest.png'
import Keylog from '../assets/Keylogger.png'
import autopsy from '../assets/Autopsy.png'
import IDSml from '../assets/Dashboard.png'

const VP = { once: false, amount: 0.12 }

const ALL_PROJECTS = [
  {
    id: 0, img: supervised,
    title: 'Supervised Machine Learning - Classification',
    subtitle: 'K-Nearest Neighbor Algorithm',
    tag: 'AI / ML',
    description: 'Supervised machine learning classification using K-Nearest Neighbor (KNN) algorithm to classify data points based on similarity to training data.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter Notebook'],
    github: 'https://github.com/Alfdzrii/Machine-learning',
    live: null,
    year: '2025',
  },
  {
    id: 1, img: thisimg,
    title: 'Portofolio Website',
    subtitle: 'Personal Portfolio Website',
    tag: 'WEB',
    description: 'Portofolio website for showcasing projects, activities, and certificates.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/Alfdzrii/web-portofolio', live: 'https://alfadzri-abhipraya.vercel.app/', year: '2026',
  },
  {
    id: 2, img: autopsy,
    title: 'Digital Forensics Real Case Study using Autopsy',
    subtitle: 'Crimes Involving Computers and Digital Evidence',
    tag: 'CYBERSECURITY / DIGITAL FORENSICS',
    description: 'Analyzing crimes involving computers and digital evidence and using digital forensic tools to collect and analyze digital evidence to solve crimes.',
    stack: ['Autopsy', 'FTK Imager'],
    github: null, live: null, year: '2026',
  },
  {
    id: 3, img: Keylog,
    title: 'Simple Keylogger',
    subtitle: 'Simple Keylogger',
    tag: 'PYTHON',
    description: 'Simple keylogger that can capture keystrokes and save them to a file.',
    stack: ['Python'],
    github: 'https://github.com/Alfdzrii/Keylogger', live: null, year: '2024',
  },
  {
    id: 4, img: wazuh,
    title: 'Wazuh SIEM Setup in Virtual Machines',
    subtitle: 'Wazuh SIEM Setup',
    tag: 'CYBERSECURITY / SIEM TOOLS',
    description: 'Wazuh is a SIEM (Security Information and Event Management) and XDR (Extended Detection and Response) platform for unified threat detection, security monitoring, and incident response for cloud, container, and hybrid environments.',
    stack: ['Ubuntu', 'Virtual Machines', 'Wazuh', 'Kibana', 'Docker'],
    github: null,
    live: null,
    year: '2026',
  },
  {
    id: 5, img: unsupervised,
    title: 'Unsupervised Machine Learning - Clustering',
    subtitle: 'K-Means Clustering Algorithms and Analysis',
    tag: 'AI / ML',
    description: 'Unsupervised machine learning clustering with K-Means algorithm applied to a dataset to identify patterns and group data points based on similarity.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter Notebook'],
    github: 'https://github.com/Alfdzrii/Machine-learning', live: null, year: '2025',
  },
  {
    id: 6, img: pentest,
    title: 'Penetration Testing Tools',
    subtitle: 'Penetration Testing Tools',
    tag: 'CYBERSECURITY / PENETRATION TOOLS',
    description: 'Penetration testing tools to identify vulnerabilities in systems and applications.',
    stack: ['Python'],
    github: 'https://github.com/Alfdzrii/Pentest-Tools', live: null, year: '2025',
  }, {
    id: 7, img: IDSml,
    title: 'Intrusion Detection System with Machine Learning',
    subtitle: 'Intrusion Detection System',
    tag: 'CYBERSECURITY',
    description: 'Intrusion detection system that uses machine learning to detect intrusions in computer networks. can read wireshark file and detect intrusions.',
    stack: ['Python'],
    github: null, live: null, year: '2026',
  },
]

const TAG_COLORS = {
  'AI / ML':      { bg: '#7c3aed', text: '#fff' },
  'WEB / AI':     { bg: '#0891b2', text: '#fff' },
  CYBERSECURITY:  { bg: '#dc2626', text: '#fff' },
  'IOT / WEB':    { bg: '#059669', text: '#fff' },
  'DEV TOOLS':    { bg: '#d97706', text: '#fff' },
  BACKEND:        { bg: '#1d4ed8', text: '#fff' },
}
const tagStyle = (tag) => {
  const t = TAG_COLORS[tag] ?? { bg: '#dc2626', text: '#fff' }
  return { background: t.bg, color: t.text }
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function ProjectCard({ project, dark, index }) {
  const isEven = index % 2 === 0
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.55, ease: 'easeOut', delay: (index % 2) * 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden ${dark ? 'bg-zinc-900' : 'bg-zinc-100'}`}
      style={{ border: `2px solid ${dark ? '#27272a' : '#d4d4d8'}` }}>
      <motion.div
        className={`relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ minHeight: '200px' }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}>
        <img src={project.img} alt={project.title} className="w-full h-full object-cover" style={{ minHeight: '200px' }} draggable={false} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: isEven ? 'linear-gradient(135deg,rgba(220,38,38,0.18) 0%,transparent 55%)' : 'linear-gradient(225deg,rgba(220,38,38,0.18) 0%,transparent 55%)' }} />
        <span className="absolute top-3 right-3 bg-black/70 text-white text-[9px] font-black tracking-[0.25em] uppercase px-2 py-0.5 border border-red-600">
          {project.year}
        </span>
      </motion.div>
      <div className={`flex flex-col justify-between p-5 lg:p-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div>
          <span className="inline-block text-[9px] font-black tracking-[0.2em] uppercase px-2 py-0.5 mb-3" style={tagStyle(project.tag)}>{project.tag}</span>
          <h3 className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase tracking-tight leading-tight mb-1 ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}>{project.title}</h3>
          <p className="text-red-500 text-[10px] font-black tracking-[0.15em] uppercase mb-3">{project.subtitle}</p>
          <div className="h-0.5 w-8 bg-red-600 mb-3" />
          <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((tech) => (
              <span key={tech} className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 border transition-colors duration-150 ${dark ? 'border-zinc-700 text-zinc-400 hover:border-red-600 hover:text-red-400' : 'border-zinc-300 text-zinc-600 hover:border-red-600 hover:text-red-600'}`}>{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {project.github && (
            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 border-2 font-black text-[10px] tracking-widest uppercase transition-colors duration-200 ${dark ? 'border-zinc-600 text-zinc-300 hover:border-red-600 hover:text-red-500 hover:bg-red-600/10' : 'border-black text-black hover:bg-black hover:text-white'}`}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.14 }}>
              <GithubIcon /> GitHub
            </motion.a>
          )}
          {project.live && (
            <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 border-2 border-red-600 text-white font-black text-[10px] tracking-widest uppercase hover:bg-red-700 hover:border-red-700 transition-colors duration-200"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.14 }}>
              <ExternalIcon /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function PagesBgOrnaments({ dark }) {
  const col = dark ? 'rgba(220,38,38,0.15)' : 'rgba(220,38,38,0.1)'
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
      <motion.div className="absolute -top-24 -right-24"
        animate={{ rotate: [0, 360] }} transition={{ duration: 120, ease: 'linear', repeat: Infinity }}>
        <svg width="360" height="360" viewBox="0 0 360 360">
          <polygon points="180,10 350,180 180,350 10,180" fill="none" stroke={col} strokeWidth="14" />
        </svg>
      </motion.div>
      <motion.div className="absolute -bottom-20 -left-20"
        animate={{ rotate: [0, -360] }} transition={{ duration: 95, ease: 'linear', repeat: Infinity }}>
        <svg width="260" height="260" viewBox="0 0 260 260">
          <polygon points="130,8 252,80 208,200 52,200 8,80" fill="none" stroke={col} strokeWidth="11" />
        </svg>
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg,${dark ? '#fff' : '#000'} 0px,${dark ? '#fff' : '#000'} 1px,transparent 1px,transparent 18px)` }} />
    </div>
  )
}

export default function ProjectsPage() {
  const { dark, setDark } = useTheme()

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [])

  const bg = dark ? 'bg-zinc-950 text-white' : 'bg-white text-black'

  return (
    <div className={`min-h-screen font-[Inter,system-ui,sans-serif] transition-colors duration-300 ${bg}`}>
      <Navbar dark={dark} setDark={setDark} />
      <PagesBgOrnaments dark={dark} />

      <main className="relative z-10 pt-28 pb-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Back to Home — P5R styled button */}
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
                    : 'bg-black border-black text-white hover:border-red-600'
                  }`}
              >
                <FiArrowLeft
                  className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                  strokeWidth={2.8}
                />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }} className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-red-600" />
              <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">All Projects</span>
            </div>
            <h1 className={`font-['Plus_Jakarta_Sans',sans-serif] font-black uppercase tracking-tighter leading-none ${dark ? 'text-white' : 'text-black'}`}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Everything I've <span className="text-red-600">Built</span>
            </h1>
            <p className={`text-base mt-4 max-w-xl leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              A complete collection of projects spanning AI/ML, web development, cybersecurity, IoT, and more — each built to solve a real problem.
            </p>
          </motion.div>

          {/* Project grid */}
          <div className="flex flex-col gap-5">
            {ALL_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} dark={dark} index={i} />
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            className="mt-20 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut' }}>
            <motion.a
              id="github-profile-link"
              href="https://github.com/Alfdzrii"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-10 py-4 bg-black border-2 border-white text-white font-black text-sm tracking-[0.22em] uppercase overflow-hidden"
              whileHover={{ boxShadow: '6px 6px 0px 0px #dc2626', x: -3, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}>
              {/* Background slash sweep on hover */}
              <span className="absolute inset-0 w-0 group-hover:w-full bg-red-600 transition-all duration-300 ease-out" style={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }} />
              <span className="relative z-10 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                View My GitHub
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </motion.a>
          </motion.div>

        </div>
      </main>
    </div>
  )
}
