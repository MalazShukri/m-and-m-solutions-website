"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Database, BarChart3, Users, ShoppingCart, Briefcase, Settings } from "lucide-react"
import { useLanguage } from "./language-context"
import { translations } from "./translations"
import { scrollToSection } from "@/lib/scroll"

const erpIcons = [BarChart3, ShoppingCart, Users, Briefcase, Settings, Database]

export default function ERPSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const rowContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }

  const rowVariants = {
    hidden: { x: 12, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <section id="erp" className="py-24 border-t border-white/6 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl section-heading mb-3">{t.erp.title}</h2>
            <p className="text-lg text-muted-console">{t.erp.subtitle}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="console-panel p-6">
              <h3 className="text-base font-semibold mb-3 text-foreground">{t.erp.whatIsTitle}</h3>
              <p className="text-sm text-muted-console leading-relaxed mb-3">{t.erp.whatIsDescription}</p>
              <p className="text-sm text-muted-console leading-relaxed">{t.erp.whenNeeded}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="console-panel console-panel-glow-violet overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-violet-light">{t.erp.featuresTitle}</p>
              <span className="badge-live badge-live-violet">
                <span className="badge-live-dot" />
                ERPNext
              </span>
            </div>

            <motion.ul
              variants={rowContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="divide-y divide-white/8 px-6"
            >
              {t.erp.features.map((feature, index) => {
                const Icon = erpIcons[index]
                return (
                  <motion.li
                    key={feature.title}
                    variants={rowVariants}
                    className="feature-row flex items-start gap-4 py-5 -mx-3 px-3"
                  >
                    <span className="chip chip-violet shrink-0 w-9 h-9">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-console leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <Button size="lg" className="cta-primary rounded-lg px-8" onClick={() => scrollToSection("contact")}>
              {t.erp.learnMore}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
