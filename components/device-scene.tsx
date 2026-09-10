"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

function addScreenBlocks(parent: THREE.Object3D, blocks: [number, number, number, number, number][], z: number) {
  // [x, y, w, h, colorMix] — colorMix 0..1 blends from light brand blue to deep navy
  for (const [x, y, w, h, mix] of blocks) {
    const color = new THREE.Color("#5ac8fa").lerp(new THREE.Color("#7c3aed"), mix)
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color }))
    mesh.position.set(x, y, z)
    parent.add(mesh)
  }
}

function buildPanel(width: number, height: number, depth: number, bodyMaterial: THREE.Material, edgeMaterial: THREE.Material) {
  const panel = new THREE.Group()

  const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), bodyMaterial)
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry), edgeMaterial)
  body.add(edges)
  panel.add(body)

  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 0.92, height * 0.92),
    new THREE.MeshBasicMaterial({ color: 0x060a12 }),
  )
  face.position.z = depth / 2 + 0.005
  panel.add(face)

  return { panel, faceZ: depth / 2 + 0.012 }
}

export default function DeviceScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.2, 6.4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const key = new THREE.DirectionalLight(0x9fd4ff, 1.1)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x8b5cf6, 0.9)
    rim.position.set(-4, -2, -3)
    scene.add(rim)

    const group = new THREE.Group()
    scene.add(group)

    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x0d1420, metalness: 0.5, roughness: 0.35 })
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.65 })

    // Desktop/browser panel
    const { panel: desktop, faceZ: dz } = buildPanel(3.6, 2.3, 0.12, bodyMaterial, edgeMaterial)
    desktop.position.set(-0.6, 0.35, 0)
    desktop.rotation.set(0.05, 0.32, -0.02)
    addScreenBlocks(
      desktop,
      [
        [0, 0.94, 3.3, 0.2, 0.1],
        [-1.1, 0.5, 1.0, 0.34, 0.55],
        [0, 0.5, 0.75, 0.34, 0.3],
        [1.1, 0.5, 1.0, 0.34, 0.8],
        [-0.82, -0.15, 1.5, 0.65, 0.4],
        [0.82, -0.15, 1.5, 0.65, 0.55],
        [0, -0.78, 3.3, 0.28, 0.15],
      ],
      dz,
    )
    group.add(desktop)

    // Phone panel
    const { panel: phone, faceZ: pz } = buildPanel(1.15, 2.2, 0.12, bodyMaterial, edgeMaterial)
    phone.position.set(1.85, -0.55, 0.9)
    phone.rotation.set(-0.04, -0.4, 0.03)
    addScreenBlocks(
      phone,
      [
        [0, 0.82, 0.95, 0.2, 0.1],
        [0, 0.4, 0.85, 0.32, 0.4],
        [0, 0, 0.85, 0.32, 0.6],
        [0, -0.4, 0.85, 0.32, 0.75],
        [0, -0.9, 0.6, 0.16, 0.2],
      ],
      pz,
    )
    group.add(phone)

    group.rotation.set(0.08, -0.15, 0)

    const pointer = { x: 0, y: 0 }
    function handlePointerMove(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (!prefersReducedMotion) window.addEventListener("pointermove", handlePointerMove)

    let raf = 0
    let t = 0
    function animate() {
      t += 0.006
      group.rotation.y = -0.15 + Math.sin(t) * 0.14 + pointer.x * 0.15
      group.rotation.x = 0.08 + pointer.y * -0.08
      group.position.y = Math.sin(t * 1.3) * 0.06
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    renderer.render(scene, camera)
    if (!prefersReducedMotion) raf = requestAnimationFrame(animate)

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
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
