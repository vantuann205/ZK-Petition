"use client"

import Link from "next/link"
import type React from "react"
import { useLanguage } from "@/contexts/language-context"

interface ContactFormButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function ContactFormButton({ className = "", children }: ContactFormButtonProps) {
  const { t } = useLanguage()

  return (
    <Link href="/start" className={className || "btn-primary"}>
      {children || t("cta.button")}
    </Link>
  )
}
