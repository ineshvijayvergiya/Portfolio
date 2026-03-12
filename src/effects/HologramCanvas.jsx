import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HologramCanvas({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    // Core icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1, 3)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.35,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    // Inner sphere
    const innerGeo = new THREE.SphereGeometry(0.65, 16, 16)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff00ff, wireframe: true, transparent: true, opacity: 0.18,
    })
    const inner = new THREE.Mesh(innerGeo, innerMat)
    scene.add(inner)

    // Orbiting rings
    const makeRing = (radius, color, opacity, rx = 0, ry = 0, rz = 0) => {
      const geo = new THREE.TorusGeometry(radius, 0.008, 6, 80)
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.set(rx, ry, rz)
      return mesh
    }
    const ring1 = makeRing(1.65, 0x00ffff, 0.6, Math.PI / 2, 0, 0)
    const ring2 = makeRing(1.9, 0xff00ff, 0.4, Math.PI / 3, Math.PI / 6, 0)
    const ring3 = makeRing(2.1, 0xffff00, 0.2, 0, 0, Math.PI / 4)
    scene.add(ring1, ring2, ring3)

    // Floating data nodes
    const nodeGroup = new THREE.Group()
    const nodeColors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff88, 0xff8800]
    const nodeData = []
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2
      const geo = new THREE.OctahedronGeometry(0.07, 0)
      const mat = new THREE.MeshBasicMaterial({ color: nodeColors[i % nodeColors.length] })
      const mesh = new THREE.Mesh(geo, mat)
      const r = 1.65
      mesh.position.set(
        Math.cos(angle) * r,
        Math.sin(angle * 0.6) * 0.5,
        Math.sin(angle) * r
      )
      nodeGroup.add(mesh)
      nodeData.push({ mesh, angle, speed: 0.004 + Math.random() * 0.008, r })
    }
    scene.add(nodeGroup)

    // Energy lines (Line segments from center to nodes)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.2 })
    nodeData.forEach(({ mesh }) => {
      const points = [new THREE.Vector3(0, 0, 0), mesh.position.clone()]
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(lineGeo, lineMat)
      scene.add(line)
    })

    // Point light for glow simulation
    const ambLight = new THREE.AmbientLight(0x00ffff, 0.1)
    scene.add(ambLight)

    let t = 0
    let raf

    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.008

      core.rotation.y = t * 0.4
      core.rotation.x = t * 0.15
      inner.rotation.y = -t * 0.6
      inner.rotation.z = t * 0.25
      ring1.rotation.y = t * 0.2
      ring2.rotation.z = t * 0.15
      ring3.rotation.y = -t * 0.1

      // Pulse opacity
      coreMat.opacity = 0.25 + 0.15 * Math.sin(t * 2)

      nodeData.forEach((n) => {
        n.angle += n.speed
        n.mesh.position.x = Math.cos(n.angle) * n.r
        n.mesh.position.z = Math.sin(n.angle) * n.r
        n.mesh.position.y = Math.sin(n.angle * 0.6) * 0.5
        n.mesh.rotation.x += 0.04
        n.mesh.rotation.y += 0.03
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const nW = el.clientWidth
      const nH = el.clientHeight
      renderer.setSize(nW, nH)
      camera.aspect = nW / nH
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%' }} />
}
