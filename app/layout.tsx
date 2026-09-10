import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Space_Mono, Cairo } from "next/font/google"
import { LanguageProvider } from "@/components/language-context"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-en",
  weight: ["400", "500", "600", "700"],
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-display-ar",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "M & M Solutions — Automate Chats, Replace Instagram Selling, Run on ERP",
  description:
    "M & M Solutions builds AI customer-service automation, professional websites & e-commerce, and ERPNext systems for Syrian businesses — the digital capabilities this market has been missing.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070a",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${spaceMono.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
