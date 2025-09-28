import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { LanguageProvider } from "@/contexts/language-context"
import "@/components/landing-page/styles.css"
import { Suspense } from "react"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "ZKPetition - Anonymous & Secure Blockchain Petitions",
  description:
    "Decentralized petition platform built on Cardano's Midnight sidechain. Create anonymous, tamper-proof petitions using Zero-Knowledge Proofs for ultimate privacy and security.",
  icons: {
    icon: [{ url: "zkpetition-logo-none.png", type: "image/png" }],
    apple: [{ url: "zkpetition-logo-none.png" }],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
