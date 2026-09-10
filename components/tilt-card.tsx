"use client"

import type { ReactNode } from "react"
import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Peak rotation in degrees at the card's corners. */
  max?: number
  /** Moving light sheen that tracks the pointer across the card face. */
  glare?: boolean
}

export default function TiltCard({ children, className, max = 22, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Pointer position within the card, normalised to -0.5…0.5 on each axis.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  // Separate 0…100% track for the glare, which follows the pointer directly.
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glareOpacity = useMotionValue(0)

  const spring = { stiffness: 220, damping: 22, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width
    const ny = (event.clientY - rect.top) / rect.height
    px.set(nx - 0.5)
    py.set(ny - 0.5)
    gx.set(nx * 100)
    gy.set(ny * 100)
    glareOpacity.set(1)
  }

  function handleLeave() {
    px.set(0)
    py.set(0)
    glareOpacity.set(0)
  }

  const glareBackground = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.28), transparent 55%)`,
  )

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {glare && !prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{ background: glareBackground, opacity: glareOpacity, mixBlendMode: "overlay" }}
        />
      )}
    </motion.div>
  )
}
