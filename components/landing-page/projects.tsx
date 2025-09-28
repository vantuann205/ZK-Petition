"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import ProjectPopup from "../portfolio/project-popup"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { PortfolioItem } from "@/utils/csv-parser"
import { useLanguage } from "@/contexts/language-context"

export default function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch portfolio data on component mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchPortfolioData()
        // Get the first 3 projects for the landing page
        setProjects(data.slice(0, 3))
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const openProjectPopup = (project: PortfolioItem) => {
    setSelectedProject(project)
  }

  const closeProjectPopup = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        {t("projects.realworld.title")}
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">{t("projects.realworld.subtitle")}</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">{t("projects.description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="card overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))
          : projects.map((project) => (
              <div
                key={project.slug}
                className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => openProjectPopup(project)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      project.mainImage || "/placeholder.svg?height=600&width=800&query=blockchain+petition+platform"
                    }
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 mb-4">{project.shortDescription}</p>
                  <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                    {t("projects.view.usecase")}{" "}
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/portfolio" className="btn-primary">
          {t("projects.explore.all")}
        </Link>
      </div>

      {/* Project Popup */}
      <ProjectPopup project={selectedProject} onClose={closeProjectPopup} />
    </section>
  )
}
