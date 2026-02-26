"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 -z-20">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src="/img/prika.mp4" type="video/mp4" />
                </video>
            </div>
 
            {/* Overlay */}
            <div className="absolute inset-0 -z-10" />

            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                        We Design Your <span className="text-white italic">Dreams</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl font-sans font-light">
                        Luxury bridal and evening couture. Handcrafted for your special moments.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" className="h-12 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200">
                        View Collection
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full border-white text-white hover:bg-white hover:text-black">
                        Book Appointment
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
