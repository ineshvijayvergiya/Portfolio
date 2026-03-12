import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RARITY = {
  LEGENDARY: { color: '#ffaa00', glow: '0 0 15px #ffaa0066' },
  EPIC: { color: '#a855f7', glow: '0 0 15px #a855f766' },
  RARE: { color: '#3b82f6', glow: '0 0 15px #3b82f666' },
  UNCOMMON: { color: '#22c55e', glow: '0 0 12px #22c55e66' },
  COMMON: { color: '#6b7280', glow: 'none' },
}

const TOOLS = [
  { id: 1, name: 'VS Code', icon: '⎇', rarity: 'LEGENDARY', color: '#007acc', category: 'IDE', desc: 'Primary weapon. Dark theme, Vim bindings, 60+ extensions.', uses: 9999 },
  { id: 2, name: 'Git', icon: '⑂', rarity: 'LEGENDARY', color: '#f05032', category: 'VCS', desc: 'Version control mastery. 2800+ commits. Rebase wizard.', uses: 2847 },
  { id: 3, name: 'Docker', icon: '⬡', rarity: 'EPIC', color: '#2496ed', category: 'INFRA', desc: 'Container orchestration. Compose, multi-stage builds.', uses: 340 },
  { id: 4, name: 'Postman', icon: '✉', rarity: 'RARE', color: '#ff6c37', category: 'API', desc: 'API testing suite. Collections, environments, mock servers.', uses: 780 },
  { id: 5, name: 'Figma', icon: '◈', rarity: 'RARE', color: '#f24e1e', category: 'DESIGN', desc: 'Design system creation. Component libraries, prototypes.', uses: 210 },
  { id: 6, name: 'Linux', icon: '⊛', rarity: 'LEGENDARY', color: '#fcc624', category: 'OS', desc: 'Core OS. Ubuntu/Arch. Terminal supremacy. Bash scripting.', uses: 9999 },
  { id: 7, name: 'Vercel', icon: '▲', rarity: 'EPIC', color: '#ffffff', category: 'DEPLOY', desc: 'Edge network deployment. CI/CD pipelines. Preview URLs.', uses: 156 },
  { id: 8, name: 'AWS', icon: '☁', rarity: 'EPIC', color: '#ff9900', category: 'CLOUD', desc: 'EC2, S3, Lambda, RDS, CloudFront. IAM wizard.', uses: 280 },
  { id: 9, name: 'Redis', icon: '◆', rarity: 'RARE', color: '#dc382d', category: 'DB', desc: 'In-memory caching layer. Session storage, pub/sub.', uses: 120 },
  { id: 10, name: 'Nginx', icon: '⬡', rarity: 'UNCOMMON', color: '#009900', category: 'PROXY', desc: 'Reverse proxy, load balancer, SSL termination.', uses: 95 },
  { id: 11, name: 'Jest', icon: '✓', rarity: 'UNCOMMON', color: '#c21325', category: 'TEST', desc: 'Testing framework. Unit, integration. 80%+ coverage.', uses: 430 },
  { id: 12, name: 'GraphQL', icon: '◉', rarity: 'RARE', color: '#e10098', category: 'API', desc: 'Query language for APIs. Apollo Server/Client. Subscriptions.', uses: 88 },
  { id: 13, name: 'Prisma', icon: '⬢', rarity: 'UNCOMMON', color: '#5a67d8', category: 'ORM', desc: 'Type-safe database ORM. Migrations, Prisma Studio.', uses: 65 },
  { id: 14, name: 'Tailwind', icon: '◎', rarity: 'EPIC', color: '#06b6d4', category: 'CSS', desc: 'Utility-first CSS. JIT compiler. Design system scale.', uses: 1200 },
  { id: 15, name: 'Vite', icon: '⚡', rarity: 'RARE', color: '#bd34fe', category: 'BUILD', desc: 'Lightning-fast build tool. HMR, code splitting, plugins.', uses: 340 },
  { id: 16, name: 'GitHub CI', icon: '⚙', rarity: 'UNCOMMON', color: '#f0f6fc', category: 'CI/CD', desc: 'Automated workflows, PR checks, deployment pipelines.', uses: 180 },
]

export default function Inventory() {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [filter, setFilter] = useState('ALL')

  const categories = ['ALL', 'IDE', 'INFRA', 'API', 'CLOUD', 'DB', 'CSS', 'BUILD']
  const filtered = filter === 'ALL' ? TOOLS : TOOLS.filter((t) => t.category === filter)

  return (
    <section id="inventory" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-jetbrains tracking-[0.4em] mb-3" style={{ color: 'rgba(255,0,255,0.7)' }}>
            // ITEM STORAGE
          </div>
          <h2 className="text-5xl font-orbitron font-black" style={{ color: '#fff', textShadow: '0 0 20px rgba(255,255,0,0.3)' }}>
            INVENTORY
          </h2>
        </motion.div>

        {/* Inventory HUD panel */}
        <div
          className="relative"
          style={{
            background: 'rgba(10,10,26,0.85)',
            border: '1px solid rgba(255,255,0,0.12)',
          }}
        >
          {/* Corners */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: 'var(--cyber-yellow)' }} />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: 'var(--cyber-yellow)' }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: 'var(--cyber-yellow)' }} />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: 'var(--cyber-yellow)' }} />

          {/* Header bar */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid rgba(255,255,0,0.08)' }}
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-jetbrains" style={{ color: 'rgba(255,255,0,0.5)' }}>
                ▸ EQUIPPED TOOLS — {TOOLS.length}/{TOOLS.length + 4} SLOTS
              </span>
              <span className="text-xs font-jetbrains" style={{ color: 'rgba(200,210,255,0.35)' }}>
                WEIGHT: 42/64
              </span>
            </div>
            {/* Rarity legend */}
            <div className="flex gap-3 text-xs font-jetbrains">
              {Object.entries(RARITY).slice(0, 4).map(([r, v]) => (
                <span key={r} style={{ color: v.color }}>◆ {r}</span>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 px-6 py-3 overflow-x-auto" style={{ borderBottom: '1px solid rgba(255,255,0,0.06)' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-3 py-1 text-xs font-orbitron whitespace-nowrap transition-all duration-150"
                style={{
                  border: `1px solid ${filter === cat ? 'rgba(255,255,0,0.5)' : 'rgba(255,255,0,0.1)'}`,
                  color: filter === cat ? 'var(--cyber-yellow)' : 'rgba(200,210,255,0.3)',
                  background: filter === cat ? 'rgba(255,255,0,0.06)' : 'transparent',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="p-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {filtered.map((item, i) => {
              const rar = RARITY[item.rarity]
              const isHov = hoveredItem?.id === item.id
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="relative cursor-pointer group"
                  style={{ aspectRatio: '1' }}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setSelectedItem(item === selectedItem ? null : item)}
                >
                  <div
                    className="w-full h-full flex flex-col items-center justify-center transition-all duration-150"
                    style={{
                      border: `1px solid ${isHov || selectedItem?.id === item.id ? item.color : 'rgba(255,255,255,0.06)'}`,
                      background: isHov ? `${item.color}12` : 'rgba(0,0,0,0.3)',
                      boxShadow: isHov ? `0 0 18px ${item.color}33` : 'none',
                    }}
                  >
                    <div
                      className="text-xl mb-1"
                      style={{
                        color: item.color,
                        textShadow: isHov ? `0 0 10px ${item.color}` : 'none',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      className="text-center px-1"
                      style={{
                        fontSize: '8px',
                        color: 'rgba(200,210,255,0.5)',
                        fontFamily: 'JetBrains Mono, monospace',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </div>
                    {/* Rarity dot */}
                    <div
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                      style={{ background: rar.color, boxShadow: rar.glow }}
                    />
                  </div>
                </motion.div>
              )
            })}

            {/* Empty slots */}
            {Array.from({ length: filter === 'ALL' ? 4 : 0 }).map((_, i) => (
              <div
                key={`empty-${i}`}
                style={{
                  aspectRatio: '1',
                  border: '1px dashed rgba(255,255,255,0.04)',
                  background: 'rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Selected item detail */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="mt-4 p-5 relative"
              style={{
                background: `${selectedItem.color}08`,
                border: `1px solid ${selectedItem.color}33`,
              }}
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: selectedItem.color }} />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: selectedItem.color }} />

              <div className="flex items-start gap-5">
                <div
                  className="w-16 h-16 flex items-center justify-center flex-shrink-0 text-3xl border-2"
                  style={{
                    borderColor: selectedItem.color,
                    color: selectedItem.color,
                    boxShadow: `0 0 20px ${selectedItem.color}44`,
                  }}
                >
                  {selectedItem.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-orbitron font-black" style={{ color: selectedItem.color }}>
                      {selectedItem.name}
                    </h3>
                    <span
                      className="text-xs font-orbitron px-1.5 py-0.5"
                      style={{ color: RARITY[selectedItem.rarity].color, border: `1px solid ${RARITY[selectedItem.rarity].color}44` }}
                    >
                      {selectedItem.rarity}
                    </span>
                    <span
                      className="text-xs font-jetbrains px-1.5 py-0.5"
                      style={{ color: 'rgba(200,210,255,0.4)', border: '1px solid rgba(200,210,255,0.1)' }}
                    >
                      {selectedItem.category}
                    </span>
                  </div>
                  <p className="text-sm font-jetbrains" style={{ color: 'rgba(200,210,255,0.65)' }}>
                    {selectedItem.desc}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-jetbrains" style={{ color: 'rgba(200,210,255,0.35)' }}>USES</div>
                  <div className="text-xl font-orbitron font-black" style={{ color: selectedItem.color }}>
                    {selectedItem.uses === 9999 ? '∞' : selectedItem.uses.toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
