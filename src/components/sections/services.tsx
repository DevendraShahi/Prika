"use client"

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { 
    Scissors, 
    Palette, 
    Ruler, 
    Sparkles, 
    Users, 
    Globe,
    ArrowRight
} from "lucide-react"

const services = [
    {
        icon: Scissors,
        title: "Bespoke Bridal Gowns",
        description: "Custom-designed wedding dresses crafted to your exact specifications. From classic ball gowns to modern silhouettes, we bring your dream dress to life.",
        features: ["Custom Design", "Premium Fabrics", "Perfect Fit Guarantee"]
    },
    {
        icon: Sparkles,
        title: "Evening Couture",
        description: "Stunning evening gowns and formal wear for special occasions. Red carpet worthy designs that make you the center of attention.",
        features: ["Event Dresses", "Red Carpet Style", "Unique Designs"]
    },
    {
        icon: Palette,
        title: "Custom Design Service",
        description: "Bring your vision to reality with our custom design service. Our designers work with you to create one-of-a-kind pieces.",
        features: ["Personal Consultation", "Sketch Development", "Fabric Selection"]
    },
    {
        icon: Ruler,
        title: "Alterations & Restyling",
        description: "Expert alterations to ensure your dress fits perfectly. We also offer restyling services to give new life to heirloom pieces.",
        features: ["Perfect Fit", "Heirloom Restyling", "Emergency Repairs"]
    },
    {
        icon: Users,
        title: "Bridal Party Attire",
        description: "Coordinated looks for your entire bridal party. Bridesmaid dresses, mother of the bride, and flower girl outfits.",
        features: ["Group Coordination", "Matching Collections", "Size Range"]
    },
    {
        icon: Globe,
        title: "Worldwide Shipping",
        description: "We ship our creations worldwide with careful packaging and tracking. International consultations available via video call.",
        features: ["Global Delivery", "Video Consultations", "Secure Packaging"]
    }
]

export function Services() {
    return (
        <section id="services" className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Our Services</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        From concept to creation, we offer comprehensive couture services 
                        tailored to your needs
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="h-full border shadow-md hover:shadow-xl transition-all duration-300 group bg-card">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <service.icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="font-serif text-xl font-medium">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {service.features.map((feature) => (
                                            <span 
                                                key={feature}
                                                className="px-3 py-1 text-xs bg-muted rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border">
                        <div className="text-left">
                            <h4 className="font-serif text-xl font-medium mb-1">Ready to Start Your Journey?</h4>
                            <p className="text-sm text-muted-foreground">Book a consultation with our design team</p>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Book Now
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
