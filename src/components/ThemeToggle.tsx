import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  )

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"))
    })

    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex h-10 w-10 shrink-0 items-center justify-center border-2 border-transparent transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="t-icon-swap" data-state={isDark ? "b" : "a"} aria-hidden="true">
        <Sun className="t-icon h-5 w-5" data-icon="a" />
        <Moon className="t-icon h-5 w-5" data-icon="b" />
      </span>
    </button>
  )
}
