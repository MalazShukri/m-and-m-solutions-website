"use client"

import { Heart } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useLanguage } from "./language-context"
import { translations } from "./translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className=" border-t border-white/8 py-14">
      <div className="console-content container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img src="/logo.png" alt="M & M Solutions" className="h-8 w-auto mx-auto mb-5 opacity-90" />
          <p className="text-muted-console mb-8 max-w-2xl mx-auto leading-relaxed">{t.footer.description}</p>

          <a
            href="https://wa.me/963981063882"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp inline-flex items-center gap-2 rounded-lg px-5 py-2.5 mb-8 inline-tap"
          >
            <FaWhatsapp className="h-4 w-4" />
            {language === "en" ? "Chat with us" : "تواصل معنا"}
          </a>

          <div className="border-t border-white/8 pt-8">
            <p className="text-muted-console text-sm">&copy; 2025 M & M Solutions. {t.footer.copyright}</p>
          </div>

          <div className="text-center mt-4 text-muted-console text-sm flex items-center justify-center">
            <span>{t.footer.madeWith}</span>
            <Heart className="h-4 w-4 mx-1 text-brand-light" />
            <span>{t.footer.by}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
