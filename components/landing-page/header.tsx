"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { useTheme } from "next-themes"
import NavDropdown from "./nav-dropdown"
import MobileMenu from "./mobile-menu"
import { resourcesDropdownData } from "./nav-data"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/")
  }

  const logoSrc = mounted && resolvedTheme === "dark" ? "/zkpetition-logo-dark.png" : "/zkpetition-logo.png"

  return (
    <>
      <header className={`header ${isScrolled ? "header--scrolled" : "header--transparent"}`}>
        <div className="container header__container">
          <div className="header__content">
            <Link href="/" className="header__logo-link" onClick={handleLogoClick}>
              {mounted ? (
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt="ZKPetition Logo"
                  width={280}
                  height={70}
                  className="header__logo"
                  priority
                />
              ) : (
                <div className="header__logo-placeholder" />
              )}
            </Link>

            <div className="header__actions">
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {/* <li className="header__nav-item header__nav-item--hidden-mobile">
                    <NavDropdown
                      trigger={t("nav.resources")}
                      items={resourcesDropdownData}
                      columns={2}
                      className={pathname.startsWith("/resources") ? "header__nav-link--active" : ""}
                    />
                  </li> */}
                  {/* <li className="header__nav-item">
                    <Link
                      href="/portfolio"
                      className={`header__nav-link ${pathname === "/portfolio" ? "header__nav-link--active" : ""}`}
                    >
                      {t("nav.portfolio")}
                    </Link>
                  </li> */}
                  <li className="header__nav-item">
                    <Link
                      href="/start"
                      className={`header__nav-link ${pathname === "/start" ? "header__nav-link--active" : ""}`}
                    >
                      {t("nav.start")}
                    </Link>
                  </li>
                </ul>
              </nav>

              <LanguageSelector />
              <ThemeToggle />

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="header__mobile-menu-button"
                aria-label="Toggle menu"
              >
                <Menu className="header__mobile-menu-icon" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
