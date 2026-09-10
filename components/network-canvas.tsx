"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function NetworkCanvas({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const NODE_COUNT = 90
    const RADIUS = 7
    const positions = new Float32Array(NODE_COUNT * 3)
    const colors = new Float32Array(NODE_COUNT * 3)
    const velocities: THREE.Vector3[] = []

    // Each node lerps between the two site accents (blue, violet) rather than
    // one flat tint, so the shared backdrop carries both pillar colors.
    const colorBlue = new THREE.Color("#5ac8fa")
    const colorViolet = new THREE.Color("#a78bfa")

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * RADIUS * 2
      const y = (Math.random() - 0.5) * RADIUS * 1.2
      const z = (Math.random() - 0.5) * RADIUS
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.004, (Math.random() - 0.5) * 0.004, (Math.random() - 0.5) * 0.004))

      const tint = colorBlue.clone().lerp(colorViolet, Math.random() * 0.7)
      colors[i * 3] = tint.r
      colors[i * 3 + 1] = tint.g
      colors[i * 3 + 2] = tint.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const pointsMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.07,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geometry, pointsMaterial)
    scene.add(points)

    // Far star shell behind the network — depth, and the thing that reads as
    // "space" rather than "a few dots". Static shell, rotated as one object.
    const STAR_COUNT = 900
    const starPositions = new Float32Array(STAR_COUNT * 3)
    const starColors = new Float32Array(STAR_COUNT * 3)
    const starWhite = new THREE.Color("#dbe7ff")
    const starTints = [new THREE.Color("#8fc4ff"), new THREE.Color("#c4a6ff"), new THREE.Color("#7ff0f0")]

    for (let i = 0; i < STAR_COUNT; i++) {
      // Spherical shell so density stays even instead of clumping at the poles.
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 16 + Math.random() * 12
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = r * Math.cos(phi)

      const tint = starWhite.clone().lerp(starTints[i % starTints.length], Math.random() * 0.8)
      starColors[i * 3] = tint.r
      starColors[i * 3 + 1] = tint.g
      starColors[i * 3 + 2] = tint.b
    }

    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))
    const starMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.13,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    const lineGeometry = new THREE.BufferGeometry()
    const maxLines = NODE_COUNT * 6
    const linePositions = new Float32Array(maxLines * 6)
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#9db6ff"),
      transparent: true,
      opacity: 0.3,
    })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    const CONNECT_DIST = 2.1

    function updateLines() {
      let idx = 0
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute
      for (let i = 0; i < NODE_COUNT && idx < maxLines; i++) {
        for (let j = i + 1; j < NODE_COUNT && idx < maxLines; j++) {
          const dx = posAttr.getX(i) - posAttr.getX(j)
          const dy = posAttr.getY(i) - posAttr.getY(j)
          const dz = posAttr.getZ(i) - posAttr.getZ(j)
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < CONNECT_DIST) {
            linePositions[idx * 6] = posAttr.getX(i)
            linePositions[idx * 6 + 1] = posAttr.getY(i)
            linePositions[idx * 6 + 2] = posAttr.getZ(i)
            linePositions[idx * 6 + 3] = posAttr.getX(j)
            linePositions[idx * 6 + 4] = posAttr.getY(j)
            linePositions[idx * 6 + 5] = posAttr.getZ(j)
            idx++
          }
        }
      }
      for (let k = idx * 6; k < linePositions.length; k++) linePositions[k] = 0
      ;(lineGeometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true
      lineGeometry.setDrawRange(0, idx * 2)
    }

    const pointer = { x: 0, y: 0 }
    function handlePointerMove(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove)
    }

    let baseRotation = 0

    let raf = 0
    function animate() {
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute
      for (let i = 0; i < NODE_COUNT; i++) {
        let x = posAttr.getX(i) + velocities[i].x
        let y = posAttr.getY(i) + velocities[i].y
        let z = posAttr.getZ(i) + velocities[i].z
        if (Math.abs(x) > RADIUS) velocities[i].x *= -1
        if (Math.abs(y) > RADIUS * 0.7) velocities[i].y *= -1
        if (Math.abs(z) > RADIUS * 0.6) velocities[i].z *= -1
        posAttr.setXYZ(i, x, y, z)
      }
      posAttr.needsUpdate = true
      updateLines()
      baseRotation += 0.0006
      scene.rotation.y = baseRotation
      // Stars counter-rotate slower than the network, so the two layers
      // separate visually instead of moving as one flat sheet.
      stars.rotation.y -= 0.00022
      stars.rotation.x += 0.0001
      camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.02
      camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    updateLines()
    renderer.render(scene, camera)
    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(animate)
    }

    function handleResize() {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(raf)
      geometry.dispose()
      pointsMaterial.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
