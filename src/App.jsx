import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github,
  Linkedin,
  Mail, 
  Download, 
  ChevronDown,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Globe,
  Phone,
  Menu,
  X
} from 'lucide-react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false) // Close mobile menu when navigating
    }
  }

  const stats = [
    { number: '7+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '20+', label: 'Companies Worked With' },
  ]

  const projects = [
    {
      title: "Project 1",
      description: "A placeholder project showcasing modern web development techniques and innovative solutions.",
      tech: ["React", "TypeScript", "Node.js", "MongoDB"],
      image: "https://placehold.co/500x300",
      link: "#"
    },
    {
      title: "Project 2",
      description: "An example project demonstrating full-stack development capabilities and best practices.",
      tech: ["Python", "Django", "PostgreSQL", "Docker"],
      image: "https://placehold.co/500x300",
      link: "#"
    },
    {
      title: "Project 3",
      description: "A showcase project highlighting data science and machine learning expertise.",
      tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      image: "https://placehold.co/500x300",
      link: "#"
    }
  ]

  const skills = {
    "Programming Languages": ["Python", "Java", "C", "JavaScript", "TypeScript", "HTML/CSS", "R", "SQL"],
    "Tools & Platforms": ["Azure DevOps", "Snowflake", "MySQL", "Databricks", "Git", "Google Cloud Platform", "VS Code", "Visual Studio", "IntelliJ", "PostgreSQL"],
    "Libraries & Frameworks": ["pandas", "NumPy", "Matplotlib", "PyTorch", "PySpark", "TensorFlow", "Tailwind", "React", "Node.js", "Django", "RESTful APIs"],
  }

  return (
    <div className="app">
      {/* Navigation */}
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
          >
            GFXTHEORY LLC
          </motion.div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <motion.button
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="gradient-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Seth Metcalf</span>
            </h1>
            <h2 className="hero-subtitle">
              Full Stack Developer & CEO
            </h2>
            <p className="hero-description">
              Passionate about creating innovative solutions. 
              Currently working at a top AI lab, with expertise in React, Python, and machine learning.
            </p>
            <div className="hero-buttons">
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-image"
          >
              <div className="floating-card">
                <div className="card-content">
                  <div className="avatar">SM</div>
                  <h3>Seth Metcalf</h3>
                  <p>Full Stack Developer & CEO</p>
                  <div className="hero-social-links">
                    <a href="https://github.com/teorii" target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/seth-metcalf" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                    </a>
                    <a href="">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>About Me</h2>
            <p>Passionate developer with a unique blend of data science and web development expertise</p>
          </motion.div>
          
          <div className="about-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="about-text"
            >
              <h3>Who I Am</h3>
              <p>
                I'm a recent graduate from UC Berkeley with a BA in Data Science and Economics, 
                currently working as a Full Stack Developer at a top AI lab in San Francisco. 
                With over 7 years of experience in web development and a strong foundation in data science, 
                I bring a unique perspective to solving complex technical challenges.
              </p>
              <p>
                My journey started with founding GFXTheory LLC in 2017, where I've worked with major 
                companies across real estate, logistics, gaming, and tech industries. I'm passionate about 
                creating innovative solutions that combine cutting-edge AI technology with practical business applications.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="stats-grid"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section bg-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Experience</h2>
            <p>My professional journey in technology and data science</p>
          </motion.div>

          <div className="timeline">
            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Full-Stack Developer</h3>
                  <span className="company">[Top AI Lab]</span>
                  <span className="duration">January 2025 - Present</span>
                </div>
                <p className="location">San Francisco, CA</p>
                <ul>
                  <li>Curated web-app data sets, purposefully injecting good and bad examples to boost internal model pass-rates; significant improvements on internal quality benchmarks.</li>
                  <li>Reviewed hundreds of React/Next.js/FastAPI codebases produced by the model, diagnosing state-management performance, accessibility issues, and modern development practices.</li>
                  <li>Led onboarding & quality reviews for over 200 contributors (10-person core team); created onboarding documents and led workshops, which shortened average onboarding time and reduced submission re-work by 30%</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Data Scientist/Finance Intern</h3>
                  <span className="company">Berkshire Hathaway Homestate Companies</span>
                  <span className="duration">June 2023 - May 2024</span>
                </div>
                <p className="location">San Francisco, CA</p>
                <ul>
                  <li>Saved the company $15k/month by using analysis of my automated reports to cut unnecessary usage of corporate cars and phones.</li>
                  <li>Utilized Databricks to explore various LLM tools used in the organization; set up LLMs, including BART, Llama, MPT, Vulcan, etc., to be used locally in order to protect client data.</li>
                  <li>Tested prompt engineering to explore several proofs of concept use cases such as loss run predictions, categorization, cleaning, legal predictions, etc.</li>
                  <li>Programmed a sentiment analysis system in Python for company emails between trusted clients, involving data cleaning, filtering, SQL, and sentiment analysis models; presented findings in PowerBI.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>CEO, Web Developer</h3>
                  <span className="company">GFXTheory LLC</span>
                  <span className="duration">August 2017 - December 2024</span>
                </div>
                <p className="location">Remote</p>
                <ul>
                  <li>Founded a design company that initially drew clients in the gaming space and eventually began contracted work for larger, more established companies (&gt; 50 Employees).</li>
                  <li>Contracted reoccurring design and development work for major real estate, freight, gaming, and tech companies, working in React, Javascript, HTML, CSS, Tailwind, Typescript, and other industry standards when needed.</li>
                  <li>Expert level experience and understanding of website design, client usability, and modern development practices.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Featured Projects</h2>
            <p>Some of my recent work and personal projects</p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <a href={project.link} className="project-link">
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section bg-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Skills & Technologies</h2>
            <p>Technologies and tools I work with</p>
          </motion.div>

          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{category}</h3>
                <div className="skill-tags">
                  {skillList.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="skill-tag"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
      </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Get In Touch</h2>
            <p>Let's work together on your next project</p>
          </motion.div>

                      <div className="contact-content">
              <div className="contact-image">
                <img src="https://placehold.co/1200x800" alt="Contact" />
              </div>
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Let's Connect</h3>
              <p>
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <Mail size={20} />
                  <a href="">placeholder</a>
                </div>
                {/* comment out phone number for now */}
                {/* <div className="contact-item">
                  <Phone size={20} />
                  <a href="tel:+">placeholder</a>
                </div> */}
                <div className="contact-item">
                  <Github size={20} />
                  <a href="https://github.com/teorii" target="_blank" rel="noopener noreferrer">github.com/teorii</a>
                </div>
                <div className="contact-item">
                  <Linkedin size={20} />
                  <a href="https://linkedin.com/in/seth-metcalf" target="_blank" rel="noopener noreferrer">linkedin.com/in/seth-metcalf</a>
                </div>
              </div>
            </motion.div>
            {/* comment out form for now */}
            {/* <motion.div
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 Seth Metcalf. All rights reserved.</p>
            <div className="footer-links">
              <a href="https://github.com/teorii" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/seth-metcalf" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
              <a href="">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
