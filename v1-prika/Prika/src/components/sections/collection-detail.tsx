"use client"

import * as React from "react"
import Image from "next/image"
import { 
    Dialog, 
    DialogContent, 
    DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselNext, 
    CarouselPrevious,
    type CarouselApi 
} from "@/components/ui/carousel"
import { 
    X, 
    Heart, 
    Share2, 
    Calendar,
    Ruler,
    Palette,
    MessageCircle,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CollectionDetailMedia {
    type: 'image' | 'video'
    src: string
    alt?: string
}

export interface CollectionDetailData {
    id: string
    title: string
    category: string
    price?: string
    description: string
    details: string[]
    materials: string[]
    availableColors: string[]
    media: CollectionDetailMedia[]
    featured?: boolean
}

interface CollectionDetailProps {
    collection: CollectionDetailData | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CollectionDetail({ collection, open, onOpenChange }: CollectionDetailProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [liked, setLiked] = React.useState(false)

    React.useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    React.useEffect(() => {
        setLiked(false)
        setCurrent(0)
    }, [collection])

    if (!collection) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-background">
                <DialogTitle className="sr-only">{collection.title}</DialogTitle>
                
                <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
                    {/* Media Gallery */}
                    <div className="lg:w-3/5 relative bg-muted">
                        <Carousel setApi={setApi} className="w-full h-full">
                            <CarouselContent className="h-full">
                                {collection.media.map((item, index) => (
                                    <CarouselItem key={index} className="h-full">
                                        <div className="relative h-[40vh] lg:h-full w-full">
                                            {item.type === 'video' ? (
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    className="h-full w-full object-cover"
                                                >
                                                    <source src={item.src} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <Image
                                                    src={item.src}
                                                    alt={item.alt || `${collection.title} - ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            )}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {collection.media.length > 1 && (
                                <>
                                    <CarouselPrevious className="left-4 h-10 w-10 bg-white/80 dark:bg-black/60 backdrop-blur-sm" />
                                    <CarouselNext className="right-4 h-10 w-10 bg-white/80 dark:bg-black/60 backdrop-blur-sm" />
                                    
                                    {/* Dots */}
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                                        {collection.media.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => api?.scrollTo(i)}
                                                className={cn(
                                                    "h-1.5 rounded-full bg-white/50 transition-all",
                                                    i === current ? "bg-white w-6" : "w-1.5"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </Carousel>

                        {/* Action buttons overlay */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                            <button
                                onClick={() => setLiked(!liked)}
                                className="p-2.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm hover:bg-white dark:hover:bg-black/80 transition-colors shadow-md"
                            >
                                <Heart className={cn(
                                    "h-5 w-5 transition-colors",
                                    liked ? "fill-rose-500 text-rose-500" : "text-gray-700 dark:text-gray-200"
                                )} />
                            </button>
                            <button className="p-2.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm hover:bg-white dark:hover:bg-black/80 transition-colors shadow-md">
                                <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            </button>
                        </div>

                        {/* Featured badge */}
                        {collection.featured && (
                            <div className="absolute top-4 left-4 z-10">
                                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                            </div>
                        )}
                    </div>

                    {/* Details Panel */}
                    <div className="lg:w-2/5 flex flex-col overflow-y-auto">
                        {/* Header */}
                        <div className="p-6 border-b">
                            <div className="flex items-start justify-between">
                                <div>
                                    <Badge variant="outline" className="mb-2">{collection.category}</Badge>
                                    <h2 className="font-serif text-2xl md:text-3xl font-bold">{collection.title}</h2>
                                    {collection.price && (
                                        <p className="text-lg text-muted-foreground mt-1">{collection.price}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => onOpenChange(false)}
                                    className="p-2 rounded-full hover:bg-muted transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                            {/* Description */}
                            <div>
                                <p className="text-muted-foreground leading-relaxed">{collection.description}</p>
                            </div>

                            {/* Details */}
                            <div>
                                <h4 className="font-serif text-lg font-medium mb-3 flex items-center gap-2">
                                    <Ruler className="h-4 w-4 text-primary" />
                                    Details
                                </h4>
                                <ul className="space-y-2">
                                    {collection.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Materials */}
                            <div>
                                <h4 className="font-serif text-lg font-medium mb-3 flex items-center gap-2">
                                    <Palette className="h-4 w-4 text-primary" />
                                    Materials
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {collection.materials.map((material, i) => (
                                        <Badge key={i} variant="secondary">{material}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Available Colors */}
                            <div>
                                <h4 className="font-serif text-lg font-medium mb-3">Available Colors</h4>
                                <div className="flex flex-wrap gap-2">
                                    {collection.availableColors.map((color, i) => (
                                        <Badge key={i} variant="outline">{color}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t bg-muted/30">
                            <div className="space-y-3">
                                <Button className="w-full h-12" size="lg" asChild>
                                    <a href="#contact">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Book Appointment
                                    </a>
                                </Button>
                                <Button variant="outline" className="w-full h-12" size="lg" asChild>
                                    <a href="#contact">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Inquire About This Design
                                    </a>
                                </Button>
                            </div>
                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Each piece is made to order and fully customizable
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
