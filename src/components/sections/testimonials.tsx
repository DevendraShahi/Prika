"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel"
import { Quote, Star } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "New York, USA",
        rating: 5,
        text: "Prika created the most stunning wedding dress I could have ever imagined. The attention to detail was incredible, and the fit was absolutely perfect. I felt like a princess on my special day.",
        event: "Wedding - June 2024"
    },
    {
        id: 2,
        name: "Priya Sharma",
        location: "Mumbai, India",
        rating: 5,
        text: "The craftsmanship is unparalleled. My reception lehenga was a perfect blend of traditional and modern design. The team was so accommodating with all my requests and delivered beyond expectations.",
        event: "Reception - March 2024"
    },
    {
        id: 3,
        name: "Emily Chen",
        location: "Singapore",
        rating: 5,
        text: "Even though I was ordering from overseas, the team made the entire process seamless. Virtual consultations were thorough, and the final gown was even more beautiful than I had envisioned.",
        event: "Wedding - December 2023"
    },
    {
        id: 4,
        name: "Anita Gurung",
        location: "Kathmandu, Nepal",
        rating: 5,
        text: "A truly luxurious experience from start to finish. The bespoke service made me feel like royalty. My evening gown received so many compliments at the gala. Highly recommend Prika!",
        event: "Gala Event - September 2024"
    },
    {
        id: 5,
        name: "Michelle Wong",
        location: "Hong Kong",
        rating: 5,
        text: "The quality of fabric and embroidery work is exceptional. Prika understood exactly what I wanted and delivered a timeless piece. Worth every penny for such a special occasion.",
        event: "Wedding - April 2024"
    },
    {
        id: 6,
        name: "Rosa Martinez",
        location: "Manila, Philippines",
        rating: 5,
        text: "I was nervous about ordering internationally, but Prika's team was incredibly professional. The dress arrived perfectly packaged and fit like a dream. Their attention to measurements is impressive!",
        event: "Wedding - February 2024"
    }
]

export function Testimonials() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    // Auto-advance carousel
    React.useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())
        
        const intervalId = setInterval(() => {
            api.scrollNext()
        }, 5000)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })

        return () => clearInterval(intervalId)
    }, [api])

    return (
        <section id="testimonials" className="py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">What Our Clients Say</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Hear from the brides and clients who trusted us with their special moments
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                                    <Card className="h-full border shadow-md bg-card">
                                        <CardContent className="p-6 md:p-8 space-y-4">
                                            <Quote className="h-8 w-8 text-primary/30" />
                                            
                                            {/* Rating */}
                                            <div className="flex gap-1">
                                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>

                                            {/* Text */}
                                            <p className="text-muted-foreground leading-relaxed italic">
                                                &quot;{testimonial.text}&quot;
                                            </p>

                                            {/* Author */}
                                            <div className="pt-4 border-t">
                                                <p className="font-serif font-medium">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                                <p className="text-xs text-primary mt-1">{testimonial.event}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation */}
                        <CarouselPrevious className="left-0 -translate-x-1/2 hidden md:flex bg-card" />
                        <CarouselNext className="right-0 translate-x-1/2 hidden md:flex bg-card" />
                    </Carousel>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    current === index ? "bg-primary w-6" : "bg-primary/30"
                                }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
