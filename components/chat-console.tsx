"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FaWhatsapp, FaInstagram, FaGlobe } from "react-icons/fa"
import { CheckCheck } from "lucide-react"
import { useLanguage } from "./language-context"
import { translations } from "./translations"

type Phase = "idle" | "received" | "typing" | "sent" | "resolved"

const CHANNEL_ICONS = [FaWhatsapp, FaInstagram, FaGlobe]
const CHANNEL_COLORS = ["#2be387", "#ff4fa3", "#38d1ff"]

function ThreadCard({ index, delay }: { index: number; delay: number }) {
  const { language } = useLanguage()
  const t = translations[language].chatConsole
  const thread = t.threads[index]
  const Icon = CHANNEL_ICONS[index]
  const color = CHANNEL_COLORS[index]

  const [phase, setPhase] = useState<Phase>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      setPhase("resolved")
      return
    }

    const sequence: [Phase, number][] = [
      ["received", delay],
      ["typing", 1100],
      ["sent", 1500],
      ["resolved", 1900],
      ["idle", 1600],
    ]

    let step = 0
    function run() {
      const [nextPhase, wait] = sequence[step % sequence.length]
      timeoutRef.current = setTimeout(() => {
        setPhase(nextPhase)
        step++
        run()
      }, wait)
    }
    run()

    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showCustomer = phase !== "idle"
  const showTyping = phase === "typing"
  const showReply = phase === "sent" || phase === "resolved"
  const showResolved = phase === "resolved"

  return (
    <div className="console-panel p-4 sm:p-5 flex flex-col gap-3 min-h-[172px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}1a`, border: `1px solid ${color}4d`, color }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span className="font-medium text-sm text-foreground/90">{thread.channel}</span>
        </div>
        <AnimatePresence mode="wait">
          {showResolved ? (
            <motion.span
              key="resolved"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="badge-live"
            >
              <CheckCheck className="h-3 w-3" />
              {t.resolvedBy}
            </motion.span>
          ) : (
            <motion.span
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="badge-live"
            >
              <span className="badge-live-dot" />
              {language === "en" ? "AI handling" : "الذكاء الاصطناعي يرد"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-2">
        <AnimatePresence>
          {showCustomer && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="self-start max-w-[85%] rounded-xl rounded-bl-sm bg-white/8 border border-white/10 px-3 py-2 text-sm text-foreground/85"
            >
              {thread.customer}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="self-end flex items-center gap-1 rounded-xl rounded-br-sm px-3 py-2.5"
              style={{ backgroundColor: `${color}14`, border: `1px solid ${color}33` }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showReply && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="self-end max-w-[85%] rounded-xl rounded-br-sm px-3 py-2 text-sm text-foreground"
              style={{ backgroundColor: `${color}1f`, border: `1px solid ${color}4d` }}
            >
              {thread.reply}
              {showResolved && (
                <span className="block mt-1 font-mono text-[10px] tabular-nums text-foreground/50">
                  {t.answeredIn} {thread.time}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ChatConsole() {
  const { language } = useLanguage()
  const t = translations[language].chatConsole

  return (
    <div className="console-panel p-4 sm:p-6 relative overflow-hidden" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-brand-light">{t.heading}</p>
          <p className="text-sm text-muted-console mt-0.5">{t.subheading}</p>
        </div>
        <span className="badge-live">
          <span className="badge-live-dot" />
          {translations[language].hero.liveLabel}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {[0, 1, 2].map((i) => (
          <ThreadCard key={i} index={i} delay={i * 750} />
        ))}
      </div>
    </div>
  )
}
