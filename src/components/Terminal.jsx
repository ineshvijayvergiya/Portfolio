// src/components/Terminal.jsx — v5: responsive, hire easter egg preserved
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const HIRE_EMAIL   = 'ineshvijay.work@gmail.com'
const HIRE_SUBJECT = 'Opportunity: Saw your awesome portfolio!'

const HIRE_PATTERNS = [/^hire$/i,/^hire me$/i,/i want to hire/i,/want to hire/i,/looking to hire/i,/interested in hiring/i,/can i hire/i,/hire you/i]
const isHireIntent = (t) => HIRE_PATTERNS.some(p => p.test(t.trim()))

const SYSTEM_PROMPT = `You are Inesh-AI — cyberpunk AI assistant in Inesh Vijayvergiya's portfolio.
Inesh: Creative Full Stack Engineer, UI/UX Designer, AI Integrator. 1+ year crafted experience. Level 10.
Stack: React, Next.js, Node.js, TypeScript, Three.js, MongoDB, PostgreSQL, Figma, TailwindCSS, OpenAI/Anthropic APIs.
Projects: TradePro Simulator, Vendixo Marketplace, GeoMeteo Weather.
Design-first: Figma before CSS. AI: real integrations. Honest about timeline — quality over duration.
Email: ${HIRE_EMAIL}. Respond as Inesh, first-person, direct, max 4 sentences, CTA when relevant.`

const MOCK = {
  projects:`I've shipped three production apps: TradePro Simulator (WebSocket trading UI), Vendixo Marketplace (Stripe multi-vendor e-commerce), and GeoMeteo Weather (Three.js 3D globe + D3). Every screen designed in Figma first. No templates — all custom. Type \`archive\` to see 40+ more.`,
  skills:`React + Next.js frontend, Node.js + PostgreSQL/MongoDB backend, Three.js for 3D, TypeScript everywhere. I design in Figma before CSS. AI-side: OpenAI and Anthropic APIs in shipped products. I go deep, not wide.`,
  design:`Design is decision-making, not decoration. Hierarchy first, interaction model second, visual polish third. I've built component libraries from scratch and treat every animation as intentional communication.`,
  ai:`I use AI as a multiplier. RAG pipelines, streaming chat UIs, prompt engineering at the system level — not just calling an API. This terminal is a working example.`,
  experience:`One year, not a slow one. 847+ commits, 12 shipped projects, 340+ design assets. I've gone from zero to WebSocket systems, Docker deployments, and AI integrations. Depth matters more than duration.`,
  whoami:`Inesh — Creative Full Stack Engineer, UI/UX Designer, AI Integrator. Jaipur, India. Available remote worldwide. I ship things that work, look great, and perform.`,
  default: ()=>`Interesting question. I approach everything with curiosity and ship things that work. Try: ask "what is your design process?" — or run \`hire\`.`,
}

function classify(t) {
  const q = t.toLowerCase()
  if (/project|built|shipped|portfolio/.test(q)) return 'projects'
  if (/skill|tech|know|stack|framework/.test(q))  return 'skills'
  if (/design|ui|ux|figma|visual/.test(q))        return 'design'
  if (/ai|gpt|openai|llm|artificial/.test(q))     return 'ai'
  if (/experience|year|long|background/.test(q))  return 'experience'
  if (/who|about|yourself|introduce/.test(q))     return 'whoami'
  return 'default'
}

const STATIC = {
  help:[
    {text:'╔═══════════════════════════════════════════╗',color:'rgba(0,255,255,0.18)'},
    {text:'║  INESH-AI v3.1  ■  LLM-POWERED TERMINAL  ║',color:'#00ffff'},
    {text:'╚═══════════════════════════════════════════╝',color:'rgba(0,255,255,0.18)'},
    {text:''},
    {text:'  ask "question"   Chat with Inesh-AI',color:'rgba(200,210,255,0.55)'},
    {text:'  hire             ← Try this. Go on.',color:'#ffff00'},
    {text:'  projects         What I\'ve shipped',color:'rgba(200,210,255,0.55)'},
    {text:'  skills           My real tech capabilities',color:'rgba(200,210,255,0.55)'},
    {text:'  email            Direct contact',color:'rgba(200,210,255,0.55)'},
    {text:'  status           Availability',color:'rgba(200,210,255,0.55)'},
    {text:'  clear            Clear terminal',color:'rgba(200,210,255,0.55)'},
  ],
  email:[{text:'▸ DIRECT CHANNEL',color:'#00ffff'},{text:''},{text:`  ${HIRE_EMAIL}`,color:'#fff'},{text:'  Type `hire` to open email client directly.',color:'rgba(0,255,255,0.5)'}],
  status:[
    {text:'▸ STATUS',color:'#00ffff'},{text:''},
    {text:'  ● Availability:  Open',color:'#4ade80'},
    {text:'  ● Location:      Jaipur, India  (Remote ✓)',color:'#4ade80'},
    {text:'  ● Response:      < 24 hours',color:'#4ade80'},
    {text:'  ● Coffee:        ████████░░ 84%',color:'#ffff00'},
  ],
}

function AIResponse({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let i=0; const t=setInterval(()=>{ i+=2; setDisplayed(text.slice(0,i)); if(i>=text.length){clearInterval(t);setDone(true)} },9)
    return ()=>clearInterval(t)
  }, [text])
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs flex-shrink-0 mt-0.5 font-jetbrains" style={{color:'#ff00ff'}}>AI ▸</span>
      <div className="text-xs sm:text-sm font-jetbrains leading-relaxed" style={{color:'rgba(200,210,255,0.85)'}}>
        {displayed}{!done && <span style={{animation:'boot-flash 0.5s infinite',color:'#00ffff'}}>█</span>}
      </div>
    </div>
  )
}

function HireSequence() {
  const [step, setStep] = useState(0)
  const lines=[
    {text:'> HIRE INTENT DETECTED.',                             color:'#ffff00', delay:0},
    {text:'> INITIATING SECURE COMMS...',                       color:'#ff00ff', delay:600},
    {text:'> ENCRYPTING TRANSMISSION...',                       color:'#00ffff', delay:1200},
    {text:'> ROUTING THROUGH NEURAL GRID...',                   color:'#00ff88', delay:1800},
    {text:`> OPENING SECURE CHANNEL: ${HIRE_EMAIL}`,           color:'#ffffff',  delay:2500},
    {text:`> SUBJECT: "${HIRE_SUBJECT}"`,                      color:'rgba(200,210,255,0.55)', delay:3000},
    {text:'> LAUNCHING EMAIL CLIENT...',                        color:'#ffff00',  delay:3600},
  ]
  useEffect(()=>{
    lines.forEach((l,i)=>{
      setTimeout(()=>{ setStep(s=>s+1); if(i===lines.length-1) setTimeout(()=>{ window.location.href=`mailto:${HIRE_EMAIL}?subject=${encodeURIComponent(HIRE_SUBJECT)}` },700) }, l.delay+100)
    })
  }, [])
  return (
    <div className="space-y-1">
      {lines.slice(0,step).map((l,i)=>(
        <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{duration:0.18}}
          className="text-xs sm:text-sm font-jetbrains" style={{color:l.color}}>{l.text}</motion.div>
      ))}
    </div>
  )
}

export default function Terminal() {
  const [history, setHistory] = useState([{
    type:'system', lines:[
      {text:'╔══════════════════════════════════════════════╗',color:'rgba(0,255,255,0.18)'},
      {text:'║  INESH-AI v3.1  ■  LLM-POWERED INTERFACE    ║',color:'#00ffff'},
      {text:'╚══════════════════════════════════════════════╝',color:'rgba(0,255,255,0.18)'},
      {text:'Neural link active. Type help or: hire',color:'rgba(200,210,255,0.45)'},
    ]
  }])
  const [input, setInput]         = useState('')
  const [cmdHist, setCmdHist]     = useState([])
  const [histIdx, setHistIdx]     = useState(-1)
  const [loading, setLoading]     = useState(false)
  const [convHist, setConvHist]   = useState([])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  const scrollDown = useCallback(() => { setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:'smooth'}),80) }, [])

  const callAI = useCallback(async (msg) => {
    setLoading(true)
    const newConv = [...convHist, {role:'user',content:msg}]
    setConvHist(newConv)
    try {
      const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({system:SYSTEM_PROMPT,messages:newConv})})
      if (!res.ok) throw new Error('unavailable')
      const data = await res.json()
      const reply = data.content?.[0]?.text||'No response.'
      setConvHist(p=>[...p,{role:'assistant',content:reply}])
      setHistory(p=>[...p,{type:'ai',text:reply}])
    } catch {
      const cat = classify(msg)
      const reply = typeof MOCK[cat]==='function'?MOCK[cat](msg):MOCK[cat]
      setConvHist(p=>[...p,{role:'assistant',content:reply}])
      setHistory(p=>[...p,{type:'ai',text:reply}])
    } finally { setLoading(false); scrollDown() }
  }, [convHist, scrollDown])

  const run = useCallback(async (raw) => {
    const trimmed = raw.trim(); if (!trimmed) return
    setCmdHist(p=>[trimmed,...p.slice(0,49)]); setHistIdx(-1)
    const entry = {type:'input',text:`inesh@devgrid:~$ ${trimmed}`}
    const cmd = trimmed.toLowerCase()
    if (cmd==='clear') { setHistory([]); return }
    if (isHireIntent(trimmed)) { setHistory(p=>[...p,entry,{type:'hire'}]); scrollDown(); return }
    if (STATIC[cmd]) { setHistory(p=>[...p,entry,{type:'output',lines:STATIC[cmd]}]); scrollDown(); return }
    if (['projects','skills'].includes(cmd)) { setHistory(p=>[...p,entry]); await callAI(cmd==='projects'?'Tell me about the projects you have built.':'What are your technical skills?'); return }
    const askMatch = trimmed.match(/^ask\s+"(.+)"$/i)||trimmed.match(/^ask\s+(.+)$/i)
    if (askMatch) {
      const q = askMatch[1]
      setHistory(p=>[...p,entry,{type:'output',lines:[{text:`▸ Querying AI: "${q}"`,color:'rgba(255,0,255,0.5)'}]}])
      await callAI(q); return
    }
    setHistory(p=>[...p,entry,{type:'output',lines:[{text:`bash: ${cmd}: not found`,color:'#ff4444'},{text:"Type 'help' or: ask \"tell me about yourself\"",color:'rgba(200,210,255,0.3)'}]}])
    scrollDown()
  }, [callAI, scrollDown])

  const onKey = (e) => {
    if (e.key==='Enter' && !loading) { run(input); setInput('') }
    else if (e.key==='ArrowUp') { e.preventDefault(); const i=Math.min(histIdx+1,cmdHist.length-1); setHistIdx(i); setInput(cmdHist[i]||'') }
    else if (e.key==='ArrowDown') { e.preventDefault(); const i=Math.max(histIdx-1,-1); setHistIdx(i); setInput(i===-1?'':cmdHist[i]||'') }
  }

  const QUICK = ['help','hire','projects','skills','status','email']

  return (
    <section id="contact" className="relative py-12 sm:py-20 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-8 sm:mb-12"
          initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.4em] mb-2 font-jetbrains" style={{color:'rgba(255,0,255,0.58)'}}>// AI-POWERED INTERFACE</div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-black" style={{textShadow:'0 0 18px rgba(0,255,255,0.22)'}}>INESH-AI</h2>
          <p className="text-xs mt-1.5 font-jetbrains" style={{color:'rgba(200,210,255,0.32)'}}>
            TYPE <span style={{color:'#ffff00'}}>hire</span> FOR A SURPRISE
          </p>
        </motion.div>

        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.15}}>
          <div className="relative overflow-hidden" style={{background:'rgba(3,3,14,0.98)',border:'1px solid rgba(0,255,255,0.12)'}}>
            {[['tl','t','l'],['tr','t','r'],['bl','b','l'],['br','b','r']].map(([k,v,h])=>(
              <div key={k} className="absolute w-4 sm:w-5 h-4 sm:h-5" style={{
                [v==='t'?'top':'bottom']:0,[h==='l'?'left':'right']:0,
                borderTop:v==='t'?'2px solid #00ffff':'none',borderBottom:v==='b'?'2px solid #00ffff':'none',
                borderLeft:h==='l'?'2px solid #00ffff':'none',borderRight:h==='r'?'2px solid #00ffff':'none',
              }}/>
            ))}

            {/* Title bar */}
            <div className="flex items-center justify-between px-3 sm:px-5 py-2.5"
              style={{borderBottom:'1px solid rgba(0,255,255,0.07)',background:'rgba(0,255,255,0.015)'}}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1.5">{['#ff5f57','#febc2e','#28c840'].map(c=>(<div key={c} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>))}</div>
                <span className="text-xs font-jetbrains hidden sm:block" style={{color:'rgba(0,255,255,0.42)'}}>inesh@devgrid — INESH-AI v3.1</span>
              </div>
              <span className="text-xs font-orbitron" style={{color:'#ff00ff',animation:'neon-flicker 3s infinite',fontSize:'10px'}}>◈ ONLINE</span>
            </div>

            {/* Output */}
            <div className="p-3 sm:p-5 overflow-y-auto space-y-1.5" style={{height:'clamp(280px,45vw,380px)',cursor:'text'}}
              onClick={()=>inputRef.current?.focus()}>
              {history.map((e,i)=>(
                <div key={i} className="mb-1.5">
                  {e.type==='input'&&<div className="text-xs sm:text-sm font-jetbrains" style={{color:'#4ade80'}}>{e.text}</div>}
                  {(e.type==='system'||e.type==='output')&&e.lines.map((l,j)=>(
                    <div key={j} className="text-xs sm:text-sm font-jetbrains leading-relaxed" style={{color:l.color||'rgba(200,210,255,0.58)'}}>{l.text}</div>
                  ))}
                  {e.type==='ai'&&<AIResponse text={e.text}/>}
                  {e.type==='hire'&&<HireSequence/>}
                </div>
              ))}
              {loading&&(
                <div className="flex items-center gap-2">
                  <span className="text-xs font-jetbrains" style={{color:'#ff00ff'}}>AI ▸</span>
                  <div className="flex gap-1">{[0,1,2].map(i=>(<div key={i} className="w-1.5 h-1.5 rounded-full" style={{background:'#00ffff',animation:`boot-flash 1s infinite ${i*0.25}s`}}/>))}</div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-jetbrains flex-shrink-0" style={{color:'#4ade80'}}>$</span>
                <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
                  disabled={loading} className="flex-1 bg-transparent outline-none text-xs sm:text-sm font-jetbrains"
                  style={{color:'#fff',caretColor:'#00ffff',opacity:loading?0.4:1}}
                  autoFocus spellCheck={false} autoComplete="off"/>
                <span style={{color:'#00ffff',animation:'boot-flash 1s infinite'}}>█</span>
              </div>
              <div ref={bottomRef}/>
            </div>

            {/* Quick commands */}
            <div className="px-3 sm:px-5 py-2.5 flex flex-wrap gap-1.5 sm:gap-2"
              style={{borderTop:'1px solid rgba(0,255,255,0.05)',background:'rgba(0,0,0,0.2)'}}>
              <span className="text-xs font-jetbrains self-center" style={{color:'rgba(200,210,255,0.18)'}}>QUICK:</span>
              {QUICK.map(cmd=>(
                <button key={cmd} disabled={loading}
                  onClick={()=>{if(!loading){run(cmd);setInput('')}}}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-jetbrains transition-all duration-150"
                  style={{
                    border:cmd==='hire'?'1px solid rgba(255,255,0,0.28)':'1px solid rgba(0,255,255,0.1)',
                    color:cmd==='hire'?'#ffff00':'rgba(0,255,255,0.38)',
                    background:cmd==='hire'?'rgba(255,255,0,0.04)':'rgba(0,255,255,0.02)',
                    opacity:loading?0.4:1,
                  }}>{cmd}</button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social */}
        <motion.div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-10"
          initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.35}}>
          {[{label:'GITHUB',color:'#00ffff',href:'https://github.com/ineshvijayvergiya'},
            {label:'LINKEDIN',color:'#0077b5',href:'#'},
            {label:'EMAIL',color:'#ff00ff',href:`mailto:${HIRE_EMAIL}?subject=${encodeURIComponent(HIRE_SUBJECT)}`}].map(l=>(
            <a key={l.label} href={l.href} target={l.href.startsWith('http')?'_blank':'_self'} rel="noopener noreferrer"
              className="text-xs font-orbitron transition-all duration-200 pb-0.5"
              style={{color:l.color,borderBottom:`1px solid ${l.color}2e`}}
              onMouseEnter={e=>{e.target.style.letterSpacing='0.15em';e.target.style.borderBottomColor=l.color}}
              onMouseLeave={e=>{e.target.style.letterSpacing='normal';e.target.style.borderBottomColor=`${l.color}2e`}}>
              {l.label}
            </a>
          ))}
        </motion.div>

        <div className="text-center mt-10 pb-6">
          <div className="text-xs font-jetbrains" style={{color:'rgba(200,210,255,0.1)'}}>
            © 2025 INESH.DEV — REACT + THREE.JS + FRAMER MOTION
          </div>
        </div>
      </div>
    </section>
  )
}
