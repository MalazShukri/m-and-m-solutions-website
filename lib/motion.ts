import type { Variants } from "framer-motion"

type Direction = "left" | "right" | "up" | "down" | ""

/** Heading drop. Spring, not a tween — it overshoots slightly and settles. */
export const textVariant = (delay = 0): Variants => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay },
  },
})

/** Directional entrance. `spring` for content that should feel physical. */
export const fadeIn = (
  direction: Direction,
  type: "spring" | "tween",
  delay: number,
  duration: number,
): Variants => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: "easeOut" },
  },
})

export const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: { scale: 0.6, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "tween", delay, duration, ease: "easeOut" },
  },
})

/** Container that hands its children a stagger. */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** The viewport contract every section shares, so reveals feel like one system. */
export const revealOnce = { once: true, amount: 0.25 } as const
