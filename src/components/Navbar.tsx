import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { personalInfo } from "@/data/portfolio"
import { ThemeToggle } from "@/components/ThemeToggle"

const navLinks = [
  { label: "Work", href: "/#projects" },
  { label: "Capabilities", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  const solid = scrolled || menuOpen || location.pathname !== "/"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        solid ? "border-border bg-background/95" : "border-transparent bg-background/80"
      }`}
    >
      <nav className="site-shell flex h-[4.5rem] items-center justify-between" aria-label="Primary navigation">
        <Link to="/" onClick={() => setMenuOpen(false)} className="group inline-flex min-h-11 items-center gap-3 text-[0.95rem] font-semibold tracking-[-0.02em]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-xs font-semibold text-background transition-transform duration-200 group-hover:-rotate-3">
            MA
          </span>
          <span>{personalInfo.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-lg px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {link.label}
            </a>
          ))}
          <div className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-12 w-12 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-11 md:w-11"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="t-icon-swap" data-state={menuOpen ? "b" : "a"} aria-hidden="true">
              <Menu className="t-icon h-5 w-5" data-icon="a" />
              <X className="t-icon h-5 w-5" data-icon="b" />
            </span>
          </button>
        </div>
      </nav>

      <div id="mobile-navigation" className="t-panel-slide absolute inset-x-0 top-full border-b border-border bg-background shadow-[var(--shadow-soft)] md:hidden" data-open={menuOpen} aria-hidden={!menuOpen}>
        <div className="site-shell flex flex-col py-3">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-medium transition-colors hover:bg-muted">
              {link.label}
              <span className="text-muted-foreground" aria-hidden="true">↘</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
