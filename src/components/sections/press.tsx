"use client"

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

const pressFeatures = [
    {
        outlet: "Vogue",
        quote: "Prika Couture is redefining luxury bridal wear in South Asia with their exquisite craftsmanship and innovative designs.",
        date: "2024",
        featured: true
    },
    {
        outlet: "Harper's Bazaar",
        quote: "A destination for brides seeking unique, handcrafted gowns that blend tradition with modern elegance.",
        date: "2024",
        featured: true
    },
    {
        outlet: "Brides Magazine",
        quote: "One of the most promising couture houses to watch, Prika delivers personalized luxury at its finest.",
        date: "2023",
        featured: false
    },
    {
        outlet: "Elle",
        quote: "Their attention to detail and commitment to quality makes every gown a wearable work of art.",
        date: "2023",
        featured: false
    },
    {
        outlet: "Fashion Network",
        quote: "Prika's designs have caught the attention of the global fashion community for their unique cultural fusion.",
        date: "2024",
        featured: false
    },
    {
        outlet: "Wedding Style",
        quote: "For the bride who wants something truly extraordinary, Prika offers an unparalleled bespoke experience.",
        date: "2023",
        featured: false
    }
]

const awards = [
    { title: "Best Bridal Designer", year: "2024", org: "Nepal Fashion Awards" },
    { title: "Excellence in Craftsmanship", year: "2023", org: "South Asian Design Summit" },
    { title: "Emerging Designer of the Year", year: "2022", org: "Asia Fashion Week" },
]

export function Press() {
    return (
        <section id="press" className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">As Seen In</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Recognized by leading fashion publications and industry organizations
                    </p>
                </motion.div>

                {/* Featured Press */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {pressFeatures.filter(p => p.featured).map((feature, index) => (
                        <motion.div
                            key={feature.outlet}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="h-full border-0 shadow-lg bg-card hover:shadow-xl transition-shadow">
                                <CardContent className="p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-serif text-2xl font-bold">{feature.outlet}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.date}</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <Quote className="h-8 w-8 text-primary/20 mb-3" />
                                    <p className="text-muted-foreground italic leading-relaxed">
                                        &quot;{feature.quote}&quot;
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Other Press Mentions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {pressFeatures.filter(p => !p.featured).map((feature, index) => (
                        <motion.div
                            key={feature.outlet}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                        >
                            <Card className="h-full hover:shadow-md transition-shadow bg-card">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-serif text-lg font-medium">{feature.outlet}</h4>
                                        <span className="text-xs text-muted-foreground">{feature.date}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        &quot;{feature.quote}&quot;
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Awards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h3 className="font-serif text-2xl font-medium mb-8">Awards & Recognition</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {awards.map((award, index) => (
                            <motion.div
                                key={award.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="flex items-center gap-4 px-6 py-4 bg-card rounded-xl border shadow-sm"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Star className="h-6 w-6 text-primary fill-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium">{award.title}</p>
                                    <p className="text-sm text-muted-foreground">{award.org} • {award.year}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
