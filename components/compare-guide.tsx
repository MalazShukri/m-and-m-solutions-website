"use client"

import { motion, useReducedMotion } from "framer-motion"
import { fadeIn, staggerContainer, textVariant, revealOnce } from "@/lib/motion"
import { Globe, Smartphone, Database } from "lucide-react"
import TiltCard from "./tilt-card"
import { useLanguage } from "./language-context"
import { translations } from "./translations"

const ICONS = [Globe, Smartphone, Database]

export default function CompareGuide() {
  const { language } = useLanguage()
  const t = translations[language]
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="compare" className="py-24 border-t border-white/6 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealOnce}
          className="mb-12 max-w-2xl mx-auto text-center"
        >
          <motion.h2 variants={textVariant()} className="section-heading mb-4">
            {t.compare.title}
          </motion.h2>
          <motion.p variants={fadeIn("up", "tween", 0.15, 0.7)} className="text-lg text-muted-console">
            {t.compare.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={revealOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {t.compare.options.map((option, index) => {
            const Icon = ICONS[index]
            return (
              <motion.div key={option.title} variants={fadeIn("up", "spring", index * 0.18, 0.9)}>
                <TiltCard className="console-panel console-panel-glow p-7 text-center h-full">
                  <motion.div
                    className="chip mx-auto mb-4"
                    animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-console leading-relaxed">{option.description}</p>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
