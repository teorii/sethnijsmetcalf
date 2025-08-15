import { useState } from 'react'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import './App.css'
import resume from './assets/SethM_August4Resume.pdf'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const handleNavigation = (section) => {
    // Handle external links
    if (section === 'resume') {
      window.open(resume, '_blank')
      return
    }
    if (section === 'linkedin') {
      window.open('https://linkedin.com/in/seth-metcalf', '_blank')
      return
    }
    if (section === 'github') {
      window.open('https://github.com/teorii', '_blank')
      return
    }
    
    // Handle internal section scrolling
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(section)
    }
  }

  const projects = [
    {
      title: "AI Poker Bot",
      description: "Intelligent poker bot using AI and poker theory. Scrapes live game data, analyzes player statistics, and executes optimal actions through LLM-powered decision making.",
      tech: ["TypeScript", "Node.js", "Express", "Puppeteer", "SQLite", "ChatGPT", "Gemini"],
      link: "https://github.com/csong2022/pokernow-gpt"
    },
    {
      title: "Risen Logistics",
      description: "Comprehensive logistics and freight forwarding website. Complete design, development, and deployment with custom branding and responsive design.",
      tech: ["React", "HTML", "CSS", "JavaScript", "GoDaddy", "Web3Forms"],
      link: "https://risencargo.com"
    },
    {
      title: "Jessica Metcalf Real Estate",
      description: "Professional real estate website with property listings, client testimonials, and SEO optimization. Complete website design with Google Analytics integration.",
      tech: ["PHP", "Wordpress", "Photoshop", "Wix", "SEO", "MySQL"],
      link: "https://www.jessicasellshomes.com/"
    }
  ]

  const experience = [
    {
      role: "Full-Stack Developer",
      company: "[Prominent AI Lab]",
      duration: "January 2025 - Present",
      location: "San Francisco, CA",
      achievements: [
        "Curated web-app data sets, injecting good and bad examples to boost internal model pass-rates",
        "Reviewed hundreds of React/Next.js/FastAPI codebases, diagnosing state-management and accessibility issues",
        "Led onboarding & quality reviews for 200+ contributors, reducing submission re-work by 30%"
      ]
    },
    {
      role: "Data Scientist/Finance Intern",
      company: "Berkshire Hathaway Homestate Companies",
      duration: "June 2023 - May 2024",
      location: "San Francisco, CA",
      achievements: [
        "Saved $15k/month by analyzing automated reports to cut unnecessary corporate car and phone usage",
        "Set up LLMs (BART, Llama, MPT, Vulcan) locally to protect client data",
        "Programmed sentiment analysis system for company emails with data cleaning and SQL"
      ]
    },
    {
      role: "CEO, Web Developer",
      company: "GFXTheory LLC",
      duration: "August 2017 - December 2024",
      location: "Remote",
      achievements: [
        "Founded design company working with major real estate, freight, gaming, and tech companies",
        "Expert level experience in React, JavaScript, TypeScript, and modern development practices",
        "Contracted recurring work for companies with 50+ employees"
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
          
          <div className="nav-links">
            {['home', 'about', 'experience', 'projects', 'contact', 'resume', 'linkedin', 'github'].map((section) => (
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
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm Seth Metcalf
            </h1>
            <p className="hero-subtitle">
              I work on AI research & full-stack development at a prominent AI lab.
            </p>
            <p className="hero-description">
              My contributions: web-app data curation, codebase reviews, contributor onboarding. 
              Previously worked on data science at Berkshire Hathaway and founded GFXTheory LLC.
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2>About me</h2>
          <p>
            I'm a recent UC Berkeley graduate with a BA in Data Science and Economics, 
            currently working as a Full-Stack Developer at a top AI lab in San Francisco. 
            With over 7 years of experience in web development and a strong foundation in data science, 
            I bring a unique perspective to solving complex technical challenges.
          </p>
          <p>
            My journey started with founding GFXTheory LLC in 2017, where I've worked with major 
            companies across real estate, logistics, gaming, and tech industries. I'm passionate about 
            creating innovative solutions that combine cutting-edge AI technology with practical business applications.
          </p>
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
