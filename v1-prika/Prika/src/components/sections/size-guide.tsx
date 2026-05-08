"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
    Ruler, 
    Info, 
    CheckCircle, 
    AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const bridalSizes = [
    { size: "XS", bust: "32-33", waist: "24-25", hips: "34-35", us: "0-2", uk: "4-6" },
    { size: "S", bust: "34-35", waist: "26-27", hips: "36-37", us: "4-6", uk: "8-10" },
    { size: "M", bust: "36-37", waist: "28-29", hips: "38-39", us: "8-10", uk: "12-14" },
    { size: "L", bust: "38-40", waist: "30-32", hips: "40-42", us: "12-14", uk: "16-18" },
    { size: "XL", bust: "41-43", waist: "33-35", hips: "43-45", us: "16-18", uk: "20-22" },
    { size: "XXL", bust: "44-46", waist: "36-38", hips: "46-48", us: "20-22", uk: "24-26" },
]

const measurementTips = [
    {
        title: "Bust Measurement",
        description: "Measure around the fullest part of your bust, keeping the tape measure straight across your back.",
        icon: "👗"
    },
    {
        title: "Waist Measurement",
        description: "Measure around the narrowest part of your natural waist, typically above your belly button.",
        icon: "📏"
    },
    {
        title: "Hip Measurement",
        description: "Measure around the fullest part of your hips, usually about 8 inches below your waist.",
        icon: "💃"
    },
    {
        title: "Hollow to Hem",
        description: "Measure from the hollow of your neck to the desired hemline for accurate length.",
        icon: "📐"
    }
]

const fitTips = [
    "All measurements should be taken while wearing the undergarments you plan to wear with your gown.",
    "Keep the measuring tape snug but not tight — you should be able to slip one finger underneath.",
    "If you're between sizes, we recommend choosing the larger size as it's easier to alter down.",
    "For the most accurate results, have someone else take your measurements.",
    "We recommend remeasuring closer to your final fitting date."
]

export function SizeGuide() {
    return (
        <section id="size-guide" className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Ruler className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Size Guide</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Find your perfect fit with our comprehensive measurement guide
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Size Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="font-serif text-xl">Bridal Size Chart</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    All measurements are in inches
                                </p>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-muted/50">
                                                <th className="px-4 py-3 text-left font-medium">Size</th>
                                                <th className="px-4 py-3 text-center font-medium">Bust</th>
                                                <th className="px-4 py-3 text-center font-medium">Waist</th>
                                                <th className="px-4 py-3 text-center font-medium">Hips</th>
                                                <th className="px-4 py-3 text-center font-medium">US</th>
                                                <th className="px-4 py-3 text-center font-medium">UK</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {bridalSizes.map((row, index) => (
                                                <tr 
                                                    key={row.size}
                                                    className={cn(
                                                        "transition-colors hover:bg-muted/30",
                                                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                                                    )}
                                                >
                                                    <td className="px-4 py-3 font-medium">{row.size}</td>
                                                    <td className="px-4 py-3 text-center text-muted-foreground">{row.bust}"</td>
                                                    <td className="px-4 py-3 text-center text-muted-foreground">{row.waist}"</td>
                                                    <td className="px-4 py-3 text-center text-muted-foreground">{row.hips}"</td>
                                                    <td className="px-4 py-3 text-center text-muted-foreground">{row.us}</td>
                                                    <td className="px-4 py-3 text-center text-muted-foreground">{row.uk}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Important Note */}
                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/50">
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-amber-800 dark:text-amber-200">Important Note</p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                        All our gowns are made-to-order. We recommend providing accurate measurements 
                                        during your consultation for the best fit. Our team will guide you through 
                                        the measurement process.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Measurement Guide */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="font-serif text-xl font-medium mb-4">How to Measure</h3>
                            <div className="grid gap-3">
                                {measurementTips.map((tip, index) => (
                                    <motion.div
                                        key={tip.title}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        className="p-4 bg-card border rounded-xl hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl">{tip.icon}</span>
                                            <div>
                                                <h4 className="font-medium mb-1">{tip.title}</h4>
                                                <p className="text-sm text-muted-foreground">{tip.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Fit Tips */}
                        <div>
                            <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Fit Tips
                            </h3>
                            <ul className="space-y-2">
                                {fitTips.map((tip, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        className="flex items-start gap-3 text-sm text-muted-foreground"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        {tip}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-muted-foreground mb-4">
                        Need help with measurements? Our team is here to assist you.
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                    >
                        Book a Fitting Consultation
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
