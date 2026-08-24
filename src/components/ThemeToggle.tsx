import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => setIsDark(root.classList.contains("dark")))
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} className="grid h-12 w-12 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-11 md:w-11" aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>
      <span className="t-icon-swap" data-state={isDark ? "b" : "a"} aria-hidden="true">
        <Moon className="t-icon h-[1.125rem] w-[1.125rem]" data-icon="a" />
        <Sun className="t-icon h-[1.125rem] w-[1.125rem]" data-icon="b" />
      </span>
    </button>
  )
}
