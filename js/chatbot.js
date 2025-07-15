// Enhanced Chatbot with predefined Q&A system
class AIChatbot {
  constructor() {
    this.isOpen = false
    this.qaData = null
    this.currentView = "categories" // categories, questions, answer
    this.currentCategory = null
    this.currentQuestion = null

    this.init()
  }

  async init() {
    try {
      await this.loadQAData()
      this.initializeEventListeners()
      this.renderCategories()
    } catch (error) {
      console.error("Failed to initialize chatbot:", error)
      this.loadFallbackData()
    }
  }

  async loadQAData() {
    try {
      const response = await fetch("data/chatbot-qa.json")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      this.qaData = await response.json()
    } catch (error) {
      console.warn("Could not load chatbot-qa.json, using fallback data:", error)
      this.loadFallbackData()
    }
  }

  loadFallbackData() {
    this.qaData = {
      categories: [
        {
          name: "About Me",
          icon: "fas fa-user",
          questions: [
            {
              question: "Who are you?",
              answer:
                "I'm Tuhin Kumar Singha Roy, a passionate AI & ML Engineer currently pursuing B.Tech in Computer Science and Engineering with specialization in AI and ML.",
            },
            {
              question: "What's your educational background?",
              answer:
                "I'm currently pursuing B.Tech in Computer Science and Engineering (AI and ML) from MCKV Institute of Engineering with a CGPA of 8.07.",
            },
          ],
        },
        {
          name: "Technical Skills",
          icon: "fas fa-code",
          questions: [
            {
              question: "What programming languages do you know?",
              answer:
                "I'm proficient in Python (95%), JavaScript (70%), Java, C, and SQL. Python is my primary language for AI/ML development.",
            },
            {
              question: "What AI/ML technologies do you work with?",
              answer:
                "I specialize in Machine Learning (90%), Deep Learning (85%), TensorFlow (85%), Natural Language Processing (80%), and Computer Vision (80%).",
            },
          ],
        },
        {
          name: "Contact",
          icon: "fas fa-envelope",
          questions: [
            {
              question: "How can I contact you?",
              answer:
                "📧 Email: tuhinkumarsingharoy2001@gmail.com\n📱 Phone: +91 9564825493\n💼 LinkedIn: linkedin.com/in/tuhininaiml\n🐙 GitHub: github.com/Tuhin108",
            },
          ],
        },
      ],
    }
  }

  initializeEventListeners() {
    const chatbotToggle = document.getElementById("chatbot-toggle")
    const chatbotClose = document.getElementById("chatbot-close")
    const backToCategories = document.getElementById("back-to-categories")
    const backToQuestions = document.getElementById("back-to-questions")

    chatbotToggle.addEventListener("click", () => this.toggleChatbot())
    chatbotClose.addEventListener("click", () => this.closeChatbot())
    backToCategories.addEventListener("click", () => this.showCategories())
    backToQuestions.addEventListener("click", () => this.showQuestions(this.currentCategory))

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        this.openChatbot()
      }
      if (e.key === "Escape" && this.isOpen) {
        this.closeChatbot()
      }
    })
  }

  toggleChatbot() {
    if (this.isOpen) {
      this.closeChatbot()
    } else {
      this.openChatbot()
    }
  }

  openChatbot() {
    const chatbotPanel = document.getElementById("chatbot-panel")
    chatbotPanel.classList.add("active")
    this.isOpen = true
    this.showCategories()
  }

  closeChatbot() {
    const chatbotPanel = document.getElementById("chatbot-panel")
    chatbotPanel.classList.remove("active")
    this.isOpen = false
  }

  showCategories() {
    this.currentView = "categories"
    document.getElementById("chatbot-categories").style.display = "block"
    document.getElementById("chatbot-questions").style.display = "none"
    document.getElementById("chatbot-answer").style.display = "none"
    this.renderCategories()
  }

  showQuestions(category) {
    this.currentView = "questions"
    this.currentCategory = category
    document.getElementById("chatbot-categories").style.display = "none"
    document.getElementById("chatbot-questions").style.display = "block"
    document.getElementById("chatbot-answer").style.display = "none"
    document.getElementById("current-category").textContent = category.name
    this.renderQuestions(category)
  }

  showAnswer(question) {
    this.currentView = "answer"
    this.currentQuestion = question
    document.getElementById("chatbot-categories").style.display = "none"
    document.getElementById("chatbot-questions").style.display = "none"
    document.getElementById("chatbot-answer").style.display = "block"
    document.getElementById("current-question").textContent = question.question
    this.renderAnswer(question)
  }

  renderCategories() {
    const categoriesContainer = document.getElementById("chatbot-categories")
    categoriesContainer.innerHTML = `
      <div class="categories-header">
        <h4>What would you like to know?</h4>
        <p>Choose a category to explore</p>
      </div>
      <div class="categories-grid">
        ${this.qaData.categories
          .map(
            (category) => `
          <div class="category-card" onclick="window.aiChatbot.showQuestions(${JSON.stringify(category).replace(/"/g, "&quot;")})">
            <div class="category-icon">
              <i class="${category.icon}"></i>
            </div>
            <div class="category-info">
              <h5>${category.name}</h5>
              <span>${category.questions.length} questions</span>
            </div>
            <i class="fas fa-chevron-right category-arrow"></i>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }

  renderQuestions(category) {
    const questionsContainer = document.getElementById("questions-list")
    questionsContainer.innerHTML = category.questions
      .map(
        (question, index) => `
      <div class="question-item" onclick="window.aiChatbot.showAnswer(${JSON.stringify(question).replace(/"/g, "&quot;")})">
        <div class="question-number">${index + 1}</div>
        <div class="question-text">${question.question}</div>
        <i class="fas fa-chevron-right question-arrow"></i>
      </div>
    `,
      )
      .join("")
  }

  renderAnswer(question) {
    const answerContainer = document.getElementById("answer-content")
    const formattedAnswer = this.formatAnswer(question.answer)
    answerContainer.innerHTML = `
      <div class="answer-text">
        ${formattedAnswer}
      </div>
      <div class="answer-actions">
        <button class="glassmorphic-btn secondary" onclick="window.aiChatbot.showQuestions(window.aiChatbot.currentCategory)">
          <i class="fas fa-list"></i>
          More Questions
        </button>
        <button class="glassmorphic-btn primary" onclick="window.aiChatbot.showCategories()">
          <i class="fas fa-home"></i>
          All Categories
        </button>
      </div>
    `
  }

  formatAnswer(answer) {
    return answer
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n/g, "<br>")
      .replace(/📧|📱|💼|🐙|📺|📍|✅|🏆|🥈|⚽|♟️|📚|💻|🤝|📖/g, '<span class="emoji">$&</span>')
  }
}

// Enhanced chatbot styles
const chatbotStyles = `
  .chatbot-panel {
    width: 400px;
    height: 600px;
  }

  .chatbot-categories, .chatbot-questions, .chatbot-answer {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  .categories-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .categories-header h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
  }

  .categories-header p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .categories-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .category-card {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .category-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--glass-shadow);
    border-color: var(--primary-color);
  }

  .category-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 1rem;
  }

  .category-info {
    flex: 1;
  }

  .category-info h5 {
    margin: 0 0 0.25rem 0;
    color: var(--text-primary);
    font-weight: 600;
  }

  .category-info span {
    color: var(--text-secondary);
    font-size: 0.85rem;
  }

  .category-arrow, .question-arrow {
    color: var(--text-muted);
    transition: transform 0.3s ease;
  }

  .category-card:hover .category-arrow,
  .question-item:hover .question-arrow {
    transform: translateX(4px);
    color: var(--primary-color);
  }

  .questions-header, .answer-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--glass-border);
  }

  .back-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    margin-right: 1rem;
    transition: color 0.3s ease;
  }

  .back-btn:hover {
    color: var(--secondary-color);
  }

  .questions-header h4, .answer-header h4 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.1rem;
  }

  .questions-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .question-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: var(--background-secondary);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .question-item:hover {
    background: var(--glass-bg);
    border-color: var(--primary-color);
    transform: translateY(-1px);
  }

  .question-number {
    width: 24px;
    height: 24px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .question-text {
    flex: 1;
    color: var(--text-primary);
    font-weight: 500;
  }

  .answer-text {
    background: var(--background-secondary);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    color: var(--text-primary);
  }

  .answer-text strong {
    color: var(--primary-color);
    font-weight: 600;
  }

  .answer-text .emoji {
    font-size: 1.1em;
    margin-right: 0.25rem;
  }

  .answer-text a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
  }

  .answer-text a:hover {
    text-decoration: underline;
  }

  .answer-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  .answer-actions .glassmorphic-btn {
    flex: 1;
    justify-content: center;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .chatbot-panel {
      width: calc(100vw - 2rem);
      right: calc(-100vw + 100% + 1rem);
      height: 500px;
    }

    .category-card, .question-item {
      padding: 0.75rem;
    }

    .category-info h5 {
      font-size: 0.95rem;
    }

    .question-text {
      font-size: 0.9rem;
    }

    .answer-actions {
      flex-direction: column;
    }
  }

  /* Custom scrollbar */
  .chatbot-categories::-webkit-scrollbar,
  .chatbot-questions::-webkit-scrollbar,
  .chatbot-answer::-webkit-scrollbar {
    width: 6px;
  }

  .chatbot-categories::-webkit-scrollbar-track,
  .chatbot-questions::-webkit-scrollbar-track,
  .chatbot-answer::-webkit-scrollbar-track {
    background: var(--background-tertiary);
    border-radius: 3px;
  }

  .chatbot-categories::-webkit-scrollbar-thumb,
  .chatbot-questions::-webkit-scrollbar-thumb,
  .chatbot-answer::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 3px;
  }
`

// Inject chatbot styles
const chatbotStyleSheet = document.createElement("style")
chatbotStyleSheet.textContent = chatbotStyles
document.head.appendChild(chatbotStyleSheet)

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.aiChatbot = new AIChatbot()
})

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = AIChatbot
}
