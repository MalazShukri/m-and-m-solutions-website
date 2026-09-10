"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "./language-context"
import { translations } from "./translations"
import { scrollToSection } from "@/lib/scroll"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: t.nav.about, href: "/#about" },
    { name: t.nav.web, href: "/#web" },
    { name: t.nav.erp, href: "/#erp" },
    { name: t.nav.projects, href: "/#projects" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>, href: string) => {
    e.preventDefault()
    if (isOpen) setIsOpen(false)
    scrollToSection(href.replace("/#", ""))
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className={cn("nav-console", scrolled && "scrolled")}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center" onClick={(e) => handleNavClick(e, "/#")}>
              <img src="/logo.png" alt="M & M Solutions" className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="nav-link inline-tap text-sm py-1"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <Button size="sm" asChild className="cta-whatsapp rounded-lg min-h-[40px]">
                <a href="https://wa.me/963981063882" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="me-2 h-4 w-4" />
                  {language === "en" ? "WhatsApp" : "واتساب"}
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                className="text-foreground hover:bg-white/10 min-h-[44px] min-w-[44px]"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden pb-4">
              <div className="mobile-menu-panel p-4">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-foreground/85 hover:text-brand-light transition-colors py-3 px-2 min-h-[44px] flex items-center"
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button asChild className="cta-whatsapp w-full rounded-lg mt-2" onClick={() => setIsOpen(false)}>
                    <a href="https://wa.me/963981063882" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="me-2 h-4 w-4" />
                      {language === "en" ? "Chat on WhatsApp" : "تواصل عبر واتساب"}
                    </a>
                  </Button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
