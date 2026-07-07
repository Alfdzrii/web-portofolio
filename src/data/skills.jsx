import {
  FaHtml5, FaCss3Alt, FaReact, FaJava, FaNetworkWired,
  FaSearch, FaShieldAlt, FaFileContract, FaDocker, FaPhp,
  FaAndroid, FaGithub, FaProjectDiagram, FaNodeJs, FaDatabase,
} from 'react-icons/fa'
import {
  SiLaravel, SiPython, SiCplusplus, SiLinux, SiWireshark,
  SiVite, SiNextdotjs, SiFirebase, SiTrello, SiLua,
  SiPostman, SiMysql, SiPostgresql, SiFlutter, SiBlender,
  SiUbuntu, SiKalilinux, SiFedora, SiGit, SiNodedotjs,
} from 'react-icons/si'
import { IoLogoJavascript } from 'react-icons/io5'
import { GiMagnifyingGlass, GiGamepad } from 'react-icons/gi'
import { MdSecurity } from 'react-icons/md'

/* ══════════════════════════════════════════════════════════════════
   CATEGORISED SKILL DATA
   ══════════════════════════════════════════════════════════════════ */
export const skillCategories = [
  /* ── 1. Languages ──────────────────────────────────────────────── */
  {
    id: 'languages',
    title: 'Languages',
    accent: '#F7DF1E',
    skills: [
      {
        name: 'JavaScript',
        Icon: IoLogoJavascript,
        color: '#F7DF1E',
        description: 'Dynamic scripting language that powers interactivity on the web, both on the client side and server side via Node.js.',
      },
      {
        name: 'Python',
        Icon: SiPython,
        color: '#3776AB',
        description: 'A versatile, high-level language used extensively in data science, machine learning, automation, and back-end development.',
      },
      {
        name: 'C++',
        Icon: SiCplusplus,
        color: '#00599C',
        description: 'A powerful, performance-oriented language used in systems programming, game development, and competitive programming.',
      },
      {
        name: 'Java',
        Icon: FaJava,
        color: '#ED8B00',
        description: 'A platform-independent, object-oriented language widely used in enterprise applications and backend systems.',
      },
      {
        name: 'PHP',
        Icon: FaPhp,
        color: '#777BB4',
        description: 'A widely-used server-side scripting language especially suited for web development and easily embedded into HTML.',
      },
      {
        name: 'Lua',
        Icon: SiLua,
        color: '#2C2D72',
        description: 'Scripting language primarily used for game development, scripting mechanics, and environment programming in Roblox Studio.',
      },
    ],
  },

  /* ── 2. Frontend & Mobile ──────────────────────────────────────── */
  {
    id: 'frontend',
    title: 'Frontend & Mobile',
    accent: '#61DAFB',
    skills: [
      {
        name: 'HTML',
        Icon: FaHtml5,
        color: '#E34F26',
        description: 'The standard markup language for building the structure and content of web pages. Foundation of all web development.',
      },
      {
        name: 'CSS',
        Icon: FaCss3Alt,
        color: '#1572B6',
        description: 'Stylesheet language used to describe the presentation of HTML documents, enabling responsive and visually rich layouts.',
      },
      {
        name: 'React',
        Icon: FaReact,
        color: '#61DAFB',
        description: 'A declarative, component-based JavaScript library for building fast and scalable user interfaces.',
      },
      {
        name: 'Next.js',
        Icon: SiNextdotjs,
        color: '__theme__',
        description: 'A React framework that enables server-side rendering, static site generation, and full-stack web development.',
      },
      {
        name: 'Vite',
        Icon: SiVite,
        color: '#646CFF',
        description: 'A blazing-fast modern front-end build tool that leverages native ES modules for instant server start and hot module replacement.',
      },
      {
        name: 'Flutter',
        Icon: SiFlutter,
        color: '#02569B',
        description: 'Google\'s open-source UI toolkit for building natively compiled, multi-platform applications from a single codebase using Dart.',
      },
      {
        name: 'Android Studio',
        Icon: FaAndroid,
        color: '#3DDC84',
        description: 'The official integrated development environment for Android app development, built on IntelliJ IDEA.',
      },
    ],
  },

  /* ── 3. Backend & Database ─────────────────────────────────────── */
  {
    id: 'backend',
    title: 'Backend & Database',
    accent: '#68A063',
    skills: [
      {
        name: 'Node.js',
        Icon: SiNodedotjs,
        color: '#68A063',
        description: 'A JavaScript runtime built on Chrome\'s V8 engine that allows server-side scripting and building scalable network applications.',
      },
      {
        name: 'Laravel',
        Icon: SiLaravel,
        color: '#FF2D20',
        description: 'A PHP web application framework with expressive, elegant syntax for building robust back-end APIs and full-stack apps.',
      },
      {
        name: 'Firebase',
        Icon: SiFirebase,
        color: '#FFCA28',
        description: 'Google\'s Backend-as-a-Service platform providing real-time databases, authentication, hosting, and cloud functions.',
      },
      {
        name: 'MySQL',
        Icon: SiMysql,
        color: '#4479A1',
        description: 'The world\'s most popular open-source relational database management system, widely used in web applications.',
      },
      {
        name: 'PostgreSQL',
        Icon: SiPostgresql,
        color: '#336791',
        description: 'A powerful, open-source object-relational database system with a strong reputation for reliability and data integrity.',
      },
    ],
  },

  /* ── 4. OS & Cybersecurity ─────────────────────────────────────── */
  {
    id: 'security',
    title: 'OS & Cybersecurity',
    accent: '#dc2626',
    skills: [
      {
        name: 'Linux',
        Icon: SiLinux,
        color: '#FCC624',
        description: 'An open-source Unix-like OS kernel. Essential for server administration, cybersecurity tooling, and development environments.',
      },
      {
        name: 'Ubuntu',
        Icon: SiUbuntu,
        color: '#E95420',
        description: 'A popular Debian-based Linux distribution favoured for development, servers, and desktop environments with broad community support.',
      },
      {
        name: 'Kali Linux',
        Icon: SiKalilinux,
        color: '#268BEE',
        description: 'A Debian-derived Linux distribution designed for digital forensics and penetration testing, packed with 600+ security tools.',
      },
      {
        name: 'Fedora',
        Icon: SiFedora,
        color: '#294172',
        description: 'A cutting-edge, community-supported Linux distribution sponsored by Red Hat, known for being first to ship new technologies.',
      },
      {
        name: 'Wireshark',
        Icon: SiWireshark,
        color: '#1679A7',
        description: 'The world\'s foremost network protocol analyser used to capture and browse traffic running on a computer network.',
      },
      {
        name: 'Burp Suite',
        Icon: MdSecurity,
        color: '#FF6633',
        description: 'An integrated platform for performing security testing of web applications, widely used in penetration testing.',
      },
      {
        name: 'Network Miner',
        Icon: FaNetworkWired,
        color: '#22c55e',
        description: 'A network forensic analysis tool used to capture packets and parse network traffic to reconstruct files and certificates.',
      },
      {
        name: 'Autopsy',
        Icon: GiMagnifyingGlass,
        color: '#9333ea',
        description: 'An open-source digital forensics platform used by investigators to analyse hard drives and smartphones for evidence.',
      },
      {
        name: 'FTK Imager',
        Icon: FaSearch,
        color: '#64748b',
        description: 'A forensic imaging tool used to create exact bit-by-bit copies of storage media for digital evidence preservation.',
      },
      {
        name: 'OWASP',
        Icon: FaShieldAlt,
        color: '#005A9C',
        description: 'The Open Web Application Security Project — a nonprofit that improves software security via the famous OWASP Top 10 vulnerabilities list.',
      },
      {
        name: 'ISO 27001',
        Icon: FaFileContract,
        color: '#C8A951',
        description: 'An international standard for information security management systems (ISMS), providing a framework to protect sensitive company information.',
      },
      {
        name: 'NIST CSF 2.0',
        Icon: FaShieldAlt,
        color: '#3B82F6',
        description: 'The NIST Cybersecurity Framework 2.0 — a voluntary framework that provides guidance for organisations to manage and reduce cybersecurity risk.',
      },
      {
        name: 'Octave Allegro',
        Icon: FaProjectDiagram,
        color: '#DC7633',
        description: 'A streamlined risk assessment methodology by Carnegie Mellon University, designed to be conducted quickly without deep security expertise.',
      },
    ],
  },

  /* ── 5. 3D & Game Development ──────────────────────────────────── */
  {
    id: 'gamedev',
    title: '3D & Game Development',
    accent: '#ea580c',
    skills: [
      {
        name: 'Blender',
        Icon: SiBlender,
        color: '#F5792A',
        description: 'A free and open-source 3D creation suite supporting modelling, rigging, animation, simulation, rendering, and more.',
      },
      {
        name: 'Roblox Studio',
        Icon: GiGamepad,
        color: '#e11d48',
        description: 'The official IDE for creating Roblox games and experiences, using Lua scripting to build interactive 3D worlds.',
      },
    ],
  },

  /* ── 6. Tools & Version Control ────────────────────────────────── */
  {
    id: 'tools',
    title: 'Tools & Version Control',
    accent: '#f97316',
    skills: [
      {
        name: 'Git',
        Icon: SiGit,
        color: '#F05032',
        description: 'The industry-standard distributed version control system for tracking code changes and enabling team collaboration.',
      },
      {
        name: 'GitHub',
        Icon: FaGithub,
        color: '__theme__',
        description: 'A cloud-based platform for version control and collaboration using Git, enabling teams to work together on code.',
      },
      {
        name: 'Docker',
        Icon: FaDocker,
        color: '#2496ED',
        description: 'A platform for building, shipping, and running applications in lightweight, portable containers for consistent environments.',
      },
      {
        name: 'Postman',
        Icon: SiPostman,
        color: '#FF6C37',
        description: 'An API development platform for building, testing, and documenting REST APIs with a powerful GUI-based workflow.',
      },
      {
        name: 'Trello',
        Icon: SiTrello,
        color: '#0052CC',
        description: 'A visual project management tool using boards, lists, and cards to organise tasks and workflows in an agile manner.',
      },
    ],
  },
]

/* ══════════════════════════════════════════════════════════════════
   FLAT SKILLS ARRAY — kept for About.jsx preview compatibility
   ══════════════════════════════════════════════════════════════════ */
export const SKILLS = skillCategories.flatMap((cat) => cat.skills)
