import { useEffect, useRef, useState, useCallback } from 'react'

const TRAIL_LENGTH = 16

export default function CursorGlow() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const trailsRef = useRef([])
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const isHoveringRef = useRef(false)
  const [trails, setTrails] = useState([])
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const { clientX: x, clientY: y } = e
    mouseRef.current = { x, y }

    // Add trail particle
    const now = Date.now()
    trailsRef.current = [
      { x, y, id: now, opacity: 1 },
      ...trailsRef.current.slice(0, TRAIL_LENGTH - 1),
    ]
    setTrails([...trailsRef.current])

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x - 10}px, ${y - 10}px)`
    }
  }, [])

  const handleMouseOver = useCallback((e) => {
    const el = e.target
    const clickable = el.closest('button, a, [role="button"], input, textarea, .cursor-pointer')
    isHoveringRef.current = !!clickable

    if (cursorRef.current) {
      if (clickable) {
        cursorRef.current.style.width = '40px'
        cursorRef.current.style.height = '40px'
        cursorRef.current.style.borderColor = 'var(--cyber-magenta)'
        cursorRef.current.style.boxShadow = '0 0 20px var(--cyber-magenta), 0 0 40px rgba(255,0,255,0.4)'
      } else {
        cursorRef.current.style.width = '20px'
        cursorRef.current.style.height = '20px'
        cursorRef.current.style.borderColor = 'var(--cyber-cyan)'
        cursorRef.current.style.boxShadow = '0 0 15px var(--cyber-cyan), 0 0 30px rgba(0,255,255,0.3)'
      }
    }
  }, [])

  useEffect(() => {
    // Smooth ring follow
    const animateRing = () => {
      const ease = 0.12
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * ease
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * ease

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(animateRing)
    }

    rafRef.current = requestAnimationFrame(animateRing)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [handleMouseMove, handleMouseOver])

  return (
    <>
      {/* Inner dot cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '2px solid var(--cyber-cyan)',
          boxShadow: '0 0 15px var(--cyber-cyan), 0 0 30px rgba(0,255,255,0.3)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
          mixBlendMode: 'screen',
          background: 'rgba(0,255,255,0.08)',
        }}
      />

      {/* Outer ring (lagged) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(0,255,255,0.4)',
          pointerEvents: 'none',
          zIndex: 99998,
          mixBlendMode: 'screen',
        }}
      />

      {/* Trail particles */}
      {trails.map((t, i) => (
        <div
          key={t.id}
          style={{
            position: 'fixed',
            left: t.x - 3,
            top: t.y - 3,
            width: `${Math.max(1, 6 - i * 0.35)}px`,
            height: `${Math.max(1, 6 - i * 0.35)}px`,
            borderRadius: '50%',
            background: i % 3 === 0 ? 'var(--cyber-magenta)' : 'var(--cyber-cyan)',
            opacity: Math.max(0, 0.7 - i * 0.05),
            pointerEvents: 'none',
            zIndex: 99997,
            mixBlendMode: 'screen',
            transition: 'opacity 0.1s',
          }}
        />
      ))}
    </>
  )
}
