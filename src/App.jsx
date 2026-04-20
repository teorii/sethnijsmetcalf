import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Globe } from 'lucide-react'
import './App.css'
import resume from './assets/SethM_Resume.pdf'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu on window resize and breakpoint changes to prevent flash bug
  useEffect(() => {
    let resizeTimeout
    const handleResize = () => {
      // Immediately close menu and disable transitions during resize
      setIsMobileMenuOpen(false)
      document.body.classList.add('resizing')
      
      // Re-enable transitions after resize completes
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        document.body.classList.remove('resizing')
      }, 100)
    }

    // Use media query to detect breakpoint changes
    const mediaQuery = window.matchMedia('(max-width: 1200px)')
    const handleMediaChange = () => {
      setIsMobileMenuOpen(false)
      document.body.classList.add('resizing')
      setTimeout(() => {
        document.body.classList.remove('resizing')
      }, 100)
    }

    // Close on resize
    window.addEventListener('resize', handleResize, { passive: true })
    // Close when entering mobile breakpoint
    mediaQuery.addEventListener('change', handleMediaChange)

    // Also close immediately if we're already in mobile view
    if (mediaQuery.matches) {
      setIsMobileMenuOpen(false)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      mediaQuery.removeEventListener('change', handleMediaChange)
      clearTimeout(resizeTimeout)
      document.body.classList.remove('resizing')
    }
  }, [])

  const externalLinks = {
    resume: resume,
    linkedin: 'https://linkedin.com/in/seth-metcalf',
    github: 'https://github.com/teorii'
  }

  const handleNavigation = (section) => {
    // Handle external links
    if (externalLinks[section]) {
      window.open(externalLinks[section], '_blank')
      setIsMobileMenuOpen(false)
      return
    }
    
    // Handle internal section scrolling
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(section)
      setIsMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const projects = [
    {
      title: "Serving Good Market Check-In",
      description: "Community food market operations app: SMS OTP sign-up, check-in with shopping-group choices, and a full admin dashboard (members, schedules, check-ins, groups, blacklist). Place-in-line numbers batch-assign after each window via Supabase Edge Functions. React frontend with TanStack Query, React Hook Form, and Zod. Supabase backend with PostgreSQL and Edge Functions. Twilio for SMS OTPs.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "React Hook Form", "Zod", "Supabase", "PostgreSQL", "Edge Functions", "Twilio"],
      link: "#"
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
        "Built and maintained end-to-end bonus payment system for hundreds of contractors across Airtable, HEX, and Excel, validating and sending weekly payouts exceeding $100K.",
        "Conducted over 1,000 code reviews on pull requests and projects, giving feedback on correctness, performance, and security before being merged into production.",
        "Built performance and payout dashboards in Airtable and PowerBI to improve contractor visibility and reduce Support team work load."
      ]
    },
    {
      role: "Senior Frontend Developer, LLM Systems",
      company: "[AI Company]",
      duration: "Jan 2025 — Jul 2025",
      location: "San Francisco, CA",
      achievements: [
        "Improved accuracy and pass rates of a large-scale, chat-based code assistant by developing targeted datasets that revealed common failure patterns in React/Next.js/FastAPI tasks.",
        "Reviewed and debugged hundreds of model-generated full-stack codebases, identifying issues in state management, accessibility, and performance.",
        "Resolved model-generated bugs across Django, sympy, scikit-learn, and other libraries, refining the model’s behavior in realistic coding scenarios.",
        "Designed onboarding and review workflows for 200+ contributors, increasing throughput and output quality by ~30%."
      ]
    },
    {
      role: "Data Science Intern",
      company: "Berkshire Hathaway Homestate Companies",
      duration: "June 2023 — May 2024",
      location: "San Francisco, CA",
      achievements: [
        "Identified $15k/month in unused corporate phone and car expenses through automated reporting and presented findings directly to the CFO.",
        "Set up and evaluated LLMs (BART, Llama, MPT, Vulcan, etc.) in Databricks for internal use while maintaining strict client-data privacy.",
        "Built a sentiment-analysis system for client communications (Python + SQL) and integrated results into PowerBI dashboards used for ongoing internal monitoring."
      ]
    },
    {
      role: "Full-Stack Developer, Founder",
      company: "GFXTheory LLC",
      duration: "2017 — 2025",
      location: "Remote",
      achievements: [
        "Built and maintained production websites and design systems for clients in gaming, real estate, freight, and tech, using React, TypeScript, Tailwind, and standard web tooling.",
        "Delivered recurring development and UX work for companies with 50+ employees, focusing on usability, responsiveness, and maintainability."
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
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {['about', 'experience', 'education', 'projects', 'contact', 'resume', 'linkedin', 'github'].map((section) => (
              <button
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => handleNavigation(section)}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="section">
        <div className="container">
          <h2>Hi, I'm Seth Metcalf</h2>
          <p>
          I'm a full-stack engineer and data scientist who builds production systems end-to-end. From frontend interfaces to backend APIs, pipelines, and LLM tools. I care about shipping tools that people actually depend on.
          </p>
          <p>
          Currently, I'm a contractor software engineer at Mercor and focus on improving large LLMs, as well as building my skillset in working with AI tools. 
          </p>
          <p>
          I previously founded and ran GFXTheory LLC for eight years, designing and developing production websites and internal tools for companies across gaming, logistics, real estate, and tech.
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
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                  </a>
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
    </div>
  )
}

export default App

