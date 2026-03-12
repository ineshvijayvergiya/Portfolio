import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_SEQUENCE = [
  { text: '[ BIOS ] POST check complete... 512MB VRAM detected', delay: 0 },
  { text: '[ SYS  ] Initializing INESH.DEV neural kernel v2.4.1...', delay: 300 },
  { text: '[ MEM  ] Allocating memory blocks.............. OK', delay: 600 },
  { text: '[ NET  ] Establishing grid connection.......... OK', delay: 900 },
  { text: '[ GPU  ] Loading holographic render engine..... OK', delay: 1100 },
  { text: '[ SKL  ] Importing skill matrix modules........ OK', delay: 1350 },
  { text: '[ PRJ  ] Decrypting mission archives........... OK', delay: 1550 },
  { text: '[ INV  ] Loading developer inventory........... OK', delay: 1750 },
  { text: '[ COM  ] Terminal handshake established........ OK', delay: 1950 },
  { text: '[ XP   ] Calculating developer level........... LVL 10', delay: 2150 },
  { text: '[ SYS  ] All systems nominal. Welcome, Commander INESH.', delay: 2400 },
]

const CHAR_FRAMES = ['◇', '◈', '◆', '◈', '▣', '◈']

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [charFrame, setCharFrame] = useState(0)
  const [phase, setPhase] = useState('booting') // booting | done | exiting
  const timerRefs = useRef([])

  useEffect(() => {
    // Character animation
    const charInterval = setInterval(() => {
      setCharFrame((f) => (f + 1) % CHAR_FRAMES.length)
    }, 120)

    // Boot lines
    BOOT_SEQUENCE.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, { ...line, index: i }])
      }, line.delay + 400)
      timerRefs.current.push(t)
    })

    // Progress bar
    const totalDuration = 3200
    const interval = 30
    const steps = totalDuration / interval
    let step = 0
    const progInterval = setInterval(() => {
      step++
      setProgress(Math.min((step / steps) * 100, 100))
      if (step >= steps) {
        clearInterval(progInterval)
        setPhase('done')
        setTimeout(() => {
          setPhase('exiting')
          setTimeout(onComplete, 800)
        }, 600)
      }
    }, interval)

    return () => {
      clearInterval(charInterval)
      clearInterval(progInterval)
      timerRefs.current.forEach(clearTimeout)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exiting' && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-cyber-dark flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Speed lines background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px"
                style={{
                  top: `${3 + i * 4}%`,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.2), transparent)',
                  animation: `speed-line ${0.7 + Math.random() * 0.8}s linear ${i * 0.06}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Main content */}
          <div className="relative z-10 w-full max-w-2xl px-6">
            {/* Character spinner */}
            <div className="text-center mb-10">
              <motion.div
                className="text-9xl font-orbitron inline-block"
                style={{ color: 'var(--cyber-cyan)' }}
                animate={{
                  textShadow: [
                    '0 0 20px #00ffff, 0 0 40px #00ffff',
                    '0 0 40px #00ffff, 0 0 80px #00ffff, 0 0 120px #00ffff44',
                    '0 0 20px #00ffff, 0 0 40px #00ffff',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {CHAR_FRAMES[charFrame]}
              </motion.div>
              <div
                className="text-xs tracking-[0.6em] mt-3 font-jetbrains"
                style={{ color: 'rgba(0,255,255,0.6)' }}
              >
                LOADING DEVELOPER PROFILE
              </div>
            </div>

            {/* Boot log */}
            <div
              className="font-jetbrains text-xs space-y-1 mb-8 h-56 overflow-hidden"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {visibleLines.map((line) => (
                <motion.div
                  key={line.index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3"
                >
                  <span
                    className="text-xs opacity-40 font-jetbrains"
                    style={{ color: 'var(--cyber-cyan)', minWidth: '24px' }}
                  >
                    {String(line.index).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      color: line.text.includes('OK')
                        ? 'var(--cyber-green)'
                        : line.text.includes('LVL')
                        ? 'var(--cyber-yellow)'
                        : line.text.includes('Welcome')
                        ? 'var(--cyber-cyan)'
                        : 'rgba(200,210,255,0.7)',
                    }}
                  >
                    {line.text}
                  </span>
                </motion.div>
              ))}
              <span
                className="font-jetbrains"
                style={{
                  color: 'var(--cyber-cyan)',
                  animation: 'boot-flash 0.7s ease-in-out infinite',
                  display: 'inline-block',
                }}
              >
                █
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="flex justify-between text-xs mb-2 font-orbitron">
                <span style={{ color: 'var(--cyber-cyan)' }}>SYSTEM BOOT</span>
                <span style={{ color: 'var(--cyber-cyan)' }}>{Math.floor(progress)}%</span>
              </div>
              <div
                className="h-2 relative overflow-hidden"
                style={{ background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.15)' }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--cyber-cyan), var(--cyber-magenta))',
                    boxShadow: '0 0 10px var(--cyber-cyan)',
                    width: `${progress}%`,
                  }}
                  transition={{ ease: 'linear' }}
                />
                {/* Shimmer */}
                <div
                  className="absolute inset-0 h-full w-16"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: 'speed-line 1s linear infinite',
                  }}
                />
              </div>

              {/* Segment marks */}
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map((mark) => (
                  <div
                    key={mark}
                    className="text-xs font-orbitron"
                    style={{ color: 'rgba(0,255,255,0.3)', fontSize: '8px' }}
                  >
                    {mark}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom status */}
            {phase === 'done' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8"
              >
                <div
                  className="text-sm font-orbitron tracking-widest"
                  style={{
                    color: 'var(--cyber-yellow)',
                    animation: 'neon-flicker 2s ease-in-out',
                    textShadow: '0 0 10px var(--cyber-yellow)',
                  }}
                >
                  ◈ SYSTEM READY — ENTERING INTERFACE ◈
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
