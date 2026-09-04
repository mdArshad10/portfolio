import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { HomePage } from "@/pages/HomePage"
import { ProjectDetailPage } from "@/pages/ProjectDetailPage"
import { NotFoundPage } from "./pages/NotFoundPage"

export function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <div className="min-h-screen bg-background text-foreground">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ block: "start" })
      })
      return
    }

    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}

export default App
