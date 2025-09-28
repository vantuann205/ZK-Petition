"use client"

import Image from "next/image"
import ContactFormButton from "./contact-form-button"
import { useLanguage } from "@/contexts/language-context"


export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            {t("hero.title")}
            <span className="hero__subtitle">{t("hero.subtitle")}</span>
          </h1>
          <p className="hero__description">{t("hero.description")}</p>
          <div className="hero__actions">
            <ContactFormButton />
            <a href="#services" className="hero__cta-secondary">
              {t("hero.cta.secondary")}
            </a>
          </div>
        </div>

        <div className="hero__image-container">
          <Image
            src="/purple-circle-wave-static.png"
            alt="Blockchain Security Visualization"
            width={500}
            height={500}
            className="hero__image"
          />
        </div>
      </div>
    </section>
  )
}
