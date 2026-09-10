"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star } from "lucide-react"
import { useLanguage } from "./language-context"

export default function Testimonials() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const { language } = useLanguage()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO — FinTech Startup",
      content:
        "The team delivered exceptional results on our ERPNext implementation. Their technical expertise and attention to detail helped us streamline our operations significantly.",
      avatar: "/professional-woman-avatar.png",
    },
    {
      name: "Ahmed Al-Rashid",
      role: "Operations Manager — Logistics Company",
      content:
        "Outstanding work on our Vue.js platform. The performance improvements were remarkable, and the user experience is now seamless across all devices.",
      avatar: "/professional-man-avatar.png",
    },
    {
      name: "Maria Rodriguez",
      role: "Product Lead — EdTech Platform",
      content:
        "Excellent collaboration and delivery. The custom integrations and API optimizations exceeded our expectations and improved our system reliability.",
      avatar: "/professional-woman-avatar.png",
    },
    {
      name: "David Chen",
      role: "Founder — Healthcare Startup",
      content:
        "Professional, reliable, and technically sound. The Django backend they built for us has been running flawlessly, handling our growing user base with ease.",
      avatar: "/professional-man-avatar.png",
    },
    {
      name: "Lisa Thompson",
      role: "IT Director — Manufacturing",
      content:
        "The ERPNext upgrade was handled perfectly with minimal downtime. Their expertise in system migrations and performance optimization is truly impressive.",
      avatar: "/professional-woman-avatar.png",
    },
  ]

  const title = language === "en" ? "What Our Clients Say" : "ما يقوله عملاؤنا"
  const subtitle =
    language === "en"
      ? "Trusted by businesses worldwide for delivering exceptional digital solutions"
      : "موثوق به من قبل الشركات في جميع أنحاء العالم لتقديم حلول رقمية استثنائية"

  return (
    <section id="testimonials" className="py-20 premium-bg noise-texture">
      <div className="premium-bg-content container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-enhanced">{title}</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto glass-text">{subtitle}</p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.slice(0, 5).map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="glass-card p-6 h-full transition-all duration-300 hover-lift-card">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 glass-text mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={`${testimonial.name} avatar`}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white/20"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm glass-text">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
