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
                        // Light theme: bright, warm, dreamy
                        !isDark && "brightness-[1.15] contrast-[0.95] saturate-[0.85] sepia-[0.08]",
                        // Dark theme: cinematic, dramatic, moody
                        isDark && "brightness-[0.85] contrast-[1.15] saturate-[1.1]"
                    )}
                >
                    <source src="/img/prika.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Filter Layer 1 - Color Treatment */}
            <div 
                className={cn(
                    "absolute inset-0 -z-25 transition-all duration-1000 ease-out",
                    // Light: Warm golden undertone
                    !isDark && "bg-gradient-to-br from-amber-100/50 via-transparent to-orange-50/30 mix-blend-color",
                    // Dark: Cool cinematic undertone  
                    isDark && "bg-gradient-to-br from-slate-900/60 via-transparent to-indigo-950/50 mix-blend-multiply"
                )}
            />

            {/* Filter Layer 2 - Soft Light Enhancement */}
            <div 
                className={cn(
                    "absolute inset-0 -z-20 transition-all duration-1000 ease-out",
                    !isDark && "bg-white/30 mix-blend-soft-light",
                    isDark && "bg-black/10 mix-blend-multiply"
                )}
            />

            {/* Primary Gradient Overlay */}
            <div 
                className={cn(
                    "absolute inset-0 -z-15 transition-all duration-1000 ease-out",
                    // Light: Soft white gradient with warm edges
                    !isDark && "bg-gradient-to-b from-white/85 via-white/50 to-white/90",
                    // Dark: Rich black gradient with subtle color
                    isDark && "bg-gradient-to-b from-black/70 via-black/40 to-black/75"
                )}
            />

            {/* Secondary Gradient - Directional Light Effect */}
            <div 
                className={cn(
                    "absolute inset-0 -z-10 transition-all duration-1000 ease-out",
                    !isDark && "bg-gradient-to-tr from-amber-50/40 via-transparent via-60% to-rose-50/30",
                    isDark && "bg-gradient-to-tr from-indigo-950/30 via-transparent via-60% to-purple-950/20"
                )}
            />

            {/* Vignette Effect - Cinematic */}
            <div 
                className={cn(
                    "absolute inset-0 -z-10 pointer-events-none transition-opacity duration-1000",
                    isDark ? "opacity-100" : "opacity-40"
                )}
                style={{
                    background: isDark 
                        ? 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)'
                        : 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, transparent 50%, rgba(255,255,255,0.4) 100%)'
                }}
            />

            {/* Animated Light Leaks */}
            <div className="absolute inset-0 -z-5 pointer-events-none overflow-hidden">
                {/* Primary Bokeh - Top Left */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, 20, 0],
                        y: [0, 10, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={cn(
                        "absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] transition-colors duration-1000",
                        !isDark && "bg-gradient-to-br from-amber-200/50 to-orange-200/30",
                        isDark && "bg-gradient-to-br from-amber-500/15 to-orange-500/10"
                    )}
                />
                
                {/* Secondary Bokeh - Bottom Right */}
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.15, 0.3, 0.15],
                        x: [0, -30, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3
                    }}
                    className={cn(
                        "absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000",
                        !isDark && "bg-gradient-to-tl from-rose-200/40 to-pink-200/20",
                        isDark && "bg-gradient-to-tl from-purple-500/10 to-indigo-500/5"
                    )}
                />

                {/* Accent Bokeh - Center Right */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5
                    }}
                    className={cn(
                        "absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full blur-[80px] transition-colors duration-1000",
                        !isDark && "bg-gradient-to-bl from-yellow-100/30 to-amber-100/20",
                        isDark && "bg-gradient-to-bl from-rose-500/10 to-pink-500/5"
                    )}
                />
            </div>

            {/* Film Grain - Subtle texture */}
            <div 
                className={cn(
                    "absolute inset-0 -z-5 pointer-events-none mix-blend-overlay transition-opacity duration-1000",
                    !isDark && "opacity-[0.015]",
                    isDark && "opacity-[0.03]"
                )}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Subtle Scan Lines - Only for dark mode */}
            {isDark && (
                <div 
                    className="absolute inset-0 -z-5 pointer-events-none opacity-[0.02]"
                    style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                    }}
                />
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
                            "text-xs md:text-sm uppercase tracking-[0.3em] font-light transition-colors duration-1000",
                            !isDark && "text-gray-500/80",
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
                            "font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight transition-colors duration-1000",
                            !isDark && "text-gray-900",
                            isDark && "text-white"
                        )}
                    >
                        We Design Your
                        <motion.span 
                            className={cn(
                                "block mt-3 italic font-light transition-colors duration-1000",
                                !isDark && "text-gray-600",
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
                            "mx-auto max-w-[600px] md:text-lg font-sans font-light leading-relaxed transition-colors duration-1000",
                            !isDark && "text-gray-500/90",
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
