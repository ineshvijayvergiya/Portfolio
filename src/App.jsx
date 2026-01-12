import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Palette, Layers, Github, Linkedin, Mail, ExternalLink, 
  Menu, X, Database, ChevronDown, ChevronUp 
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
    title: "Creative Graphics",
    desc: "Logo design, photo editing (Ps/Ai) & visual branding.",
    icon: <Palette className="w-8 h-8 text-pink-400" />,
  },
];

const projects = [
  {
    title: "Modern Weather App",
    category: "React + API",
    // 👇 Fixed Image: Nayi weather image lagayi hai
    image: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&q=80",
    tags: ["React", "Tailwind", "OpenWeatherMap", "Axios"],
    link: "https://weather-app-umber-alpha-72.vercel.app/",
  },
  {
    title: "Vendixo E-Commerce",
    category: "MERN Stack",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["React", "Firebase", "Tailwind", "EmailJS"],
    link: "https://vendixo.vercel.app/", 
  },
  {
    // 👇 NEW PROJECT: TradePro yahan add kiya hai
    title: "TradePro Trading",
    category: "Full Stack FinTech",
    // Placeholder image stock market ki hai, baad mein screenshot laga lena
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80", 
    tags: ["Next.js", "Supabase", "Finnhub API", "Tailwind"],
    link: "https://trade-pro-seven.vercel.app/",
  },
  {
    title: "Crypto Dashboard",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1621504450168-38718b958897?w=800&q=80",
    tags: ["Figma", "React", "Tailwind"],
    link: "#",
  },
  {
    title: "AI Image Generator",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
    tags: ["OpenAI API", "React", "Express"],
    link: "#",
  },
  {
    title: "Task Master Pro",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    tags: ["React", "LocalStorage", "Framer Motion"],
    link: "#",
  },
];

const skills = [
  { name: "React.js / Next.js", level: "95%" },
  { name: "Node.js / Express", level: "85%" },
  { name: "MongoDB / SQL", level: "80%" },
  { name: "UI/UX (Figma)", level: "90%" },
  { name: "Tailwind CSS", level: "98%" },
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
        scrolled ? "bg-slate-900/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          DEV<span className="text-white">PORTFOLIO</span>
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

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl md:text-2xl font-medium text-cyan-400 mb-4">Hello, I'm Inesh 👋</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Creative Designer & <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                MERN Developer
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I bridge the gap between abstract design and robust engineering. 
              Building pixel-perfect web experiences with modern tech.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projects" className="px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                View Work
              </a>
              <a href="#contact" className="px-8 py-3 rounded-full border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition-all transform hover:scale-105">
                Contact Me
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
            <p className="text-slate-400 leading-relaxed">
              I'm a passionate freelancer who loves blending code with creativity. 
              Whether it's designing a sleek logo or architecting a complex database, 
              I enjoy the entire process. Available for freelance projects and full-time roles.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <Code2 className="text-cyan-400 mb-2" />
                <h4 className="font-bold text-white">Engineering</h4>
                <p className="text-sm text-slate-500">MERN Stack, Next.js</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <Palette className="text-purple-400 mb-2" />
                <h4 className="font-bold text-white">Design</h4>
                <p className="text-sm text-slate-500">Figma, Photoshop</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-white mb-4">Technical Proficiency</h3>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">{skill.name}</span>
                  <span className="text-cyan-400">{skill.level}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  />
                </div>
              </div>
            ))}
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">My Services</h2>
            <p className="text-slate-400">High-quality solutions for your digital needs.</p>
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
                className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-white/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center gap-4">
                    
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cyan-500 rounded-full text-slate-900 hover:bg-cyan-400 transition-colors transform hover:scale-110 cursor-pointer"
                    >
                      <ExternalLink size={20} />
                    </a>

                    <button className="p-3 bg-slate-700 rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors transform hover:scale-110">
                      <Github size={20} />
                    </button>
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-white/10 text-slate-300 px-3 py-1 rounded-full">{tag}</span>
                    ))}
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
            <p className="text-slate-400 mb-12">Have a project in mind? Let's build something amazing.</p>

            <form 
              action="https://formspree.io/f/mbdjlabd" 
              method="POST" 
              className="max-w-lg mx-auto space-y-4 mb-12 text-left"
            >
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-slate-500 transition-colors"
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-slate-500 transition-colors"
              />
              <textarea 
                rows="4" 
                name="message"
                placeholder="Your Message" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-slate-500 transition-colors"
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
        <p>© 2026 Inesh. All rights reserved.</p>
      </footer>
    </div>
  );
}