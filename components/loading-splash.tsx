"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingSplash() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img src="/logo.png" alt="M & M Solutions" className="h-14 w-auto mb-6" />
          <div className="loading-progress">
            <div className="loading-progress-bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
