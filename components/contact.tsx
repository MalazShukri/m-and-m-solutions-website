"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquareText } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useLanguage } from "./language-context"
import { translations } from "./translations"
import { fadeIn, staggerContainer, textVariant, revealOnce } from "@/lib/motion"

const WHATSAPP_NUMBER = "963981063882"
const WHATSAPP_DISPLAY = "+963 981 063 882"

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]
  const isEn = language === "en"

  return (
    <section id="contact" className="py-24 border-t border-white/6 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealOnce}
          className="mb-12 max-w-2xl mx-auto text-center"
        >
          <motion.h2 variants={textVariant()} className="section-heading mb-4">
            {t.contact.title}
          </motion.h2>
          <motion.p variants={fadeIn("up", "tween", 0.15, 0.7)} className="text-lg text-muted-console">
            {t.contact.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 0.1, 0.9)}
          initial="hidden"
          whileInView="show"
          viewport={revealOnce}
          className="console-panel console-panel-glow max-w-xl mx-auto p-8 md:p-10 text-center"
        >
          <span className="chip mx-auto mb-5">
            <MessageSquareText className="h-5 w-5" />
          </span>

          <h3 className="text-xl font-bold text-foreground mb-2">
            {isEn ? "Message us on WhatsApp" : "راسلنا عبر واتساب"}
          </h3>
          <p className="text-sm text-muted-console leading-relaxed mb-7">
            {isEn
              ? "Tell us what your business needs and we'll reply on WhatsApp — usually the same day."
              : "أخبرنا باحتياجات عملك وسنرد عليك عبر واتساب، عادةً في اليوم نفسه."}
          </p>

          {/* Number and action share one column so the button sits directly
              under the number it dials, rather than drifting full-width. */}
          <div className="flex flex-col items-center gap-3">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              dir="ltr"
              className="inline-tap inline-flex items-center gap-2 text-lg font-semibold tracking-wide text-foreground hover:text-brand-light transition-colors tabular-nums"
            >
              <Phone className="h-4 w-4 shrink-0 text-brand-light" />
              {WHATSAPP_DISPLAY}
            </a>

            <Button asChild size="lg" className="cta-whatsapp rounded-lg w-full max-w-xs">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="me-2 h-5 w-5" />
                {isEn ? "Open WhatsApp" : "افتح واتساب"}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
