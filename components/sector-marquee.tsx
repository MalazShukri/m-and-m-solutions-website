"use client"

import { useLanguage } from "./language-context"
import { translations } from "./translations"

export default function SectorMarquee() {
  const { language } = useLanguage()
  const t = translations[language]

  // Rendered twice: the track animates to -50%, which lands exactly on the
  // start of the second copy, so the loop has no visible seam.
  const items = [...t.marquee.items, ...t.marquee.items]

  return (
    <section className="py-8 border-y border-white/8 overflow-hidden" aria-hidden="true">
      <div className="marquee-mask relative">
        <div className="marquee-track">
          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-6 shrink-0 px-6">
              <span className="text-lg md:text-xl font-semibold text-foreground/70 whitespace-nowrap">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light/70 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
