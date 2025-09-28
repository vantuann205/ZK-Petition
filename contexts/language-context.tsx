"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Header
    "nav.resources": "Resources",
    "nav.portfolio": "Portfolio",
    "nav.start": "Start",

    // Hero Section
    "hero.title": "Anonymous Blockchain Petitions",
    "hero.subtitle": "Secure, Private, Unstoppable",
    "hero.description":
      "Create and sign petitions anonymously using Zero-Knowledge Proofs on Cardano's Midnight sidechain. Your voice matters, your identity stays private.",
    "hero.cta.primary": "Create Petition",
    "hero.cta.secondary": "Learn More",

    // Services
    "services.title": "Why Choose ZKPetition?",
    "services.subtitle": "Built on cutting-edge blockchain technology for maximum privacy and security",
    "services.zk.title": "Zero-Knowledge Privacy",
    "services.zk.description": "Sign petitions anonymously while maintaining cryptographic proof of authenticity",
    "services.blockchain.title": "Blockchain Security",
    "services.blockchain.description":
      "Immutable records on Cardano's Midnight sidechain ensure tamper-proof petitions",
    "services.decentralized.title": "Censorship Resistant",
    "services.decentralized.description": "No central authority can silence your voice or remove your petition",
    "services.global.title": "Global Accessibility",
    "services.global.description": "Access from anywhere in the world, even in regions with restricted speech",

    // Projects/Use Cases
    "projects.title": "Real-World Impact",
    "projects.subtitle": "See how ZKPetition empowers communities worldwide",
    "projects.activism.title": "Activist Movements",
    "projects.activism.description": "Protect activists in authoritarian regimes with anonymous petition signing",
    "projects.dao.title": "DAO Governance",
    "projects.dao.description": "Enable private voting and proposals within decentralized organizations",
    "projects.corporate.title": "Corporate Accountability",
    "projects.corporate.description": "Allow employees to raise concerns without fear of retaliation",
    "projects.realworld.title": "Real-World",
    "projects.realworld.subtitle": "Use Cases",
    "projects.description":
      "From protecting activists in censored regions to enabling anonymous DAO governance, ZKPetition empowers secure collective action across diverse communities and organizations.",
    "projects.view.usecase": "View Use Case",
    "projects.explore.all": "Explore All Use Cases",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.what.question": "What is ZKPetition?",
    "faq.what.answer":
      "ZKPetition is a decentralized petition platform built on Cardano's Midnight sidechain that uses Zero-Knowledge Proofs to enable anonymous yet verifiable petition signing.",
    "faq.how.question": "How does Zero-Knowledge Proof work?",
    "faq.how.answer":
      "Zero-Knowledge Proofs allow you to prove you're eligible to sign a petition without revealing your identity. The blockchain verifies your signature is valid while keeping your personal information completely private.",
    "faq.secure.question": "Is it really secure?",
    "faq.secure.answer":
      "Yes. Built on Cardano's battle-tested blockchain with Midnight's privacy features, your data is cryptographically protected and cannot be tampered with or censored.",
    "faq.cost.question": "What does it cost?",
    "faq.cost.answer":
      "Creating and signing petitions requires minimal ADA for transaction fees. We're working on making it completely free for users in restricted regions.",

    // CTA
    "cta.title": "Ready to Make Your Voice Heard?",
    "cta.description": "Join the privacy revolution. Create anonymous, secure petitions that can't be silenced.",
    "cta.button": "Get Started Now",

    // Footer
    "footer.description": "Empowering anonymous activism through blockchain technology",
    "footer.links": "Quick Links",
    "footer.about": "About",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact",
    "footer.social": "Follow Us",
    "footer.rights": "All rights reserved.",
  },
  vi: {
    // Header
    "nav.resources": "Tài Nguyên",
    "nav.portfolio": "Danh Mục",
    "nav.start": "Bắt Đầu Dự Án",

    // Hero Section
    "hero.title": "Kiến Nghị Blockchain Ẩn Danh",
    "hero.subtitle": "Bảo Mật, Riêng Tư, Không Thể Ngăn Cản",
    "hero.description":
      "Tạo và ký kiến nghị ẩn danh bằng Zero-Knowledge Proofs trên Midnight sidechain của Cardano. Tiếng nói của bạn quan trọng, danh tính của bạn được bảo vệ.",
    "hero.cta.primary": "Tạo Kiến Nghị",
    "hero.cta.secondary": "Tìm Hiểu Thêm",

    // Services
    "services.title": "Tại Sao Chọn ZKPetition?",
    "services.subtitle":
      "Được xây dựng trên công nghệ blockchain tiên tiến để đảm bảo quyền riêng tư và bảo mật tối đa",
    "services.zk.title": "Quyền Riêng Tư Zero-Knowledge",
    "services.zk.description": "Ký kiến nghị ẩn danh trong khi vẫn duy trì bằng chứng mật mã về tính xác thực",
    "services.blockchain.title": "Bảo Mật Blockchain",
    "services.blockchain.description":
      "Hồ sơ bất biến trên Midnight sidechain của Cardano đảm bảo kiến nghị không thể bị giả mạo",
    "services.decentralized.title": "Chống Kiểm Duyệt",
    "services.decentralized.description":
      "Không có cơ quan trung ương nào có thể làm im lặng tiếng nói của bạn hoặc xóa kiến nghị của bạn",
    "services.global.title": "Truy Cập Toàn Cầu",
    "services.global.description": "Truy cập từ bất kỳ đâu trên thế giới, ngay cả ở những khu vực có hạn chế ngôn luận",

    // Projects/Use Cases
    "projects.title": "Tác Động Thực Tế",
    "projects.subtitle": "Xem ZKPetition trao quyền cho cộng đồng trên toàn thế giới như thế nào",
    "projects.activism.title": "Phong Trào Hoạt Động",
    "projects.activism.description": "Bảo vệ các nhà hoạt động ở các chế độ độc tài bằng việc ký kiến nghị ẩn danh",
    "projects.dao.title": "Quản Trị DAO",
    "projects.dao.description": "Cho phép bỏ phiếu riêng tư và đề xuất trong các tổ chức phi tập trung",
    "projects.corporate.title": "Trách Nhiệm Doanh Nghiệp",
    "projects.corporate.description": "Cho phép nhân viên nêu lên mối quan ngại mà không sợ bị trả thù",
    "projects.realworld.title": "Ứng Dụng",
    "projects.realworld.subtitle": "Thực Tế",
    "projects.description":
      "Từ việc bảo vệ các nhà hoạt động ở những khu vực bị kiểm duyệt đến việc cho phép quản trị DAO ẩn danh, ZKPetition trao quyền cho hành động tập thể an toàn trên các cộng đồng và tổ chức đa dạng.",
    "projects.view.usecase": "Xem Ứng Dụng",
    "projects.explore.all": "Khám Phá Tất Cả Ứng Dụng",

    // FAQ
    "faq.title": "Câu Hỏi Thường Gặp",
    "faq.what.question": "ZKPetition là gì?",
    "faq.what.answer":
      "ZKPetition là một nền tảng kiến nghị phi tập trung được xây dựng trên Midnight sidechain của Cardano, sử dụng Zero-Knowledge Proofs để cho phép ký kiến nghị ẩn danh nhưng có thể xác minh.",
    "faq.how.question": "Zero-Knowledge Proof hoạt động như thế nào?",
    "faq.how.answer":
      "Zero-Knowledge Proofs cho phép bạn chứng minh rằng bạn đủ điều kiện ký kiến nghị mà không tiết lộ danh tính của mình. Blockchain xác minh chữ ký của bạn là hợp lệ trong khi giữ thông tin cá nhân của bạn hoàn toàn riêng tư.",
    "faq.secure.question": "Nó có thực sự an toàn không?",
    "faq.secure.answer":
      "Có. Được xây dựng trên blockchain đã được thử nghiệm của Cardano với các tính năng bảo mật của Midnight, dữ liệu của bạn được bảo vệ bằng mật mã và không thể bị giả mạo hoặc kiểm duyệt.",
    "faq.cost.question": "Chi phí là bao nhiêu?",
    "faq.cost.answer":
      "Tạo và ký kiến nghị yêu cầu một lượng ADA tối thiểu cho phí giao dịch. Chúng tôi đang nỗ lực làm cho nó hoàn toàn miễn phí cho người dùng ở các khu vực bị hạn chế.",

    // CTA
    "cta.title": "Sẵn Sàng Để Tiếng Nói Của Bạn Được Lắng Nghe?",
    "cta.description": "Tham gia cuộc cách mạng quyền riêng tư. Tạo kiến nghị ẩn danh, an toàn không thể bị im lặng.",
    "cta.button": "Bắt Đầu Ngay",

    // Footer
    "footer.description": "Trao quyền cho hoạt động ẩn danh thông qua công nghệ blockchain",
    "footer.links": "Liên Kết Nhanh",
    "footer.about": "Giới Thiệu",
    "footer.privacy": "Chính Sách Bảo Mật",
    "footer.terms": "Điều Khoản Dịch Vụ",
    "footer.contact": "Liên Hệ",
    "footer.social": "Theo Dõi Chúng Tôi",
    "footer.rights": "Tất cả quyền được bảo lưu.",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("zkpetition-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "vi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("zkpetition-language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
