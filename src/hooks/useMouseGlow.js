// useMouseGlow.js
import { useEffect, useRef } from 'react'

export function useMouseGlow() {
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return posRef
}
