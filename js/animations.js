// Advanced animations and micro-interactions
class AnimationController {
  constructor() {
    this.init()
  }

  init() {
    this.initializeHoverEffects()
    this.initializeScrollEffects()
    this.initializeParallax()
    this.initializeCursorEffects()
    this.initializeLoadingAnimations()
  }

  initializeHoverEffects() {
    // Project card 3D tilt effect
    const projectCards = document.querySelectorAll(".project-card")

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        this.addTiltEffect(e.target)
      })

      card.addEventListener("mouseleave", (e) => {
        this.removeTiltEffect(e.target)
      })

      card.addEventListener("mousemove", (e) => {
        this.updateTiltEffect(e)
      })
    })

    // Button hover effects
    const buttons = document.querySelectorAll(".glassmorphic-btn")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", (e) => {
        this.createRippleEffect(e)
      })
    })

    // Skill card hover animations
    const skillCards = document.querySelectorAll(".skill-card")
    skillCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.animateSkillCard(card)
      })
    })
  }

  addTiltEffect(element) {
    element.style.transformStyle = "preserve-3d"
    element.style.transition = "transform 0.1s ease-out"
  }

  removeTiltEffect(element) {
    element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    element.style.transition = "transform 0.3s ease-out"
  }

  updateTiltEffect(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateX = (mouseY / rect.height) * -10
    const rotateY = (mouseX / rect.width) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
  }

  createRippleEffect(e) {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement("span")
    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  animateSkillCard(card) {
    const progressBar = card.querySelector(".skill-progress-bar")
    if (progressBar) {
      progressBar.style.animation = "pulse 0.5s ease-in-out"
      setTimeout(() => {
        progressBar.style.animation = ""
      }, 500)
    }
  }

  initializeScrollEffects() {
    // Parallax scrolling for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".hero-visual")

      parallaxElements.forEach((element) => {
        const speed = 0.5
        element.style.transform = `translateY(${scrolled * speed}px)`
      })
    })

    // Progress bar animation on scroll
    this.createScrollProgressBar()

    // Section reveal animations
    this.initializeSectionReveals()
  }

  createScrollProgressBar() {
    const progressBar = document.createElement("div")
    progressBar.id = "scroll-progress"
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transition: width 0.1s ease;
        `

    document.body.appendChild(progressBar)

    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercent = (scrollTop / scrollHeight) * 100

      progressBar.style.width = scrollPercent + "%"
    })
  }

  initializeSectionReveals() {
    const sections = document.querySelectorAll("section")

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-revealed")
            this.animateSectionContent(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    sections.forEach((section) => {
      revealObserver.observe(section)
    })
  }

  animateSectionContent(section) {
    const elements = section.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible")
      }, index * 100)
    })
  }

  initializeParallax() {
    // Floating elements animation
    const floatingElements = document.querySelectorAll(".floating-card")

    floatingElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.5}s`
      element.style.animationDuration = `${6 + index}s`
    })

    // Background elements parallax
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset

      // Particles parallax
      const particlesContainer = document.getElementById("particles-js")
      if (particlesContainer) {
        particlesContainer.style.transform = `translateY(${scrolled * 0.3}px)`
      }
    })
  }

  initializeCursorEffects() {
    // Custom cursor for interactive elements
    const cursor = document.createElement("div")
    cursor.id = "custom-cursor"
    cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `

    document.body.appendChild(cursor)

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
      cursor.style.opacity = "0.7"
    })

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0"
    })

    // Cursor interactions
    const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-card")

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursor.style.background = "var(--secondary-color)"
      })

      element.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.background = "var(--primary-color)"
      })
    })
  }

  initializeLoadingAnimations() {
    // Staggered content loading animation
    const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

    animatedElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`
    })

    // Number counting animation
    this.animateCounters()
  }

  animateCounters() {
    const counters = document.querySelectorAll("#projects-count, #skills-count")

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.countUp(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    })

    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  countUp(element) {
    const target = Number.parseInt(element.textContent)
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      element.textContent = Math.floor(current)

      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, 16)
  }

  // Utility method to create custom animations
  createCustomAnimation(element, keyframes, options = {}) {
    const defaultOptions = {
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards",
    }

    const animationOptions = { ...defaultOptions, ...options }

    if (element.animate) {
      return element.animate(keyframes, animationOptions)
    }
  }

  // Method to trigger celebration animation
  triggerCelebration() {
    const celebration = document.createElement("div")
    celebration.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `

    document.body.appendChild(celebration)

    // Create confetti particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${this.getRandomColor()};
                top: -10px;
                left: ${Math.random() * 100}%;
                animation: confetti 3s ease-out forwards;
            `

      celebration.appendChild(particle)
    }

    setTimeout(() => {
      celebration.remove()
    }, 3000)
  }

  getRandomColor() {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"]
    return colors[Math.floor(Math.random() * colors.length)]
  }
}

// CSS animations (injected dynamically)
const animationStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes confetti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .section-revealed {
        animation: sectionReveal 0.8s ease-out forwards;
    }
    
    @keyframes sectionReveal {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth transitions for theme switching */
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Enhanced focus styles for accessibility */
    .glassmorphic-btn:focus-visible,
    .nav-link:focus-visible,
    .project-card:focus-visible,
    .skill-card:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);
    }
    
    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
        
        .floating-card {
            animation: none !important;
        }
        
        #particles-js {
            display: none !important;
        }
    }
`

// Inject animation styles
const styleSheet = document.createElement("style")
styleSheet.textContent = animationStyles
document.head.appendChild(styleSheet)

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.animationController = new AnimationController()
})

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = AnimationController
}
