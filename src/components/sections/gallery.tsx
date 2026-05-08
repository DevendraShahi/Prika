"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { LayoutGrid, Grid3X3, PlayCircle, Eye, ChevronRight } from "lucide-react"
import { collections } from "@/lib/collections"

// ─── Data preparation ────────────────────────────────────────────────────────

const galleryItems = collections.flatMap((collection) => {
    const collectionThumb =
        collection.media.find((m) => m.type === "image")?.src ?? "/prika-logo.png"

    return collection.media.map((media, idx) => ({
        id: `${collection.id}-${idx}`,
        src: media.src,
        type: media.type as "image" | "video",
        thumb: media.type === "image" ? media.src : collectionThumb,
        alt: ("alt" in media ? media.alt : undefined) ?? collection.title,
        category: collection.category,
        title: collection.title,
    }))
})

const ALL_CATEGORIES = Array.from(new Set(galleryItems.map((i) => i.category)))

type GalleryItem = (typeof galleryItems)[number]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const subHtml = (item: GalleryItem) => `
  <div class="prika-lg-caption">
    <p>${esc(item.category)}</p>
    <h4>${esc(item.title)}</h4>
  </div>
`

// ─── Types to avoid fragile deep-import paths ─────────────────────────────────

interface LightGalleryCore {
    openGallery(index?: number): void
    destroy(): void
}

interface LgDynamicItem {
    src?: string
    thumb?: string
    alt?: string
    title?: string
    subHtml?: string
    downloadUrl?: string | boolean
    poster?: string
    video?: {
        source: Array<{ src: string; type: string }>
        tracks?: unknown[]
        attributes?: Record<string, unknown>
    }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Gallery() {
    const [viewMode, setViewMode] = React.useState<"masonry" | "grid">("masonry")
    const [selectedCategory, setSelectedCategory] = React.useState("all")
    const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null)
    const [lgReady, setLgReady] = React.useState(false)

    const galleryHostRef = React.useRef<HTMLDivElement | null>(null)
    const lgRef = React.useRef<LightGalleryCore | null>(null)
    const pendingOpenRef = React.useRef<number | null>(null)
    // Track previous destroy to avoid stale closures
    const destroyRef = React.useRef<() => void>(() => {})

    const filteredItems = React.useMemo(
        () =>
            selectedCategory === "all"
                ? galleryItems
                : galleryItems.filter((i) => i.category === selectedCategory),
        [selectedCategory]
    )

    const dynamicItems = React.useMemo<LgDynamicItem[]>(
        () =>
            filteredItems.map((item) =>
                item.type === "video"
                    ? {
                          thumb: item.thumb,
                          alt: item.alt,
                          title: item.title,
                          subHtml: subHtml(item),
                          downloadUrl: false,
                          poster: item.thumb !== "/prika-logo.png" ? item.thumb : undefined,
                          video: {
                              source: [{ src: item.src, type: "video/mp4" }],
                              tracks: [],
                              attributes: {
                                  controls: true,
                                  muted: true,
                                  playsinline: true,
                                  preload: "metadata",
                              },
                          },
                      }
                    : {
                          src: item.src,
                          thumb: item.thumb,
                          alt: item.alt,
                          title: item.title,
                          subHtml: subHtml(item),
                          downloadUrl: false,
                      }
            ),
        [filteredItems]
    )

    // ── LightGallery init/refresh ────────────────────────────────────────────
    React.useEffect(() => {
        let cancelled = false
        setLgReady(false)

        // Tear down previous instance synchronously
        destroyRef.current()
        destroyRef.current = () => {}
        lgRef.current = null

        const init = async () => {
            const [
                { default: lightGallery },
                { default: lgThumbnail },
                { default: lgZoom },
                { default: lgVideo },
                { default: lgFullscreen },
            ] = await Promise.all([
                import("lightgallery"),
                import("lightgallery/plugins/thumbnail"),
                import("lightgallery/plugins/zoom"),
                import("lightgallery/plugins/video"),
                import("lightgallery/plugins/fullscreen"),
            ])

            if (cancelled || !galleryHostRef.current) return

            // We use native HTML5 video instead of video.js for a cleaner, bug-free experience.

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const lgOptions: any = {
                dynamic: true,
                dynamicEl: dynamicItems,
                plugins: [lgThumbnail, lgZoom, lgVideo, lgFullscreen],
                addClass: "prika-lightgallery",
                mode: "lg-fade",
                speed: 480,
                startClass: "lg-start-fade",
                backdropDuration: 240,
                download: false,
                counter: true,
                controls: true,
                loop: true,
                enableDrag: true,
                enableSwipe: true,
                swipeToClose: true,
                closable: true,
                closeOnTap: false,
                hideBarsDelay: 3000,
                showBarsAfter: 0,
                thumbnail: true,
                animateThumb: true,
                toggleThumb: true,
                thumbWidth: 72,
                thumbHeight: "96px",
                appendSubHtmlTo: ".lg-sub-html",
                mobileSettings: {
                    controls: true,
                    showCloseIcon: true,
                    download: false,
                },
                videojs: false,
                licenseKey: "0000-0000-000-0000",
            }

            const lg = lightGallery(galleryHostRef.current, lgOptions)

            lgRef.current = lg as unknown as LightGalleryCore
            destroyRef.current = () => {
                try { lg.destroy() } catch { /* ignore */ }
            }

            if (!cancelled) {
                setLgReady(true)
                if (pendingOpenRef.current !== null) {
                    lgRef.current.openGallery(pendingOpenRef.current)
                    pendingOpenRef.current = null
                }
            }
        }

        init()

        return () => {
            cancelled = true
            destroyRef.current()
            destroyRef.current = () => {}
            lgRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dynamicItems])

    // ── Open preview ────────────────────────────────────────────────────────
    const openPreview = React.useCallback((index: number) => {
        if (lgRef.current && lgReady) {
            lgRef.current.openGallery(index)
        } else {
            pendingOpenRef.current = index
        }
    }, [lgReady])

    // ─── Render ─────────────────────────────────────────────────────────────
    return (
        <section id="gallery" className="py-24 md:py-36 relative overflow-hidden">
            {/* Subtle background texture */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.96_0.01_290/0.6),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.18_0.015_290/0.5),transparent)]"
            />

            <div className="container mx-auto px-4 md:px-6">

                {/* ── Header ──────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center gap-5 mb-14"
                >
                    <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-muted-foreground">
                        Prika
                        <ChevronRight className="h-3 w-3 opacity-50" />
                        Lookbook
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                        The Lookbook
                    </h2>
                    <Separator className="w-20 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
                    <p className="text-muted-foreground max-w-[52ch] leading-relaxed text-sm md:text-base">
                        Explore every handcrafted piece — from bridal elegance to
                        evening glamour. Click any image to open the full-screen viewer.
                    </p>
                </motion.div>

                {/* ── Controls bar ────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
                >
                    {/* Category pills */}
                    <div
                        role="group"
                        aria-label="Filter by category"
                        className="flex flex-wrap items-center justify-center gap-2"
                    >
                        {["all", ...ALL_CATEGORIES].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                aria-pressed={selectedCategory === cat}
                                className={cn(
                                    "relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    selectedCategory === cat
                                        ? "bg-foreground text-background shadow-md"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                )}
                            >
                                {cat === "all" ? "All" : cat}
                                {selectedCategory === cat && (
                                    <motion.span
                                        layoutId="activeCategory"
                                        className="absolute inset-0 rounded-full bg-foreground -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* View mode toggle */}
                    <div
                        role="group"
                        aria-label="Gallery view mode"
                        className="flex items-center gap-1 p-1 bg-muted/70 rounded-xl border border-border/40 backdrop-blur-sm"
                    >
                        <button
                            type="button"
                            onClick={() => setViewMode("masonry")}
                            aria-pressed={viewMode === "masonry"}
                            aria-label="Masonry view"
                            title="Masonry view"
                            className={cn(
                                "p-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                viewMode === "masonry"
                                    ? "bg-background shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode("grid")}
                            aria-pressed={viewMode === "grid"}
                            aria-label="Grid view"
                            title="Grid view"
                            className={cn(
                                "p-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                viewMode === "grid"
                                    ? "bg-background shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>

                {/* ── Gallery grid (host for LightGallery dynamic mode) ──── */}
                {/* The ref div must be present in the DOM for LG to attach to */}
                <div ref={galleryHostRef} aria-hidden="true" className="hidden" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${viewMode}-${selectedCategory}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {filteredItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-28 gap-4 text-muted-foreground">
                                <Eye className="h-10 w-10 opacity-30" />
                                <p className="text-sm">No items in this category.</p>
                            </div>
                        ) : viewMode === "masonry" ? (
                            /* ── Masonry layout ── */
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
                                {filteredItems.map((item, index) => (
                                    <GalleryCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isHovered={hoveredIdx === index}
                                        onHover={setHoveredIdx}
                                        onClick={openPreview}
                                        className="mb-4 break-inside-avoid"
                                        aspectClass={undefined}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* ── Uniform grid layout ── */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredItems.map((item, index) => (
                                    <GalleryCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isHovered={hoveredIdx === index}
                                        onHover={setHoveredIdx}
                                        onClick={openPreview}
                                        className="aspect-[3/4]"
                                        aspectClass="h-full"
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* ── CTA ─────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="/collections"
                        className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-8 py-3 text-sm font-medium shadow-sm hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                        View All Collections
                        <ChevronRight className="h-4 w-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

// ─── Card sub-component ───────────────────────────────────────────────────────

interface GalleryCardProps {
    item: GalleryItem
    index: number
    isHovered: boolean
    onHover: (idx: number | null) => void
    onClick: (idx: number) => void
    className?: string
    /** Class applied to the inner media wrapper — used for uniform-grid height */
    aspectClass?: string
}

function GalleryCard({
    item,
    index,
    isHovered,
    onHover,
    onClick,
    className,
    aspectClass,
}: GalleryCardProps) {
    return (
        <motion.button
            type="button"
            aria-label={`Open ${item.title} preview`}
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "group relative block w-full overflow-hidden rounded-2xl bg-muted text-left cursor-pointer",
                "ring-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                "shadow-sm hover:shadow-xl transition-shadow duration-400",
                className
            )}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(index)}
            onBlur={() => onHover(null)}
            onClick={() => onClick(index)}
        >
            {/* Media */}
            <div className={cn("relative w-full overflow-hidden", aspectClass)}>
                {item.type === "video" ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={cn(
                            "w-full object-cover transition-transform duration-700 ease-out will-change-transform",
                            aspectClass ? "h-full" : "aspect-[3/4]",
                            isHovered && "scale-[1.06]"
                        )}
                    >
                        <source src={item.src} type="video/mp4" />
                    </video>
                ) : (
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={480}
                        height={640}
                        className={cn(
                            "w-full object-cover transition-transform duration-700 ease-out will-change-transform",
                            aspectClass ? "h-full" : "h-auto",
                            isHovered && "scale-[1.06]"
                        )}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                )}

                {/* Video play badge */}
                {item.type === "video" && (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                            isHovered ? "opacity-0" : "opacity-100"
                        )}
                    >
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-black/30 text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                            <PlayCircle className="h-5 w-5" />
                        </span>
                    </span>
                )}

                {/* Dark overlay */}
                <div
                    aria-hidden="true"
                    className={cn(
                        "absolute inset-0 transition-all duration-300 pointer-events-none",
                        isHovered ? "bg-black/45" : "bg-black/0"
                    )}
                />

                {/* Category badge */}
                <div
                    aria-hidden="true"
                    className={cn(
                        "absolute top-3 left-3 transition-all duration-300",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                    )}
                >
                    <span className="inline-block px-2.5 py-1 rounded-full text-[0.62rem] font-semibold tracking-wider uppercase bg-white/90 dark:bg-black/70 text-gray-800 dark:text-gray-100 backdrop-blur-sm shadow-sm">
                        {item.category}
                    </span>
                </div>

                {/* Expand icon */}
                <div
                    aria-hidden="true"
                    className={cn(
                        "absolute top-3 right-3 transition-all duration-300",
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                    )}
                >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/90 dark:bg-black/70 shadow-md backdrop-blur-sm text-gray-700 dark:text-gray-200">
                        <Eye className="h-3.5 w-3.5" />
                    </span>
                </div>

                {/* Title */}
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 px-4 py-3.5 transition-all duration-300",
                        "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    )}
                    aria-hidden="true"
                >
                    <p className="font-serif text-base font-medium text-white leading-tight truncate">
                        {item.title}
                    </p>
                </div>
            </div>
        </motion.button>
    )
}
