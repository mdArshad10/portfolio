import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export function NotFoundPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <main id="main-content" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[140px]"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-12">
        {/* Giant editorial 404 */}
        <p
          className={`leading-none font-medium text-foreground transition-all duration-700 select-none ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{
            fontSize: "clamp(8rem, 22vw, 18rem)",
            letterSpacing: "-0.04em",
            /* Outline-only text, a signature editorial look */
            WebkitTextStroke: "1.5px color-mix(in oklab, var(--primary) 45%, transparent)",
            color: "transparent",
          }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Label overline */}
        <p
          className={`label-md -mt-4 mb-5 text-primary transition-all delay-100 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Page Not Found
        </p>

        {/* Headline */}
        <h1
          className={`headline-md mb-4 text-foreground transition-all delay-150 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          This page doesn't exist.
        </h1>

        {/* Body */}
        <p
          className={`body-md mx-auto mb-10 max-w-sm text-muted-foreground transition-all delay-200 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          The URL may be misspelled or the page you're looking for is no longer
          here.
        </p>

        {/* CTA */}
        <div
          className={`flex items-center justify-center gap-4 transition-all delay-300 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Link
            to="/"
            id="not-found-back-home"
            className="label-md inline-flex min-h-12 items-center gap-2 border-2 border-primary bg-primary px-6 py-3 text-primary-foreground transition-colors duration-200 hover:bg-background hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <a
            href="/#projects"
            id="not-found-view-work"
            className="label-md inline-flex min-h-12 items-center gap-2 border-2 border-foreground px-6 py-3 text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
          >
            View Work
          </a>
        </div>

        {/* Subtle divider line */}
        <div
          className={`mx-auto mt-16 h-px max-w-xs transition-all delay-500 duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "var(--border)" }}
        />
        <p
          className={`label-md mt-4 text-muted-foreground transition-all delay-500 duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Md. Arshad
        </p>
      </div>
    </main>
  )
}
