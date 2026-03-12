// src/components/ProjectPlanets.jsx — v5
// Fixes: WarpPortal state reset via key prop, responsive layout
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const PROJECTS = [
  { 
    id:1,
    name:'TradePro Simulator',
    code:'MSN-001',
    color:'#00ffff',
    orbitRadius:1.8,
    orbitSpeed:0.0032,
    size:0.20,
    tagline:'Real-time trading simulation platform.',
    description:'Full-stack trading simulator with live WebSocket data, candlestick charting, portfolio management, and a custom Figma-designed UI.',
    tech:['React','Node.js','WebSocket','MongoDB','Chart.js'],
    flex:[
      {label:'Real-time Data',value:'WebSocket',icon:'⚡',desc:'Sub-100ms live feed'},
      {label:'Custom UI/UX',value:'Figma→Code',icon:'◈',desc:'Every screen designed first'},
      {label:'Performance',value:'95 Lighthouse',icon:'◎',desc:'Optimised & lazy loaded'}
    ],
    difficulty:'HARD',
    xp:2400,
    href:'https://trade-pro-seven.vercel.app/'
  },

  { 
    id:2,
    name:'Vendixo Marketplace',
    code:'MSN-002',
    color:'#ff00ff',
    orbitRadius:2.9,
    orbitSpeed:0.002,
    size:0.25,
    tagline:'Multi-vendor e-commerce built end-to-end.',
    description:'Complete marketplace: cart, Stripe checkout, seller dashboard, inventory, admin analytics.',
    tech:['Next.js','Stripe','PostgreSQL','Redis','TailwindCSS'],
    flex:[
      {label:'Payment Flow',value:'Stripe E2E',icon:'💳',desc:'Full checkout + webhooks'},
      {label:'Architecture',value:'Clean MVC',icon:'⬡',desc:'Modular, typed'},
      {label:'UI System',value:'Design System',icon:'◉',desc:'Reusable component lib'}
    ],
    difficulty:'EXTREME',
    xp:3600,
    href:'https://vendixo.vercel.app/'
  },

  { 
    id:3,
    name:'GeoMeteo Weather',
    code:'MSN-003',
    color:'#ffff00',
    orbitRadius:4.0,
    orbitSpeed:0.0013,
    size:0.18,
    tagline:'Geospatial weather viz with 3D globe.',
    description:'Three.js 3D rotating globe, D3 visualisation, OpenWeatherMap 7-day forecasting.',
    tech:['React','Three.js','D3.js','OpenWeather API','Node.js'],
    flex:[
      {label:'3D Viz',value:'Three.js Globe',icon:'◆',desc:'Custom WebGL globe'},
      {label:'Data Viz',value:'D3 Charts',icon:'◎',desc:'SVG radar + area charts'},
      {label:'API Design',value:'REST+Cache',icon:'⬡',desc:'Redis-cached pipeline'}
    ],
    difficulty:'MEDIUM',
    xp:1800
  },

  { 
    id:4,
    name:'NeuralChat UI',
    code:'MSN-004',
    color:'#ff8800',
    orbitRadius:5.1,
    orbitSpeed:0.001,
    size:0.17,
    tagline:'AI chat with streaming responses.',
    description:'Chat interface with Anthropic API: real-time streaming, conversation history, cyberpunk UI.',
    tech:['React','Anthropic SDK','Framer Motion','TailwindCSS'],
    flex:[
      {label:'AI Streaming',value:'SSE/Stream',icon:'⚡',desc:'Token-level streaming'},
      {label:'UX Design',value:'Custom UI',icon:'◈',desc:'Conversation UI scratch'},
      {label:'AI Stack',value:'Anthropic API',icon:'◉',desc:'System prompt engineering'}
    ],
    difficulty:'HARD',
    xp:2100
  },

  { 
    id:5,
    name:'DevFlow Dashboard',
    code:'MSN-005',
    color:'#00ff88',
    orbitRadius:6.3,
    orbitSpeed:0.0007,
    size:0.16,
    tagline:'Developer productivity & analytics.',
    description:'Dev metrics dashboard: GitHub API, contribution graphs, language stats, commit frequency.',
    tech:['Next.js','GitHub API','D3.js','PostgreSQL','TailwindCSS'],
    flex:[
      {label:'Live Data',value:'GitHub API',icon:'⑂',desc:'Real-time repo analytics'},
      {label:'Viz Layer',value:'D3+SVG',icon:'◎',desc:'Custom chart components'},
      {label:'Auth',value:'OAuth2/JWT',icon:'⊛',desc:'GitHub OAuth login'}
    ],
    difficulty:'MEDIUM',
    xp:1600
  }
]

const DIFF_COLOR = { MEDIUM:'#ffff00', HARD:'#ff8800', EXTREME:'#ff0044' }

// ── Lightweight project modal ─────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null
  const c = project.color
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[800] flex items-center justify-center p-3 sm:p-6"
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        style={{ background:'rgba(0,0,0,0.88)', backdropFilter:'blur(6px)' }}
        onClick={onClose}>
        <motion.div initial={{ scale:0.88, y:24, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }}
          exit={{ scale:0.92, opacity:0 }} transition={{ type:'spring', stiffness:280, damping:22 }}
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="p-4 sm:p-6 relative"
            style={{ background:'rgba(5,5,18,0.99)', border:`1px solid ${c}44`, boxShadow:`0 0 40px ${c}18` }}>
            {[['tl','t','l'],['tr','t','r'],['bl','b','l'],['br','b','r']].map(([k,v,h]) => (
              <div key={k} className="absolute w-4 h-4" style={{
                [v==='t'?'top':'bottom']:0, [h==='l'?'left':'right']:0,
                borderTop:v==='t'?`2px solid ${c}`:'none', borderBottom:v==='b'?`2px solid ${c}`:'none',
                borderLeft:h==='l'?`2px solid ${c}`:'none', borderRight:h==='r'?`2px solid ${c}`:'none',
              }}/>
            ))}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-jetbrains mb-1" style={{color:'rgba(255,0,255,0.55)'}}>▸ {project.code}</div>
                <h3 className="text-lg sm:text-xl font-orbitron font-black" style={{color:c,textShadow:`0 0 12px ${c}44`}}>{project.name}</h3>
                <p className="text-xs font-jetbrains mt-1" style={{color:'rgba(200,210,255,0.42)'}}>{project.tagline}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs font-orbitron px-2 py-0.5 border" style={{color:DIFF_COLOR[project.difficulty],borderColor:`${DIFF_COLOR[project.difficulty]}44`}}>{project.difficulty}</span>
                  <span className="text-xs font-jetbrains" style={{color:'#4ade80'}}>● SHIPPED</span>
                </div>
              </div>
              <button onClick={onClose} className="ml-4 text-xl font-mono flex-shrink-0"
                style={{color:'rgba(200,210,255,0.3)'}}
                onMouseEnter={e=>e.target.style.color=c} onMouseLeave={e=>e.target.style.color='rgba(200,210,255,0.3)'}>✕</button>
            </div>
            <p className="text-sm font-jetbrains leading-relaxed mb-4 pl-3" style={{color:'rgba(200,210,255,0.62)',borderLeft:`2px solid ${c}33`}}>{project.description}</p>
            <div className="mb-4">
              <div className="text-xs font-jetbrains mb-2" style={{color:'rgba(0,255,255,0.4)'}}>⚡ TECHNICAL FLEX:</div>
              <div className="grid grid-cols-3 gap-2">
                {project.flex.map(f => (
                  <div key={f.label} className="p-2 sm:p-3 text-center" style={{background:`${c}07`,border:`1px solid ${c}22`}}>
                    <div className="text-base mb-1" style={{color:c}}>{f.icon}</div>
                    <div className="text-xs font-orbitron font-black mb-0.5" style={{color:c,fontSize:'10px'}}>{f.value}</div>
                    <div className="font-jetbrains" style={{color:'rgba(200,210,255,0.3)',fontSize:'8px'}}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map(t=>(
                <span key={t} className="px-2 py-0.5 text-xs font-jetbrains"
                  style={{border:'1px solid rgba(255,0,255,0.2)',color:'rgba(255,0,255,0.7)',background:'rgba(255,0,255,0.04)'}}>{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-orbitron font-black" style={{color:c}}>+{project.xp} XP</span>
              <a 
               href={project.href}
               target="_blank"
               rel="noopener noreferrer"
               className="px-4 py-2 text-xs font-orbitron transition-all duration-150"
               style={{border:`1px solid ${c}`,color:c}}
               onMouseEnter={e=>{e.target.style.background=c;e.target.style.color='#000'}}
               onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color=c}}
              >
              VIEW ▸
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── WarpPortal — receives key from parent so state resets on each open ────────
function WarpPortal({ onWarp }) {
  const [warping, setWarping] = useState(false)

  const handleWarp = () => {
    if (warping) return
    setWarping(true)
    // onWarp opens the archive; after 850ms the flash completes
    setTimeout(onWarp, 850)
    // NOTE: warping state doesn't need resetting here — parent bumps warpKey
    // which causes this component to remount with fresh state after archive closes
  }

  return (
    <>
      {/* Hyperspace flash */}
      <AnimatePresence>
        {warping && (
          <motion.div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
            initial={{ opacity:0 }} animate={{ opacity:[0,1,1,0] }} exit={{ opacity:0 }}
            transition={{ duration:0.85, times:[0,0.25,0.7,1] }}
            style={{ background:'radial-gradient(ellipse at center, rgba(255,0,255,0.35), rgba(0,255,255,0.3), rgba(0,0,0,0.95))' }}>
            <div className="text-center relative z-10">
              <div className="text-2xl sm:text-3xl font-orbitron font-black mb-2"
                style={{ color:'#fff', textShadow:'0 0 30px #00ffff, 0 0 60px #ff00ff', animation:'neon-flicker 0.2s infinite' }}>
                WARPING...
              </div>
              <div className="text-xs sm:text-sm font-jetbrains" style={{color:'rgba(0,255,255,0.75)'}}>
                ENTERING DEEP SPACE ARCHIVE
              </div>
            </div>
            {/* Speed lines — reduced count for performance */}
            {Array.from({length:16}).map((_,i) => (
              <div key={i} className="absolute pointer-events-none"
                style={{
                  left:'50%', top:'50%', width:'2px',
                  height:`${15+Math.random()*35}%`,
                  background:`linear-gradient(to bottom,transparent,${i%2===0?'#00ffff':'#ff00ff'},transparent)`,
                  transform:`rotate(${i*22.5}deg) translateX(-50%)`,
                  transformOrigin:'top center',
                  animation:`speed-line 0.4s linear ${i*0.025}s infinite`,
                }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={handleWarp} disabled={warping}
        whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
        className="relative px-4 sm:px-6 py-2.5 sm:py-3 font-orbitron font-black text-xs sm:text-sm"
        style={{
          border:'1px solid rgba(255,0,255,0.45)',
          color:'#ff00ff',
          background:'rgba(255,0,255,0.07)',
          boxShadow:'0 0 15px rgba(255,0,255,0.18)',
          cursor: warping ? 'wait' : 'pointer',
        }}>
        <span className="absolute inset-0 rounded-sm pointer-events-none"
          style={{border:'1px solid rgba(255,0,255,0.2)',animation:'pulse-ring 2s ease-out infinite',transform:'scale(1.08)'}} />
        <span className="flex items-center gap-2">
          <span style={{animation:'neon-flicker 2.5s ease-in-out infinite'}}>◉</span>
          WARP PORTAL — 40+ PROJECTS
          <span style={{opacity:0.7}}>▸</span>
        </span>
      </motion.button>
    </>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProjectPlanets({ onOpenArchive, warpKey }) {
  const mountRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const anglesRef = useRef(PROJECTS.map(() => Math.random() * Math.PI * 2))
  const rendererRef = useRef(null)
  const mouseRef = useRef(new THREE.Vector2())
  const raycasterRef = useRef(new THREE.Raycaster())
  const rafRef = useRef(null)
  const meshesRef = useRef([])

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const W = el.clientWidth, H = el.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // cap DPR for perf
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W/H, 0.1, 100)
    camera.position.set(0, 3, 9)
    camera.lookAt(0, 0, 0)

    const star = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.4, 2),
      new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:true, transparent:true, opacity:0.45 })
    )
    scene.add(star)

    PROJECTS.forEach(p => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(p.orbitRadius, 0.005, 6, 100),
        new THREE.MeshBasicMaterial({ color:new THREE.Color(p.color), transparent:true, opacity:0.13 })
      )
      ring.rotation.x = Math.PI / 2
      scene.add(ring)
    })

    const meshes = PROJECTS.map((p, i) => {
      const geo = new THREE.IcosahedronGeometry(p.size, 1)
      const mat = new THREE.MeshBasicMaterial({ color:new THREE.Color(p.color) })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.userData = { projectIndex: i }
      // wireframe shell
      mesh.add(new THREE.Mesh(geo.clone(),
        new THREE.MeshBasicMaterial({ color:new THREE.Color(p.color), wireframe:true, transparent:true, opacity:0.25 })))
      scene.add(mesh)
      return { mesh }
    })
    meshesRef.current = meshes

    let t = 0
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      t += 0.01
      star.rotation.y = t * 0.3

      PROJECTS.forEach((p, i) => {
        anglesRef.current[i] += p.orbitSpeed
        const a = anglesRef.current[i]
        meshes[i].mesh.position.set(Math.cos(a)*p.orbitRadius, Math.sin(a*2)*0.12, Math.sin(a)*p.orbitRadius)
        meshes[i].mesh.rotation.y += 0.012
      })

      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const hits = raycasterRef.current.intersectObjects(meshes.map(m => m.mesh), true)
      let newHover = null
      if (hits.length > 0) {
        let obj = hits[0].object
        while (obj && obj.userData.projectIndex === undefined) obj = obj.parent
        newHover = obj?.userData?.projectIndex ?? null
      }
      setHoveredIdx(prev => prev === newHover ? prev : newHover)

      renderer.render(scene, camera)
    }
    animate()

    const onMove = e => {
      const r = el.getBoundingClientRect()
      mouseRef.current.set(((e.clientX-r.left)/W)*2-1, -((e.clientY-r.top)/H)*2+1)
    }
    const onClick = e => {
      const r = el.getBoundingClientRect()
      raycasterRef.current.setFromCamera(
        new THREE.Vector2(((e.clientX-r.left)/W)*2-1, -((e.clientY-r.top)/H)*2+1), camera)
      const hits = raycasterRef.current.intersectObjects(meshes.map(m=>m.mesh), true)
      if (hits.length > 0) {
        let obj = hits[0].object
        while (obj && obj.userData.projectIndex === undefined) obj = obj.parent
        if (obj?.userData?.projectIndex !== undefined) setSelectedProject(PROJECTS[obj.userData.projectIndex])
      }
    }
    const onResize = () => {
      const nW = el.clientWidth, nH = el.clientHeight
      renderer.setSize(nW, nH); camera.aspect = nW/nH; camera.updateProjectionMatrix()
    }

    el.addEventListener('mousemove', onMove, { passive:true })
    el.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section id="planets" className="relative py-12 sm:py-20 px-3 sm:px-6">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-8 sm:mb-10"
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.4em] mb-3 font-jetbrains"
            style={{color:'rgba(255,0,255,0.6)'}}>// FEATURED PROJECT SOLAR SYSTEM</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-black"
            style={{textShadow:'0 0 18px rgba(0,255,255,0.2)'}}>MISSION MAP</h2>
          <p className="text-xs mt-2 font-jetbrains" style={{color:'rgba(200,210,255,0.35)'}}>
            TOP 5 FEATURED — HOVER TO IDENTIFY · CLICK TO INSPECT
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <div className="relative" style={{border:'1px solid rgba(0,255,255,0.08)',background:'rgba(5,5,16,0.5)'}}>
          {[['tl','top','left'],['tr','top','right'],['bl','bottom','left'],['br','bottom','right']].map(([k,v,h]) => (
            <div key={k} className="absolute w-4 h-4 z-10" style={{
              [v]:0,[h]:0,
              borderTop:v==='top'?'2px solid #00ffff':'none',borderBottom:v==='bottom'?'2px solid #00ffff':'none',
              borderLeft:h==='left'?'2px solid #00ffff':'none',borderRight:h==='right'?'2px solid #00ffff':'none',
            }}/>
          ))}

          {hoveredIdx !== null && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 pointer-events-none font-jetbrains text-xs sm:text-sm whitespace-nowrap"
              style={{ background:'rgba(5,5,18,0.97)', border:`1px solid ${PROJECTS[hoveredIdx].color}`, color:PROJECTS[hoveredIdx].color }}>
              ◈ {PROJECTS[hoveredIdx].name} — CLICK TO INSPECT
            </div>
          )}

          {/* Responsive canvas height */}
          <div ref={mountRef} style={{ height: 'clamp(260px, 40vw, 440px)', cursor:'crosshair' }} />

          {/* Legend — wraps on mobile */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-3 py-2"
            style={{ borderTop:'1px solid rgba(0,255,255,0.06)', background:'rgba(5,5,16,0.92)' }}>
            {PROJECTS.map(p => (
              <div key={p.id} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{background:p.color,boxShadow:`0 0 5px ${p.color}`}} />
                <span className="text-xs font-jetbrains hidden sm:block" style={{color:p.color}}>{p.name}</span>
                <span className="text-xs font-jetbrains sm:hidden" style={{color:p.color}}>{p.code}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warp portal — key prop ensures fresh state each time */}
        <div className="flex flex-col items-center gap-3 mt-6 sm:mt-8">
          <div className="text-xs font-jetbrains text-center" style={{color:'rgba(200,210,255,0.28)'}}>
            SHOWING TOP 5 FEATURED MISSIONS — MORE IN THE ARCHIVE
          </div>
          <WarpPortal key={warpKey} onWarp={onOpenArchive} />
        </div>

        {/* Cards grid — responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {PROJECTS.slice(0, 3).map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="cursor-pointer"
              onClick={() => setSelectedProject(p)}>
              <div className="p-3 sm:p-4 relative transition-all duration-200"
                style={{ background:`${p.color}06`, border:`1px solid ${p.color}22` }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${p.color}55`; e.currentTarget.style.boxShadow=`0 0 18px ${p.color}10` }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${p.color}22`; e.currentTarget.style.boxShadow='none' }}>
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{borderColor:p.color}} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{borderColor:p.color}} />
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-jetbrains" style={{color:'rgba(200,210,255,0.28)'}}>{p.code}</span>
                  <span className="text-xs font-orbitron px-1.5 py-0.5"
                    style={{color:DIFF_COLOR[p.difficulty],border:`1px solid ${DIFF_COLOR[p.difficulty]}33`,fontSize:'10px'}}>{p.difficulty}</span>
                </div>
                <h3 className="text-sm sm:text-base font-orbitron font-black mb-1" style={{color:p.color}}>{p.name}</h3>
                <p className="text-xs font-jetbrains mb-2" style={{color:'rgba(200,210,255,0.4)',lineHeight:'1.5'}}>{p.tagline}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-jetbrains" style={{color:'#4ade80'}}>● SHIPPED</span>
                  <span className="text-sm font-orbitron font-black" style={{color:p.color}}>+{p.xp} XP</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
