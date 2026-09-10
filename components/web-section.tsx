"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Globe, MessageCircle, ClipboardList, LayoutGrid, Smartphone, ShieldCheck, Gauge } from "lucide-react"
import { useLanguage } from "./language-context"
import { translations } from "./translations"
import { scrollToSection } from "@/lib/scroll"

const FEATURE_ICONS = [MessageCircle, ClipboardList, LayoutGrid, Smartphone, ShieldCheck, Gauge]

export default function WebSection() {
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
    <section id="web" className="py-24 border-t border-white/6 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl section-heading mb-3">{t.web.title}</h2>
            <p className="text-lg text-muted-console">{t.web.subtitle}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="console-panel console-panel-glow overflow-hidden">
            <div className="flex items-start gap-4 px-6 py-5 border-b border-white/8">
              <span className="chip shrink-0">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">{t.web.whyTitle}</h3>
                <p className="text-sm text-muted-console leading-relaxed">{t.web.whyDescription}</p>
              </div>
            </div>

            <div className="px-6">
              <motion.ul
                variants={rowContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="divide-y divide-white/8"
              >
                {t.web.features.map((feature, index) => {
                  const Icon = FEATURE_ICONS[index]
                  return (
                    <motion.li
                      key={feature.title}
                      variants={rowVariants}
                      className="feature-row flex items-start gap-4 py-5 -mx-3 px-3"
                    >
                      <span className="chip shrink-0 w-9 h-9">
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
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <Button size="lg" className="cta-primary rounded-lg px-8" onClick={() => scrollToSection("contact")}>
              {t.web.cta}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
