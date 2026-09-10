import dynamic from "next/dynamic"
import Hero from "@/components/hero"
import About from "@/components/about"
import CompareGuide from "@/components/compare-guide"
// import AISection from "@/components/ai-section" // Commented out until Meta developer services (WhatsApp/Instagram API) work in Syria
import WebSection from "@/components/web-section"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ERPSection from "@/components/erp-section"
import SectorMarquee from "@/components/sector-marquee"
import ScrollProgress from "@/components/scroll-progress"
// import Testimonials from "@/components/testimonials" // Commented out for future use
import LoadingSplash from "@/components/loading-splash"

const NetworkCanvas = dynamic(() => import("@/components/network-canvas"), { ssr: false })

export default function Home() {
  return (
    <>
      <LoadingSplash />
      <div className="site-backdrop">
        <NetworkCanvas className="absolute inset-0" />
      </div>
      <div className="min-h-screen relative">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <SectorMarquee />
          <About />
          <CompareGuide />
          {/* <AISection /> */}
          <WebSection />
          <ERPSection />
          <Projects />
          {/* <Testimonials /> */} {/* Commented out for future use when real reviews are available */}
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
