# AI/ML Portfolio Website

A modern, responsive portfolio website for AI/ML professionals featuring glassmorphic design, interactive animations, and intelligent chatbot functionality.

## 🚀 Features

### Design & Layout
- **Pure white background canvas** with glassmorphic elements
- **Responsive, mobile-first design** that works on all devices
- **Smooth animations** and micro-interactions
- **Dark/light mode toggle** with system preference detection
- **Accessibility-focused** with ARIA labels and keyboard navigation

### Interactive Elements
- **Particle animation** in hero section using tsParticles
- **Typewriter effect** for code snippets using Typed.js
- **Scroll-triggered animations** with IntersectionObserver
- **3D hover effects** on project cards with CSS transforms
- **Glassmorphic buttons** with neon-blue accent glow

### Data-Driven Content
- **Dynamic content loading** from JSON configuration
- **Skill progress bars** with animated percentages
- **Project filtering** and categorization
- **Contact information** management
- **FAQ system** for common questions

### AI Chatbot
- **Intelligent chatbot** with fuzzy matching using Fuse.js
- **DSL commands** for dashboard interactions
- **FAQ matching** for instant responses
- **Collapsible sidebar** interface (25% width)
- **Keyboard shortcuts** (Ctrl/Cmd + K to open)

### BI Dashboard Integration
- **Tableau Public** and **Power BI** embed support
- **Interactive filtering** via chatbot commands
- **Dashboard controls** (refresh, export)
- **Responsive iframe** with 16:9 aspect ratio

### Performance & Accessibility
- **Lazy loading** for images and non-critical scripts
- **Reduced motion** support for accessibility
- **High contrast mode** compatibility
- **Keyboard navigation** throughout the site
- **Screen reader** optimized content

## 📁 Project Structure

```
/your-portfolio/
├─ index.html                 # Main HTML file
├─ data/
│   └─ profile.json          # Profile data and configuration
├─ assets/
│   ├─ images/               # Project images and assets
│   └─ mindmaps/
│       └─ file-structure.svg # Project structure diagram
├─ css/
│   ├─ base.css             # Base styles and CSS variables
│   ├─ layout.css           # Layout and responsive design
│   └─ components.css       # Component-specific styles
├─ js/
│   ├─ main.js              # Main application logic
│   ├─ animations.js        # Animation controllers
│   └─ chatbot.js           # AI chatbot functionality
└─ README.md                # This file
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** with semantic markup
- **CSS3** with custom properties and modern features
- **Vanilla JavaScript** (ES6+) for all functionality
- **CSS Grid & Flexbox** for responsive layouts

### Libraries & APIs
- **[Typed.js](https://github.com/mattboldt/typed.js/)** - Typewriter effects
- **[tsParticles](https://particles.js.org/)** - Particle animations
- **[Fuse.js](https://fusejs.io/)** - Fuzzy search for chatbot
- **[Tableau JavaScript API](https://help.tableau.com/current/api/js_api/en-us/)** - Dashboard embedding
- **[Power BI JavaScript API](https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/)** - Alternative dashboard option

### Design System
- **Glassmorphism** design trend implementation
- **CSS Custom Properties** for theming
- **Responsive typography** with fluid scaling
- **Consistent spacing** system

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- Local web server (for development)
- Optional: Node.js for PDF parsing script

### Installation

1. **Clone or download** the project files
2. **Update profile data** in `data/profile.json`
3. **Add your images** to `assets/images/`
4. **Configure BI dashboard** URLs in `js/main.js`
5. **Serve the files** using a local web server

### Development Server

\`\`\`bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
\`\`\`

### Configuration

#### Profile Data (`data/profile.json`)
Update the JSON file with your personal information:

\`\`\`json
{
  "name": "Your Name",
  "tagline": "Your Professional Title",
  "about": "Your professional summary...",
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  },
  "skills": [
    {
      "name": "Python",
      "level": 90,
      "category": "Programming Languages"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description...",
      "technologies": ["Python", "TensorFlow"],
      "github": "https://github.com/yourusername/project",
      "demo": "https://your-demo-url.com",
      "featured": true
    }
  ]
}
\`\`\`

#### Dashboard Integration
Replace placeholder URLs in `js/main.js`:

\`\`\`javascript
// For Tableau
const tableauUrl = 'https://public.tableau.com/views/YourDashboard/Sheet1';

// For Power BI
const powerBIConfig = {
  type: 'report',
  id: 'your-report-id',
  embedUrl: 'your-embed-url',
  accessToken: 'your-access-token'
};
\`\`\`

## 🎨 Customization

### Color Scheme
Modify CSS custom properties in `css/base.css`:

\`\`\`css
:root {
  --primary-color: #0066ff;
  --secondary-color: #00d4ff;
  --accent-color: #ff6b6b;
  /* ... other colors */
}
\`\`\`

### Animations
Adjust animation settings in `js/animations.js`:

\`\`\`javascript
// Particle configuration
const particleConfig = {
  particles: {
    number: { value: 80 },
    color: { value: "#0066ff" },
    // ... other settings
  }
};
\`\`\`

### Chatbot Responses
Add custom DSL commands and FAQs in `data/profile.json`:

\`\`\`json
{
  "dslCommands": [
    {
      "triggerPhrases": ["show python projects"],
      "action": { "type": "filter", "filter": "Python" },
      "response": "Here are my Python projects:"
    }
  ],
  "faqs": [
    {
      "question": "What are your main skills?",
      "answer": "I specialize in...",
      "keywords": ["skills", "technical"]
    }
  ]
}
\`\`\`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

Key responsive features:
- Collapsible navigation menu
- Stacked layouts on mobile
- Touch-friendly interactive elements
- Optimized chatbot for small screens

## ♿ Accessibility Features

- **Semantic HTML** structure
- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support
- **Reduced motion** preferences
- **Focus indicators** for all interactive elements

## 🔧 Browser Support

- **Chrome** 60+
- **Firefox** 60+
- **Safari** 12+
- **Edge** 79+

## 📈 Performance Optimization

- **Lazy loading** for images
- **Deferred script loading**
- **CSS minification** ready
- **Image optimization** recommended
- **CDN usage** for external libraries

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **Vercel**: \`vercel --prod\`
- **Netlify**: Drag and drop or Git integration
- **GitHub Pages**: Push to gh-pages branch
- **AWS S3**: Upload files to S3 bucket

### Custom Domain
1. Configure DNS settings
2. Update any absolute URLs
3. Test all functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Typed.js** for typewriter effects
- **tsParticles** for particle animations
- **Fuse.js** for fuzzy search functionality
- **Font Awesome** for icons
- **Google Fonts** for typography

## 📞 Support

For questions or support:
- **LinkedIn**: [linkedin.com/in/tuhininaiml](https://linkedin.com/in/tuhininaiml)
- **GitHub**: [github.com/Tuhin108](https://github.com/Tuhin108)

---

**Built with ❤️ for the AI/ML community**
