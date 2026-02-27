"use client"

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { 
    MessageCircle, 
    Palette, 
    Ruler, 
    Scissors, 
    Sparkles,
    Package,
    Heart,
    ArrowRight
} from "lucide-react"

const steps = [
    {
        step: 1,
        icon: MessageCircle,
        title: "Initial Consultation",
        description: "Begin with a personal consultation where we discuss your vision, preferences, and requirements. This can be in-person at our atelier or via video call for international clients.",
        duration: "1-2 hours"
    },
    {
        step: 2,
        icon: Palette,
        title: "Design & Selection",
        description: "Our designers create personalized sketches based on your input. Together, we select the perfect fabrics, embellishments, and silhouettes that match your vision.",
        duration: "1-2 weeks"
    },
    {
        step: 3,
        icon: Ruler,
        title: "Measurements",
        description: "Precise measurements are taken to ensure your gown fits perfectly. For remote clients, we provide detailed measurement guides and virtual fitting sessions.",
        duration: "1 day"
    },
    {
        step: 4,
        icon: Scissors,
        title: "Crafting Your Dream",
        description: "Our master artisans begin bringing your gown to life. Every stitch, every detail is meticulously crafted by hand with the finest materials.",
        duration: "6-12 weeks"
    },
    {
        step: 5,
        icon: Sparkles,
        title: "Fitting Sessions",
        description: "Multiple fittings ensure your gown fits like a dream. We make any necessary adjustments to achieve the perfect silhouette and comfort.",
        duration: "2-3 sessions"
    },
    {
        step: 6,
        icon: Package,
        title: "Delivery",
        description: "Your finished gown is carefully packaged and delivered. For local clients, we offer in-person pickup with final steaming. International clients receive secure worldwide shipping.",
        duration: "1-5 days"
    }
]

export function Process() {
    return (
        <section id="process" className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">The Journey to Your Dream Dress</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        From the first consultation to the final fitting, every step is crafted to bring your vision to life
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Desktop Timeline Line */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

                    {/* Steps */}
                    <div className="space-y-12 lg:space-y-0">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                }`}
                            >
                                {/* Content Card */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                    <div className={`
                                        bg-card border rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow
                                        ${index % 2 === 0 ? 'lg:ml-auto lg:mr-8' : 'lg:mr-auto lg:ml-8'}
                                        max-w-lg
                                    `}>
                                        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                {step.duration}
                                            </span>
                                            <Separator orientation="vertical" className="h-4" />
                                            <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                                Step {step.step}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-xl md:text-2xl font-medium mb-3">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-lg">
                                        <step.icon className="h-7 w-7 text-primary" />
                                    </div>
                                </div>

                                {/* Empty space for alignment */}
                                <div className="flex-1 hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-card border shadow-lg max-w-md">
                        <Heart className="h-8 w-8 text-rose-500 fill-rose-500 mb-4" />
                        <h4 className="font-serif text-xl font-medium mb-2">Ready to Begin?</h4>
                        <p className="text-muted-foreground text-sm mb-6">
                            Start your couture journey today with a personal consultation
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Book Your Consultation
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
