"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Bot, Zap, Check } from "lucide-react"
import { useLanguage } from "./language-context"
import { translations } from "./translations"

export default function AISection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
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

  const handleContactScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const targetElement = document.getElementById("contact")
    if (targetElement) {
      const navbarHeight = 88
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
  }

  const groups = [
    { icon: Zap, title: t.ai.automations.title, description: t.ai.automations.description, features: t.ai.automations.features },
    { icon: Bot, title: t.ai.agents.title, description: t.ai.agents.description, features: t.ai.agents.features },
  ]

  const statusChips = [t.ai.highlights.available, t.ai.highlights.instant, t.ai.highlights.social, t.ai.highlights.booking]

  return (
    <section id="ai" className="py-24 border-t border-white/6 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl section-heading mb-3">{t.ai.title}</h2>
            <p className="text-lg text-muted-console">{t.ai.subtitle}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="console-panel console-panel-glow overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-brand-light">
                {language === "en" ? "Automation Status" : "حالة الأتمتة"}
              </p>
              <span className="badge-live">
                <span className="badge-live-dot" />
                {language === "en" ? "All systems active" : "كل الأنظمة تعمل"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/8">
              {groups.map((group) => {
                const Icon = group.icon
                return (
                  <div key={group.title} className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="chip shrink-0 w-9 h-9">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
                    </div>
                    <p className="text-sm text-muted-console mb-4">{group.description}</p>
                    <ul className="divide-y divide-white/6">
                      {group.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                          <Check className="h-4 w-4 text-brand-light mt-0.5 shrink-0" />
                          <p className="text-foreground/75 text-sm">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-white/8 bg-white/[0.015]">
              {statusChips.map((label) => (
                <span key={label} className="badge-live">
                  <span className="badge-live-dot" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <Button size="lg" className="cta-primary rounded-lg px-8" onClick={handleContactScroll}>
              {t.ai.cta}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
