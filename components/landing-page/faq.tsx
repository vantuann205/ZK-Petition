"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const { t } = useLanguage()

  const faqs = [
    {
      id: 1,
      question: t("faq.what.question"),
      answer: t("faq.what.answer"),
    },
    {
      id: 2,
      question: t("faq.how.question"),
      answer: t("faq.how.answer"),
    },
    {
      id: 3,
      question: t("faq.secure.question"),
      answer: t("faq.secure.answer"),
    },
    {
      id: 4,
      question: t("faq.cost.question"),
      answer: t("faq.cost.answer"),
    },
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section id="faq" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          {t("faq.title")}
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">{t("services.subtitle")}</p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""}`}
                />
              </button>
              {openItem === faq.id && (
                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
