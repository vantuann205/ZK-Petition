"use client"

import { Shield, Users, Lock, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

import "@/styles/components/services.css"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      id: 1,
      title: t("services.zk.title"),
      description: t("services.zk.description"),
      icon: Shield,
    },
    {
      id: 2,
      title: t("services.blockchain.title"),
      description: t("services.blockchain.description"),
      icon: Lock,
    },
    {
      id: 3,
      title: t("services.decentralized.title"),
      description: t("services.decentralized.description"),
      icon: Users,
    },
    {
      id: 4,
      title: t("services.global.title"),
      description: t("services.global.description"),
      icon: Globe,
    },
  ]

  return (
    <section id="services" className="services">
      <h2 className="services__title">{t("services.title")}</h2>
      <p className="services__subtitle">{t("services.subtitle")}</p>

      <div className="services__grid">
        {services.map((service) => (
          <div key={service.id} className="services__card">
            <div className="services__icon-container">
              <service.icon className="services__icon" />
            </div>
            <h3 className="services__card-title">{service.title}</h3>
            <p className="services__card-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
