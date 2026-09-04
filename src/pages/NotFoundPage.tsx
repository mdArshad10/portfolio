import { ArrowLeft, Search } from "lucide-react"
import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <main id="main-content" className="site-shell flex min-h-screen items-center py-28">
      <div className="max-w-xl">
        <div className="mb-7 grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary"><Search className="h-5 w-5" /></div>
        <p className="section-kicker mb-4">404 · Page not found</p>
        <h1 className="mb-5 text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">There’s nothing at this address.</h1>
        <p className="body-copy mb-9">The link may be outdated or the address may have been entered incorrectly.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/" id="not-found-back-home" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back home</Link>
          <a href="/#projects" id="not-found-view-work" className="inline-flex min-h-12 items-center rounded-lg border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted">View projects</a>
        </div>
      </div>
    </main>
  )
}
