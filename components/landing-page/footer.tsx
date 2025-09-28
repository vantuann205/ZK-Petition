"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which logo to show based on theme
  const logoSrc = mounted && resolvedTheme === "dark" ? "/zkpetition-logo-dark.png" : "/zkpetition-logo.png"

  return (
    <footer className="container py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center text-center">
        <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 0 }}>
          {mounted ? (
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="ZKPetition Logo"
              width={100}
              height={100}
              style={{ height: "200px", width: "auto", marginTop: "-3rem"}}
            />
          ) : (
            <div style={{ height: "300px", width: "200px", margin: 0 }} />
          )}
        </Link>
        <p style={{margin: "-4rem 0rem 1rem 0rem"}} className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            A secure, privacy-first way to voice collective action without fear        
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} ZKPetition. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
