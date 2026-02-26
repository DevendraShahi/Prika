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

export type MediaType = 'image' | 'video'

export interface CollectionMedia {
    type: MediaType
    src: string
    alt?: string
}

interface CollectionCardProps {
    id: string
    title: string
    media: CollectionMedia[]
    className?: string
}

export function CollectionCard({ title, media, className }: CollectionCardProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Card className={cn("overflow-hidden border-0 bg-transparent shadow-none", className)}>
            <CardContent className="p-0">
                <Carousel setApi={setApi} className="w-full relative group">
                    <CarouselContent>
                        {media.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-muted">
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
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={item.src}
                                                alt={item.alt || `${title} - ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Arrows - Show only if media > 1 */}
                    {media.length > 1 && (
                        <>
                            <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
                            <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                                {Array.from({ length: count }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1.5 w-1.5 rounded-full bg-white/50 transition-all",
                                            i === current - 1 ? "bg-white w-3" : ""
                                        )}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </Carousel>

                {/* Caption Area - Instagram Style */}
                <div className="pt-3 space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg font-medium">{title}</h3>
                        {/* Could add 'Like' or 'Save' icons here */}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        Exquisite craftsmanship tailored for your perfect moment.
                        <span className="text-primary ml-1 cursor-pointer">#prika</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
