"use client"

import { useState, useEffect, useRef } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context" 

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="language-selector__trigger" aria-label="Select language">
        <Globe className="language-selector__icon" />
        <span className="language-selector__text">{language.toUpperCase()}</span>
      </button>

      <div className={`language-selector__dropdown ${isOpen ? "language-selector__dropdown--open" : ""}`}>
        <button
          onClick={() => {
            setLanguage("en")
            setIsOpen(false)
          }}
          className={`language-selector__option ${language === "en" ? "language-selector__option--active" : ""}`}
        >
          EN
        </button>
        <button
          onClick={() => {
            setLanguage("vi")
            setIsOpen(false)
          }}
          className={`language-selector__option ${language === "vi" ? "language-selector__option--active" : ""}`}
        >
          VI
        </button>
      </div>
    </div>
  )
}
