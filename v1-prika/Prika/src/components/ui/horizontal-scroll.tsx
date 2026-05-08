"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HorizontalScrollProps {
    children: React.ReactNode
    className?: string
    title?: string
    subtitle?: string
    showArrows?: boolean
}

export function HorizontalScroll({ 
    children, 
    className,
    title,
    subtitle,
    showArrows = true 
}: HorizontalScrollProps) {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(true)

    const checkScroll = React.useCallback(() => {
        if (!scrollRef.current) return
        
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }, [])

    React.useEffect(() => {
        checkScroll()
        const el = scrollRef.current
        if (el) {
            el.addEventListener("scroll", checkScroll)
            window.addEventListener("resize", checkScroll)
            return () => {
                el.removeEventListener("scroll", checkScroll)
                window.removeEventListener("resize", checkScroll)
            }
        }
    }, [checkScroll])

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return
        
        const scrollAmount = scrollRef.current.clientWidth * 0.8
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        })
    }

    return (
        <div className={cn("relative", className)}>
            {/* Header */}
            {(title || subtitle) && (
                <div className="flex items-center justify-between mb-6 px-4 md:px-6">
                    <div>
                        {title && <h2 className="font-serif text-2xl md:text-3xl font-bold">{title}</h2>}
                        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
                    </div>
                    {showArrows && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-full"
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-full"
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-6 pb-4"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {children}
            </div>

            {/* Fade Gradients */}
            {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            )}
            {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            )}
        </div>
    )
}

// Scrollable Card Component
interface ScrollCardProps {
    children: React.ReactNode
    className?: string
    width?: "sm" | "md" | "lg" | "xl" | "full"
}

export function ScrollCard({ children, className, width = "md" }: ScrollCardProps) {
    const widths = {
        sm: "min-w-[200px]",
        md: "min-w-[280px]",
        lg: "min-w-[350px]",
        xl: "min-w-[450px]",
        full: "min-w-[90vw] md:min-w-[60vw] lg:min-w-[50vw]"
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={cn(
                widths[width],
                "flex-shrink-0",
                className
            )}
        >
            {children}
        </motion.div>
    )
}
