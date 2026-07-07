import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'

const VP = { once: false, amount: 0.15 }
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.55, ease: 'easeOut', delay },
})

/* ── Anti-XSS: strip any HTML/script tags from a string ──────────── */
function sanitize(str) {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

/* ── P5R Toast ───────────────────────────────────────────────────── */
function P5Toast({ message, type, onDismiss }) {
  const isErr = type === 'error'
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, skewX: '-4deg' }}
      animate={{ opacity: 1, x: 0, skewX: '0deg' }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-6 right-6 z-[200] max-w-xs pointer-events-auto"
      style={{
        background: isErr ? '#1a0000' : '#001a00',
        border: `2px solid ${isErr ? '#dc2626' : '#16a34a'}`,
        boxShadow: `6px 6px 0 ${isErr ? '#dc2626' : '#16a34a'}`,
      }}
    >
      {/* accent top bar */}
      <div className="h-1 w-full" style={{ background: isErr ? '#dc2626' : '#16a34a' }} />
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="text-lg mt-0.5">{isErr ? '⚠' : '✓'}</span>
        <div className="flex-1">
          <p className="font-black text-xs tracking-[0.18em] uppercase"
            style={{ color: isErr ? '#dc2626' : '#16a34a' }}>
            {isErr ? 'Error' : 'Success'}
          </p>
          <p className="text-xs mt-0.5 text-zinc-300 leading-relaxed">{message}</p>
        </div>
        <button onClick={onDismiss} className="text-zinc-500 hover:text-white ml-1 mt-0.5 text-sm">✕</button>
      </div>
    </motion.div>
  )
}

function ContactBgOrnaments({ dark }) {
  const col = dark ? 'rgba(220,38,38,0.18)' : 'rgba(220,38,38,0.13)'
  const colGray = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute -top-20 -left-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 110, ease: 'linear', repeat: Infinity }}>
        <svg width="280" height="280" viewBox="0 0 280 280">
          <polygon points="140,8 272,140 140,272 8,140" fill="none" stroke={col} strokeWidth="12" />
        </svg>
      </motion.div>
      <motion.div className="absolute -bottom-16 -right-16"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 90, ease: 'linear', repeat: Infinity }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          <polygon points="110,8 212,80 172,196 48,196 8,80" fill="none" stroke={col} strokeWidth="10" />
        </svg>
      </motion.div>
      <div className="absolute top-0 left-[4%] h-full w-14 opacity-[0.14]"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg,${dark ? '#fff' : '#000'} 0px,${dark ? '#fff' : '#000'} 1.5px,transparent 1.5px,transparent 16px)` }} />
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.13]"
        style={{ backgroundImage: `radial-gradient(circle,${dark ? '#fff' : '#000'} 1px,transparent 1px)`, backgroundSize: '13px 13px' }} />
      <motion.div className="absolute left-0 right-0 h-px" style={{ top: '60%', background: col }}
        animate={{ scaleX: [0.2, 1, 0.2], opacity: [0.2, 0.75, 0.2] }}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity }} />
      <motion.div className="absolute top-[30%] right-[8%]"
        animate={{ rotate: [0, 45, 0] }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}>
        <div className="w-12 h-12 border-4" style={{ borderColor: colGray }} />
      </motion.div>
    </div>
  )
}

function Field({ label, id, dark, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id}
        className={`text-[10px] font-black tracking-[0.22em] uppercase ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls = (dark) =>
  `w-full rounded-none bg-transparent border-2 px-4 py-3 text-sm font-medium outline-none transition-all duration-150 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none ${dark ? 'border-zinc-700 text-white placeholder:text-zinc-600 hover:border-zinc-500' : 'border-zinc-300 text-black placeholder:text-zinc-400 hover:border-zinc-500'}`

const INFO = [
  {
    label: 'GitHub',
    href: 'https://github.com/Alfdzrii',
    value: 'github.com/Alfdzrii',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alfadzri-abhipraya/',
    value: 'linkedin.com/in/alfadzri-abhipraya',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
]

const COOLDOWN_SECS = 60
/* reCAPTCHA v2 site key */
const RECAPTCHA_SITE_KEY = '6LcVmUgtAAAAAFNbRV5N_ymfEj8msTCE2v3VGF6E'

export default function Contact({ dark }) {
  const formRef      = useRef(null)
  const captchaRef   = useRef(null)

  const [status, setStatus]       = useState('idle')
  const [errorMsg, setErrorMsg]   = useState('')
  const [cooldown, setCooldown]   = useState(0)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaErr, setCaptchaErr]     = useState(false)
  // Toast queue
  const [toast, setToast] = useState(null) // { message, type }

  /* ── Countdown ticker ───────────────────────────────────────────── */
  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(id); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [cooldown])

  /* ── reCAPTCHA callbacks ─────────────────────────────────────────── */
  const onCaptchaChange = (token) => {
    setCaptchaToken(token)
    setCaptchaErr(false)
  }
  const onCaptchaExpired = () => {
    setCaptchaToken(null)
    setToast({ message: 'CAPTCHA expired — please verify again.', type: 'error' })
  }
  const onCaptchaError = () => {
    setCaptchaToken(null)
    setCaptchaErr(true)
    setToast({ message: 'CAPTCHA failed to load. Check your connection and try again.', type: 'error' })
  }

  /* ── Submit handler ─────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cooldown > 0 || status === 'sending') return

    /* Block send if CAPTCHA not completed */
    if (!captchaToken) {
      setCaptchaErr(true)
      setToast({ message: 'Please complete the CAPTCHA before sending.', type: 'error' })
      return
    }

    const fd      = new FormData(formRef.current)
    const name    = sanitize(fd.get('name')    || '')
    const email   = sanitize(fd.get('email')   || '')
    const subject = sanitize(fd.get('subject') || 'Portfolio Contact')
    const message = sanitize(fd.get('message') || '')

    setStatus('sending')
    setErrorMsg('')

    try {
      await emailjs.send(
        'service_yxgn7of',
        'template_iydsw3d',
        { from_name: name, from_email: email, subject, message },
        { publicKey: 'zKDHDZW11IIVfFd39' },
      )
      setStatus('success')
      formRef.current?.reset()
      setCaptchaToken(null)
      captchaRef.current?.reset()
      setCooldown(COOLDOWN_SECS)
      setToast({ message: "Message sent! I'll get back to you soon.", type: 'success' })
    } catch (err) {
      console.error('EmailJS Error:', err)
      const msg = err?.text || 'Something went wrong. Please try again.'
      setErrorMsg(msg)
      setStatus('error')
      setToast({ message: msg, type: 'error' })
      /* Reset captcha so user must re-verify */
      setCaptchaToken(null)
      captchaRef.current?.reset()
    }
  }

  const isBusy      = status === 'sending'
  const isCooling   = cooldown > 0
  const btnDisabled = isBusy || isCooling

  const btnLabel = isBusy
    ? 'Sending…'
    : isCooling
    ? `Wait ${cooldown}s…`
    : 'Send Message'

  return (
    <section id="contact" className={`relative w-full py-24 px-6 lg:px-10 ${dark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
      <ContactBgOrnaments dark={dark} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-red-600" />
            <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">Contact</span>
          </div>
          <h2 className={`font-['Plus_Jakarta_Sans',sans-serif] font-black mb-4 uppercase tracking-tighter leading-none ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Let's <span className="text-red-600">Connect</span>
          </h2>
          <p className={`text-base mb-12 max-w-xl leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Have a project in mind or just want to say hello? Drop a message below and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Info panel */}
          <motion.div className="lg:col-span-2 flex flex-col gap-8" {...fadeUp(0.1)}>
            <div className="h-0.5 w-12 bg-red-600" />
            {INFO.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} profile`}
                  className={`group flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 transition-colors duration-200
                    ${dark
                      ? 'border-zinc-700 bg-zinc-800 hover:border-red-600 hover:bg-red-600/10'
                      : 'border-zinc-200 bg-zinc-50 hover:border-red-600 hover:bg-red-50'}`}>
                  {icon}
                </a>
                <div>
                  <p className={`text-[10px] font-black tracking-[0.2em] uppercase mb-0.5 ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {label}
                  </p>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className={`text-sm font-medium transition-colors duration-150 hover:text-red-600
                      ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {value}
                  </a>
                </div>
              </div>
            ))}
            <div className={`flex items-center gap-2.5 border-l-4 border-red-600 pl-4 py-2 ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
              </span>
              <p className={`text-xs font-black tracking-wider uppercase ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Available for opportunities
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form ref={formRef} onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-5" {...fadeUp(0.2)}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Name" id="contact-name" dark={dark}>
                <input id="contact-name" name="name" type="text" required
                  placeholder="Your full name" maxLength={80} className={inputCls(dark)} />
              </Field>
              <Field label="Email" id="contact-email" dark={dark}>
                <input id="contact-email" name="email" type="email" required
                  placeholder="your@email.com" maxLength={120} className={inputCls(dark)} />
              </Field>
            </div>

            <Field label="Subject" id="contact-subject" dark={dark}>
              <input id="contact-subject" name="subject" type="text" required
                placeholder="What's this about?" maxLength={120} className={inputCls(dark)} />
            </Field>

            <Field label="Message" id="contact-message" dark={dark}>
              <textarea id="contact-message" name="message" required rows={6}
                placeholder="Tell me about your project, idea, or just say hello..."
                maxLength={2000} className={`${inputCls(dark)} resize-none`} />
            </Field>

            {/* ── reCAPTCHA v2 ──────────────────────────────────────── */}
            <div>
              <div
                className={`inline-block transition-all duration-200 ${captchaErr ? 'ring-2 ring-red-600' : ''}`}
                style={{ borderRadius: 0 }}
              >
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={onCaptchaChange}
                  onExpired={onCaptchaExpired}
                  onErrored={onCaptchaError}
                  theme={dark ? 'dark' : 'light'}
                />
              </div>
              {captchaErr && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-red-500 text-xs font-black tracking-[0.15em] uppercase"
                >
                  ⚠ CAPTCHA required — please verify you're human.
                </motion.p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              id="contact-submit"
              disabled={btnDisabled}
              className={`group self-start flex items-center gap-3 px-8 py-3.5 border-2 font-black text-sm tracking-[0.18em] uppercase transition-all duration-200
                ${btnDisabled
                  ? 'bg-zinc-700 border-zinc-600 text-zinc-400 cursor-not-allowed'
                  : 'bg-black border-black text-white cursor-pointer'}`}
              whileHover={btnDisabled ? {} : { boxShadow: '4px 4px 0px 0px #dc2626', x: -2, y: -2 }}
              whileTap={btnDisabled ? {} : { scale: 0.97 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
            >
              {!isBusy && !isCooling && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
              {isBusy && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              )}
              {btnLabel}
            </motion.button>

            {/* ── Inline feedback banners ───────────────────────────── */}
            <AnimatePresence mode="wait">
              {status === 'success' && isCooling && (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 border-l-4 border-green-500 pl-4 py-3 bg-green-500/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <div>
                    <p className="text-green-400 font-black text-xs tracking-[0.18em] uppercase">Message Sent!</p>
                    <p className={`text-xs mt-0.5 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Thanks for reaching out — I'll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div key="error"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 border-l-4 border-red-600 pl-4 py-3 bg-red-600/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <div>
                    <p className="text-red-500 font-black text-xs tracking-[0.18em] uppercase">Send Failed</p>
                    <p className={`text-xs mt-0.5 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {errorMsg || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.form>
        </div>
      </div>

      {/* ── P5R Toast Portal ──────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <P5Toast
            key={toast.message}
            message={toast.message}
            type={toast.type}
            onDismiss={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
