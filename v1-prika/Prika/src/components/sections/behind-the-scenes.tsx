"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { 
    Scissors, 
    Ruler, 
    Needle, 
    Sparkles,
    Clock,
    Users,
    Heart,
    Play
} from "lucide-react"

const behindTheScenes = [
    {
        title: "Design Studio",
        description: "Where dreams take shape on paper before becoming reality",
        image: "/img/collection/5-1.jpg",
        icon: Sparkles
    },
    {
        title: "Fabric Selection",
        description: "Hand-picking the finest materials from around the world",
        image: "/img/collection/3-1.jpg",
        icon: Scissors
    },
    {
        title: "Pattern Making",
        description: "Precision patterns crafted for each unique design",
        image: "/img/collection/5-2.jpg",
        icon: Ruler
    },
    {
        title: "Hand Embroidery",
        description: "Hours of meticulous handwork bring each piece to life",
        image: "/img/collection/5-3.jpg",
        icon: Needle
    }
]

const stats = [
    { icon: Clock, value: "200+", label: "Hours per Gown" },
    { icon: Users, value: "25+", label: "Artisans" },
    { icon: Heart, value: "500+", label: "Happy Brides" },
    { icon: Scissors, value: "15+", label: "Years Experience" }
]

export function BehindTheScenes() {
    return (
        <section id="behind-the-scenes" className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Behind the Scenes</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Discover the artistry and dedication that goes into creating every Prika masterpiece
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center p-6 bg-card rounded-2xl border shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <stat.icon className="h-6 w-6 text-primary" />
                            </div>
                            <p className="font-sans text-3xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Process Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {behindTheScenes.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-0">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Image */}
                                        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden" />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 p-6 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <item.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <h3 className="font-serif text-xl font-medium">{item.title}</h3>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Video Feature */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl overflow-hidden bg-card border shadow-lg"
                >
                    <div className="aspect-video relative">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                        >
                            <source src="/img/prika.mp4" type="video/mp4" />
                        </video>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer shadow-xl"
                            >
                                <Play className="h-8 w-8 text-black ml-1" />
                            </motion.div>
                        </div>
                        
                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="font-serif text-xl md:text-2xl font-medium text-white mb-2">
                                The Art of Couture
                            </h3>
                            <p className="text-white/80 text-sm md:text-base max-w-2xl">
                                Watch our master artisans at work, transforming fine fabrics and delicate details into wearable art
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <blockquote className="max-w-3xl mx-auto">
                        <p className="font-serif text-2xl md:text-3xl font-light italic text-muted-foreground leading-relaxed">
                            "Every gown tells a story of dedication, artistry, and love. 
                            <span className="text-primary"> We don't just make dresses — we craft memories.</span>"
                        </p>
                        <footer className="mt-6">
                            <p className="font-medium">— Prika Design Team</p>
                        </footer>
                    </blockquote>
                </motion.div>
            </div>
        </section>
    )
}
