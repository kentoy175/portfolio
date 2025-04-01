import { useState, useEffect } from 'react'
import './App.css'
import p1 from './image/p1.png'
import p2 from './image/p2.png'
import kvc from './image/kvc.png'
import emailjs from '@emailjs/browser'


// Projects Data
const projects = [
  {
    title: "Hire-Tech",
    description: "Connecting Skills with Opportunities! A platform where preparation and opportunity meets. Apply yourself now, and the future will open doors for you.",
    image: p1,
    technologies: ["Figma", "Material-UI",],
    features: [
      "Multi-user authentication system",
      "Job posting and application system",
      "Skill matching algorithm",
      "Real-time messaging between users",
      "Profile management and customization",
      "Advanced search and filtering",
      "Company and candidate dashboard",
    ],
    liveLink: "https://www.figma.com/design/tQKUsKIpKTQOlFwcb4LSOE/Group-2--Website?node-id=6-33&t=3govnKrdPgMsPo9y-1",
  },
  {
    title: "Trackify Website",
    description: "A modern website showcasing my projects and skills. Built with using Vite and React and featuring smooth animations, interactive components, and a clean design that highlights my work as a UI/UX designer.",
    image: p2,
    technologies: ["React", "Node.js", "Vite","MongoDB", "Express"],
    features: [
      "Smooth scrolling navigation",
      "Tracking people location",
      "Interactive project showcase with modal details",
      "Contact form with validation",
      "Tracking system"
    ],
    liveLink: "http://localhost:5173/",
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 50px
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 80 // Adjust for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
      setActiveSection(sectionId)
    }
  }

  const handleHireMe = async () => {
    try {
      // Initialize EmailJS with your public key
      emailjs.init("I0F0KG015gIxohePD"); // Replace with your actual public key

      const templateParams = {
        to_email: "kenzoh12345678910@gmail.com", // Replace with your Gmail address
        from_name: "Portfolio Website",
        message: "Someone clicked the Hire Me button on your portfolio!",
        date: new Date().toLocaleString()
      };

      await emailjs.send(
        "service_gz9cz9t", // Replace with your EmailJS service ID
        "template_fdk3fra", // Replace with your EmailJS template ID
        templateParams
      );

      alert("Thank you for your interest! I'll get back to you soon.");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending the notification. Please try again later.");
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init("I0F0KG015gIxohePD"); // Replace with your actual public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "kenzoh12345678910@gmail.com", // Replace with your Gmail address
      };

      await emailjs.send(
        "service_0ndh2br", // Replace with your EmailJS service ID
        "template_h8az2rf", // Replace with your EmailJS template ID
        templateParams
      );

      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <p>PORTFOLIO</p>
        </div>
        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              <i className="fas fa-home"></i>
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              <i className="fas fa-user"></i>
              About Me
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              <i className="fas fa-project-diagram"></i>
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              <i className="fas fa-phone"></i>
              Contact Me
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm Ken,<br />a UI UX <span className="highlight">Designer</span>.</h1>
            <p>I am a BSIT student who want's to learn more about designs and programmings from Western Institute of Technology.</p>
            <div className="button-group">
              <button className="cta-button primary-button" onClick={handleHireMe}>
                Hire me!
              </button>
              <button className="cta-button secondary-button" onClick={(e) => handleNavClick(e, 'projects')}>See My Projects</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="orbital-ring"></div>
            <div className="orbital-ring-2"></div>
            <div className="orbital-ring-3"></div>
            <img src={kvc} alt="ken" />
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="about" className="about-section">
        <div className="section-content">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="highlight-text">Who am I?</p>
              <p>I am a passionate BSIT student at Western Institute of Technology, dedicated to creating beautiful and functional user interfaces. With a keen eye for design and a love for coding, I strive to bridge the gap between user needs and innovative solutions.</p>
              
              <div className="skills-section">
                <h3>My Skills</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <i className="fab fa-html5"></i>
                    <span>HTML5</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-css3-alt"></i>
                    <span>CSS3</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-js"></i>
                    <span>JavaScript</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-react"></i>
                    <span>React</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-figma"></i>
                    <span>Figma</span>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <h3>1+</h3>
                <p>Year of Experience</p>
              </div>
              <div className="stat-item">
                <h3>2</h3>
                <p>Projects Completed</p>
              </div>
          
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="project-section">
        <div className="section-content">
          <h2>My Projects</h2>
          <div className="projects-grid">
            {/* Project Card 1 */}
            <div className="project-card" onClick={() => setActiveProject(0)}>
              <div className="project-image">
                <img src={p1} alt="Hire-Tech Project" />
              </div>
              <h3>Hire-Tech</h3>
              <p>Connecting Skills with Opportunities!</p>
              <div className="project-tech">
                <span>Figma</span>
                <span>Material-UI</span>
              </div>
              <button className="view-project-btn">View Details</button>
            </div>

            {/* Project Card 2 */}
            <div className="project-card" onClick={() => setActiveProject(1)}>
              <div className="project-image">
                <img src={p2} alt="Trackify Website" />
              </div>
              <h3>Trackify Website</h3>
              <p>Modern and responsive personal portfolio</p>
              <div className="project-tech">
                <span>React</span>
                <span>Node.js</span>
                <span>Vite</span>
                <span>MongoDB</span>
                <span>Express</span>
              </div>
              <button className="view-project-btn">View Details</button>
            </div>
          </div>
        </div>

        {/* Project Details Modal */}
        {activeProject !== null && (
          <div className="project-modal">
            <div className="modal-content">
              <button className="close-modal" onClick={() => setActiveProject(null)}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-body">
                <img src={projects[activeProject].image} alt={projects[activeProject].title} />
                <h2>{projects[activeProject].title}</h2>
                <p className="project-description">{projects[activeProject].description}</p>
                <div className="project-details">
                  <div className="detail-item">
                    <h4>Technologies Used</h4>
                    <div className="tech-stack">
                      {projects[activeProject].technologies.map((tech, index) => (
                        <span key={index}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="detail-item">
                    <h4>Key Features</h4>
                    <ul>
                      {projects[activeProject].features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="project-links">
                  <a href={projects[activeProject].liveLink} target="_blank" rel="noopener noreferrer" className="cta-button primary-button">
                    View Live
                  </a>
                 
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-content">
          <h2>Contact Me</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>Feel free to reach out to me for any questions or opportunities!</p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <p>your.email@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>Phone</h4>
                    <p>+1234567890</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Location</h4>
                    <p>Your Location</p>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
      </div>
              <button 
                type="submit" 
                className="cta-button primary-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Ken</h3>
            <p>UI/UX Designer</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <ul>
                <li><i className="fas fa-envelope"></i> kenzohshiguni@gmail.com</li>
                <li><i className="fas fa-phone"></i> +63 991 862 2571</li>
                <li><i className="fas fa-map-marker-alt"></i> Iloilo City, Philippines</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Follow Me</h4>
              <div className="footer-social">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
               
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Ken. All rights reserved.</p>
        </div>
      </footer>
      </div>
  )
}

export default App

