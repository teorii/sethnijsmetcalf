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
      title: "AI Poker Bot",
      description: "PokerGPT Assistant. An intelligent poker bot for PokerNow that uses ChatGPT to make real-time decisions. Built with TypeScript, integrates with live game data to analyze player behavior and execute actions using LLM-powered decision making.",
      tech: ["TypeScript", "Node.js", "Express", "Puppeteer", "SQLite", "ChatGPT"],
      link: "https://github.com/teorii/pokernow-gpt"
    },
    {
      title: "Risen Logistics",
      description: "Full-stack logistics and freight forwarding website. Built with React, featuring custom branding, responsive design, and integrated contact forms. Complete design, development, and deployment.",
      tech: ["React", "JavaScript", "CSS", "HTML", "GoDaddy", "Web3Forms"],
      link: "https://risencargo.com"
    },
    {
      title: "DCG",
      description: "Modern website built with Next.js and TypeScript. Features server-side rendering, optimized performance, and responsive design. Development build deployed on Netlify. Production deployed on Cloudflare with custom domain configuration.",
      tech: ["Next.js", "TypeScript", "React", "CSS", "Cloudflare", "Netlify"],
      link: "https://dcgpros.com"
    },
    {
      title: "Jessica Metcalf Real Estate",
      description: "Professional real estate website for San Diego area realtor. Features property listings, client testimonials, buying/selling resources, and contact integration. Complete design, development, and SEO optimization.",
      tech: ["WordPress", "PHP", "CSS", "JavaScript", "SEO", "Google Analytics"],
      link: "http://jessicasellshomes.com/"
    }
  ]

  const experience = [
    {
      role: "Data Scientist, Compensation Systems",
      company: "Mercor",
      duration: "August 2025 - November 2025",
      location: "Remote",
      achievements: [
        "Built end-to-end payment systems processing hundreds of thousands in weekly payouts",
        "Automated manual workflows with Airtable systems and SQL reconciliation",
        "Created dashboards that reduced operational support load"
      ]
    },
    {
      role: "Senior Frontend Developer, LLM Systems",
      company: "[AI Company]",
      duration: "January 2025 - July 2025",
      location: "San Francisco, CA",
      achievements: [
        "Improved code assistant accuracy by developing targeted datasets",
        "Reviewed hundreds of model-generated codebases, fixing state management and performance issues",
        "Scaled contributor workflows, increasing output quality by 30%"
      ]
    },
    {
      role: "Data Scientist/Finance Intern",
      company: "Berkshire Hathaway Homestate Companies",
      duration: "June 2023 - May 2024",
      location: "San Francisco, CA",
      achievements: [
        "Identified $15k/month in cost savings, presenting directly to CFO",
        "Deployed LLMs in Databricks while maintaining strict data privacy",
        "Built sentiment analysis system integrated into PowerBI dashboards"
      ]
    },
    {
      role: "Full-Stack Developer, Founder",
      company: "GFXTheory LLC",
      duration: "2017 - 2025",
      location: "Remote",
      achievements: [
        "Built production websites and design systems for clients across gaming, real estate, freight, and tech",
        "Delivered recurring work for companies with 50+ employees"
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
            UC Berkeley grad (Data Science & Economics) who ships production systems that move real money. 
            Built payment infrastructure processing hundreds of thousands weekly, improved AI code assistant 
            accuracy through targeted dataset engineering, and identified $15k/month in cost savings that 
            went straight to the CFO.
          </p>
          <p>
            Founded GFXTheory LLC at 17 and ran it for 8 years, delivering full-stack solutions to companies 
            with 50+ employees across gaming, real estate, freight, and tech. I combine data science rigor 
            with production engineering—automating workflows, scaling systems, and debugging complex issues 
            across the stack. Currently building impactful data products and always open to interesting problems.
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
          <h2>Projects</h2>
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
          <p>I'm always interested in new opportunities and exciting projects.</p>
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
