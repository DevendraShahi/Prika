"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Grid3X3, LayoutGrid, Heart, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"

const galleryImages = [
    { id: 1, src: "/img/collection/1.jpg", alt: "Eleanor Gown", category: "Bridal" },
    { id: 2, src: "/img/collection/2.jpg", alt: "Seraphina Dress", category: "Evening" },
    { id: 3, src: "/img/collection/3.jpg", alt: "Royal Heritage", category: "Bridal" },
    { id: 4, src: "/img/collection/3-1.jpg", alt: "Royal Heritage Detail", category: "Bridal" },
    { id: 5, src: "/img/collection/3-2.jpg", alt: "Royal Heritage Back", category: "Bridal" },
    { id: 6, src: "/img/collection/5.jpg", alt: "Vintage Glamour", category: "Bridal" },
    { id: 7, src: "/img/collection/5-1.jpg", alt: "Vintage Glamour Detail", category: "Bridal" },
    { id: 8, src: "/img/collection/5-2.jpg", alt: "Vintage Glamour Side", category: "Bridal" },
    { id: 9, src: "/img/collection/5-3.jpg", alt: "Vintage Glamour Back", category: "Bridal" },
    { id: 10, src: "/img/collection/6.jpg", alt: "Modern Chic", category: "Bridal" },
    { id: 11, src: "/img/collection/6-1.jpg", alt: "Modern Chic Detail", category: "Bridal" },
]

export function Gallery() {
    const [viewMode, setViewMode] = React.useState<"grid" | "masonry">("masonry")
    const [selectedCategory, setSelectedCategory] = React.useState<"all" | "Bridal" | "Evening">("all")
    const [hoveredId, setHoveredId] = React.useState<number | null>(null)
    const [lightboxOpen, setLightboxOpen] = React.useState(false)
    const [lightboxIndex, setLightboxIndex] = React.useState(0)

    const filteredImages = selectedCategory === "all" 
        ? galleryImages 
        : galleryImages.filter(img => img.category === selectedCategory)

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    return (
        <section id="gallery" className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-12"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Lookbook</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Explore our gallery of handcrafted masterpieces, from bridal elegance to evening glamour
                    </p>
                </motion.div>

                {/* Filters and View Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
                >
                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        {["all", "Bridal", "Evening"].map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category as typeof selectedCategory)}
                                className="rounded-full"
                            >
                                {category === "all" ? "All" : category}
                            </Button>
                        ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                        <button
                            onClick={() => setViewMode("masonry")}
                            className={cn(
                                "p-2 rounded-md transition-colors",
                                viewMode === "masonry" ? "bg-background shadow-sm" : "hover:bg-background/50"
                            )}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "p-2 rounded-md transition-colors",
                                viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
                            )}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={cn(
                        "gap-4",
                        viewMode === "masonry" 
                            ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4" 
                            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    )}
                >
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className={cn(
                                "relative group overflow-hidden rounded-xl bg-muted cursor-pointer mb-4",
                                viewMode === "grid" && "aspect-[3/4]"
                            )}
                            onMouseEnter={() => setHoveredId(image.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => openLightbox(index)}
                        >
                            <div className={cn(
                                "relative w-full",
                                viewMode === "masonry" ? "h-auto" : "h-full"
                            )}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={viewMode === "masonry" ? 400 : 300}
                                    height={viewMode === "masonry" ? 500 : 400}
                                    className={cn(
                                        "w-full object-cover transition-transform duration-500",
                                        viewMode === "masonry" ? "h-auto" : "h-full",
                                        hoveredId === image.id && "scale-110"
                                    )}
                                />
                            </div>

                            {/* Overlay */}
                            <div className={cn(
                                "absolute inset-0 bg-black/0 transition-all duration-300",
                                hoveredId === image.id && "bg-black/40"
                            )} />

                            {/* Actions */}
                            <div className={cn(
                                "absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300",
                                hoveredId === image.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                            )}>
                                <button 
                                    className="p-2 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm hover:bg-white dark:hover:bg-black/80 transition-colors shadow-md"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Heart className="h-4 w-4 text-gray-700 dark:text-gray-200" />
                                </button>
                            </div>

                            {/* Category Badge */}
                            <div className={cn(
                                "absolute top-4 left-4 transition-all duration-300",
                                hoveredId === image.id ? "opacity-100" : "opacity-0"
                            )}>
                                <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-black/70 rounded-full shadow-sm backdrop-blur-sm">
                                    {image.category}
                                </span>
                            </div>

                            {/* Title */}
                            <div className={cn(
                                "absolute bottom-0 left-0 right-0 p-4 transition-all duration-300",
                                hoveredId === image.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}>
                                <p className="font-serif text-lg font-medium text-white">{image.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 text-center"
                >
                    <Button variant="outline" size="lg" className="rounded-full" asChild>
                        <a href="/collections">View All Collections</a>
                    </Button>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent
                    className="max-w-5xl w-[95vw] p-0 overflow-hidden bg-black/95 border-0"
                    showCloseButton={false}
                >
                    <DialogTitle className="sr-only">Image Preview</DialogTitle>
                    <div className="relative">
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="h-5 w-5 text-white" />
                        </button>
                        
                        {filteredImages[lightboxIndex] && (
                            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/3]">
                                <Image
                                    src={filteredImages[lightboxIndex].src}
                                    alt={filteredImages[lightboxIndex].alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {filteredImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setLightboxIndex(i)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all",
                                        i === lightboxIndex ? "bg-white w-6" : "bg-white/50"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Image Info */}
                        <div className="absolute bottom-12 left-0 right-0 text-center">
                            <p className="font-serif text-lg text-white">{filteredImages[lightboxIndex]?.alt}</p>
                            <p className="text-sm text-white/70">{filteredImages[lightboxIndex]?.category}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
