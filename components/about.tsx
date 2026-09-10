"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "./language-context"
import { translations } from "./translations"

export default function About() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section id="about" className="py-24 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl section-heading mb-3">{t.about.title}</h2>
            <p className="text-lg text-muted-console">{t.about.subtitle}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="console-panel p-6 md:p-8">
            <p className="text-foreground/80 leading-relaxed">{t.about.description1}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
