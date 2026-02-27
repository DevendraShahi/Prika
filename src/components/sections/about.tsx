"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Award, Heart, Scissors, Sparkles } from "lucide-react"

const values = [
    {
        icon: Scissors,
        title: "Masterful Craftsmanship",
        description: "Every piece is meticulously crafted by our skilled artisans with decades of experience."
    },
    {
        icon: Heart,
        title: "Personalized Service",
        description: "We work closely with each client to bring their unique vision to life."
    },
    {
        icon: Sparkles,
        title: "Premium Materials",
        description: "Only the finest fabrics and embellishments from around the world."
    },
    {
        icon: Award,
        title: "Timeless Elegance",
        description: "Designs that transcend trends and create lasting memories."
    }
]

export function About() {
    return (
        <section id="about" className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Our Story</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        A journey of passion, artistry, and dedication to creating extraordinary couture
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                            <Image
                                src="/img/collection/5.jpg"
                                alt="Prika Couture Atelier"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative Frame */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-2xl -z-10" />
                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="absolute -bottom-4 -left-4 bg-background shadow-xl rounded-2xl p-4 md:p-6"
                        >
                            <p className="font-sans text-3xl md:text-4xl font-bold text-primary">10+</p>
                            <p className="text-sm text-muted-foreground font-sans">Years of Excellence</p>
                        </motion.div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h3 className="font-serif text-2xl md:text-3xl font-medium">
                            Where Dreams Become Reality
                        </h3>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Prika Couture was born from a vision to create a harmonious blend of classic 
                                elegance and contemporary design. Our atelier is a space where multiple forms 
                                of craft and embroideries come together to create extraordinary pieces.
                            </p>
                            <p>
                                Every gown we create tells a unique story. From the initial sketch to the 
                                final stitch, our dedicated team of artisans pours their heart and soul into 
                                bringing your dream dress to life. We believe that every woman deserves to 
                                feel extraordinary on her special day.
                            </p>
                            <p>
                                Our commitment to excellence has made us a trusted name in luxury bridal 
                                and evening couture, serving clients not just in Nepal, but across the globe 
                                with worldwide shipping.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <div className="text-center p-4 rounded-xl bg-card">
                                <p className="font-sans text-3xl md:text-4xl font-bold">500+</p>
                                <p className="text-sm text-muted-foreground font-sans">Happy Brides</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-card">
                                <p className="font-sans text-3xl md:text-4xl font-bold">50+</p>
                                <p className="text-sm text-muted-foreground font-sans">Countries Served</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-card">
                                <p className="font-sans text-3xl md:text-4xl font-bold">100%</p>
                                <p className="text-sm text-muted-foreground font-sans">Handcrafted</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Values Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
                >
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group p-6 rounded-2xl bg-card border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <value.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-serif text-lg font-medium mb-2">{value.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
