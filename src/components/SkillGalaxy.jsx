
import { useRef, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Html, Billboard } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// ── Skill data ────────────────────────────────────────────────────────────────
const SECTORS = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    color: '#00ffff',
    orbitRadius: 2.8,
    orbitSpeed: 0.28,
    size: 0.28,
    tilt: 0.2,
    skills: ['React', 'Next.js', 'Three.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    level: 82,
    desc: 'Building interactive, high-performance UIs with React ecosystem tools.',
  },
  {
    id: 'backend',
    label: 'BACKEND',
    color: '#00ff88',
    orbitRadius: 4.2,
    orbitSpeed: 0.18,
    size: 0.26,
    tilt: -0.3,
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSocket', 'Auth/JWT'],
    level: 70,
    desc: 'Designing scalable server architecture and API systems.',
  },
  {
    id: 'databases',
    label: 'DATABASES',
    color: '#ff8800',
    orbitRadius: 5.6,
    orbitSpeed: 0.12,
    size: 0.22,
    tilt: 0.4,
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma ORM', 'Mongoose', 'Query Optimisation'],
    level: 68,
    desc: 'Efficient data modelling, indexing, and caching strategies.',
  },
  {
    id: 'design',
    label: 'UI/UX DESIGN',
    color: '#ff00ff',
    orbitRadius: 3.6,
    orbitSpeed: 0.22,
    size: 0.30,
    tilt: -0.15,
    skills: ['Figma', 'Design Systems', 'Prototyping', 'Framer', 'UI Animation', 'Accessibility'],
    level: 90,
    desc: 'Crafting intuitive interfaces and cohesive design systems from scratch.',
  },
  {
    id: 'ai',
    label: 'AI TOOLS',
    color: '#ff00aa',
    orbitRadius: 6.8,
    orbitSpeed: 0.09,
    size: 0.26,
    tilt: 0.5,
    skills: ['OpenAI API', 'LangChain', 'Prompt Engineering', 'Vercel AI SDK', 'Embeddings', 'RAG Pipelines'],
    level: 75,
    desc: 'Integrating LLM capabilities into real products via modern AI APIs.',
  },
]

// ── Central Sun ───────────────────────────────────────────────────────────────
function CoreSun({ hovered, setHovered }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const isHov = hovered === 'sun'

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.rotation.x += delta * 0.1
    }
    if (glowRef.current) {
      const s = 1 + 0.1 * Math.sin(Date.now() * 0.002)
      glowRef.current.scale.setScalar(s)
    }
  })

  return (
    <group onPointerEnter={() => setHovered('sun')} onPointerLeave={() => setHovered(null)}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      {/* Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 3]} />
        <meshBasicMaterial color={isHov ? '#ffffff' : '#ffff00'} wireframe transparent opacity={isHov ? 0.9 : 0.7} />
      </mesh>
      {/* Second wireframe shell */}
      <mesh rotation={[0.5, 0.5, 0]}>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshBasicMaterial color="#ffaa00" wireframe transparent opacity={0.15} />
      </mesh>

      {isHov && (
        <Html center distanceFactor={8}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            background: 'rgba(5,5,18,0.97)',
            border: '1px solid #ffff00',
            padding: '12px 16px',
            minWidth: '200px',
            boxShadow: '0 0 30px rgba(255,255,0,0.2)',
            pointerEvents: 'none',
          }}>
            <div style={{ color: '#ffff00', fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '14px', marginBottom: '6px' }}>
              ☀ CORE ENGINE
            </div>
            <div style={{ color: 'rgba(200,210,255,0.7)', fontSize: '11px', lineHeight: 1.6 }}>
              JavaScript / TypeScript<br />
              The foundation of everything.<br />
              ES2024+, async patterns, type safety.
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// ── Orbit ring ────────────────────────────────────────────────────────────────
function OrbitRing({ radius, color }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 6, 140]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  )
}

// ── Planet ────────────────────────────────────────────────────────────────────
function Planet({ sector, hovered, setHovered, setSelected }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const glowRef = useRef()
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const isHov = hovered === sector.id

  useFrame((_, delta) => {
    angleRef.current += delta * sector.orbitSpeed
    const a = angleRef.current
    const r = sector.orbitRadius
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(a) * r
      groupRef.current.position.z = Math.sin(a) * r
      groupRef.current.position.y = Math.sin(a * 1.5) * 0.3 + sector.tilt * 0.5
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6
      meshRef.current.rotation.x += delta * 0.2
    }
    if (glowRef.current) {
      const pulse = 1 + 0.12 * Math.sin(Date.now() * 0.002 + sector.orbitRadius)
      glowRef.current.scale.setScalar(isHov ? pulse * 1.3 : pulse)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Glow aura */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[sector.size * 2.8, 12, 12]} />
        <meshBasicMaterial color={sector.color} transparent opacity={isHov ? 0.08 : 0.035} side={THREE.BackSide} />
      </mesh>

      {/* Planet mesh */}
      <mesh ref={meshRef}
        onPointerEnter={() => setHovered(sector.id)}
        onPointerLeave={() => setHovered(null)}
        onClick={() => setSelected(sector)}>
        <icosahedronGeometry args={[sector.size, 1]} />
        <meshBasicMaterial color={isHov ? '#ffffff' : sector.color} transparent opacity={isHov ? 0.95 : 0.85} />
      </mesh>
      {/* Wireframe shell */}
      <mesh rotation={[0.4, 0, 0.2]}>
        <icosahedronGeometry args={[sector.size * 1.18, 0]} />
        <meshBasicMaterial color={sector.color} wireframe transparent opacity={isHov ? 0.5 : 0.22} />
      </mesh>

      {/* Hover tooltip */}
      {isHov && (
        <Html center distanceFactor={8}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            background: 'rgba(5,5,18,0.97)',
            border: `1px solid ${sector.color}`,
            padding: '12px 16px',
            minWidth: '220px',
            boxShadow: `0 0 30px ${sector.color}22`,
            pointerEvents: 'none',
            zIndex: 100,
          }}>
            <div style={{ color: sector.color, fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '13px', marginBottom: '4px' }}>
              ◈ {sector.label}
            </div>
            <div style={{ color: 'rgba(200,210,255,0.55)', fontSize: '9px', marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
              LVL {sector.level} / 100 — CLICK TO EXPAND
            </div>
            {/* Level bar */}
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', marginBottom: '8px' }}>
              <div style={{ width: `${sector.level}%`, height: '100%', background: sector.color, boxShadow: `0 0 6px ${sector.color}` }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {sector.skills.slice(0, 4).map(s => (
                <span key={s} style={{
                  fontSize: '9px', padding: '1px 6px',
                  border: `1px solid ${sector.color}44`, color: sector.color,
                  fontFamily: 'JetBrains Mono, monospace',
                }}>{s}</span>
              ))}
              {sector.skills.length > 4 && (
                <span style={{ fontSize: '9px', color: 'rgba(200,210,255,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
                  +{sector.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// ── Asteroid belt (decorative) ────────────────────────────────────────────────
function AsteroidBelt() {
  const points = useMemo(() => {
    return Array.from({ length: 200 }, () => {
      const a = Math.random() * Math.PI * 2
      const r = 7.5 + (Math.random() - 0.5) * 0.8
      return [Math.cos(a) * r, (Math.random() - 0.5) * 0.3, Math.sin(a) * r]
    }).flat()
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return g
  }, [points])

  return (
    <points geometry={geo}>
      <pointsMaterial color="#888899" size={0.04} transparent opacity={0.5} />
    </points>
  )
}

// ── Connection lines from sun to planets ──────────────────────────────────────
function GalaxyConnections({ sectors }) {
  // These are rendered via canvas overlay, not Three.js lines, to avoid stale positions
  return null
}

// ── Side panel for selected sector ───────────────────────────────────────────
function SectorPanel({ sector, onClose }) {
  if (!sector) return null
  return (
    <AnimatePresence>
      <motion.div
        key={sector.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className="absolute right-4 top-4 z-30 w-64"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="p-5 relative"
          style={{
            background: 'rgba(5,5,18,0.97)',
            border: `1px solid ${sector.color}55`,
            boxShadow: `0 0 30px ${sector.color}18`,
          }}>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: sector.color }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: sector.color }} />

          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-black" style={{ fontFamily: 'Orbitron, monospace', color: sector.color }}>
              {sector.label}
            </div>
            <button onClick={onClose} style={{ color: 'rgba(200,210,255,0.3)', fontFamily: 'monospace' }}
              onMouseEnter={e => e.target.style.color = sector.color}
              onMouseLeave={e => e.target.style.color = 'rgba(200,210,255,0.3)'}>✕</button>
          </div>

          <p className="text-xs leading-relaxed mb-4"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(200,210,255,0.6)' }}>
            {sector.desc}
          </p>

          {/* Level bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: sector.color }}>
              <span>MASTERY</span><span>{sector.level}/100</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${sector.color}18` }}>
              <div className="h-full" style={{ width: `${sector.level}%`, background: sector.color, boxShadow: `0 0 6px ${sector.color}`, transition: 'width 1s' }} />
            </div>
          </div>

          {/* Skills list */}
          <div className="text-xs mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,255,255,0.4)' }}>
            SKILL STACK:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sector.skills.map(s => (
              <span key={s} className="px-2 py-0.5 text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                  border: `1px solid ${sector.color}33`,
                  color: sector.color,
                  background: `${sector.color}08`,
                }}>{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Main Galaxy component ─────────────────────────────────────────────────────
export default function SkillGalaxy() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  return (
    <section id="skills" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.4em] mb-3"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,0,255,0.65)' }}>
            // 3D SKILL GALAXY
          </div>
          <h2 className="text-5xl font-black"
            style={{ fontFamily: 'Orbitron, monospace', textShadow: '0 0 20px rgba(0,255,255,0.25)' }}>
            ABILITY SYSTEM
          </h2>
          <p className="text-xs mt-3" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(200,210,255,0.38)' }}>
            DRAG TO ROTATE · SCROLL TO ZOOM · HOVER PLANETS · CLICK TO EXPAND
          </p>
        </motion.div>

        {/* Galaxy canvas */}
        <div className="relative" style={{ height: '560px', border: '1px solid rgba(0,255,255,0.08)', background: 'rgba(3,3,14,0.9)' }}>
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} className="absolute w-5 h-5 z-10"
              style={{
                top: pos.includes('t') ? 0 : 'auto', bottom: pos.includes('b') ? 0 : 'auto',
                left: pos.includes('l') ? 0 : 'auto', right: pos.includes('r') ? 0 : 'auto',
                borderTop: pos.includes('t') ? '2px solid #00ffff' : 'none',
                borderBottom: pos.includes('b') ? '2px solid #00ffff' : 'none',
                borderLeft: pos.includes('l') ? '2px solid #00ffff' : 'none',
                borderRight: pos.includes('r') ? '2px solid #00ffff' : 'none',
              }} />
          ))}

          {/* Sector panel overlay */}
          <SectorPanel sector={selected} onClose={() => setSelected(null)} />

          {/* HUD labels */}
          <div className="absolute top-4 left-4 z-20 text-xs space-y-1"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,255,255,0.35)', pointerEvents: 'none' }}>
            <div>☀ CORE: JS/TS</div>
            <div>◈ SECTORS: {SECTORS.length}</div>
            <div>⚡ LVL AVG: {Math.round(SECTORS.reduce((a, s) => a + s.level, 0) / SECTORS.length)}</div>
          </div>

          <Canvas
            camera={{ position: [0, 4, 12], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <Suspense fallback={null}>
              {/* Ambient starfield */}
              <Stars radius={60} depth={50} count={3000} factor={3} saturation={0} fade speed={0.4} />

              {/* Orbit rings */}
              {SECTORS.map(s => <OrbitRing key={s.id} radius={s.orbitRadius} color={s.color} />)}

              {/* Central sun */}
              <CoreSun hovered={hovered} setHovered={setHovered} />

              {/* Planets */}
              {SECTORS.map(s => (
                <Planet key={s.id} sector={s} hovered={hovered} setHovered={setHovered} setSelected={setSelected} />
              ))}

              {/* Asteroid belt */}
              <AsteroidBelt />

              {/* Controls */}
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={20}
                autoRotate={!hovered && !selected}
                autoRotateSpeed={0.4}
                maxPolarAngle={Math.PI * 0.7}
                minPolarAngle={Math.PI * 0.2}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Sector summary grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
          {SECTORS.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(s === selected ? null : s)}
              className="p-3 text-left relative transition-all duration-200"
              style={{
                background: selected?.id === s.id ? `${s.color}12` : `${s.color}06`,
                border: `1px solid ${selected?.id === s.id ? s.color + '66' : s.color + '22'}`,
              }}
            >
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l" style={{ borderColor: s.color }} />
              <div className="text-xs font-black mb-1" style={{ fontFamily: 'Orbitron, monospace', color: s.color, fontSize: '10px' }}>
                {s.label}
              </div>
              <div className="h-1 w-full mb-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="h-full" style={{ width: `${s.level}%`, background: s.color }} />
              </div>
              <div className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(200,210,255,0.35)', fontSize: '9px' }}>
                LVL {s.level}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
