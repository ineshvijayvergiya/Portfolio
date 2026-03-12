// src/components/NavBar.jsx — v5: mobile-first responsive
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { id:'hero',      label:'HOME',     icon:'◈' },
  { id:'planets',   label:'PROJECTS', icon:'◉' },
  { id:'skills',    label:'SKILLS',   icon:'⬡' },
  { id:'inventory', label:'TOOLS',    icon:'▣' },
  { id:'contact',   label:'CONTACT',  icon:'>' },
]

function ModeToggle({ isStandardMode, onToggle }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-orbitron hidden sm:block transition-all duration-300"
        style={{ color:isStandardMode?'rgba(0,255,136,0.85)':'rgba(200,210,255,0.28)', fontSize:'10px', letterSpacing:'0.08em' }}>
        {isStandardMode ? 'RECRUITER' : 'CYBER'}
      </span>
      <button onClick={onToggle} aria-label="Toggle mode"
        style={{
          width:'44px', height:'22px', borderRadius:'11px', position:'relative', flexShrink:0,
          border: isStandardMode?'1px solid rgba(0,255,136,0.45)':'1px solid rgba(0,255,255,0.22)',
          background: isStandardMode?'rgba(0,255,136,0.1)':'rgba(0,0,0,0.35)',
          transition:'all 0.3s', cursor:'pointer',
        }}>
        <motion.div animate={{ x: isStandardMode ? 24 : 2 }}
          transition={{ type:'spring', stiffness:500, damping:38 }}
          style={{
            position:'absolute', top:'3px', width:'14px', height:'14px', borderRadius:'50%',
            background: isStandardMode
              ? 'linear-gradient(135deg,#00ff88,#00cc66)'
              : 'linear-gradient(135deg,#00ffff,#0077ff)',
            boxShadow: isStandardMode ? '0 0 7px rgba(0,255,136,0.8)' : '0 0 7px rgba(0,255,255,0.8)',
          }} />
      </button>
    </div>
  )
}

// Mobile hamburger menu
function MobileMenu({ open, onClose, isStandardMode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-8 }} transition={{ duration:0.2 }}
          className="absolute top-full left-0 right-0 z-50"
          style={{ background:'rgba(5,5,18,0.99)', borderBottom:'1px solid rgba(0,255,255,0.1)' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id}
              onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior:'smooth' }); onClose() }}
              className="flex items-center gap-3 w-full px-5 py-3 text-sm font-orbitron transition-colors duration-150"
              style={{ color:'rgba(200,210,255,0.6)', borderBottom:'1px solid rgba(0,255,255,0.05)' }}
              onMouseEnter={e => e.currentTarget.style.color = isStandardMode ? '#4ade80' : '#00ffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,210,255,0.6)'}>
              <span style={{ color:'rgba(0,255,255,0.4)' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function NavBar({ isStandardMode, onModeToggle }) {
  const [active, setActive]   = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime]       = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const tick = () => { const d = new Date(); setTime(d.toLocaleTimeString('en-US',{hour12:false})) }
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive:true }); return () => window.removeEventListener('scroll', fn)
  }, [])

  const accentColor = isStandardMode ? '#4ade80' : '#00ffff'

  return (
    <motion.nav initial={{ y:-70, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ delay:0.3, duration:0.5 }}
      className="fixed top-0 left-0 right-0 z-[900]"
      style={{
        background: scrolled?'rgba(5,5,16,0.97)':'rgba(5,5,16,0.8)',
        borderBottom:`1px solid ${accentColor}18`,
        backdropFilter:'blur(14px)',
        transition:'all 0.35s',
      }}>

      {/* Recruiter banner */}
      <AnimatePresence>
        {isStandardMode && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }}
            style={{ background:'linear-gradient(90deg,transparent,rgba(0,255,136,0.07),transparent)',
              borderBottom:'1px solid rgba(0,255,136,0.09)', overflow:'hidden' }}>
            <div className="flex items-center justify-center gap-2 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow:'0 0 5px #4ade80', animation:'boot-flash 2s infinite' }} />
              <span className="text-xs font-jetbrains" style={{ color:'rgba(0,255,136,0.65)', letterSpacing:'0.18em' }}>
                RECRUITER MODE ACTIVE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full" style={{ background:accentColor, boxShadow:`0 0 7px ${accentColor}`, animation:'boot-flash 2s infinite', transition:'all 0.4s' }} />
          <span className="font-orbitron font-black text-sm sm:text-base" style={{ color:accentColor, textShadow:`0 0 10px ${accentColor}55`, transition:'all 0.4s' }}>
            INESH.DEV
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map(item => (
            <button key={item.id}
              onClick={() => { setActive(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior:'smooth' }) }}
              className="relative px-3 py-2 text-xs font-orbitron tracking-wider transition-all duration-200"
              style={{ color: active===item.id ? accentColor : 'rgba(200,210,255,0.35)',
                textShadow: active===item.id ? `0 0 8px ${accentColor}` : 'none' }}>
              {active===item.id && (
                <motion.div layoutId="nav-pill" className="absolute inset-0"
                  style={{ background:`${accentColor}07`, border:`1px solid ${accentColor}22` }}
                  transition={{ type:'spring', stiffness:300, damping:30 }} />
              )}
              <span className="relative z-10">
                <span style={{ opacity:0.4, marginRight:'4px' }}>{item.icon}</span>{item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-jetbrains hidden lg:block" style={{ color:'rgba(200,210,255,0.22)' }}>{time}</span>
          <ModeToggle isStandardMode={isStandardMode} onToggle={onModeToggle} />
          <div className="px-2 py-1 font-orbitron text-xs hidden sm:block"
            style={{ color:'#4ade80', border:'1px solid rgba(74,222,128,0.22)', background:'rgba(74,222,128,0.04)' }}>
            ● OPEN
          </div>
          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-1 p-1.5" onClick={() => setMobileOpen(o=>!o)}>
            {[0,1,2].map(i => (
              <div key={i} className="w-5 h-0.5 transition-all duration-200"
                style={{ background: mobileOpen ? accentColor : 'rgba(200,210,255,0.5)',
                  transform: mobileOpen ? (i===1?'scaleX(0)':(i===0?'rotate(45deg) translate(3px,3px)':'rotate(-45deg) translate(3px,-3px)')) : 'none' }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="relative md:hidden">
        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} isStandardMode={isStandardMode} />
      </div>
    </motion.nav>
  )
}
