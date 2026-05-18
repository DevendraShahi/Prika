"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Hero() {
    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Determine the effective theme
    const effectiveTheme = mounted 
        ? (theme === "system" ? systemTheme : theme) 
        : "dark"

    const isDark = effectiveTheme === "dark"
    const overlaysEnabled = false

    return (
        <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Video Layer */}
            <div className="absolute inset-0 -z-30">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={cn(
                        "h-full w-full object-cover transition-[filter] duration-1000 ease-out",
                        // Dark mode only: cinematic tuning
                        isDark && "brightness-[0.85] contrast-[1.15] saturate-[1.1]"
                    )}
                >
                    <source src="/img/prika.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Subtle readability overlay */}
            <div
                className={cn(
                    "absolute inset-0 -z-20 pointer-events-none transition-all duration-700",
                    !isDark && "bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.20)_46%,rgba(0,0,0,0.30)_100%)]",
                    isDark && "bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.38)_46%,rgba(0,0,0,0.56)_100%)]"
                )}
            />

            {overlaysEnabled && (
                <>
                    {/* Base atmosphere: layered tonal veil for legibility and mood */}
                    <div
                        className="absolute inset-0 -z-20 pointer-events-none transition-opacity duration-700"
                        style={{
                            background: isDark
                                ? "linear-gradient(130deg, rgba(5,8,20,0.78) 0%, rgba(11,17,35,0.34) 46%, rgba(7,9,23,0.82) 100%), radial-gradient(circle at 22% 12%, rgba(96,165,250,0.22) 0%, transparent 44%), radial-gradient(circle at 78% 86%, rgba(244,114,182,0.2) 0%, transparent 42%)"
                                : "linear-gradient(128deg, rgba(255,246,229,0.36) 0%, rgba(255,255,255,0.05) 44%, rgba(255,236,244,0.28) 100%), radial-gradient(circle at 18% 14%, rgba(255,255,255,0.34) 0%, transparent 46%), radial-gradient(circle at 82% 88%, rgba(255,223,196,0.25) 0%, transparent 48%)"
                        }}
                    />

                    {/* Prismatic couture sweep */}
                    <motion.div
                        className={cn(
                            "absolute -inset-[18%] -z-10 pointer-events-none blur-3xl transition-opacity duration-700",
                            isDark ? "mix-blend-screen opacity-70" : "mix-blend-soft-light opacity-80"
                        )}
                        style={{
                            background: isDark
                                ? "conic-gradient(from 210deg at 50% 50%, rgba(56,189,248,0) 0deg, rgba(56,189,248,0.24) 62deg, rgba(167,139,250,0) 125deg, rgba(244,114,182,0.2) 188deg, rgba(45,212,191,0.18) 254deg, rgba(56,189,248,0) 360deg)"
                                : "conic-gradient(from 215deg at 50% 50%, rgba(255,184,130,0) 0deg, rgba(255,184,130,0.27) 56deg, rgba(255,255,255,0) 116deg, rgba(255,158,206,0.23) 188deg, rgba(147,197,253,0.2) 255deg, rgba(255,184,130,0) 360deg)"
                        }}
                        animate={{ rotate: [0, 14, -10, 0], scale: [1, 1.04, 1] }}
                        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Caustic silk texture: moving interference mesh */}
                    <motion.div
                        className={cn(
                            "absolute inset-0 -z-10 pointer-events-none transition-opacity duration-700",
                            isDark ? "mix-blend-screen opacity-35" : "mix-blend-multiply opacity-30"
                        )}
                        style={{
                            backgroundImage: isDark
                                ? "linear-gradient(108deg, rgba(59,130,246,0.22) 0%, transparent 45%), linear-gradient(332deg, rgba(236,72,153,0.22) 0%, transparent 48%), repeating-linear-gradient(112deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 10px)"
                                : "linear-gradient(116deg, rgba(255,199,149,0.23) 0%, transparent 44%), linear-gradient(326deg, rgba(244,114,182,0.2) 0%, transparent 45%), repeating-linear-gradient(114deg, rgba(148,163,184,0.12) 0px, rgba(148,163,184,0.12) 1px, transparent 1px, transparent 12px)",
                            backgroundSize: "170% 170%, 170% 170%, 180px 180px"
                        }}
                        animate={{
                            backgroundPosition: [
                                "0% 0%, 0% 0%, 0px 0px",
                                "90% 35%, 22% 78%, 65px 36px",
                                "24% 92%, 100% 24%, 130px 76px",
                                "0% 0%, 0% 0%, 0px 0px"
                            ],
                            opacity: isDark ? [0.28, 0.38, 0.3] : [0.2, 0.32, 0.22]
                        }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating diffused light pools */}
                    <motion.div
                        className={cn(
                            "absolute -top-24 -left-24 h-[42rem] w-[42rem] -z-10 rounded-full blur-[120px] pointer-events-none transition-colors duration-700",
                            isDark ? "bg-cyan-300/18 mix-blend-screen" : "bg-amber-200/34 mix-blend-multiply"
                        )}
                        animate={{ x: [0, 46, 0], y: [0, 28, 0], scale: [1, 1.08, 1], opacity: [0.5, 0.72, 0.5] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className={cn(
                            "absolute -bottom-36 -right-28 h-[44rem] w-[44rem] -z-10 rounded-full blur-[130px] pointer-events-none transition-colors duration-700",
                            isDark ? "bg-fuchsia-300/14 mix-blend-screen" : "bg-rose-200/26 mix-blend-multiply"
                        )}
                        animate={{ x: [0, -52, 0], y: [0, -22, 0], scale: [1, 1.1, 1], opacity: [0.46, 0.66, 0.46] }}
                        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />

                    {/* Lens vignette with soft aperture */}
                    <div
                        className="absolute inset-0 -z-10 pointer-events-none"
                        style={{
                            background: isDark
                                ? "radial-gradient(ellipse 78% 56% at 50% 46%, rgba(5,8,20,0) 0%, rgba(5,8,20,0) 46%, rgba(2,4,10,0.56) 100%)"
                                : "radial-gradient(ellipse 78% 56% at 50% 46%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 46%, rgba(255,244,232,0.34) 100%)"
                        }}
                    />

                    {/* Film grain pass */}
                    <div
                        className={cn(
                            "absolute inset-0 -z-10 pointer-events-none mix-blend-overlay",
                            isDark ? "opacity-[0.055]" : "opacity-[0.035]"
                        )}
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.95\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
                        }}
                    />

                    {/* Subtle scan shimmer */}
                    <motion.div
                        className={cn(
                            "absolute inset-0 -z-10 pointer-events-none",
                            isDark ? "mix-blend-screen opacity-[0.06]" : "mix-blend-multiply opacity-[0.04]"
                        )}
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.14) 3px, rgba(255,255,255,0.14) 4px)"
                        }}
                        animate={{ opacity: isDark ? [0.04, 0.08, 0.04] : [0.025, 0.05, 0.025], y: [0, 1, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </>
            )}

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="space-y-6"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className={cn(
                            "text-xs md:text-sm uppercase tracking-[0.3em] font-light transition-colors duration-1000 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]",
                            !isDark && "text-white/75",
                            isDark && "text-white/60"
                        )}
                    >
                        Luxury Bridal & Evening Couture
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className={cn(
                            "font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight transition-colors duration-1000 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
                            !isDark && "text-white",
                            isDark && "text-white"
                        )}
                    >
                        We Design Your
                        <motion.span 
                            className={cn(
                                "block mt-3 italic font-light transition-colors duration-1000",
                                !isDark && "text-white/90",
                                isDark && "text-white/85"
                            )}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            Dreams
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className={cn(
                            "mx-auto max-w-[600px] md:text-lg font-sans font-light leading-relaxed transition-colors duration-1000 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]",
                            !isDark && "text-white/80",
                            isDark && "text-white/70"
                        )}
                    >
                        Handcrafted luxury bridal and evening couture. Every stitch tells a story of elegance, 
                        every detail embodies your dreams.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col sm:flex-row gap-4 mt-4"
                >
                    <Button
                        size="lg"
                        className={cn(
                            "h-14 px-10 text-base rounded-full shadow-xl transition-all duration-500 hover:scale-105",
                            !isDark && "bg-gray-900 text-white hover:bg-gray-800 shadow-gray-900/20",
                            isDark && "bg-white text-black hover:bg-white/95 shadow-white/20"
                        )}
                        asChild
                    >
                        <a href="/collections">View Collections</a>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className={cn(
                            "h-14 px-10 text-base rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-105",
                            !isDark && "border-gray-900/20 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900",
                            isDark && "border-white/25 text-white hover:bg-white hover:text-black hover:border-white"
                        )}
                        asChild
                    >
                        <a href="/contact">Book Appointment</a>
                    </Button>
                </motion.div>
            </div>

            {/* Fixed Scroll Indicator - Bottom Center */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.a
                    href="/atelier"
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className={cn(
                        "text-xs uppercase tracking-[0.2em] font-light transition-colors duration-1000 group-hover:opacity-100",
                        !isDark && "text-gray-400 group-hover:text-gray-700",
                        isDark && "text-white/40 group-hover:text-white/80"
                    )}>
                        Explore Atelier
                    </span>
                    <ChevronDown 
                        className={cn(
                            "h-5 w-5 transition-all duration-500 group-hover:translate-y-1",
                            !isDark && "text-gray-400 group-hover:text-gray-700",
                            isDark && "text-white/40 group-hover:text-white/80"
                        )} 
                    />
                </motion.a>
            </motion.div>
        </section>
    )
}
