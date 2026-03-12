// src/components/HeroSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Updated: Honest title, Level 10 framing, real metrics, no vanity numbers
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HologramCanvas from '../effects/HologramCanvas'

// ── Real, honest developer stats ─────────────────────────────────────────────
const REAL_STATS = [
  { label: 'REAL COMMITS',       value: 400,    suffix: '+',  color: '#00ffff', icon: '⑂' },
  { label: 'PROJECTS MADE',   value: 12,     suffix: '',   color: '#ff00ff', icon: '◈' },
  { label: 'DESIGN ASSETS',      value: 100,    suffix: '+',  color: '#ffff00', icon: '◎' },
  { label: 'COFFEE CONSUMED',    value: 1200,   suffix: 'ml', color: '#ff8800', icon: '☕' },
]

// ── Honest XP bars ────────────────────────────────────────────────────────────
const ATTRIBUTES = [
  { label: 'FRONTEND CRAFT',     value: 82,  color: '#00ffff' },
  { label: 'UI/UX DESIGN',       value: 98,  color: '#ff00ff' },
  { label: 'BACKEND SYSTEMS',    value: 70,  color: '#00ff88' },
  { label: 'AI INTEGRATION',     value: 75,  color: '#ffff00' },
  { label: 'CREATIVE VISION',    value: 90,  color: '#ff8800' },
]

// ── Animated counter ──────────────────────────────────────────────────────────
function CountUp({ target, duration = 1400 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const t = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(t)
  }, [target, duration])
  return <>{count.toLocaleString()}</>
}

// ── Attribute bar ─────────────────────────────────────────────────────────────
function AttrBar({ label, value, color, delay = 0 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay + 300)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1.5"
        style={{ fontFamily: 'JetBrains Mono, monospace', color }}>
        <span>{label}</span>
        <span style={{ opacity: 0.6 }}>{value} / 100</span>
      </div>
      <div className="h-1.5 relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}18` }}>
        <div className="h-full transition-all ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: `0 0 8px ${color}`,
            transitionDuration: '1.4s',
          }} />
      </div>
    </div>
  )
}

// ── Glitch heading ────────────────────────────────────────────────────────────
function GlitchName({ text }) {
  return (
    <span className="relative inline-block" style={{ fontFamily: 'Orbitron, monospace' }}>
      <span className="relative z-10" style={{
        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.4))',
      }}>{text}</span>
      <span className="absolute inset-0" aria-hidden style={{
        color: '#ff00ff', animation: 'glitch 3.5s infinite',
        clipPath: 'polygon(0 25%, 100% 25%, 100% 45%, 0 45%)',
        transform: 'translateX(-3px)', opacity: 0.6,
        fontFamily: 'Orbitron, monospace',
      }}>{text}</span>
      <span className="absolute inset-0" aria-hidden style={{
        color: '#00ffff', animation: 'glitch 3.5s infinite 0.12s',
        clipPath: 'polygon(0 65%, 100% 65%, 100% 82%, 0 82%)',
        transform: 'translateX(3px)', opacity: 0.5,
        fontFamily: 'Orbitron, monospace',
      }}>{text}</span>
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [xpFill, setXpFill] = useState(0)
  // Level 10 = 10/100 on a "lifetime" scale — honest framing
  const LVL = 10
  const XP_CURRENT = 10_420
  const XP_MAX = 100_000

  useEffect(() => {
    const t = setTimeout(() => setXpFill((XP_CURRENT / XP_MAX) * 100), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Online indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400"
              style={{ boxShadow: '0 0 8px #4ade80', animation: 'boot-flash 2s infinite' }} />
            <span className="text-xs tracking-widest"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: '#4ade80' }}>
              SYSTEM ONLINE — ALL MODULES LOADED
            </span>
          </div>

          {/* Subtitle tag */}
          <div className="text-xs tracking-[0.4em] mb-3"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,0,255,0.7)' }}>
            // DEVELOPER PROFILE — SECTOR: WEB + DESIGN + AI
          </div>

          {/* Name */}
          <h1 className="text-7xl font-black mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
            <GlitchName text="INESH" />
          </h1>

          {/* ── Updated multi-role title ── */}
          <div className="mb-1">
            <div className="text-lg font-bold tracking-wider"
              style={{ fontFamily: 'Orbitron, monospace', color: 'rgba(200,210,255,0.85)' }}>
              Creative Full Stack Engineer
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {['UI/UX Designer', 'AI Integrator', 'React Specialist'].map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    border: '1px solid rgba(0,255,255,0.25)',
                    color: 'rgba(0,255,255,0.7)',
                    background: 'rgba(0,255,255,0.04)',
                  }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ── Level badge + XP bar ── */}
          <div className="flex items-center gap-5 my-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 flex flex-col items-center justify-center"
                style={{
                  background: 'rgba(0,255,255,0.06)',
                  border: '2px solid var(--cyber-cyan)',
                  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                  boxShadow: '0 0 25px rgba(0,255,255,0.35)',
                }}>
                <span className="text-3xl font-black"
                  style={{ fontFamily: 'Orbitron, monospace', color: 'var(--cyber-cyan)' }}>
                  {LVL}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-xs font-black"
                style={{ background: 'var(--cyber-magenta)', color: '#000', fontFamily: 'Orbitron, monospace' }}>
                LVL
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(0,255,255,0.35)', animation: 'pulse-ring 2.4s ease-out infinite', transform: 'scale(1.25)' }} />
            </div>

            <div className="flex-1">
              {/* ── Honest framing ── */}
              <div className="flex justify-between text-xs mb-1.5"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--cyber-cyan)' }}>
                <span style={{ fontFamily: 'Orbitron, monospace' }}>1+ YEAR OF CRAFTED EXPERIENCE</span>
                <span style={{ opacity: 0.55 }}>XP {XP_CURRENT.toLocaleString()} / {XP_MAX.toLocaleString()}</span>
              </div>
              <div className="h-3 relative overflow-hidden"
                style={{ background: 'rgba(0,255,255,0.04)', border: '1px solid rgba(0,255,255,0.18)' }}>
                <div className="h-full"
                  style={{
                    width: `${xpFill}%`,
                    background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
                    boxShadow: '0 0 12px rgba(0,255,255,0.7)',
                    transition: 'width 2.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)',
                    animation: 'speed-line 2s linear infinite',
                  }} />
              </div>
              <div className="text-xs mt-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,255,255,0.38)' }}>
                {((XP_CURRENT / XP_MAX) * 100).toFixed(1)}% JOURNEY COMPLETE — EVOLVING FAST
              </div>
            </div>
          </div>

          {/* Attribute bars */}
          <div className="p-5 mb-6 relative"
            style={{ background: 'rgba(10,10,26,0.85)', border: '1px solid rgba(0,255,255,0.1)' }}>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: '#00ffff' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: '#00ffff' }} />
            <div className="text-xs mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,255,255,0.45)' }}>
              ▸ CORE ATTRIBUTES
            </div>
            {ATTRIBUTES.map((a, i) => (
              <AttrBar key={a.label} {...a} delay={i * 120} />
            ))}
          </div>

          {/* ── Real stats (no vanity) ── */}
          <div className="grid grid-cols-4 gap-3">
            {REAL_STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-3 text-center relative overflow-hidden"
                style={{ background: `${s.color}07`, border: `1px solid ${s.color}20` }}>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: s.color }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: s.color }} />
                <div className="text-lg mb-0.5" style={{ color: s.color }}>{s.icon}</div>
                <div className="text-lg font-black"
                  style={{ fontFamily: 'Orbitron, monospace', color: s.color, textShadow: `0 0 10px ${s.color}` }}>
                  <CountUp target={s.value} />{s.suffix}
                </div>
                <div className="text-xs mt-1 leading-tight"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(200,210,255,0.35)', fontSize: '9px' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Hologram panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative" style={{
            background: 'rgba(10,10,26,0.7)',
            border: '1px solid rgba(255,0,255,0.2)',
            padding: '16px',
          }}>
            {['tl', 'tr', 'bl', 'br'].map(pos => (
              <div key={pos} className="absolute w-4 h-4"
                style={{
                  top: pos.includes('t') ? 0 : 'auto',
                  bottom: pos.includes('b') ? 0 : 'auto',
                  left: pos.includes('l') ? 0 : 'auto',
                  right: pos.includes('r') ? 0 : 'auto',
                  borderTop: pos.includes('t') ? '2px solid #ff00ff' : 'none',
                  borderBottom: pos.includes('b') ? '2px solid #ff00ff' : 'none',
                  borderLeft: pos.includes('l') ? '2px solid #ff00ff' : 'none',
                  borderRight: pos.includes('r') ? '2px solid #ff00ff' : 'none',
                }} />
            ))}

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,0,255,0.65)' }}>
                ◈ NEURAL RENDER v2.4 — REAL-TIME
              </span>
              <div className="flex gap-2">
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
            </div>

            <div className="relative" style={{ height: '300px' }}>
              <HologramCanvas className="w-full h-full" />
              <div className="absolute top-3 left-3 text-xs space-y-0.5"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,255,255,0.38)' }}>
                <div>ROT: AUTO</div><div>SYNC: LIVE</div><div>NODES: 10</div>
              </div>
            </div>

            <div className="flex justify-between mt-3 text-xs"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span style={{ color: 'rgba(0,255,255,0.4)' }}>◈ PROFILE: AUTHENTICATED</span>
              <span style={{ color: 'rgba(255,0,255,0.4)' }}>▸ IDENTITY: INESH</span>
            </div>
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['React', 'Next.js', 'Node.js', 'Three.js', 'TypeScript', 'Figma', 'TailwindCSS', 'AI APIs'].map(tag => (
              <span key={tag} className="px-3 py-1 text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  border: '1px solid rgba(0,255,255,0.14)',
                  color: 'rgba(0,255,255,0.6)',
                  background: 'rgba(0,255,255,0.03)',
                }}>{tag}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
