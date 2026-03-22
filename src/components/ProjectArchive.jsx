import React, { useState, useMemo, memo } from 'react'
import { motion } from 'framer-motion'

// ── DATASET (Clean & Fast) ──
const ALL_PROJECTS = [
  { id:1,  name:'TradePro Simulator',    cat:'MERN',       tags:['React','Node.js','WS'],      href:'https://trade-pro-seven.vercel.app/',  year:'2026', color:'#00ffff', desc:'Real-time trading sim with WebSocket feeds and custom charting.' },
  { id:2,  name:'Vendixo Marketplace',    cat:'MERN',       tags:['Next.js','Stripe','Redis'],   href:'https://vendixo.vercel.app/',  year:'2024', color:'#ff00ff', desc:'Multi-vendor e-commerce with Stripe checkout.' },
  { id:4,  name:'TaskNest',               cat:'MERN',       tags:['React','Node.js','Socket'],   href:'#',  year:'2024', color:'#00ff88', desc:'Real-time team task manager with live collaboration.' },
  { id:11, name:'NeoCal Design System',   cat:'UI/UX',      tags:['Figma','Tailwind','Tokens'],  href:'#',  year:'2024', color:'#ff00ff', desc:'50+ component design system: tokens, dark/light modes.' },
  { id:12, name:'Pulsar Landing Page',    cat:'UI/UX',      tags:['Next.js','Framer','GSAP'],    href:'#',  year:'2024', color:'#ffff00', desc:'High-conversion SaaS landing with WebGL hero.' },
  { id:15, name:'SkyBnb UI Clone',         cat:'UI/UX',      tags:['Next.js','Tailwind','Figma'], href:'#',  year:'2023', color:'#ff00ff', desc:'Pixel-perfect Airbnb clone with booking flow.' },
  { id:21, name:'NeuralChat Interface',    cat:'AI Tools',   tags:['React','Anthropic','AI'],     href:'#',  year:'2024', color:'#ff00ff', desc:'Chat UI with Claude API and streaming responses.' },
  { id:26, name:'RAG Knowledge Base',      cat:'AI Tools',   tags:['Next.js','Pinecone','RAG'],   href:'#',  year:'2024', color:'#ff00ff', desc:'RAG pipeline: upload docs and chat with knowledge base.' },
  { id:31, name:'OpenHire ATS',            cat:'Full Stack', tags:['Next.js','Prisma','Stripe'],  href:'#',  year:'2024', color:'#00ffff', desc:'Applicant tracking with pipeline kanban.' },
  { id:36, name:'Quizora LMS',             cat:'Full Stack', tags:['Next.js','Postgres','Stripe'],href:'#',  year:'2024', color:'#3b82f6', desc:'LMS with video courses and certificates.' }
].filter(p => p.href);

const CATEGORIES = ['ALL','MERN','UI/UX','AI Tools','Full Stack']

// ── MEMOIZED CARD (Pure CSS Animations) ──
const ProjectCard = memo(({ project }) => {
  const c = project.color
  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" 
      className="project-card relative p-6 transition-all duration-300 border border-white/5 bg-white/[0.02]"
      style={{ '--c': c }}>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--c)] opacity-40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--c)] opacity-40" />
      
      <div className="relative z-10 pointer-events-none">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[9px] font-mono text-[var(--c)] opacity-40 tracking-widest">{project.year}</span>
          <div className="status-dot w-1.5 h-1.5 rounded-full bg-[var(--c)] shadow-[0_0_8px_var(--c)]" />
        </div>

        <h3 className="text-xs font-bold text-white mb-2 tracking-widest uppercase group-hover:text-[var(--c)]">
          {project.name}
        </h3>

        <p className="text-[10px] font-mono text-gray-500 mb-6 leading-relaxed line-clamp-2">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(t => (
            <span key={t} className="text-[7px] font-mono px-1.5 py-0.5 bg-[var(--c)]/10 text-[var(--c)] border border-[var(--c)]/20">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
})

export default function ProjectArchive({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return ALL_PROJECTS.filter(p => {
      const matchCat = activeCategory === 'ALL' || p.cat === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery])

  return (
    <>
      <style>{`
        /* GPU Accelerated Scrolling */
        .archive-main {
          background: #020204;
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0);
          background-size: 24px 24px;
          -webkit-overflow-scrolling: touch;
        }
        
        .project-card {
          will-change: transform, border-color;
          contain: layout paint;
        }

        .project-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--c) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -12px var(--c);
        }

        .scanline-overlay {
          position: fixed;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
          background-size: 100% 3px, 3px 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .custom-bar::-webkit-scrollbar { width: 4px; }
        .custom-bar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
        .custom-bar::-webkit-scrollbar-thumb:hover { background: #333; }
      `}</style>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] archive-main text-white overflow-hidden"
      >
        <div className="scanline-overlay opacity-50" />
        
        <div className="h-full overflow-y-auto px-6 py-12 md:px-20 custom-bar">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-black tracking-[0.2em] uppercase">
                  Data_<span className="text-cyan-500">Archive</span>
                </h1>
                <p className="text-[9px] font-mono text-white/30 tracking-[0.4em] mt-1 italic">
                  RUNNING_CORE_PROCESS // STABLE
                </p>
              </div>
              <button onClick={onClose} className="px-10 py-2 border border-white/10 text-[10px] font-bold hover:bg-white hover:text-black transition-all tracking-[0.3em]">
                EXIT_NULL
              </button>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <input 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH_LOGS..."
                className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-3 font-mono text-[11px] focus:outline-none focus:border-cyan-500/50 uppercase"
              />
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 font-mono text-[9px] border transition-all ${activeCategory === cat ? 'bg-cyan-500 border-cyan-500 text-black' : 'border-white/10 text-white/30 hover:border-white/20'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-40 text-center font-mono text-[10px] opacity-20 uppercase tracking-[0.5em]">Sector_Empty</div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}