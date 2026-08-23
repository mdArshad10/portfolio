import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { personalInfo } from "@/data/portfolio"
import { ThemeToggle } from "@/components/ThemeToggle"

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  
  

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 border-b-2 transition-all duration-300 ${
        scrolled || isProjectPage || menuOpen
          ? "border-foreground bg-background"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand - Brutalist Monospace */}
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xl font-black tracking-tighter text-foreground uppercase transition-colors duration-200 hover:text-primary"
          >
            <span className="bg-foreground px-2 py-0.5 text-background">
              SYS
            </span>
            <span>{personalInfo.name.split(" ").slice(1).join(" ")}</span>
          </Link>

          {/* Desktop Nav - Brutalist Chips */}
          <div className="hidden items-center gap-4 md:flex">
            {isProjectPage ? (
              <>
                <NavLink href="/#work" label="WORK" />
                <NavLink href="/#skills" label="EXPERTISE" />
                <NavLink href="/#contact" label="CONTACT" />
              </>
            ) : (
              navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label.toUpperCase()}
                />
              ))
            )}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            {/* Mobile menu button - Brutalist */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 flex-col items-center justify-center border-2 border-foreground transition-colors hover:bg-foreground hover:text-background focus:outline-none md:hidden"
              aria-label="Toggle menu"
            >
              <div className="relative h-4 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu - Stark */}
          <div
            className={`overflow-hidden bg-background transition-all duration-300 md:hidden ${
              menuOpen ? "max-h-64 border-t-2 border-foreground" : "max-h-0"
            }`}
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b-2 border-transparent px-4 py-4 font-mono text-lg font-bold text-foreground uppercase transition-colors hover:border-foreground hover:bg-primary hover:text-primary-foreground"
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const isHash = href.startsWith("/")
  return isHash ? (
    <a
      href={href}
      className="border-2 border-transparent px-4 py-2 font-mono text-sm font-bold text-foreground uppercase transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
    >
      {label}
    </a>
  ) : (
    <Link
      to={href}
      className="border-2 border-transparent px-4 py-2 font-mono text-sm font-bold text-foreground uppercase transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
    >
      {label}
    </Link>
  )
}
