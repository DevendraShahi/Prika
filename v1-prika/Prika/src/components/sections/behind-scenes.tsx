"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { 
    Scissors, 
    Ruler, 
    Palette,
    Sparkles,
    Play
} from "lucide-react"
import { Button } from "@/components/ui/button"

const behindTheScenes = [
    {
        icon: Palette,
        title: "Design Studio",
        description: "Where creativity meets precision. Our designers sketch each gown by hand, translating your dreams into detailed designs.",
        image: "/img/collection/5-1.jpg"
    },
    {
        icon: Ruler,
        title: "Fabric Selection",
        description: "Only the finest fabrics from around the world make it into our collection. Each material is carefully handpicked for quality and feel.",
        image: "/img/collection/5-2.jpg"
    },
    {
        icon: Scissors,
        title: "Precision Cutting",
        description: "Master pattern makers translate designs into precise templates, ensuring perfect fit and elegant draping for every body type.",
        image: "/img/collection/3-1.jpg"
    },
    {
        icon: Sparkles,
        title: "Hand Embellishment",
        description: "Hours of meticulous handwork go into every beading and embroidery detail, transforming fabric into wearable art.",
        image: "/img/collection/3-2.jpg"
    }
]

const stats = [
    { value: "100+", label: "Hours Per Gown" },
    { value: "15", label: "Artisan Experts" },
    { value: "3", label: "Quality Checks" },
    { value: "1", label: "Dream Dress" }
]

export function BehindScenes() {
    return (
        <section id="behind-scenes" className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Behind the Seams</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Discover the artistry and craftsmanship that goes into creating your dream gown
                    </p>
                </motion.div>

                {/* Process Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {behindTheScenes.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 bg-card group">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Image */}
                                    <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 sm:bg-gradient-to-l hidden sm:block" />
                                    </div>
                                    
                                    {/* Content */}
                                    <CardContent className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="font-serif text-xl font-medium mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-2xl bg-card border shadow-xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
                    <div className="relative p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h3 className="font-serif text-2xl md:text-3xl font-medium mb-2">
                                The Making of Your Dream Dress
                            </h3>
                            <p className="text-muted-foreground">
                                Every gown is a labor of love, crafted with precision and passion
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="text-center"
                                >
                                    <p className="font-sans text-4xl md:text-5xl font-bold text-primary mb-2">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Video Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16"
                >
                    <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden bg-card border shadow-lg aspect-video">
                        <Image
                            src="/img/collection/5.jpg"
                            alt="Behind the scenes video"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-20 h-20 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white dark:hover:bg-black/80 transition-colors"
                            >
                                <Play className="h-8 w-8 text-primary ml-1" />
                            </motion.div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                            <p className="font-serif text-lg">Watch: The Art of Couture</p>
                            <p className="text-sm text-white/80">A glimpse into our atelier</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
