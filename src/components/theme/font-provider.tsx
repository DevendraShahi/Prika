"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import {
    serifOptions,
    sansOptions,
    FontOption,
    DEFAULT_SERIF_FONT,
    DEFAULT_SANS_FONT,
} from '@/lib/fonts'

type FontContextType = {
    currentSerif: FontOption
    currentSans: FontOption
    setSerif: (value: string) => void
    setSans: (value: string) => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export function FontProvider({ children }: { children: React.ReactNode }) {
    const [currentSerif, setCurrentSerif] = useState<FontOption>(
        serifOptions.find((font) => font.value === DEFAULT_SERIF_FONT) ?? serifOptions[0]
    )
    const [currentSans, setCurrentSans] = useState<FontOption>(
        sansOptions.find((font) => font.value === DEFAULT_SANS_FONT) ?? sansOptions[0]
    )

    useEffect(() => {
        // Apply font variables to logic or root if needed, 
        // but best way is to wrap children in a div with the class variables
        // or just rely on the layout to consume this context. 
        // Actually, simpler: we verify the variables are set on the document root
        const root = document.documentElement
        root.style.setProperty('--font-serif', currentSerif.font.style.fontFamily)
        root.style.setProperty('--font-sans', currentSans.font.style.fontFamily)

        // Also remove old classes and add new ones if we were using class based injection
        // But since next/font uses random classnames, we might just need to 
        // conditionally render the font className in the Layout. 
        // However, that requires this to be higher up. 

        // Alternative: Just set a data attribute and use CSS variables which next/font populates
    }, [currentSerif, currentSans])

    const setSerif = (value: string) => {
        const font = serifOptions.find(f => f.value === value)
        if (font) setCurrentSerif(font)
    }

    const setSans = (value: string) => {
        const font = sansOptions.find(f => f.value === value)
        if (font) setCurrentSans(font)
    }

    return (
        <FontContext.Provider value={{ currentSerif, currentSans, setSerif, setSans }}>
            <div className={`${currentSerif.font.variable} ${currentSans.font.variable} font-sans`}>
                {children}
            </div>
        </FontContext.Provider>
    )
}

export const useFont = () => {
    const context = useContext(FontContext)
    if (!context) throw new Error('useFont must be used within a FontProvider')
    return context
}
