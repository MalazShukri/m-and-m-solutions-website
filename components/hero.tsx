"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import MessageConverge from "./message-converge"
import { useLanguage } from "./language-context"
import { translations } from "./translations"
import { scrollToSection } from "@/lib/scroll"

const DeviceScene = dynamic(() => import("./device-scene"), { ssr: false })





export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Foreground (device scene) drifts faster than the background text on
  // scroll — the depth cue that sells "these are on different layers".
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 40])

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault()
    scrollToSection(targetId)
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      {/* The 3D scene is the stage, not a column — it fills the lower half of
          the viewport and the copy sits over it, so the device reads as the
          hero rather than as an illustration beside the text. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: deviceY }}
        className="absolute bottom-[8vh] end-0 w-full lg:w-[58%] h-[40vh] md:h-[48vh] lg:h-[58vh] z-0"
      >
        <div className="hero-glow" aria-hidden="true" />
        <DeviceScene className="absolute inset-0" />
        <MessageConverge progress={scrollYProgress} />
      </motion.div>

      <div className="console-content container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ y: copyY }}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-5">
              <div className="flex flex-col items-center pt-3 shrink-0">
                <motion.div
                  className="accent-rail-dot"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                />
                <motion.div
                  className="accent-rail-line"
                  initial={{ height: 0 }}
                  animate={{ height: "clamp(120px, 22vh, 260px)" }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <h1 className="hero-headline text-[2.6rem] md:text-6xl lg:text-[4.2rem] font-bold leading-[1.12] tracking-[-0.03em] text-foreground text-balance">
              <span className="block">
                {t.hero.title.split(" ").map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block whitespace-pre"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </span>
              <span className="block text-gradient">
                {t.hero.titleHighlight.split(" ").map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.25 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block whitespace-pre"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </span>
              </h1>
            </div>

            <p className="text-lg text-muted-console max-w-xl leading-relaxed">{t.hero.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="cta-primary min-h-[48px] px-6 rounded-lg"
                onClick={(e) => handleScroll(e, "projects")}
              >
                <span className="flex items-center">
                  {t.hero.viewProjects}
                  <ArrowRight className="ms-2 h-4 w-4" />
                </span>
              </Button>
              <Button size="lg" asChild className="cta-whatsapp min-h-[48px] px-6 rounded-lg bg-transparent">
                <a href="https://wa.me/963981063882" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="me-2 h-4 w-4" />
                  {t.hero.getInTouch}
                </a>
              </Button>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Sibling of the section, not the content column, so bottom-8 anchors to
          the viewport-height hero rather than to the copy block. */}
      <div className="hidden md:flex w-full justify-center absolute inset-x-0 bottom-8 z-10">
          <button
            type="button"
            onClick={(e) => handleScroll(e, "about")}
            aria-label={language === "en" ? "Scroll to content" : "انتقل إلى المحتوى"}
            className="scroll-cue inline-tap opacity-70 hover:opacity-100 transition-opacity"
          >
            <motion.span
              className="h-3 w-3 rounded-full bg-brand-light block"
              animate={prefersReducedMotion ? undefined : { y: [0, 22, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
        </button>
      </div>
    </section>
  )
}
