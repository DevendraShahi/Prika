import localFont from 'next/font/local'
import {
    Josefin_Sans,
    DM_Sans,
    Poppins,
    Nunito,
    Manrope,
    Arvo,
    Outfit
} from 'next/font/google'

// --- LOCAL FONTS (HEADINGS / DISPLAY) ---

export const eleanore = localFont({
    src: '../../public/fonts/Eleanore.otf',
    variable: '--font-serif',
    display: 'swap',
})

export const absurdworld = localFont({
    src: '../../public/fonts/Absurdworld.ttf',
    variable: '--font-serif',
    display: 'swap',
})

export const robinDisplay = localFont({
    src: '../../public/fonts/Robinjuliodisplay.ttf',
    variable: '--font-serif',
    display: 'swap',
})

export const bestDeals = localFont({
    src: '../../public/fonts/BestDealsRegular.otf',
    variable: '--font-serif', // Mapped to serif variable for headings
    display: 'swap',
})

export const bento = localFont({
    src: '../../public/fonts/Bento.otf',
    variable: '--font-serif',
    display: 'swap',
})

export const robinScript = localFont({
    src: '../../public/fonts/Robinjulioscript.ttf',
    variable: '--font-serif',
    display: 'swap',
})

// --- GOOGLE FONTS (BODY / SANS) ---

export const josefin = Josefin_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const poppins = Poppins({ weight: ['300', '400', '500'], subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const nunito = Nunito({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const arvo = Arvo({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })


export type FontOption = {
    name: string
    value: string
    font: any // generic next/font type
    type: 'serif' | 'sans'
}

// All local fonts go here as "Serif" / Headings options
export const serifOptions: FontOption[] = [
    { name: 'Eleanore', value: 'eleanore', font: eleanore, type: 'serif' },
    { name: 'Absurdworld', value: 'absurdworld', font: absurdworld, type: 'serif' },
    { name: 'Robin Julio', value: 'robinDisplay', font: robinDisplay, type: 'serif' },
    { name: 'Best Deals', value: 'bestDeals', font: bestDeals, type: 'serif' },
    { name: 'Bento', value: 'bento', font: bento, type: 'serif' },
    { name: 'Robin Script', value: 'robinScript', font: robinScript, type: 'serif' },
]

// All Google fonts go here as "Sans" / Body options
export const sansOptions: FontOption[] = [
    { name: 'Josefin Sans', value: 'josefin', font: josefin, type: 'sans' },
    { name: 'DM Sans', value: 'dmSans', font: dmSans, type: 'sans' },
    { name: 'Poppins', value: 'poppins', font: poppins, type: 'sans' },
    { name: 'Nunito', value: 'nunito', font: nunito, type: 'sans' },
    { name: 'Manrope', value: 'manrope', font: manrope, type: 'sans' },
    { name: 'Arvo (Slab)', value: 'arvo', font: arvo, type: 'sans' },
    { name: 'Outfit', value: 'outfit', font: outfit, type: 'sans' },
]
