// src/App.jsx — v5: fixes warp re-open bug, full responsive layout
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import CursorGlow    from './effects/CursorGlow'
import ParticleField from './effects/ParticleField'
import ScanLines     from './effects/ScanLines'

import BootScreen     from './components/BootScreen'
import NavBar         from './components/NavBar'
import HeroSection    from './components/HeroSection'
import ProjectPlanets from './components/ProjectPlanets'
import SkillGalaxy    from './components/SkillGalaxy'
import Inventory      from './components/Inventory'
import Terminal       from './components/Terminal'
import StandardMode   from './components/StandardMode'
import ProjectArchive from './components/ProjectArchive'

function Divider({ color = '#00ffff' }) {
  return (
    <div className="relative py-2 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}33, transparent)` }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-xs font-orbitron"
        style={{ color: `${color}55`, background: '#050510' }}>◈</div>
    </div>
  )
}

export default function App() {
  const [booted, setBooted]               = useState(false)
  const [isStandardMode, setIsStandardMode] = useState(false)
  // ── FIX: archive state lives here; WarpPortal just calls openArchive ──
  const [showArchive, setShowArchive]     = useState(false)
  // ── FIX: separate warp-playing state so WarpPortal resets after close ──
  const [warpKey, setWarpKey]             = useState(0)

  const openArchive = useCallback(() => {
    setShowArchive(true)
  }, [])

  // When archive closes we bump warpKey so WarpPortal unmounts/remounts → resets its internal warping state
  const closeArchive = useCallback(() => {
    setShowArchive(false)
    setWarpKey(k => k + 1)   // ← KEY FIX: forces WarpPortal to re-instantiate with fresh state
  }, [])

  return (
    <>
      <CursorGlow />
      <ScanLines />

      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative min-h-screen"
            style={{ background: 'var(--cyber-dark)' }}
          >
            <ParticleField count={isStandardMode ? 25 : 50} />
            <div className="fixed inset-0 pointer-events-none z-0 grid-bg" />
            <div className="fixed inset-0 pointer-events-none z-0"
              style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)' }} />

            <NavBar isStandardMode={isStandardMode} onModeToggle={() => setIsStandardMode(p => !p)} />

            {/* Archive overlay — AnimatePresence handles mount/unmount */}
            <AnimatePresence>
              {showArchive && (
                <ProjectArchive key="archive" onClose={closeArchive} />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isStandardMode ? (
                <motion.div key="standard"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
                  className="relative z-10">
                  <StandardMode />
                </motion.div>
              ) : (
                <motion.main key="cyberpunk"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="relative z-10">
                  <HeroSection />
                  <Divider color="#ff00ff" />
                  {/* Pass warpKey so WarpPortal resets after each close */}
                  <ProjectPlanets onOpenArchive={openArchive} warpKey={warpKey} />
                  <Divider color="#00ffff" />
                  <SkillGalaxy />
                  <Divider color="#ffff00" />
                  <Inventory />
                  <Divider color="#00ffff" />
                  <Terminal />
                </motion.main>
              )}
            </AnimatePresence>

            {/* Side HUD — hidden on mobile/tablet */}
            {!isStandardMode && (
              <>
                <div className="fixed left-3 top-1/2 -translate-y-1/2 flex-col items-center gap-2
                                pointer-events-none z-20 hidden xl:flex">
                  {['◈','◉','⬡','▣','>'].map((icon, i) => (
                    <div key={i} className="text-xs font-orbitron"
                      style={{ color: 'rgba(0,255,255,0.12)',
                        animation: `neon-flicker ${2+i*0.3}s ease-in-out ${i*0.2}s infinite` }}>
                      {icon}
                    </div>
                  ))}
                </div>
                <div className="fixed right-3 bottom-6 pointer-events-none z-20 hidden xl:block"
                  style={{ color:'rgba(0,255,255,0.1)', fontSize:'9px', fontFamily:'JetBrains Mono, monospace' }}>
                  <div>LAT: 26.9124° N</div><div>LNG: 75.7873° E</div><div>CLASS: LVL 10</div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
