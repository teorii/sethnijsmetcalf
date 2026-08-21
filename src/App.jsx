import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react'
import './App.css'
import resume from './assets/SethM_Resume.pdf'

const SECTIONS = ['about', 'experience', 'education', 'projects', 'contact']
const SHORTCUT_LABEL = /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'ctrl K'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [paletteIndex, setPaletteIndex] = useState(0)
  const paletteResultsRef = useRef(null)

  // Close the mobile menu when the layout crosses the breakpoint, suppressing
  // the panel transition so it does not animate mid-resize
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1200px)')
    let transitionTimeout

    const handleBreakpointChange = () => {
      setIsMobileMenuOpen(false)
      document.body.classList.add('resizing')
      clearTimeout(transitionTimeout)
      transitionTimeout = setTimeout(() => {
        document.body.classList.remove('resizing')
      }, 100)
    }

    mediaQuery.addEventListener('change', handleBreakpointChange)
    return () => {
      mediaQuery.removeEventListener('change', handleBreakpointChange)
      clearTimeout(transitionTimeout)
      document.body.classList.remove('resizing')
    }
  }, [])

  // Keep the nav highlight in sync with whichever section is most visible
  useEffect(() => {
    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean)

    const ratios = {}
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.intersectionRatio
        })
        const [id, ratio] = Object.entries(ratios).reduce((best, current) =>
          current[1] > best[1] ? current : best
        )
        if (ratio > 0) {
          setActiveSection(id)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const externalLinks = {
    resume: resume,
    linkedin: 'https://linkedin.com/in/seth-metcalf',
    github: 'https://github.com/teorii'
  }

  const navItems = [
    ...SECTIONS.map((id) => ({ id, href: `#${id}` })),
    ...Object.entries(externalLinks).map(([id, href]) => ({ id, href, external: true }))
  ]

  const paletteFilter = paletteQuery.trim().toLowerCase()
  const paletteResults = paletteFilter
    ? navItems.filter(({ id }) => id.includes(paletteFilter))
    : navItems

  // Command palette: cmd/ctrl+K from anywhere, "/" when not typing, esc to close
  useEffect(() => {
    const handleShortcut = (event) => {
      const isTyping = event.target?.closest?.('input, textarea')

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsPaletteOpen((open) => !open)
      } else if (event.key === '/' && !isTyping) {
        event.preventDefault()
        setIsPaletteOpen(true)
      } else if (event.key === 'Escape') {
        setIsPaletteOpen(false)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  // Every visit to the palette starts from a clean slate
  useEffect(() => {
    if (isPaletteOpen) {
      setPaletteQuery('')
      setPaletteIndex(0)
    }
  }, [isPaletteOpen])

  const handlePaletteKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (paletteResults.length === 0) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      setPaletteIndex((index) => (index + step + paletteResults.length) % paletteResults.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      paletteResultsRef.current?.querySelectorAll('a')[paletteIndex]?.click()
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const projects = [
    {
      title: "Serving Good Market Check-In",
      description: "Check-in system a community food market runs on-site during market hours. Members sign up and check in with an SMS code, pick a shopping group, and get a randomized place in line once the window closes. Admin side covers members, schedules, groups, messaging, blacklist, and a QR scanner.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zod", "Supabase", "PostgreSQL", "Row-Level Security", "Edge Functions", "Twilio", "Vitest"],
      link: "https://app.servinggood.org/"
    },
    {
      title: "Risen IQ",
      description: "Internal operations platform a freight forwarding company runs day to day. TMS, WMS, KPI dashboards, quote and domestic desks, SOP management, and a PWA for shift turnover. Five user roles, MFA on admin actions, audit logging, and scheduled KPI syncs from their email tooling.",
      tech: ["JavaScript", "Supabase", "PostgreSQL", "Row-Level Security", "Netlify Functions", "PWA", "Anthropic API"],
      link: null
    },
    {
      title: "BreakLedger",
      description: "Ledger app for card-break streamers and the agency that manages them. Tracks purchases, expenses, stream-by-stream profit, and payouts, with a separate workspace per streamer. Inventory is derived from transactions rather than stored, and a nightly job pulls card prices so valuations stay current.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "PostgreSQL", "Drizzle ORM", "Cloudflare Workers"],
      link: null
    },
    {
      title: "Currency Exchange Rate Tracker",
      description: "Full-stack currency tracking application with real-time exchange rates, historical data analysis, and TradingView-style interactive charts. Features automated hourly data fetching via background jobs, currency pair management, and a RESTful API. Built with FastAPI backend and React frontend with Redux state management.",
      tech: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Redux", "Tailwind CSS", "Recharts"],
      link: "https://github.com/teorii/currency-tracker"
    },
    {
      title: "Risen Logistics",
      description: "Full-stack logistics and freight forwarding website with custom branding, responsive UI, integrated contact routing, and production deployment for a live commercial client.",
      tech: ["React", "JavaScript", "CSS", "HTML", "GoDaddy", "Web3Forms"],
      link: "https://risencargo.com"
    },
    {
      title: "DCG",
      description: "Modern business site built with Next.js and server-side rendering for performance and SEO. Developed reusable components, responsive layouts, and deployment pipelines across Netlify and Cloudflare.",
      tech: ["Next.js", "TypeScript", "React", "CSS", "Cloudflare", "Netlify"],
      link: "https://dcgpros.com"
    },
    // {
    //   title: "Jessica Metcalf Real Estate",
    //   description: "Professional real estate site featuring property listings, testimonials, and lead-capture workflows. Delivered full design, development, SEO optimization, and Google Analytics integration.",
    //   tech: ["WordPress", "PHP", "CSS", "JavaScript", "SEO", "Google Analytics"],
    //   link: "http://jessicasellshomes.com/"
    // },
    {
      title: "AI Poker Bot",
      description: "Built an autonomous poker-playing agent with friends back in college that ingests live game state and makes real-time decisions using poker heuristics and LLM-based strategy. Engineered Puppeteer + PokerNow API scraping to capture player actions and board state with minimal latency. Created a SQLite-backed opponent profiling system with state validation and safety checks to ensure consistent in-game actions.",
      tech: ["TypeScript", "Node.js", "Express", "Puppeteer", "SQLite"],
      link: "https://github.com/teorii/pokernow-gpt"
    }
  ]

  const education = [
    {
      school: "University of California, Berkeley",
      degree: "B.A. in Data Science & Economics",
      duration: "Aug 2020 — May 2024",
      location: "Berkeley, CA",
      detail: "Selected coursework: Machine Learning, Probability, Econometrics, Data Structures, Statistical Prediction."
    }
  ]

  const experience = [
    {
      role: "Software Engineer",
      company: "Mercor",
      duration: "Aug 2025 — Present",
      location: "San Francisco, CA",
      achievements: [
        "Built and maintained the end-to-end bonus payment system for one of the company's larger projects, validating and sending weekly payouts exceeding $100K to hundreds of contractors across Airtable, HEX, and Excel.",
        "Designed evaluation tasks that find where frontier models break on realistic software engineering work, writing the reference implementation and scoring rubric for each.",
        "Conducted over 1,000 code reviews on pull requests and projects, giving feedback on correctness, performance, and security before being merged into production.",
        "Built performance and payout dashboards in Airtable and PowerBI to improve contractor visibility and reduce Support team workload."
      ]
    },
    {
      role: "Full-Stack Developer, Founder",
      company: "GFXTheory LLC",
      duration: "2017 — Present",
      location: "Remote",
      achievements: [
        "Shipped full-stack operations apps that businesses run on daily: customer check-in platforms, internal dashboards, and the admin tooling their teams work out of, built on Postgres with role-based access and audit logging.",
        "Built and maintained production websites and design systems for clients in gaming, real estate, freight, and tech, using React, TypeScript, Tailwind, and standard web tooling.",
        "Delivered recurring development and UX work for companies with 50+ employees, focusing on usability, responsiveness, and maintainability."
      ]
    },
    {
      role: "Senior Frontend Developer, LLM Systems",
      company: "AI Company (under NDA)",
      duration: "Jan 2025 — Jul 2025",
      location: "San Francisco, CA",
      achievements: [
        "Improved accuracy and pass rates of a large-scale, chat-based code assistant by developing targeted datasets that revealed common failure patterns in React/Next.js/FastAPI tasks.",
        "Designed onboarding and review workflows for 200+ contributors, increasing throughput and output quality by ~30%.",
        "Resolved model-generated bugs across Django, sympy, scikit-learn, and other libraries, refining the model’s behavior in realistic coding scenarios.",
        "Reviewed and debugged hundreds of model-generated full-stack codebases, identifying issues in state management, accessibility, and performance."
      ]
    },
    {
      role: "Data Science Intern",
      company: "Berkshire Hathaway Homestate Companies",
      duration: "June 2023 — May 2024",
      location: "San Francisco, CA",
      achievements: [
        "Identified $15k/month in unused corporate phone and car expenses through automated reporting and presented findings directly to the CFO.",
        "Built a sentiment-analysis system for client communications (Python + SQL) and integrated results into PowerBI dashboards used for ongoing internal monitoring.",
        "Set up and evaluated LLMs (BART, Llama, MPT, Vulcan, etc.) in Databricks for internal use while maintaining strict client-data privacy."
      ]
    }
  ]

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            seth metcalf
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'menu-open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="nav-links"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div
            id="nav-links"
            className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}
          >
            {navItems.map(({ id, href, external }) => (
              <a
                key={id}
                href={href}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                aria-current={activeSection === id ? 'true' : undefined}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {id}
              </a>
            ))}
          </div>
          <button
            className="palette-trigger"
            onClick={() => setIsPaletteOpen(true)}
            aria-label={`Open command palette, ${SHORTCUT_LABEL}`}
          >
            {SHORTCUT_LABEL}
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="about" className="section">
          <div className="container">
            <h2>Hi, I'm Seth Metcalf</h2>
            <p>
            I'm a full-stack engineer who builds production systems end-to-end: frontend interfaces, backend APIs, data pipelines, and LLM tools. I care about shipping things people actually depend on.
            </p>
            <p>
            Through GFXTheory, which I've run since 2017, I build and maintain the software small businesses run on: a check-in platform a community food market uses on-site, and an internal operations platform a freight forwarding company works out of every day. Both are live with real users, and I maintain them end to end.
            </p>
            <p>
            I've also contracted at Mercor since 2025. I built the contractor bonus payment system on one of their larger projects, which sent weekly payouts over $100K. These days I work as a software engineer designing evaluation tasks that push the limits of frontier models.
            </p>
            <div className="hero-links">
                <a href={"https://github.com/teorii"} target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                  teorii
                </a>
                <a href={"https://linkedin.com/in/seth-metcalf"} target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                  seth-metcalf
                </a>
                <a href="mailto:seth@metcalf.pro" target="_blank" rel="noopener noreferrer">
                  <Mail size={20} />
                  seth@metcalf.pro
                </a>
              </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <div className="container">
            <h2>Experience</h2>
            <div className="experience-list">
              {experience.map((job, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h3>{job.role}</h3>
                    <span className="duration">{job.duration}</span>
                  </div>
                  <div className="experience-meta">
                    <span className="company">{job.company}</span>
                    <span className="location">{job.location}</span>
                  </div>
                  <ul>
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <div className="container">
            <h2>Education</h2>
            <div className="experience-list">
              {education.map((entry, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h3>{entry.school}</h3>
                    <span className="duration">{entry.duration}</span>
                  </div>
                  <div className="experience-meta">
                    <span className="company">{entry.degree}</span>
                    <span className="location">{entry.location}</span>
                  </div>
                  <p className="education-detail">{entry.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <h2>Recent Projects</h2>
            <div className="projects-list">
              {projects.map((project, index) => (
                <div key={index} className="project-item">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} (opens in a new tab)`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <h2>Contact</h2>
            <p>Let's build something. I'm always interested in new opportunities.</p>
            <div className="contact-links">
              <a href={"https://github.com/teorii"} target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                github.com/teorii
              </a>
              <a href={"https://linkedin.com/in/seth-metcalf"} target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
                linkedin.com/in/seth-metcalf
              </a>
              <a href="mailto:seth@metcalf.pro" target="_blank" rel="noopener noreferrer">
                <Mail size={20} />
                seth@metcalf.pro
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Command Palette */}
      {isPaletteOpen && (
        <div className="palette-backdrop" onClick={() => setIsPaletteOpen(false)}>
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              className="palette-input"
              type="text"
              autoFocus
              value={paletteQuery}
              placeholder="jump to..."
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-results"
              aria-activedescendant={
                paletteResults.length ? `palette-option-${paletteIndex}` : undefined
              }
              onChange={(event) => {
                setPaletteQuery(event.target.value)
                setPaletteIndex(0)
              }}
              onKeyDown={handlePaletteKeyDown}
            />
            <ul
              className="palette-results"
              id="palette-results"
              role="listbox"
              ref={paletteResultsRef}
            >
              {paletteResults.map((item, index) => (
                <li
                  key={item.id}
                  id={`palette-option-${index}`}
                  role="option"
                  aria-selected={index === paletteIndex}
                >
                  <a
                    href={item.href}
                    className={`palette-item ${index === paletteIndex ? 'active' : ''}`}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onMouseEnter={() => setPaletteIndex(index)}
                    onClick={() => setIsPaletteOpen(false)}
                  >
                    <span>{item.id}</span>
                    <span className="palette-kind">{item.external ? 'external' : 'section'}</span>
                  </a>
                </li>
              ))}
              {paletteResults.length === 0 && <li className="palette-empty">no matches</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

