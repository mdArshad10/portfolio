import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { personalInfo } from "@/data/portfolio"
import { Button } from "./ui/button"

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

  const isProjectPage = location.pathname.startsWith("/projects/")

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || isProjectPage ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="label-md text-[#c5c0ff] transition-opacity duration-200 hover:opacity-70"
          >
            {personalInfo.name.split(" ").slice(1).join(" ")}
          </Link>

          {/* Desktop Nav - SMALL CAPS */}
          <div className="hidden items-center gap-8 md:flex">
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
          </div>

          {/* Mobile menu button */}
          <Button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
            variant={"ghost"}
          >
            <span
              className={`block h-px w-5 origin-center bg-[#e5e2e1] transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-[#e5e2e1] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 origin-center bg-[#e5e2e1] transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-60 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="label-md text-[#928f9d] transition-colors duration-200 hover:text-[#c5c0ff]"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
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
      className="label-md group relative text-[#928f9d] transition-colors duration-200 hover:text-[#c5c0ff]"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#7F77DD] transition-all duration-200 group-hover:w-full" />
    </a>
  ) : (
    <Link
      to={href}
      className="label-md group relative text-[#928f9d] transition-colors duration-200 hover:text-[#c5c0ff]"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#7F77DD] transition-all duration-200 group-hover:w-full" />
    </Link>
  )
}
