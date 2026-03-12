// src/components/StandardMode.jsx — v5: fully responsive
import { useState } from 'react'
import { motion } from 'framer-motion'

const SKILLS_DATA = [
  { category:'Frontend',   color:'#00ffff', items:['React','Next.js','TypeScript','TailwindCSS','Framer Motion','Three.js'] },
  { category:'Backend',    color:'#00ff88', items:['Node.js','Express','REST APIs','GraphQL','WebSocket','JWT Auth'] },
  { category:'Databases',  color:'#ff8800', items:['MongoDB','PostgreSQL','Redis','Prisma ORM','Mongoose'] },
  { category:'Design',     color:'#ff00ff', items:['Figma','UI/UX Design','Design Systems','Prototyping','Framer'] },
  { category:'AI & Tools', color:'#ffff00', items:['OpenAI API','LangChain','Prompt Engineering','Vercel AI SDK'] },
  { category:'DevOps',     color:'#3b82f6', items:['Docker','Git','GitHub Actions','Vercel','AWS EC2/S3'] },
]

const PROJECTS_DATA = [
  { name:'TradePro Simulator',  tech:['React','Node.js','WebSocket','MongoDB'],  desc:'Real-time trading simulation platform with live WebSocket data feeds, custom charting, and portfolio state management.', flex:'WebSocket · Figma UI · 95 Lighthouse', color:'#00ffff', tag:'MERN' },
  { name:'Vendixo Marketplace', tech:['Next.js','Stripe','PostgreSQL','Redis'],  desc:'Multi-vendor e-commerce with full Stripe checkout, seller dashboard, inventory management, and admin analytics.',   flex:'Stripe E2E · MVC · Design System',   color:'#ff00ff', tag:'Full Stack' },
  { name:'GeoMeteo Weather',    tech:['React','Three.js','D3.js','OpenWeather'], desc:'Geospatial weather viz with 3D globe rendering, D3 radar charts, and 7-day forecasting pipeline.',                    flex:'Three.js Globe · D3 Charts · Redis', color:'#ffff00', tag:'UI/UX' },
]

const EXPERIENCE = [
  { role:'Creative Full Stack Engineer', org:'Freelance / Independent', period:'2024 — Present', color:'#00ffff',
    points:['Shipped 3 production-grade web apps end-to-end','Built custom UI design systems in Figma before writing CSS','Integrated AI APIs (OpenAI, Anthropic) into real product features','Achieved 95+ Lighthouse scores across all deployed projects'] },
  { role:'UI/UX Designer + Developer',   org:'Self-directed build sprint',  period:'2023 — 2024',   color:'#ff00ff',
    points:['Deep-dived React, Next.js, and TypeScript through real projects','Completed 100+ design assets across Figma portfolios','Committed 400+ times across personal and open-source repos'] },
]

function SectionLabel({ text, color='#00ffff' }) {
  return (
    <div className="flex items-center gap-3 mb-5 sm:mb-6">
      <div className="w-1 h-5 sm:h-6" style={{ background:color, boxShadow:`0 0 7px ${color}` }} />
      <h2 className="text-base sm:text-lg font-orbitron font-black tracking-widest uppercase"
        style={{ color, textShadow:`0 0 10px ${color}33` }}>{text}</h2>
      <div className="flex-1 h-px" style={{ background:`linear-gradient(90deg,${color}44,transparent)` }} />
    </div>
  )
}

export default function StandardMode() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-3 sm:px-6" style={{ maxWidth:'860px', margin:'0 auto' }}>

      {/* Hero card */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="p-4 sm:p-6 mb-6 sm:mb-8 relative"
        style={{ background:'rgba(10,10,26,0.85)', border:'1px solid rgba(0,255,255,0.14)' }}>
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor:'#00ffff' }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor:'#00ffff' }} />

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="text-xs font-jetbrains mb-1" style={{ color:'rgba(255,0,255,0.55)', letterSpacing:'0.3em' }}>DEVELOPER PROFILE</div>
            <h1 className="text-3xl sm:text-4xl font-orbitron font-black mb-0.5"
              style={{ color:'#00ffff', textShadow:'0 0 18px rgba(0,255,255,0.3)' }}>INESH</h1>
            <div className="text-sm sm:text-base font-orbitron font-bold mb-2" style={{ color:'rgba(200,210,255,0.78)' }}>
              Creative Full Stack Engineer
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['UI/UX Designer','AI Integrator','React Specialist'].map(tag => (
                <span key={tag} className="text-xs font-jetbrains px-2 py-0.5"
                  style={{ border:'1px solid rgba(0,255,255,0.2)', color:'rgba(0,255,255,0.62)', background:'rgba(0,255,255,0.04)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex sm:flex-col gap-4 sm:gap-2 sm:text-right">
            {[{v:'400+',l:'Commits',c:'#00ffff'},{v:'12',l:'Projects',c:'#ff00ff'},{v:'100+',l:'UI Assets',c:'#ffff00'}].map(s => (
              <div key={s.l}>
                <div className="text-xl sm:text-2xl font-orbitron font-black" style={{ color:s.c, textShadow:`0 0 8px ${s.c}44` }}>{s.v}</div>
                <div className="text-xs font-jetbrains" style={{ color:'rgba(200,210,255,0.35)', fontSize:'9px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact row */}
        <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 pt-4"
          style={{ borderTop:'1px solid rgba(0,255,255,0.08)' }}>
          <a href="mailto:ineshvijay.work@gmail.com" className="flex items-center gap-1.5 text-xs sm:text-sm font-jetbrains transition-colors duration-150"
            style={{ color:'#00ffff' }}>
            <span style={{ opacity:0.6 }}>✉</span>ineshvijay.work@gmail.com
          </a>
          <a href="https://github.com/ineshvijayvergiya" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-jetbrains transition-colors duration-150"
            style={{ color:'rgba(200,210,255,0.5)' }}>
            <span style={{ opacity:0.6 }}>⑂</span>github.com/ineshvijayvergiya
          </a>
          <span className="text-xs sm:text-sm font-jetbrains" style={{ color:'rgba(200,210,255,0.38)' }}>
            ◉ Jaipur, India · Remote
          </span>
          <span className="ml-auto px-2 py-1 text-xs font-orbitron"
            style={{ color:'#4ade80', border:'1px solid rgba(74,222,128,0.28)', background:'rgba(74,222,128,0.05)' }}>
            ● AVAILABLE
          </span>
        </div>
      </motion.div>

      {/* Skills */}
      <div className="mb-8 sm:mb-10">
        <SectionLabel text="Technical Skills" color="#00ffff" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILLS_DATA.map((s, i) => (
            <motion.div key={s.category} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
              className="p-3 sm:p-4 relative"
              style={{ background:`${s.color}07`, border:`1px solid ${s.color}1f` }}>
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor:s.color }} />
              <div className="text-xs font-orbitron font-black mb-2.5" style={{ color:s.color }}>{s.category}</div>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map(item => (
                  <span key={item} className="px-1.5 sm:px-2 py-0.5 text-xs font-jetbrains"
                    style={{ background:`${s.color}0d`, border:`1px solid ${s.color}2e`, color:'rgba(200,210,255,0.72)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-8 sm:mb-10">
        <SectionLabel text="Featured Projects" color="#ff00ff" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {PROJECTS_DATA.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              className="p-4 sm:p-5 relative"
              style={{ background:`${p.color}06`, border:`1px solid ${p.color}20` }}>
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor:p.color }} />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor:p.color }} />
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm sm:text-base font-orbitron font-black" style={{ color:p.color }}>{p.name}</h3>
                <span className="text-xs font-orbitron px-1.5 py-0.5 ml-2 flex-shrink-0"
                  style={{ color:p.color, border:`1px solid ${p.color}44`, background:`${p.color}0a`, fontSize:'9px' }}>{p.tag}</span>
              </div>
              <p className="text-xs sm:text-sm font-jetbrains leading-relaxed mb-3" style={{ color:'rgba(200,210,255,0.6)' }}>{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tech.map(t => (
                  <span key={t} className="px-1.5 sm:px-2 py-0.5 text-xs font-jetbrains"
                    style={{ border:'1px solid rgba(255,255,255,0.09)', color:'rgba(200,210,255,0.5)' }}>{t}</span>
                ))}
              </div>
              <div className="flex items-start gap-1.5 pt-2.5" style={{ borderTop:`1px solid ${p.color}18` }}>
                <span className="text-xs" style={{ color:p.color, flexShrink:0 }}>⚡</span>
                <span className="text-xs font-jetbrains" style={{ color:`${p.color}bb`, lineHeight:'1.5' }}>{p.flex}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8 sm:mb-10">
        <SectionLabel text="Experience" color="#ffff00" />
        {EXPERIENCE.map((e, i) => (
          <div key={e.role} className="relative pl-6 sm:pl-8 mb-6 sm:mb-8">
            {i===0 && <div className="absolute left-2 sm:left-2.5 top-5 bottom-0 w-px"
              style={{ background:'linear-gradient(to bottom,rgba(0,255,255,0.25),transparent)' }} />}
            <div className="absolute left-0 top-1 w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor:e.color, background:'rgba(5,5,16,1)', boxShadow:`0 0 8px ${e.color}44` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background:e.color }} />
            </div>
            <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
              <h3 className="text-sm font-orbitron font-black" style={{ color:e.color }}>{e.role}</h3>
              <span className="text-xs font-jetbrains" style={{ color:'rgba(200,210,255,0.4)' }}>@ {e.org}</span>
              <span className="text-xs font-orbitron w-full sm:w-auto sm:ml-auto" style={{ color:'rgba(200,210,255,0.28)' }}>{e.period}</span>
            </div>
            <ul className="space-y-1">
              {e.points.map((pt, j) => (
                <li key={j} className="flex items-start gap-2 text-xs sm:text-sm font-jetbrains" style={{ color:'rgba(200,210,255,0.58)' }}>
                  <span style={{ color:e.color, flexShrink:0, marginTop:'2px' }}>▸</span>{pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
        className="p-5 sm:p-6 text-center relative"
        style={{ background:'rgba(10,10,26,0.85)', border:'1px solid rgba(0,255,255,0.12)' }}>
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor:'#00ffff' }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor:'#00ffff' }} />
        <div className="text-xs font-jetbrains mb-2" style={{ color:'rgba(200,210,255,0.35)' }}>READY TO COLLABORATE?</div>
        <h3 className="text-lg sm:text-xl font-orbitron font-black mb-4" style={{ color:'#00ffff', textShadow:'0 0 12px rgba(0,255,255,0.3)' }}>
          Let's build something remarkable.
        </h3>
        <a href="mailto:ineshvijay.work@gmail.com?subject=Opportunity: Saw your awesome portfolio!"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-orbitron font-black transition-all duration-200"
          style={{ background:'rgba(0,255,255,0.09)', border:'1px solid rgba(0,255,255,0.38)', color:'#00ffff', textShadow:'0 0 7px rgba(0,255,255,0.4)' }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(0,255,255,0.16)'; e.currentTarget.style.boxShadow='0 0 20px rgba(0,255,255,0.18)' }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(0,255,255,0.09)'; e.currentTarget.style.boxShadow='none' }}>
          ✉ SEND AN OPPORTUNITY
        </a>
      </motion.div>
    </div>
  )
}