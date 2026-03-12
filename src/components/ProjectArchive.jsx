
import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_PROJECTS = [
  // MERN
  { id:1,  name:'TradePro Simulator',     cat:'MERN',       tags:['React','Node.js','WebSocket','MongoDB'],     href:'https://trade-pro-seven.vercel.app/',   year:'2026', status:'SHIPPED',      desc:'Real-time trading sim with WebSocket feeds, custom charting & portfolio management.', color:'#00ffff' },
  { id:2,  name:'Vendixo Marketplace',    cat:'MERN',       tags:['Next.js','Stripe','MongoDB','Redis'],        href:'https://vendixo.vercel.app/',  year:'2024', status:'SHIPPED',      desc:'Multi-vendor e-commerce: cart, Stripe checkout, seller dashboard, admin analytics.', color:'#ff00ff' },
  { id:3,  name:'BlogForge CMS',          cat:'MERN',       tags:['React','Express','MongoDB','TipTap'],           year:'2024', status:'SHIPPED',      desc:'Full CMS with rich text editor, media upload, drafts, tags & SEO metadata.', color:'#00ffff' },
  { id:4,  name:'TaskNest',               cat:'MERN',       tags:['React','Node.js','MongoDB','Socket.io'],        year:'2024', status:'SHIPPED',      desc:'Real-time team task manager with drag-and-drop boards and live collaboration.', color:'#00ff88' },
  { id:5,  name:'InvoiceFlow',            cat:'MERN',       tags:['React','Express','MongoDB','PDFKit'],           year:'2023', status:'SHIPPED',      desc:'Invoice generation with PDF export, client portal & payment tracking.', color:'#ffff00' },
  { id:6,  name:'EventHub',              cat:'MERN',       tags:['React','Node.js','MongoDB','Stripe'],           year:'2023', status:'SHIPPED',      desc:'Event booking platform with seat selection, ticketing & QR check-in.', color:'#ff8800' },
  { id:7,  name:'DevMetrics Dashboard',  cat:'MERN',       tags:['React','Node.js','MongoDB','D3.js'],            year:'2024', status:'SHIPPED',      desc:'Developer analytics: commit trends, PR stats, language breakdown over time.', color:'#00ff88' },
  { id:8,  name:'FoodCart',              cat:'MERN',       tags:['React','Express','MongoDB','Razorpay'],         year:'2023', status:'SHIPPED',      desc:'Food ordering with real-time tracking, restaurant admin & delivery maps.', color:'#ff8800' },
  { id:9,  name:'AuthKit',               cat:'MERN',       tags:['React','Node.js','JWT','MongoDB'],              year:'2023', status:'OPEN SOURCE',  desc:'Production-ready auth boilerplate: OAuth2, MFA, refresh tokens.', color:'#3b82f6' },
  { id:10, name:'ResumeBuilder',          cat:'MERN',       tags:['React','Node.js','PDFKit','MongoDB'],           year:'2023', status:'SHIPPED',      desc:'Drag-and-drop resume builder with live preview, PDF export & templates.', color:'#00ffff' },
  // UI/UX
  { id:11, name:'NeoCal Design System',   cat:'UI/UX',      tags:['Figma','TailwindCSS','Storybook'],              year:'2024', status:'SHIPPED',      desc:'50+ component design system: typography, colours, tokens, dark/light modes.', color:'#ff00ff' },
  { id:12, name:'Pulsar Landing Page',    cat:'UI/UX',      tags:['Next.js','Framer Motion','GSAP'],               year:'2024', status:'SHIPPED',      desc:'High-conversion SaaS landing with scroll-triggered animations and WebGL hero.', color:'#ffff00' },
  { id:13, name:'GeoMeteo Weather',       cat:'UI/UX',      tags:['Three.js','D3.js','React','Figma'],             year:'2024', status:'SHIPPED',      desc:'3D globe weather viz with custom D3 charts and a Figma-designed dashboard.', color:'#ffff00' },
  { id:14, name:'Orion Portfolio V1',     cat:'UI/UX',      tags:['React','GSAP','TailwindCSS'],                   year:'2023', status:'SHIPPED',      desc:'First portfolio version with scroll animations and case studies.', color:'#00ffff' },
  { id:15, name:'SkyBnb UI Clone',        cat:'UI/UX',      tags:['Next.js','TailwindCSS','Figma'],                year:'2023', status:'SHIPPED',      desc:'Pixel-perfect Airbnb clone with booking flow, map integration & responsive layout.', color:'#ff00ff' },
  { id:16, name:'CryptoTrack UI',         cat:'UI/UX',      tags:['React','Chart.js','TailwindCSS'],               year:'2023', status:'SHIPPED',      desc:'Crypto portfolio tracker: live prices, P&L charts, allocation doughnut.', color:'#ff8800' },
  { id:17, name:'MediConnect App',        cat:'UI/UX',      tags:['React','Figma','TailwindCSS','Framer'],         year:'2024', status:'SHIPPED',      desc:'Healthcare patient portal: appointment booking, reports, doctor chat UI.', color:'#00ff88' },
  { id:18, name:'Kinetic Icon Pack',      cat:'UI/UX',      tags:['Figma','SVG','CSS Animation'],                  year:'2024', status:'OPEN SOURCE',  desc:'60 animated SVG icons. Stroke-based, theme-able, MIT licensed.', color:'#ff00ff' },
  { id:19, name:'AdminNova Dashboard',    cat:'UI/UX',      tags:['React','Recharts','TailwindCSS'],               year:'2023', status:'SHIPPED',      desc:'SaaS admin dashboard with 20+ chart types, data tables and permission layers.', color:'#ffff00' },
  { id:20, name:'VaultUI Onboarding',     cat:'UI/UX',      tags:['React','Framer Motion','Figma'],                year:'2024', status:'SHIPPED',      desc:'Multi-step onboarding with micro-animations, progress & form validation.', color:'#3b82f6' },
  // AI Tools
  { id:21, name:'NeuralChat Interface',   cat:'AI Tools',   tags:['React','Anthropic SDK','Framer Motion'],        year:'2024', status:'SHIPPED',      desc:'Chat UI with Claude API: streaming, conversation history, context-aware responses.', color:'#ff00ff' },
  { id:22, name:'CodeReview AI',          cat:'AI Tools',   tags:['Next.js','OpenAI','Monaco Editor'],             year:'2024', status:'SHIPPED',      desc:'AI code reviewer: paste code, get line-by-line suggestions with severity levels.', color:'#00ffff' },
  { id:23, name:'DocSummariser',          cat:'AI Tools',   tags:['React','LangChain','OpenAI','PDF.js'],          year:'2024', status:'SHIPPED',      desc:'Upload PDF → structured summary, key points and Q&A chat interface.', color:'#ffff00' },
  { id:24, name:'PromptVault',            cat:'AI Tools',   tags:['Next.js','PostgreSQL','OpenAI'],                year:'2024', status:'SHIPPED',      desc:'Personal prompt library with version history, tagging, test-runner and diffs.', color:'#ff8800' },
  { id:25, name:'ImageCaptionAI',         cat:'AI Tools',   tags:['React','OpenAI Vision','Node.js'],              year:'2024', status:'SHIPPED',      desc:'Drag & drop images → GPT-4V generates alt text, captions & accessibility tags.', color:'#00ff88' },
  { id:26, name:'RAG Knowledge Base',     cat:'AI Tools',   tags:['Next.js','Embeddings','Pinecone','LangChain'],  year:'2024', status:'SHIPPED',      desc:'RAG pipeline: upload docs, chunk, embed, store & chat with your knowledge base.', color:'#ff00ff' },
  { id:27, name:'AI Cover Letter Gen',    cat:'AI Tools',   tags:['React','Claude API','TailwindCSS'],             year:'2024', status:'SHIPPED',      desc:'Paste JD + resume → AI generates tailored, tone-matched cover letters.', color:'#00ffff' },
  { id:28, name:'SentimentPulse',         cat:'AI Tools',   tags:['React','OpenAI','Chart.js','Node.js'],          year:'2024', status:'SHIPPED',      desc:'Real-time brand sentiment analyser: feed → scores → live chart.', color:'#ffff00' },
  { id:29, name:'AutoSQL',                cat:'AI Tools',   tags:['Next.js','OpenAI','PostgreSQL'],                year:'2024', status:'SHIPPED',      desc:'Natural language → SQL query generator with schema-aware context and runner.', color:'#3b82f6' },
  { id:30, name:'WritingCoach AI',        cat:'AI Tools',   tags:['React','Claude API','Framer Motion'],           year:'2024', status:'SHIPPED',      desc:'AI writing assistant: tone analysis, grammar, clarity scoring, inline suggestions.', color:'#ff8800' },
  // Full Stack
  { id:31, name:'OpenHire ATS',           cat:'Full Stack', tags:['Next.js','PostgreSQL','Prisma','Stripe'],       year:'2024', status:'SHIPPED',      desc:'Applicant tracking: job posts, pipeline kanban, email integration, analytics.', color:'#00ffff' },
  { id:32, name:'StreamVault',            cat:'Full Stack', tags:['React','Node.js','HLS.js','S3'],                year:'2024', status:'SHIPPED',      desc:'Video hosting: upload, transcode, HLS streaming, thumbnail generation.', color:'#ff00ff' },
  { id:33, name:'LinkForge',             cat:'Full Stack', tags:['Next.js','Redis','PostgreSQL','Analytics'],     year:'2023', status:'SHIPPED',      desc:'URL shortener with custom slugs, QR codes, click analytics and UTM tracking.', color:'#ffff00' },
  { id:34, name:'PollStation',            cat:'Full Stack', tags:['React','Socket.io','MongoDB','Chart.js'],       year:'2023', status:'SHIPPED',      desc:'Real-time polling with live result charts, embed widget and voter auth.', color:'#00ff88' },
  { id:35, name:'DocSign',               cat:'Full Stack', tags:['React','Node.js','Canvas','PostgreSQL'],        year:'2024', status:'SHIPPED',      desc:'Digital signature platform: upload, annotate, sign and share docs securely.', color:'#ff8800' },
  { id:36, name:'Quizora LMS',           cat:'Full Stack', tags:['Next.js','PostgreSQL','Stripe','Framer'],       year:'2024', status:'SHIPPED',      desc:'LMS with video courses, quizzes, certificates and Stripe payments.', color:'#3b82f6' },
  { id:37, name:'ChatRooms',             cat:'Full Stack', tags:['React','Socket.io','Redis','MongoDB'],          year:'2023', status:'SHIPPED',      desc:'Real-time chat: rooms, DMs, file sharing and message history.', color:'#00ffff' },
  { id:38, name:'PhotoGallery CDN',      cat:'Full Stack', tags:['Next.js','S3','Cloudfront','Sharp'],            year:'2023', status:'SHIPPED',      desc:'Infinite scroll photo gallery with S3 upload, CDN delivery and EXIF.', color:'#ff00ff' },
  // Experiments
  { id:39, name:'Particle Physics Sim',  cat:'Experiments',tags:['Three.js','React','WebGL','GLSL'],              year:'2024', status:'EXPERIMENT',   desc:'N-body gravity simulation in WebGL: adjustable mass, velocity and collisions.', color:'#ffff00' },         
]

const CATEGORIES   = ['ALL','MERN','UI/UX','AI Tools','Full Stack','Experiments']
const STATUS_COLOR  = { SHIPPED:'#00ff88', 'OPEN SOURCE':'#3b82f6', EXPERIMENT:'#ffff00' }
const CAT_COLOR     = { ALL:'#00ffff', MERN:'#00ffff', 'UI/UX':'#ff00ff', 'AI Tools':'#ffff00', 'Full Stack':'#00ff88', Experiments:'#ff8800' }

// ── Pure CSS card — zero Framer Motion per-card to prevent 42x render storms ──
function ArchiveCard({ project }) {
  const c = project.color
  return (
    <div className="archive-card relative break-inside-avoid mb-3 p-4"
      style={{
        background:`${c}07`,
        border:`1px solid ${c}1a`,
        transition:'border-color 0.2s, box-shadow 0.2s',
        '--card-color': c,
      }}>
      {/* CSS corner marks via pseudo-elements aren't possible inline, use divs */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{borderColor:`${c}44`}} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{borderColor:`${c}44`}} />

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-orbitron font-black leading-tight" style={{color:c}}>{project.name}</h3>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="font-orbitron px-1.5 py-0.5"
            style={{color:STATUS_COLOR[project.status]||'#888',border:`1px solid ${STATUS_COLOR[project.status]||'#888'}44`,
              background:`${STATUS_COLOR[project.status]||'#888'}09`,fontSize:'8px'}}>
            {project.status}
          </span>
          <span className="font-jetbrains" style={{color:'rgba(200,210,255,0.22)',fontSize:'9px'}}>{project.year}</span>
        </div>
      </div>

      <p className="text-xs font-jetbrains leading-relaxed mb-3" style={{color:'rgba(200,210,255,0.56)',lineHeight:'1.6'}}>
        {project.desc}
      </p>

      <div className="flex flex-wrap gap-1">
        {project.tags.map(tag => (
          <span key={tag} className="font-jetbrains px-1.5 py-0.5"
            style={{border:`1px solid ${c}22`,color:`${c}88`,background:`${c}07`,fontSize:'9px'}}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ProjectArchive({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [searchQuery, setSearchQuery]       = useState('')
  const [sortBy, setSortBy]                 = useState('newest')

  const filtered = useMemo(() => {
    let items = ALL_PROJECTS
    if (activeCategory !== 'ALL') items = items.filter(p => p.cat === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return [...items].sort((a,b) => {
      if (sortBy==='name')   return a.name.localeCompare(b.name)
      if (sortBy==='oldest') return parseInt(a.year) - parseInt(b.year)
      return parseInt(b.year) - parseInt(a.year)
    })
  }, [activeCategory, searchQuery, sortBy])

  const counts = useMemo(() => {
    const c = { ALL:ALL_PROJECTS.length }
    CATEGORIES.slice(1).forEach(cat => { c[cat] = ALL_PROJECTS.filter(p => p.cat===cat).length })
    return c
  }, [])

  return (
    <>
      {/* Inline CSS for archive-card hover without React re-render */}
      <style>{`
        .archive-card:hover {
          border-color: color-mix(in srgb, var(--card-color) 50%, transparent) !important;
          box-shadow: 0 0 20px color-mix(in srgb, var(--card-color) 15%, transparent);
        }
        .archive-card:hover h3 { text-shadow: 0 0 10px var(--card-color); }
        /* scan-line entry sweep */
        @keyframes scanSweep {
          0%   { top: -4px; opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        .archive-scan { animation: scanSweep 0.7s linear forwards; }
      `}</style>

      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        transition={{ duration:0.3 }}
        className="fixed inset-0 z-[700] overflow-hidden"
        style={{ background:'rgba(3,3,12,0.97)', backdropFilter:'blur(4px)' }}>

        {/* Entry scan-line — CSS only, no Framer Motion */}
        <div className="archive-scan absolute left-0 right-0 h-0.5 pointer-events-none z-50"
          style={{ background:'linear-gradient(180deg,transparent,rgba(0,255,255,0.9),rgba(255,0,255,0.5),transparent)',
            boxShadow:'0 0 30px rgba(0,255,255,0.6)' }} />

        <div className="absolute inset-0 pointer-events-none grid-bg opacity-30" />

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto overscroll-contain">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <div className="text-xs font-jetbrains mb-1" style={{color:'rgba(255,0,255,0.55)',letterSpacing:'0.35em'}}>
                  // DEEP SPACE ARCHIVE
                </div>
                <h1 className="text-2xl sm:text-4xl font-orbitron font-black"
                  style={{textShadow:'0 0 18px rgba(0,255,255,0.28)'}}>PROJECT ARCHIVE</h1>
                <p className="text-xs font-jetbrains mt-1" style={{color:'rgba(200,210,255,0.35)'}}>
                  {ALL_PROJECTS.length} TOTAL · {filtered.length} SHOWN
                </p>
              </div>
              <button onClick={onClose}
                className="flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 font-orbitron text-xs sm:text-sm font-black
                           transition-colors duration-150 self-start sm:self-auto"
                style={{border:'1px solid rgba(0,255,255,0.25)',color:'#00ffff',background:'rgba(0,255,255,0.05)'}}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(0,255,255,0.12)'; e.currentTarget.style.borderColor='rgba(0,255,255,0.5)' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(0,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(0,255,255,0.25)' }}>
                ← RETURN
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 p-3 sm:p-4"
              style={{background:'rgba(10,10,26,0.7)',border:'1px solid rgba(0,255,255,0.07)'}}>
              {/* Search */}
              <div className="relative flex-1 min-w-0">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{color:'rgba(0,255,255,0.38)'}}>⌕</span>
                <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                  placeholder="SEARCH PROJECTS..."
                  className="bg-transparent outline-none text-sm font-jetbrains w-full pl-8 pr-8 py-2"
                  style={{border:'1px solid rgba(0,255,255,0.14)',color:'#fff',caretColor:'#00ffff'}} />
                {searchQuery && (
                  <button onClick={()=>setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                    style={{color:'rgba(200,210,255,0.35)'}}>✕</button>
                )}
              </div>
              {/* Sort */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-jetbrains" style={{color:'rgba(200,210,255,0.28)'}}>SORT:</span>
                {[['newest','NEW'],['oldest','OLD'],['name','A→Z']].map(([id,label]) => (
                  <button key={id} onClick={()=>setSortBy(id)}
                    className="px-2.5 py-1 text-xs font-orbitron transition-all duration-150"
                    style={{
                      border:`1px solid ${sortBy===id?'rgba(0,255,255,0.45)':'rgba(0,255,255,0.1)'}`,
                      color: sortBy===id?'#00ffff':'rgba(200,210,255,0.3)',
                      background: sortBy===id?'rgba(0,255,255,0.07)':'transparent',
                    }}>{label}</button>
                ))}
              </div>
            </div>

            {/* Category tabs — horizontally scrollable on mobile */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap"
              style={{ scrollbarWidth:'none' }}>
              {CATEGORIES.map(cat => {
                const active = activeCategory===cat
                const cc = CAT_COLOR[cat]||'#00ffff'
                return (
                  <button key={cat} onClick={()=>setActiveCategory(cat)}
                    className="flex-shrink-0 px-3 sm:px-4 py-2 font-orbitron text-xs sm:text-sm font-black transition-all duration-200"
                    style={{
                      border:`1px solid ${active?cc:cc+'22'}`,
                      color: active?'#000':cc,
                      background: active?cc:`${cc}08`,
                      boxShadow: active?`0 0 12px ${cc}44`:'none',
                    }}>
                    {cat} <span className="ml-1 opacity-55" style={{fontSize:'10px'}}>{counts[cat]}</span>
                  </button>
                )
              })}
            </div>

            {/* Empty state */}
            {filtered.length===0 && (
              <div className="text-center py-16 sm:py-24">
                <div className="text-3xl mb-4" style={{color:'rgba(0,255,255,0.18)'}}>◈</div>
                <div className="text-base font-orbitron" style={{color:'rgba(200,210,255,0.35)'}}>NO MISSIONS FOUND</div>
                <div className="text-xs font-jetbrains mt-2" style={{color:'rgba(200,210,255,0.2)'}}>Try a different search or category</div>
              </div>
            )}

            {/* ── Masonry grid — NO motion.div layout, NO AnimatePresence wrapper ── */}
            {filtered.length>0 && (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
                {filtered.map(project => (
                  <ArchiveCard key={project.id} project={project} />
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="text-center mt-10 py-6" style={{borderTop:'1px solid rgba(0,255,255,0.06)'}}>
              <p className="text-xs font-jetbrains mb-4" style={{color:'rgba(200,210,255,0.16)'}}>
                DEEP SPACE ARCHIVE — {ALL_PROJECTS.length} MISSIONS LOGGED
              </p>
              <button onClick={onClose}
                className="px-5 py-2 text-xs font-orbitron transition-all duration-150"
                style={{border:'1px solid rgba(0,255,255,0.18)',color:'rgba(0,255,255,0.45)',background:'rgba(0,255,255,0.03)'}}
                onMouseEnter={e=>{ e.currentTarget.style.color='#00ffff'; e.currentTarget.style.borderColor='rgba(0,255,255,0.45)' }}
                onMouseLeave={e=>{ e.currentTarget.style.color='rgba(0,255,255,0.45)'; e.currentTarget.style.borderColor='rgba(0,255,255,0.18)' }}>
                ← RETURN TO MAIN SYSTEM
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
