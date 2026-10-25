import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { HomePage } from "@/pages/HomePage"
import { ProjectDetailPage } from "@/pages/ProjectDetailPage"
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage"
import { NotFoundPage } from "./pages/NotFoundPage"

export function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <div className="min-h-screen bg-background text-foreground">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          {/* Intentionally unlisted: not linked from the navbar, footer, or sitemap. */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
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
