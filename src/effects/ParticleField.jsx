import { useEffect, useRef } from 'react'

export default function ParticleField({ count = 80 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.3,
      color: Math.random() > 0.6 ? '#00ffff' : Math.random() > 0.5 ? '#ff00ff' : '#ffffff',
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }))

    let raf
    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      frame++

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.fill()
      })

      // Draw connections only every other frame for perf
      if (frame % 2 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i]
            const b = particles[j]
            const dist = Math.hypot(a.x - b.x, a.y - b.y)
            if (dist < 90) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = '#00ffff'
              ctx.globalAlpha = (1 - dist / 90) * 0.12
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  )
}
