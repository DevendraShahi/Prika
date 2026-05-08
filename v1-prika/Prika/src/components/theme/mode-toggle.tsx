"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("system")
    }
  }

  const getCurrentIcon = () => {
    if (!mounted) return <Sun className="h-4 w-4" />
    
    if (theme === "system") {
      return systemTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
    }
    
    return theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
  }

  const getThemeLabel = () => {
    if (!mounted) return "System"
    return theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9" 
      onClick={cycleTheme}
      title={`Current: ${getThemeLabel()} theme - Click to switch`}
    >
      {getCurrentIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
