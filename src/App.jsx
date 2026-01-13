import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Palette, Layers, Github, Linkedin, Mail, ExternalLink, 
  Menu, X, Database, ChevronDown, ChevronUp, Info, Globe, 
  Target, Zap, BookOpen, FileText 
} from "lucide-react";

// --- Data Section ---
const services = [
  {
    title: "Full Stack MERN",
    desc: "Scalable web apps using MongoDB, Express, React, Node.js.",
    icon: <Database className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "UI/UX Design",
    desc: "Crafting intuitive user journeys with Figma & Adobe XD.",
    icon: <Layers className="w-8 h-8 text-purple-400" />,
  },
  {
    title: "Visual Design",
    desc: "Logo design, photo editing (Ps/Ai) & visual branding.",
    icon: <Palette className="w-8 h-8 text-pink-400" />,
  },
];


const projects = [
  {
    title: "TradePro Simulator",
    category: "FinTech App",
    image: "/TradePro-app.png",
    tags: ["Next.js", "Supabase", "Finnhub API", "Tailwind"],
    link: "https://trade-pro-seven.vercel.app/",
    github: "https://github.com/ineshvijayvergiya/TradePro", 
    description: "A real-time stock trading simulator that allows beginners to practice trading strategies with ₹10L virtual money.",
    metrics: ["Updates prices every 1 second via Finnhub", "Handles real-time state for portfolio tracking"],
    challenges: [
      "Handling real-time API updates without UI lag.",
      "Synchronizing user balance and portfolio value instantly."
    ],
    learnings: [
      "Learned to use Supabase Realtime for live data syncing.",
      "Understood how to manage API rate limits effectively."
    ]
  },
  {
    title: "Vendixo Marketplace",
    category: "E-Commerce",
    image: "/Vendixo-app.png",
    tags: ["React", "Firebase", "Tailwind", "EmailJS"],
    link: "https://vendixo.vercel.app/", 
    github: "https://github.com/ineshvijayvergiya/Vendixo",
    description: "A full-featured e-commerce marketplace offering seamless product filtering, cart management, and automated order confirmations.",
    metrics: ["Filters 100+ products instantly", "99.9% Uptime via Firebase Hosting"],
    challenges: [
      "Implementing complex filter logic (Price, Category, Rating).",
      "Persisting cart state across page reloads."
    ],
    learnings: [
      "Learned to structure NoSQL data efficiently in Firebase.",
      "Gained experience with React Custom Hooks for logic reuse."
    ]
  },
  {
    title: "GeoMeteo Weather",
    category: "Data Visualization",
    image: "/weather-app.png",
    tags: ["React", "Tailwind", "OpenWeatherMap", "Axios"],
    link: "https://weather-app-umber-alpha-72.vercel.app/",
    github: "https://github.com/ineshvijayvergiya/weather--app",
    description: "A clean, responsive weather dashboard that delivers live forecasts and atmospheric data for any city worldwide.",
    metrics: ["Fetches live data in < 200ms", "Dynamic background themes based on weather"],
    challenges: [
      "Handling errors gracefully when cities are not found.",
      "Converting raw API data into user-friendly visuals."
    ],
    learnings: [
      "Learned asynchronous data fetching patterns (Async/Await).",
      "Used Axios interceptors for better error handling."
    ]
  },
  {
    title: "Crypto Dashboard",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1621504450168-38718b958897?w=800&q=80",
    tags: ["Figma", "React", "Tailwind"],
    link: "#",
    github: "#",
    description: "A high-fidelity UI/UX prototype for a cryptocurrency exchange platform focused on data visualization.",
    metrics: ["Designed 15+ unique screens", "High-fidelity interactive prototyping"],
    challenges: ["Balancing data density with visual clarity."],
    learnings: ["Learned advanced Figma component properties."]
  },
  {
    title: "AI Image Generator",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
    tags: ["OpenAI API", "React", "Express"],
    link: "#",
    github: "#",
    description: "An AI-powered application leveraging OpenAI's DALL-E to generate unique images from text prompts.",
    metrics: ["Generates images in ~4 seconds", "Secure backend API key storage"],
    challenges: ["Securing API keys on the backend."],
    learnings: ["Learned Express.js middleware and API routing."]
  },
  {
    title: "Task Master Pro",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    tags: ["React", "LocalStorage", "Framer Motion"],
    link: "#",
    github: "#",
    description: "A robust task management app with drag-and-drop functionality and local storage persistence.",
    metrics: ["Zero database cost (LocalStorage)", "60fps smooth drag animations"],
    challenges: ["Optimizing re-renders during drag operations."],
    learnings: ["Understood Browser LocalStorage API limitations."]
  }
];

const skills = [
  "React.js / Next.js",
  "Node.js / Express",
  "MongoDB / SQL",
  "UI/UX (Figma)",
  "Tailwind CSS",
  "Supabase / Firebase",
  "Git / GitHub",
  "Redux Toolkit"
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          INESH<span className="text-cyan-400">.DEV</span>
        </h1>

        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
              {item}
            </a>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 text-center">
              {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-cyan-400"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Main App Component ---
export default function App() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl md:text-2xl font-medium text-cyan-400 mb-4">Hello, I'm Inesh 👋</h2>
            
            {/* 1️⃣ Headline Fix: Option A (Product Focused) */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Full-Stack MERN Developer <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Building fast, scalable web products.
              </span>
            </h1>
            
            {/* 5️⃣ Contrast Fix: Changed text-slate-400 to text-slate-300 */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Focused on building robust, high-performance applications with modern tech. 
              Bridging the gap between design and engineering.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#projects" className="px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                View My Work
              </a>
              
              {/* 6️⃣ Resume Button Added */}
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="flex items-center gap-2 px-8 py-3 rounded-full border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 text-white font-medium transition-all transform hover:scale-105"
              >
                <FileText size={18} /> Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
            
            {/* 5️⃣ Contrast Fix: Brighter Text */}
            <p className="text-slate-300 leading-relaxed text-lg">
              I'm not just a coder; I'm a product-focused developer. I love taking complex problems and turning them into simple, elegant interface designs. 
              <br /><br />
              With a strong foundation in the MERN stack and Next.js, I build applications that are not only visually stunning but also performant and scalable under the hood.
            </p>

            {/* 4️⃣ Role Clarity & Looking for Role */}
            <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-500 rounded-r-lg">
               <p className="text-slate-200 font-medium">
                 🚀 Primary Focus: Frontend / Full-Stack roles (React, Next.js, MERN).
               </p>
               <p className="text-slate-400 text-sm mt-1">
                 Currently looking for a full-time or junior role where I can contribute to real products.
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <Code2 className="text-cyan-400 mb-2" />
                <h4 className="font-bold text-white">Engineering</h4>
                <p className="text-sm text-slate-400">MERN Stack, Next.js</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <Palette className="text-purple-400 mb-2" />
                <h4 className="font-bold text-white">Design</h4>
                <p className="text-sm text-slate-400">Figma, Modern UI</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-white mb-6">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div key={index} className="px-4 py-2 bg-slate-800 rounded-lg border border-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors cursor-default">
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">My Focus</h2>
            <p className="text-slate-400">Delivering high-quality digital solutions.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/50 transition-colors group"
              >
                <div className="mb-6 bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">Featured Works</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, showAllProjects ? projects.length : 3).map((project, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-white/10 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                     <button 
                       onClick={() => setSelectedProject(project)}
                       className="p-2 bg-slate-900/80 backdrop-blur text-white rounded-full hover:bg-cyan-500 hover:text-slate-900 transition-colors"
                       title="View Details"
                     >
                       <Info size={18} />
                     </button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">{project.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0,3).map(tag => (
                      <span key={tag} className="text-xs bg-white/5 text-slate-300 px-3 py-1 rounded-full border border-white/5">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors"
                    >
                      Read More
                    </button>
                    {project.link !== "#" && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition-colors"
                      >
                         <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400 transition-all text-white font-medium group"
            >
              {showAllProjects ? "Show Less" : "View More Projects"}
              {showAllProjects ? (
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h2>
            
            {/* 7️⃣ Open to Work Hint */}
            <div className="inline-block px-4 py-2 mb-8 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <span className="text-cyan-400 text-sm font-medium flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
                Open to full-time, internship, and freelance opportunities.
              </span>
            </div>

            <form 
              action="https://formspree.io/f/mbdjlabd" 
              method="POST" 
              className="max-w-lg mx-auto space-y-4 mb-12 text-left"
            >
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-200 placeholder-slate-500 transition-colors"
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-200 placeholder-slate-500 transition-colors"
              />
              <textarea 
                rows="4" 
                name="message"
                placeholder="Your Message" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-200 placeholder-slate-500 transition-colors"
              ></textarea>
              <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>

            <div className="flex justify-center gap-8">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-cyan-400 transition-colors transform hover:scale-110">
                  <Icon size={32} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <footer className="py-8 text-center border-t border-white/5 text-slate-600 text-sm">
        <p>© 2026 Inesh.dev. All rights reserved.</p>
      </footer>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            {/* 'no-scrollbar' class is here */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl shadow-cyan-500/10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="h-64 relative">
                 <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              <div className="p-8">
                <span className="text-cyan-400 font-bold tracking-wider text-sm uppercase">{selectedProject.category}</span>
                <h2 className="text-3xl font-bold text-white mt-2 mb-4">{selectedProject.title}</h2>
                
                {/* 5️⃣ Contrast Fix for Modal Text */}
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  {selectedProject.description || "No description available."}
                </p>

                {/* METRICS SECTION */}
                {selectedProject.metrics && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {selectedProject.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                           <Target className="text-cyan-400 shrink-0" size={20} />
                           <span className="text-sm text-slate-200 font-medium">{metric}</span>
                        </div>
                      ))}
                   </div>
                )}

                {/* CHALLENGES & LEARNINGS */}
                {(selectedProject.challenges || selectedProject.learnings) && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-slate-800/50 rounded-xl border border-white/5">
                    {selectedProject.challenges && (
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-white mb-3">
                          <Zap size={18} className="text-yellow-400" /> Key Challenges
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.challenges.map((c, i) => (
                            <li key={i} className="text-sm text-slate-300 flex gap-2">
                              <span className="text-yellow-400/50">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedProject.learnings && (
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-white mb-3">
                          <BookOpen size={18} className="text-green-400" /> Key Learnings
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.learnings.map((l, i) => (
                            <li key={i} className="text-sm text-slate-300 flex gap-2">
                              <span className="text-green-400/50">•</span> {l}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-3">Tech Stack used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full text-sm">
                         {tag}
                       </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.link !== "#" && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <Globe size={18} /> View Live Demo
                    </a>
                  )}
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github size={18} /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}