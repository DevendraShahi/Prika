"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

export type MediaType = 'image' | 'video'

export interface CollectionMedia {
    type: MediaType
    src: string
    alt?: string
}

interface CollectionCardProps {
    id: string
    title: string
    description?: string
    category?: string
    media: CollectionMedia[]
    className?: string
}

export function CollectionCard({ 
    title, 
    description = "Exquisite craftsmanship tailored for your perfect moment.", 
    category = "Bridal",
    media, 
    className 
}: CollectionCardProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const [liked, setLiked] = React.useState(false)

    React.useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Card className={cn("overflow-hidden border-0 bg-transparent shadow-none group cursor-pointer", className)}>
            <CardContent className="p-0">
                <Carousel setApi={setApi} className="w-full relative">
                    <CarouselContent>
                        {media.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
                                    {item.type === 'video' ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        >
                                            <source src={item.src} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={item.src}
                                                alt={item.alt || `${title} - ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    {/* Category badge */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-white/90 dark:bg-black/70 rounded-full shadow-sm backdrop-blur-sm dark:text-white">
                                            {category}
                                        </span>
                                    </div>

                                    {/* Like button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setLiked(!liked)
                                        }}
                                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/60 transition-colors shadow-sm backdrop-blur-sm"
                                    >
                                        <Heart className={cn(
                                            "h-4 w-4 transition-colors",
                                            liked ? "fill-rose-500 text-rose-500" : "text-gray-700 dark:text-gray-200"
                                        )} />
                                    </button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Arrows - Show only if media > 1 */}
                    {media.length > 1 && (
                        <>
                            <CarouselPrevious className="left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-9 w-9 bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 border-0" />
                            <CarouselNext className="right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-9 w-9 bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 border-0" />

                            {/* Dots Indicator */}
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
                                {Array.from({ length: count }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            api?.scrollTo(i)
                                        }}
                                        className={cn(
                                            "h-1.5 rounded-full bg-white/50 transition-all duration-300",
                                            i === current - 1 ? "bg-white w-4" : "w-1.5 hover:bg-white/70"
                                        )}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </Carousel>

                {/* Caption Area - Instagram Style */}
                <div className="pt-3 space-y-1">
                    <h3 className="font-serif text-lg font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {description}
                        <span className="text-primary ml-1 cursor-pointer hover:underline">#prika</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
