"use client"

import * as React from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { cn } from "@/lib/utils"
import { ZoomIn } from "lucide-react"

interface ImageWithZoomProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    containerClassName?: string
    priority?: boolean
    showZoomIcon?: boolean
}

export function ImageWithZoom({
    src,
    alt,
    width,
    height,
    className,
    containerClassName,
    priority = false,
    showZoomIcon = true
}: ImageWithZoomProps) {
    const [open, setOpen] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <>
            <div
                className={cn("relative overflow-hidden group cursor-zoom-in", containerClassName)}
                onClick={() => setOpen(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {width && height ? (
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className={cn("transition-transform duration-500 group-hover:scale-105", className)}
                        priority={priority}
                    />
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className={cn("object-cover transition-transform duration-500 group-hover:scale-105", className)}
                        priority={priority}
                    />
                )}

                {/* Zoom Icon Overlay */}
                {showZoomIcon && (
                    <div
                        className={cn(
                            "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                            <ZoomIn className="h-5 w-5 text-gray-900" />
                        </div>
                    </div>
                )}
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src, alt }]}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                }}
            />
        </>
    )
}

// Gallery with Lightbox
interface GalleryLightboxProps {
    images: Array<{ src: string; alt: string }>
    children: React.ReactNode
}

export function GalleryLightbox({ images, children }: GalleryLightboxProps) {
    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)

    return (
        <>
            <div onClick={() => setOpen(true)}>
                {children}
            </div>

            <Lightbox
                open={open}
                index={index}
                close={() => setOpen(false)}
                slides={images}
                on={{ view: ({ index: i }) => setIndex(i) }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                }}
            />
        </>
    )
}
