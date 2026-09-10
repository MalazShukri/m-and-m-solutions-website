"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { toast } from "@/components/ui/use-toast"
import { useLanguage } from "./language-context"
import { translations } from "./translations"
import { sendEmail } from "@/app/actions/send-email"

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters",
    }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  message: z
    .string()
    .min(1, {
      message: "Message is required",
    })
    .min(10, {
      message: "Message must be at least 10 characters",
    }),
  company: z.string().max(0).optional().default(""),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      company: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const result = await sendEmail(values)

      if (result.success) {
        form.reset()
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>{language === "en" ? "Message Sent!" : "تم إرسال الرسالة!"}</span>
            </div>
          ),
          description:
            language === "en"
              ? "Thank you for contacting us. We'll get back to you soon!"
              : "شكراً لتواصلك معنا. سنرد عليك قريباً!",
          className: "bg-green-500/90 border-green-400 text-white z-[100]",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-white" />
            <span>{language === "en" ? "Failed to Send" : "فشل الإرسال"}</span>
          </div>
        ),
        description:
          language === "en"
            ? "Sorry, we couldn't send your message. Please try again or email us directly."
            : "عذراً، لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.",
        className: "bg-red-500/90 border-red-400 text-white z-[100]",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function onError(errors: any) {
    const firstError = Object.values(errors)[0] as any
    const errorMessage = firstError?.message || "Please fill in all required fields"

    toast({
      title: (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-900" />
          <span>{language === "en" ? "Form Incomplete" : "النموذج غير مكتمل"}</span>
        </div>
      ),
      description: language === "en" ? errorMessage : "يرجى ملء جميع الحقول المطلوبة بشكل صحيح",
      className: "bg-amber-400/95 border-amber-500 text-amber-900 z-[100] font-medium",
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form
      .handleSubmit(
        onSubmit,
        onError,
      )(e)
      .catch((error) => {
        onError(form.formState.errors)
      })
  }

  return (
    <section id="contact" className="py-24 border-t border-white/6 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl section-heading mb-3">{t.contact.title}</h2>
          <p className="text-lg text-muted-console">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="console-panel p-6 md:p-8"
          >
            <h3 className="text-xl font-bold mb-6 text-foreground">{t.contact.infoTitle}</h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="chip shrink-0">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-console mb-0.5">{language === "en" ? "Email" : "البريد الإلكتروني"}</p>
                  <a
                    href="mailto:malazshukri.contactme@gmail.com"
                    className="text-foreground/90 hover:text-brand-light transition-colors"
                  >
                    malazshukri.contactme@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="chip shrink-0">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-console mb-0.5">{language === "en" ? "Phone" : "الهاتف"}</p>
                  <div className="flex items-center flex-wrap gap-2">
                    <a href="tel:+963981063882" className="text-foreground/90 hover:text-brand-light transition-colors">
                      +963981063882
                    </a>
                    <span className="text-muted-console">|</span>
                    <a
                      href="https://wa.me/963981063882"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-light hover:text-brand-light/80 transition-colors font-medium flex items-center gap-1.5 inline-tap"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/8">
              <Button asChild className="cta-whatsapp w-full rounded-lg">
                <a href="https://wa.me/963981063882" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="me-2 h-4 w-4" />
                  {language === "en" ? "Message us on WhatsApp" : "راسلنا عبر واتساب"}
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="console-panel p-6 md:p-8"
          >
            <h3 className="text-xl font-bold mb-6 text-foreground">{t.contact.formTitle}</h3>

            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  {...form.register("company")}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">{t.contact.nameLabel}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.contact.namePlaceholder}
                          {...field}
                          className="bg-white/5 border-white/12 text-foreground placeholder:text-muted-console focus-visible:ring-brand min-h-[44px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-medium" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">{t.contact.emailFieldLabel}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.contact.emailPlaceholder}
                          {...field}
                          className="bg-white/5 border-white/12 text-foreground placeholder:text-muted-console focus-visible:ring-brand min-h-[44px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-medium" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">{t.contact.messageLabel}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t.contact.messagePlaceholder}
                          className="min-h-[120px] bg-white/5 border-white/12 text-foreground placeholder:text-muted-console focus-visible:ring-brand"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-medium" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full cta-primary rounded-lg" disabled={isSubmitting}>
                  {isSubmitting ? t.contact.sendingButton : t.contact.sendButton}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
