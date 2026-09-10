"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel"
import { ExternalLink, Smartphone } from "lucide-react"
import { useLanguage } from "./language-context"
import { translations } from "./translations"

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]
  const [selected, setSelected] = useState(0)

  const projects = [
    // Company Projects
    {
      title: "Learnvert — Education Platform (Coursera-style)",
      descriptionEN:
        "A complete online learning website for courses, enrollments, secure payments, and live classes—built to feel fast, clear, and easy for both learners and instructors.",
      descriptionAR:
        "منصة تعليم إلكتروني متكاملة للدورات والاشتراكات والمدفوعات الآمنة والحصص المباشرة، بتجربة سريعة وواضحة وسهلة للمتعلمين والمدرّسين.",
      image: "/elegant-course-dashboard-curriculum-ui-classroom-i.jpg",
      liveUrl: "https://learnvert.akwad.qa/",
      type: "company",
    },
    {
      title: "HighClass — Service Management Application",
      descriptionEN:
        "A home and on-site services booking application like cleaning. People can schedule and manage requests; the business side tracks orders smoothly and responds faster.",
      descriptionAR:
        "تطبيق لحجز الخدمات المنزلية والميدانية مثل التنظيف، يتيح للعملاء جدولة الطلبات وإدارتها، ويساعد الجهة المزوّدة على متابعتها بسهولة وسرعة أكبر.",
      image: "/home-services-cleaning-booking-visuals-friendly-se.jpg",
      androidUrl: "https://play.google.com/store/apps/details?id=qa.app.hcs",
      type: "company",
    },
    {
      title: "Ehtezam — Mobile App",
      descriptionEN:
        "A roadside-assistance mobile app for when your car breaks down. Request a flatbed tow truck, share your location, track the arrival, and get help quickly—with a simple, reliable experience.",
      descriptionAR:
        "تطبيق مساعدة على الطريق عند تعطل السيارة، يتيح طلب شاحنة سحب، ومشاركة الموقع، ومتابعة وقت الوصول، والحصول على المساعدة بسرعة وموثوقية.",
      image: "/mobile-api-app-integration-motif-smartphone-api-di.jpg",
      type: "company",
    },
    {
      title: "Sabaa — E-commerce & ERP Platform",
      descriptionEN:
        "A comprehensive e-commerce website for selling products like a large supermarket, integrated with a full ERPNext system featuring custom reports, print formats, APIs, and DocType customizations for complete business management.",
      descriptionAR:
        "موقع تجارة إلكترونية شامل لبيع المنتجات على غرار سوبرماركت كبير، متكامل مع نظام ERP لإدارة الأعمال بشكل كامل، مع تقارير وقوالب طباعة مخصصة.",
      image: "/documents-reports-prints-on-screens-enterprise-rep.jpg",
      liveUrl: "https://sabaa.akwad.qa",
      type: "company",
    },
    {
      title: "Clefincode Chat App",
      descriptionEN:
        "One place to handle conversations from WhatsApp, Instagram, and Messenger. A unified inbox and real-time updates help teams reply faster and never miss a message.",
      descriptionAR:
        "مكان واحد لإدارة المحادثات من واتساب وإنستغرام وماسنجر، عبر صندوق وارد موحّد وتحديثات فورية تُسهّل الرد السريع وعدم تفويت أي رسالة.",
      image: "/chat-bubbles-across-platforms-whatsapp-instagram-m.jpg",
      iosUrl: "https://apps.apple.com/ae/app/clefincode-chat/id6478499855",
      androidUrl: "https://play.google.com/store/apps/details?id=com.clefincode.chat",
      type: "company",
    },
    {
      title: "Movon — Logistics Platform (Sweden)",
      descriptionEN:
        "A modern logistics website with easy map-based pickup and delivery selection, faster pages, and better visibility in search—built to move quickly.",
      descriptionAR:
        "موقع لوجستي حديث يتيح اختيار عناوين الاستلام والتسليم عبر الخرائط، بصفحات أسرع وظهور أفضل في نتائج البحث.",
      image: "/logistics-map-location-picker-map-pins-route-visua.jpg",
      liveUrl: "https://erpdev.webb.io/",
      type: "company",
    },
    {
      title: "Cityacts — Event Booking Platform",
      descriptionEN:
        "An events website where people can discover shows, pick tickets, and book in a few steps. Focused on speed and a clear, simple flow.",
      descriptionAR:
        "موقع لحجز الفعاليات يسهّل اكتشاف العروض واختيار التذاكر وإتمام الحجز بخطوات قليلة، مع سرعة ووضوح في التجربة.",
      image: "/events-tickets-yacht-party-cinema-booking.jpg",
      liveUrl: "https://cityacts.com/pages?city=Muscat",
      type: "company",
    },
    {
      title: "Ousos — Institution Management",
      descriptionEN:
        "A stable portal for institutions to manage daily operations and records smoothly—even during major upgrades—so teams can keep working without interruptions.",
      descriptionAR:
        "بوابة مستقرة لإدارة أعمال المؤسسة وسجلاتها بسلاسة، حتى أثناء عمليات التحديث الكبرى، ليستمر العمل دون انقطاع.",
      image: "/institution-education-management-dashboards-data-t.jpg",
      liveUrl: "https://ousos.atoz-ca.com/",
      type: "company",
    },
    {
      title: "Widam — Meat & Grocery Delivery",
      descriptionEN:
        "Shop quality meats and groceries in Qatar with a smooth ordering experience and doorstep delivery.",
      descriptionAR: "تسوّق اللحوم والبقالة عالية الجودة في قطر، بتجربة طلب سلسة وتوصيل حتى باب المنزل.",
      image: "/meat-grocery-delivery-app-visuals.jpg",
      androidUrl: "https://play.google.com/store/apps/details?id=net.ays.PROD489402",
      iosUrl: "https://apps.apple.com/us/app/widam-%D9%88%D8%AF%D8%A7%D9%85/id993625869",
      type: "company",
    },
    {
      title: "Meat Empire — Premium Meat & Grocery Delivery",
      descriptionEN:
        "Order fresh, premium-quality meats and groceries in Qatar with convenient home delivery and a seamless shopping experience.",
      descriptionAR: "اطلب اللحوم الطازجة والبقالة الفاخرة في قطر، مع توصيل مريح للمنزل وتجربة تسوّق سلسة.",
      image: "/meat-empire-premium-delivery.jpg",
      androidUrl: "https://play.google.com/store/apps/details?id=qa.app.meatEmpire",
      type: "company",
    },
    {
      title: "ProWave — Digital Gift Cards Store",
      descriptionEN:
        "An e-commerce website for purchasing digital gift cards across major platforms like Amazon, PlayStation, Xbox, Steam, Google Play, iTunes, Shein, and more.",
      descriptionAR:
        "موقع تجارة إلكترونية لشراء بطاقات الهدايا الرقمية عبر منصات رئيسية مثل أمازون وبلايستيشن وإكس بوكس وستيم وجوجل بلاي وغيرها.",
      image: "/digital-gift-cards-gaming-shopping-marketplace.jpg",
      liveUrl: "https://pro-wave.net",
      type: "company",
    },
    {
      title: "Genius Kinds — AI Customer Service Agent",
      descriptionEN:
        "An AI-powered customer service agent for Genius Kinds that handles customer inquiries across WhatsApp and Instagram. The AI responds like a real person, works 24/7, and never misses a message.",
      descriptionAR:
        "وكيل خدمة عملاء مدعوم بالذكاء الاصطناعي لشركة Genius Kinds، يتعامل مع استفسارات العملاء عبر واتساب وإنستغرام، ويعمل على مدار الساعة دون أن يفوّت أي رسالة.",
      image: "/ai-customer-service-chatbot-whatsapp-instagram.jpg",
      type: "company",
    },
    // Personal/Freelancing Projects
    {
      title: "Trustmeds — Health Platform",
      descriptionEN:
        "A health platform that connects patients, doctors, and pharmacies for appointments, prescriptions, and information in a clear, friendly experience.",
      descriptionAR: "منصة صحية تربط المرضى والأطباء والصيدليات للمواعيد والوصفات والمعلومات، بتجربة واضحة ومريحة.",
      image: "/healthcare-ui-medical-illustrations-prescription-p.jpg",
      liveUrl: "https://trustmeds.netlify.app/",
      type: "personal",
    },
    {
      title: "Sham Services — On-Demand Services",
      descriptionEN:
        "A practical app experience for requesting home and local services on demand, with straightforward steps and clear status updates.",
      descriptionAR: "تجربة تطبيق عملية لطلب الخدمات المنزلية والمحلية عند الحاجة، بخطوات واضحة وتحديثات حالة بسيطة.",
      image: "/on-demand-services-smartphone-task-list-booking-sc.jpg",
      androidUrl: "https://play.google.com/store/apps/details?id=com.app.sham",
      type: "personal",
    },
  ]

  const slides: CoverflowSlide[] = projects.map((project) => ({
    src: project.image,
    alt: project.title,
  }))

  const active = projects[selected]
  const activeIsLive = Boolean(active.liveUrl || active.androidUrl || active.iosUrl)

  return (
    <section id="projects" className="py-24 border-t border-white/6 scroll-mt-24">
      <div className="console-content container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-10 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl section-heading mb-3">{t.projects.title}</h2>
          <p className="text-lg text-muted-console">{t.projects.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <CoverflowCarousel
            slides={slides}
            onSelect={setSelected}
            showNavigation
            cardWidth="clamp(180px, 32vw, 380px)"
            label={t.projects.title}
            cardClassName="ring-1 ring-white/10"
          />

          <div
            dir="ltr"
            className="mt-4 text-center font-mono text-xs tracking-wider text-muted-console tabular-nums"
          >
            {selected + 1} / {projects.length}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="console-panel console-panel-glow mt-8 max-w-2xl mx-auto p-6 md:p-8 text-center relative"
            >
              {activeIsLive && (
                <span className="badge-live absolute top-4 end-4">
                  <span className="badge-live-dot" />
                  {language === "en" ? "Live" : "منفّذ"}
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground mb-2">{active.title}</h3>
              <p className="text-sm text-muted-console leading-relaxed mb-6">
                {language === "en" ? active.descriptionEN : active.descriptionAR}
              </p>

              <div className="flex justify-center gap-2 flex-wrap">
                {active.liveUrl && (
                  <Button variant="outline" size="sm" asChild className="cta-ghost min-h-[40px]">
                    <a href={active.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <ExternalLink className="me-2 h-4 w-4" />
                      {language === "en" ? "Project URL" : "رابط المشروع"}
                    </a>
                  </Button>
                )}
                {active.iosUrl && (
                  <Button variant="outline" size="sm" asChild className="cta-ghost min-h-[40px]" title="Download on App Store">
                    <a href={active.iosUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Smartphone className="me-2 h-4 w-4" />
                      iOS
                    </a>
                  </Button>
                )}
                {active.androidUrl && (
                  <Button variant="outline" size="sm" asChild className="cta-ghost min-h-[40px]" title="Get it on Google Play">
                    <a href={active.androidUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Smartphone className="me-2 h-4 w-4" />
                      Android
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
