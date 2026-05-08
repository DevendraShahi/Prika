"use client"

import * as React from "react"
import { serifOptions, sansOptions, type FontOption } from "@/lib/fonts"

type FontContextType = {
  currentSerif: FontOption
  currentSans: FontOption
  setSerifFont: (font: FontOption) => void
  setSansFont: (font: FontOption) => void
}

const FontContext = React.createContext<FontContextType | undefined>(undefined)

export function useFont() {
  const context = React.useContext(FontContext)
  if (!context) {
    throw new Error("useFont must be used within a FontProvider")
  }
  return context
}

interface FontProviderProps {
  children: React.ReactNode
}

export function FontProvider({ children }: FontProviderProps) {
  const [currentSerif, setCurrentSerif] = React.useState<FontOption>(serifOptions[0])
  const [currentSans, setCurrentSans] = React.useState<FontOption>(sansOptions[0])

  const setSerifFont = React.useCallback((font: FontOption) => {
    setCurrentSerif(font)
  }, [])

  const setSansFont = React.useCallback((font: FontOption) => {
    setCurrentSans(font)
  }, [])

  // Apply font classes to document
  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove(...serifOptions.map(f => f.font.variable))
    root.classList.add(currentSerif.font.variable)
  }, [currentSerif])

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove(...sansOptions.map(f => f.font.variable))
    root.classList.add(currentSans.font.variable)
  }, [currentSans])

  return (
    <FontContext.Provider value={{ currentSerif, currentSans, setSerifFont, setSansFont }}>
      {children}
    </FontContext.Provider>
  )
}
