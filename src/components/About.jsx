import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import pm from '../assets/PM.jpeg'
import { SKILLS } from '../data/skills'

const VP = { once: false, amount: 0.2 }
const HOME_SKILL_COUNT = 11

const SOCIALS = [
  { name: 'GitHub',   href: 'https://github.com/Alfdzrii',   d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/alfadzri-abhipraya/', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
]

function AboutBgOrnaments({ dark }) {
  const col = dark ? 'rgba(220,38,38,0.22)' : 'rgba(220,38,38,0.18)'
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute -bottom-32 -left-32"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}>
        <svg width="380" height="380" viewBox="0 0 380 380">
          <rect x="20" y="20" width="340" height="340" fill="none" stroke={col} strokeWidth="16" />
        </svg>
      </motion.div>
      <motion.div className="absolute -top-16 -right-10"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 90, ease: 'linear', repeat: Infinity }}>
        <svg width="260" height="260" viewBox="0 0 260 260">
          <polygon points="130,10 250,100 205,240 55,240 10,100" fill="none" stroke={col} strokeWidth="12" />
        </svg>
      </motion.div>
      <div className="absolute top-0 left-[6%] h-full w-16 opacity-[0.18]"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg,${dark ? '#fff' : '#000'} 0px,${dark ? '#fff' : '#000'} 1.5px,transparent 1.5px,transparent 16px)` }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-[0.18]"
        style={{ backgroundImage: `radial-gradient(circle, ${dark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '14px 14px' }} />
      <motion.div className="absolute left-0 right-0 h-px" style={{ top: '38%', background: col }}
        animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }} />
    </div>
  )
}

export default function About({ dark }) {
  const skillCard    = dark ? 'bg-zinc-800/80 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
  const resolveColor = (c) => c === '__theme__' ? (dark ? '#ffffff' : '#111111') : c
  const previewSkills = SKILLS.slice(0, HOME_SKILL_COUNT)

  return (
    <section id="about" className={`relative w-full py-24 px-6 lg:px-10 ${dark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
      <AboutBgOrnaments dark={dark} />
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-red-600" />
            <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">About Me</span>
          </div>
          <h2 className={`font-['Plus_Jakarta_Sans',sans-serif] font-black mb-12 uppercase tracking-tighter leading-none ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Passionate about <span className="text-red-600">Cyber Security</span>
          </h2>
        </motion.div>

        {/* Bio grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: bio */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            className={`space-y-5 text-base leading-loose ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <p>
              I'm a <span className={`font-black ${dark ? 'text-white' : 'text-black'}`}>Cyber Security Enthusiast</span> based
              in Indonesia. Someone who can easily lose themselves in their work, is sociable and a good team player,
              and will work on a task until they lose track of time.
            </p>
            <p>
              My interest spans across Software Development, artificial intelligence, and cyber security. I'm always
              exploring new fields at technology where these disciplines intersect to create secure, intelligent,
              and reliable systems.
            </p>
            <div className="flex items-center gap-3 pt-4">
              {SOCIALS.map(({ name, href, d }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
                  className={`p-2.5 border-2 transition-all duration-200 hover:scale-110
                    ${dark
                      ? 'text-zinc-500 border-zinc-700 hover:text-red-500 hover:border-red-600 hover:bg-red-600/10'
                      : 'text-zinc-500 border-black hover:text-red-600 hover:border-red-600'}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }} className="flex justify-center">
            <motion.div className="relative overflow-hidden"
              style={{ boxShadow: '10px 10px 0px rgba(220,38,38,1)', borderRadius: 0, border: '4px solid transparent' }}
              whileHover={{ scale: 1.05, border: '4px solid #dc2626' }}
              transition={{ duration: 0.15, ease: 'easeOut' }}>
              <img src={pm} alt="Profile" className="block w-full max-w-sm object-cover"
                style={{ aspectRatio: '4/3', display: 'block' }} draggable={false} />
            </motion.div>
          </motion.div>
        </div>

        {/* Core Skills grid (preview) */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }} className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-0.5 w-8 bg-red-600" />
            <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">Core Skills</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-6 gap-3">
            {/* Preview cards */}
            {previewSkills.map(({ name, Icon, color }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
                whileHover={{ scale: 1.05, border: '2px solid #dc2626' }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut',
                  scale: { duration: 0.15, ease: 'easeOut' }, border: { duration: 0.15, ease: 'easeOut' } }}
                className={`flex flex-col items-center gap-2 p-4 select-none ${skillCard}`}
                style={{ border: '2px solid transparent', borderRadius: 0, cursor: 'default' }}>
                <Icon style={{ color: resolveColor(color), fontSize: '2rem' }} />
                <span className="text-xs font-black uppercase tracking-wider text-center leading-tight">{name}</span>
              </motion.div>
            ))}

            {/* "More…" link cell */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 0.4, delay: HOME_SKILL_COUNT * 0.05, ease: 'easeOut' }}>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '4px 4px 0px 0px #dc2626', border: '2px solid #dc2626' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="h-full">
                <Link to="/skills" id="view-all-skills"
                  className={`flex flex-col items-center justify-center gap-2 p-4 h-full min-h-[84px]
                    font-black text-xs tracking-[0.18em] uppercase select-none transition-colors duration-150
                    ${dark
                      ? 'bg-black border-2 border-zinc-700 text-white hover:border-red-600'
                      : 'bg-black border-2 border-black text-white hover:border-red-600'}`}
                  style={{ borderRadius: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-500">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  <span>More...</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
