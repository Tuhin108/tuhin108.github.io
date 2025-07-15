// Main JavaScript file for portfolio functionality
class PortfolioApp {
  constructor() {
    this.profileData = null
    this.isLoading = true
    this.currentTheme = localStorage.getItem("theme") || "light"

    this.init()
  }

  async init() {
    try {
      // Set initial theme
      this.setTheme(this.currentTheme)

      // Load profile data
      await this.loadProfileData()

      // Initialize components
      this.initializeParticles()
      this.initializeTypewriter()
      this.initializeScrollAnimations()
      this.initializeNavigation()
      this.initializeThemeToggle()
      this.initializeDashboard()
      this.initializeLazyLoading()

      // Populate content
      this.populateContent()

      // Hide loading screen
      this.hideLoadingScreen()
    } catch (error) {
      console.error("Failed to initialize portfolio:", error)
      this.hideLoadingScreen()
    }
  }

  async loadProfileData() {
    try {
      const response = await fetch("data/profile.json")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      this.profileData = await response.json()
    } catch (error) {
      console.warn("Could not load profile.json, using fallback data:", error)
      // Enhanced fallback data
      this.profileData = {
        name: "Tuhin Kumar Singha Roy",
        about:
          "Highly motivated and results-driven Computer Science Engineering Student specializing in Artificial Intelligence and Machine Learning, with a strong foundation in Data Analytics and Cloud technologies. Eager to leverage expertise in developing AI-powered solutions, optimizing data-driven strategies, and contributing to digital transformation initiatives.",
        contact: {
          email: "tuhinkumarsingharoy2001@gmail.com",
          phone: "+91 9564825493",
          linkedin: "https://linkedin.com/in/tuhininaiml",
          github: "https://github.com/Tuhin108",
        },
        education: [
          {
            institution: "MCKV Institute of Engineering",
            degree: "B.Tech in Computer Science and Engineering (AI and ML)",
            duration: "2022-2026",
            cgpa: "8.07",
            location: "Liluah, West Bengal",
          },
        ],
        experience: [
          {
            company: "Hive Tech",
            position: "Artificial Intelligence / Machine Learning Intern",
            duration: "Jan 2025 - Present",
            type: "Internship",
            description:
              "Developed and trained diverse AI, ML, and Deep Learning models, including LLMs, contributing to early-stage AI solution development. Gained practical experience deploying models on AWS, while maintaining documentation and building prototypes.",
          },
          {
            company: "Edunet Foundation",
            position: "Artificial Intelligence / Machine Learning Intern",
            duration: "Dec 2024 - Feb 2025",
            type: "Internship",
            description:
              "Developed CNN for plant disease detection (38 classes, 85%+ accuracy; processed 63,000+ images). Built & deployed (Flask) ML pipelines for crop/fertilizer recommendation (90% accuracy; trained on 1000+ records).",
          },
        ],
        skills: [
          { name: "Python", level: 95, category: "Programming Languages" },
          { name: "Machine Learning", level: 90, category: "AI/ML" },
          { name: "Deep Learning", level: 85, category: "AI/ML" },
          { name: "TensorFlow", level: 85, category: "AI/ML Frameworks" },
          { name: "Natural Language Processing", level: 80, category: "AI/ML" },
          { name: "Computer Vision", level: 80, category: "AI/ML" },
          { name: "AWS", level: 75, category: "Cloud Platforms" },
          { name: "Flask", level: 85, category: "Web Frameworks" },
          { name: "Streamlit", level: 90, category: "Web Frameworks" },
          { name: "JavaScript", level: 70, category: "Programming Languages" },
          { name: "SQL", level: 75, category: "Databases" },
          { name: "Docker", level: 65, category: "DevOps" },
        ],
        projects: [
          {
            title: "AI-Powered Email Spam Classifier",
            description:
              "Developed an interactive web application that classifies email content as Spam or Not Spam using Google's Gemini LLM API. Engineered structured prompts with few-shot examples to extract JSON-based AI output including classification, confidence score, reasoning, and risk level.",
            technologies: ["Python", "Streamlit", "Gemini LLM", "Prompt Engineering"],
            github: "https://github.com/Tuhin108/email-spam-classifier",
            demo: null,
            image: null,
            featured: true,
          },
          {
            title: "InterviewGPT – AI Mock Interview",
            description:
              "Built a web app that generates role-based interview questions and evaluates spoken/text answers using Gemini LLM with JSON-based feedback and scoring. Integrated voice input, real-time feedback, and result visualization.",
            technologies: ["Flask", "Gemini LLM", "HTML/CSS", "JavaScript", "Prompt Engineering"],
            github: "https://github.com/Tuhin108/interview-gpt",
            demo: null,
            image: null,
            featured: true,
          },
          {
            title: "Plant Disease Detection System using CNN",
            description:
              "Developed a CNN-based model to classify 38 plant disease classes with 85%+ accuracy. Processed 63,000+ plant leaf images for training and evaluation, deployed using Streamlit for real-time predictions.",
            technologies: ["Python", "TensorFlow", "CNN", "Streamlit", "OpenCV"],
            github: "https://github.com/Tuhin108/plant-disease-detection",
            demo: null,
            image: null,
            featured: true,
          },
          {
            title: "Crop and Fertilizer Recommendation System",
            description:
              "Built separate ML pipelines using Random Forest for crop and fertilizer prediction with 90% accuracy. Trained on 1000+ agricultural records using features like soil type, temperature, and humidity. Deployed via Flask to support smart farming.",
            technologies: ["Python", "Random Forest", "Flask", "Machine Learning"],
            github: "https://github.com/Tuhin108/crop-fertilizer-recommendation",
            demo: null,
            image: null,
            featured: true,
          },
          {
            title: "Farmer-Friend (AI Assistant)",
            description:
              "Built an AI-powered recommendation system to assist farmers in selecting the best and most profitable crops based on location and suitable fertilizers based on soil components. Used Mistral API for intelligent recommendations.",
            technologies: ["Python", "Mistral API", "NLP", "Streamlit", "Flask"],
            github: "https://github.com/Tuhin108/farmer-friend",
            demo: null,
            image: null,
            featured: false,
          },
          {
            title: "AI Chatbot",
            description:
              "Developed an interactive chatbot using Mistral API, Flask, and Python, enabling real-time responses. Integrated NLP techniques for improved context-aware conversations and user engagement.",
            technologies: ["Python", "Mistral API", "NLP", "Streamlit", "Flask"],
            github: "https://github.com/Tuhin108/ai-chatbot",
            demo: null,
            image: null,
            featured: false,
          },
        ],
        certifications: [
          {
            name: "Introduction to Business Intelligence",
            issuer: "Infosys Springboard",
            date: "June 2025",
            skills: ["BI", "Data Warehouse", "OLAP", "OLTP"],
          },
          {
            name: "Introduction to Artificial Intelligence",
            issuer: "Infosys Springboard",
            date: "June 2025",
            skills: ["AI", "Supervised Learning", "Unsupervised Learning"],
          },
          {
            name: "Introduction to Natural Language Processing",
            issuer: "Infosys Springboard",
            date: "June 2025",
            skills: ["NLP", "Deep Learning"],
          },
          {
            name: "Getting Started with Artificial Intelligence",
            issuer: "IBM",
            date: "March 2025",
            skills: ["AI Applications", "Generative AI", "Prompt Engineering"],
          },
        ],
        achievements: [
          {
            title: "SIH2024 Team Leader",
            description:
              "Directed a successful team effort which won the College Internal Hackathon. Developed an application that increased sales process efficiency for farmers.",
            date: "2024",
          },
          {
            title: "Brain Verse 2025 - 2nd Place",
            description: "Secured 2nd Place in Brainverse Competition (Intra-College) as Team Leader.",
            date: "2025",
          },
          {
            title: "Intra-College Football Champion",
            description: "Won 2025 Intra-College Football Tournament as team member.",
            date: "2025",
          },
        ],
      }
    }
  }

  populateContent() {
    if (!this.profileData) return

    const data = this.profileData

    // Header
    document.getElementById("header-name").textContent = data.name
    document.getElementById("header-tagline").textContent = data.tagline

    // Hero section
    document.getElementById("hero-name").textContent = data.name
    document.getElementById("hero-description").textContent = data.about

    // About section
    document.getElementById("about-description").textContent = data.about
    document.getElementById("projects-count").textContent = data.projects.length
    document.getElementById("skills-count").textContent = data.skills.length

    // Contact section
    document.getElementById("contact-email").textContent = data.contact.email
    document.getElementById("contact-phone").textContent = data.contact.phone
    document.getElementById("contact-linkedin").href = data.contact.linkedin
    document.getElementById("contact-linkedin").textContent = data.contact.linkedin.replace("https://", "")
    document.getElementById("contact-github").href = data.contact.github
    document.getElementById("contact-github").textContent = data.contact.github.replace("https://", "")

    // Populate all sections
    this.populateSkills(data.skills)
    this.populateEducation(data.education)
    this.populateExperience(data.experience)
    this.populateProjects(data.projects)
    this.populateCertifications(data.certifications)
    this.populateAchievements(data.achievements)
  }

  populateEducation(education) {
    const educationList = document.getElementById("education-list")
    educationList.innerHTML = education
      .map(
        (edu) => `
      <div class="timeline-item fade-in">
        <div class="timeline-marker">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h4>${edu.degree}</h4>
            <span class="timeline-date">${edu.duration}</span>
          </div>
          <h5>${edu.institution}</h5>
          <p class="timeline-location">📍 ${edu.location}</p>
          <div class="timeline-detail">
            <span class="cgpa-badge">CGPA: ${edu.cgpa}</span>
          </div>
        </div>
      </div>
    `,
      )
      .join("")
  }

  populateExperience(experience) {
    const experienceTimeline = document.getElementById("experience-timeline")
    experienceTimeline.innerHTML = experience
      .map(
        (exp, index) => `
      <div class="experience-item fade-in" style="animation-delay: ${index * 0.2}s">
        <div class="experience-marker">
          <i class="fas fa-briefcase"></i>
        </div>
        <div class="experience-content">
          <div class="experience-header">
            <div class="experience-title">
              <h4>${exp.position}</h4>
              <span class="experience-type">${exp.type}</span>
            </div>
            <span class="experience-date">${exp.duration}</span>
          </div>
          <h5 class="company-name">${exp.company}</h5>
          <p class="experience-description">${exp.description}</p>
        </div>
      </div>
    `,
      )
      .join("")
  }

  populateCertifications(certifications) {
    const certificationsGrid = document.getElementById("certifications-grid")
    certificationsGrid.innerHTML = certifications
      .map(
        (cert, index) => `
      <div class="certification-card fade-in" style="animation-delay: ${index * 0.1}s">
        <div class="cert-header">
          <div class="cert-icon">
            <i class="fas fa-certificate"></i>
          </div>
          <div class="cert-date">${cert.date}</div>
        </div>
        <h4 class="cert-name">${cert.name}</h4>
        <p class="cert-issuer">${cert.issuer}</p>
        <div class="cert-skills">
          ${cert.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
        </div>
      </div>
    `,
      )
      .join("")
  }

  populateAchievements(achievements) {
    const achievementsGrid = document.getElementById("achievements-grid")
    achievementsGrid.innerHTML = achievements
      .map(
        (achievement, index) => `
      <div class="achievement-card fade-in" style="animation-delay: ${index * 0.2}s">
        <div class="achievement-icon">
          ${
            achievement.title.includes("1st") || achievement.title.includes("Champion")
              ? '<i class="fas fa-trophy"></i>'
              : achievement.title.includes("2nd")
                ? '<i class="fas fa-medal"></i>'
                : '<i class="fas fa-award"></i>'
          }
        </div>
        <div class="achievement-content">
          <h4>${achievement.title}</h4>
          <p>${achievement.description}</p>
          <span class="achievement-date">${achievement.date}</span>
        </div>
      </div>
    `,
      )
      .join("")
  }

  populateSkills(skills) {
    const skillsGrid = document.getElementById("skills-grid")
    skillsGrid.innerHTML = ""

    skills.forEach((skill, index) => {
      const skillCard = document.createElement("div")
      skillCard.className = "skill-card fade-in"
      skillCard.style.animationDelay = `${index * 0.1}s`

      skillCard.innerHTML = `
        <div class="skill-header">
          <h4 class="skill-name">${skill.name}</h4>
          <span class="skill-level">${skill.level}%</span>
        </div>
        <div class="skill-progress">
          <div class="skill-progress-bar" style="width: 0%" data-width="${skill.level}%"></div>
        </div>
      `

      skillsGrid.appendChild(skillCard)
    })

    // Animate skill bars when they come into view
    this.animateSkillBars()
  }

  populateProjects(projects) {
    const projectsGrid = document.getElementById("projects-grid")
    projectsGrid.innerHTML = ""

    projects.forEach((project, index) => {
      const projectCard = document.createElement("div")
      projectCard.className = "project-card fade-in"
      projectCard.style.animationDelay = `${index * 0.2}s`

      const techTags = project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")

      projectCard.innerHTML = `
        <div class="project-image">
          ${
            project.image
              ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
              : `<i class="fas fa-code project-placeholder"></i>`
          }
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">${techTags}</div>
          <div class="project-links">
            ${
              project.github
                ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener">
                <i class="fab fa-github"></i> Code
            </a>`
                : ""
            }
            ${
              project.demo
                ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>`
                : ""
            }
          </div>
        </div>
      `

      projectsGrid.appendChild(projectCard)
    })
  }

  initializeParticles() {
    const tsParticles = window.tsParticles
    if (typeof tsParticles !== "undefined") {
      tsParticles.load("particles-js", {
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#0066ff",
          },
          links: {
            color: "#0066ff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      })
    }
  }

  initializeTypewriter() {
    const Typed = window.Typed
    if (typeof Typed !== "undefined" && this.profileData) {
      const typewriterStrings = [
        ">>> import tensorflow as tf",
        ">>> from sklearn import model_selection",
        ">>> model = tf.keras.Sequential()",
        ">>> model.compile(optimizer='adam')",
        ">>> print('AI Engineer Ready!')",
        ">>> deploy_to_production()",
      ]

      new Typed("#typed-text", {
        strings: typewriterStrings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      })
    }
  }

  initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Observe all elements with animation classes
    document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach((el) => {
      observer.observe(el)
    })
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress-bar")
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const width = bar.getAttribute("data-width")
          setTimeout(() => {
            bar.style.width = width
          }, 500)
          observer.unobserve(bar)
        }
      })
    })

    skillBars.forEach((bar) => observer.observe(bar))
  }

  initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
        this.scrollToSection(targetId)
      })
    })

    // Mobile menu toggle
    const mobileToggle = document.querySelector(".mobile-menu-toggle")
    const navMenu = document.querySelector(".nav-menu")

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        mobileToggle.classList.toggle("active")
      })
    }

    // Header scroll effect
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".glassmorphic-header")
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(20px)"
      } else {
        header.style.background = "rgba(255, 255, 255, 0.1)"
        header.style.backdropFilter = "blur(10px)"
      }
    })
  }

  initializeThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle")

    themeToggle.addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light"
      this.setTheme(this.currentTheme)
    })
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)

    const themeIcon = document.querySelector("#theme-toggle i")
    if (themeIcon) {
      themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun"
    }
  }

  initializeDashboard() {
    // Initialize Tableau dashboard
    this.initializeTableauDashboard()

    // Dashboard controls
    window.refreshDashboard = () => {
      this.refreshDashboard()
    }
  }

  initializeTableauDashboard() {
    const dashboardContainer = document.getElementById("tableau-dashboard")

    try {
      // Demo placeholder with enhanced chart
      dashboardContainer.innerHTML = `
        <div class="dashboard-placeholder">
          <i class="fas fa-chart-bar"></i>
          <h3>Interactive Dashboard</h3>
          <p>Connect your Tableau Public or Power BI dashboard here</p>
          <div style="margin-top: 2rem;">
            <canvas id="demo-chart" width="400" height="200"></canvas>
          </div>
        </div>
      `

      this.createDemoChart()
    } catch (error) {
      console.error("Error initializing dashboard:", error)
    }
  }

  createDemoChart() {
    const canvas = document.getElementById("demo-chart")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Demo data
    const data = [95, 90, 85, 80, 75, 85, 90]
    const labels = ["Python", "ML", "DL", "NLP", "AWS", "Flask", "Streamlit"]

    // Chart styling
    const barWidth = 40
    const barSpacing = 10
    const maxValue = Math.max(...data)
    const chartHeight = height - 60

    // Draw bars
    data.forEach((value, index) => {
      const x = (barWidth + barSpacing) * index + 20
      const barHeight = (value / maxValue) * chartHeight
      const y = height - barHeight - 30

      // Gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
      gradient.addColorStop(0, "#0066ff")
      gradient.addColorStop(1, "#00d4ff")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Labels
      ctx.fillStyle = "#666"
      ctx.font = "12px Inter"
      ctx.textAlign = "center"
      ctx.fillText(labels[index], x + barWidth / 2, height - 10)

      // Values
      ctx.fillStyle = "#333"
      ctx.fillText(value + "%", x + barWidth / 2, y - 5)
    })
  }

  refreshDashboard() {
    const dashboardContainer = document.getElementById("tableau-dashboard")
    dashboardContainer.style.opacity = "0.5"

    setTimeout(() => {
      this.createDemoChart()
      dashboardContainer.style.opacity = "1"
    }, 1000)
  }

  exportDashboard() {
    const canvas = document.getElementById("demo-chart")
    if (canvas) {
      const link = document.createElement("a")
      link.download = "dashboard-export.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]')

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src || img.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = document.querySelector(".glassmorphic-header").offsetHeight
      const targetPosition = section.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen")
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1500)
  }
}

// Global functions
window.scrollToSection = (sectionId) => {
  if (window.portfolioApp) {
    window.portfolioApp.scrollToSection(sectionId)
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioApp = new PortfolioApp()
})

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
        submitBtn.style.background = "#27ae60"

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.style.background = ""
          contactForm.reset()
        }, 2000)
      }, 1500)
    })
  }
})
