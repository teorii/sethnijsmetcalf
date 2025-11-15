import { useState } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react'
import './App.css'
import resume from './assets/SethM_Resume.pdf'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavigation = (section) => {
    // Handle external links
    if (section === 'resume') {
      window.open(resume, '_blank')
      setIsMobileMenuOpen(false)
      return
    }
    if (section === 'linkedin') {
      window.open('https://linkedin.com/in/seth-metcalf', '_blank')
      setIsMobileMenuOpen(false)
      return
    }
    if (section === 'github') {
      window.open('https://github.com/teorii', '_blank')
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
    {
      title: "Jessica Metcalf Real Estate",
      description: "Professional real estate site featuring property listings, testimonials, and lead-capture workflows. Delivered full design, development, SEO optimization, and Google Analytics integration.",
      tech: ["WordPress", "PHP", "CSS", "JavaScript", "SEO", "Google Analytics"],
      link: "http://jessicasellshomes.com/"
    },
    {
      title: "AI Poker Bot",
      description: "Built a real-time poker agent for PokerNow that ingests live game state, evaluates opponent behavior, and makes autonomous decisions using a mix of poker heuristics and LLM-driven strategy. Engineered a Puppeteer + API scraping pipeline for low-latency game state capture and implemented a SQLite-backed profile system with strict state validation and safety checks.",
      tech: ["TypeScript", "Node.js", "Express", "Puppeteer", "SQLite", "ChatGPT"],
      link: "https://github.com/teorii/pokernow-gpt"
    }
  ]

  const experience = [
    {
      role: "Data Scientist, Compensation Systems",
      company: "Mercor",
      duration: "August 2025 - November 2025",
      location: "Remote",
      achievements: [
        "Built and maintained compensation infrastructure processing hundreds of thousands in weekly contractor payouts.",
        "Automated manual financial workflows using Airtable systems, SQL reconciliation, and dashboarding.",
        "Designed performance and payout dashboards that improved visibility and reduced operational load."
      ]
    },
    {
      role: "Senior Frontend Developer, LLM Systems",
      company: "[AI Company]",
      duration: "January 2025 - July 2025",
      location: "San Francisco, CA",
      achievements: [
        "Improved a large-scale LLM code assistant’s accuracy by designing targeted datasets surfacing failure patterns in React/Next.js/FastAPI tasks.",
        "Reviewed and debugged hundreds of model-generated repositories, diagnosing issues in state management, accessibility, and backend integration.",
        "Built contributor workflows and review processes that increased throughput and quality by ~30%."
      ]
    },
    {
      role: "Data Scientist/Finance Intern",
      company: "Berkshire Hathaway Homestate Companies",
      duration: "June 2023 - May 2024",
      location: "San Francisco, CA",
      achievements: [
        "Identified $15k/month in unused corporate expenses through automated reporting delivered to the CFO.",
        "Evaluated and deployed internal LLMs (BART, Llama, MPT, Vulcan) in Databricks while maintaining strict data-privacy constraints.",
        "Built a sentiment-analysis pipeline for client communications and surfaced insights through PowerBI dashboards."
      ]
    },
    {
      role: "Full-Stack Developer, Founder",
      company: "GFXTheory LLC",
      duration: "2017 - 2025",
      location: "Remote",
      achievements: [
        "Built production websites, design systems, and internal tools for clients across gaming, freight, real estate, and tech.",
        "Delivered recurring engineering and UX work for companies with 50+ employees, with an emphasis on reliability and maintainability."
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
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {['about', 'experience', 'projects', 'contact', 'resume', 'linkedin', 'github'].map((section) => (
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
          I'm a full-stack engineer and data scientist who builds production systems end-to-end — from frontend interfaces to backend APIs, pipelines, and LLM evaluation workflows. I care about shipping tools that people actually depend on.
          </p>
          <p>
          Recently, I built compensation infrastructure that processes hundreds of thousands of dollars in weekly payouts, engineered targeted datasets that improved a large code-assistant model's pass rate, and uncovered $15k/month in operational savings through automated reporting. I specialize in diagnosing failure points, automating messy workflows, and scaling systems that started as prototypes.
          </p>
          <p>
          Before that, I ran GFXTheory LLC for eight years, designing and developing production websites and internal tools for companies across gaming, logistics, real estate, and tech. Always open to new opportunies.
          </p>
          <div className="hero-links">
              <a href="https://github.com/teorii" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                github
              </a>
              <a href="https://linkedin.com/in/seth-metcalf" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
                linkedin
              </a>
              <a href="mailto:smetcalf@berkeley.edu" target="_blank" rel="noopener noreferrer">
                <Mail size={20} />
                smetcalf@berkeley.edu
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
                  <span className="company">{job.company}</span>
                  <span className="duration">{job.duration}</span>
                </div>
                <p className="location">{job.location}</p>
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
            <a href="https://github.com/teorii" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
              github.com/teorii
            </a>
            <a href="https://linkedin.com/in/seth-metcalf" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
              linkedin.com/in/seth-metcalf
            </a>
            <a href="mailto:smetcalf@berkeley.edu" target="_blank" rel="noopener noreferrer">
              <Mail size={20} />
              smetcalf@berkeley.edu
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
