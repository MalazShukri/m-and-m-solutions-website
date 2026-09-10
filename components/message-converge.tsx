"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion"
import { MessageCircle, Instagram, MapPin, Tag, Clock } from "lucide-react"
import { useLanguage } from "./language-context"
import { translations } from "./translations"

const ICONS = [MessageCircle, Instagram, MapPin, Tag, Clock]

// Scatter origins as a fraction of the container's half-width/half-height, so
// the ring scales with the device panel instead of with each pill's own box.
const ORIGINS = [
  { fx: -0.62, fy: -0.72 },
  { fx: 0.4, fy: -0.88 },
  { fx: -0.72, fy: 0.3 },
  { fx: 0.46, fy: 0.68 },
  { fx: -0.04, fy: 0.92 },
]

type Props = {
  /** Hero scroll progress, 0 at rest → 1 when the hero has scrolled away. */
  progress: MotionValue<number>
}

/**
 * The company's argument as motion: the questions a business fields over and
 * over, scattered around the device, collapsing into it as you scroll — the
 * "no more juggling DMs, it all lives on your own site" claim, shown.
 */
export default function MessageConverge({ progress }: Props) {
  const { language } = useLanguage()
  const t = translations[language]
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // Percentage transforms resolve against the element, not the parent, so the
  // travel distance has to come from a measured box to ring the device.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
      {size.w > 0 &&
        t.hero.fragments.map((fragment, i) => (
          <Fragment
            key={fragment}
            index={i}
            label={fragment}
            progress={progress}
            size={size}
            still={Boolean(prefersReducedMotion)}
          />
        ))}
    </div>
  )
}

function Fragment({
  index,
  label,
  progress,
  size,
  still,
}: {
  index: number
  label: string
  progress: MotionValue<number>
  size: { w: number; h: number }
  still: boolean
}) {
  const Icon = ICONS[index]
  const origin = ORIGINS[index]

  const fromX = (origin.fx * size.w) / 2
  const fromY = (origin.fy * size.h) / 2

  // Each pill travels from its scattered origin to dead centre, shrinking and
  // fading as the device absorbs it. Staggered ends so they don't land at once.
  const end = 0.55 + index * 0.05
  const x = useTransform(progress, [0, end], [fromX, 0])
  const y = useTransform(progress, [0, end], [fromY, 0])
  const scale = useTransform(progress, [0, end], [1, 0.35])
  const opacity = useTransform(progress, [0, end * 0.75, end], [1, 0.85, 0])

  return (
    <motion.div
      style={
        still
          ? { x: fromX, y: fromY }
          : { x, y, scale, opacity }
      }
      className="absolute left-1/2 top-1/2 -ms-px"
    >
      <motion.div
        animate={still ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 3.4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/20 bg-[rgba(18,24,64,0.78)] px-3.5 py-2 backdrop-blur-md shadow-[0_8px_24px_-10px_rgba(0,0,0,0.85)]"
      >
        <Icon className="h-3.5 w-3.5 text-brand-light shrink-0" />
        <span className="text-xs font-medium text-foreground/85 whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  )
}
