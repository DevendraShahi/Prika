"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, MapMarker, MarkerContent, MapControls } from "@/components/ui/map"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
    Phone, 
    Mail, 
    MapPin, 
    Clock, 
    Instagram,
    Send,
    Loader2,
    CheckCircle
} from "lucide-react"

const contactInfo = [
    {
        icon: Phone,
        label: "Phone",
        value: "+977-9817067299",
        href: "tel:+9779817067299"
    },
    {
        icon: Mail,
        label: "Email",
        value: "info@prikacouture.com",
        href: "mailto:info@prikacouture.com"
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Kathmandu, Nepal",
        href: null
    },
    {
        icon: Clock,
        label: "Hours",
        value: "Mon - Sat: 10AM - 7PM",
        href: null
    }
]

const socialLinks = [
    {
        icon: Instagram,
        label: "Instagram",
        href: "https://instagram.com/prikacouture",
        handle: "@prikacouture"
    }
]

export function Contact() {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        eventType: "",
        message: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({
            name: "",
            email: "",
            phone: "",
            eventDate: "",
            eventType: "",
            message: ""
        })

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section id="contact" className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Get In Touch</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Ready to begin your couture journey? Contact us for appointments and inquiries
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="border-0 shadow-xl bg-card">
                            <CardContent className="p-6 md:p-8">
                                <h3 className="font-serif text-2xl font-medium mb-6">Book an Appointment</h3>
                                
                                {isSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h4 className="font-serif text-xl font-medium">Thank You!</h4>
                                        <p className="text-muted-foreground max-w-sm">
                                            Your inquiry has been received. Our team will contact you within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Your name"
                                                    required
                                                    className="h-11 bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your@email.com"
                                                    required
                                                    className="h-11 bg-background"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+1 (555) 000-0000"
                                                    className="h-11 bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="eventDate">Event Date</Label>
                                                <Input
                                                    id="eventDate"
                                                    name="eventDate"
                                                    type="date"
                                                    value={formData.eventDate}
                                                    onChange={handleChange}
                                                    className="h-11 bg-background"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="eventType">Event Type</Label>
                                            <Input
                                                id="eventType"
                                                name="eventType"
                                                value={formData.eventType}
                                                onChange={handleChange}
                                                placeholder="Wedding, Gala, Engagement, etc."
                                                className="h-11 bg-background"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us about your dream dress..."
                                                required
                                                rows={4}
                                                className="resize-none bg-background"
                                            />
                                        </div>

                                        <Button 
                                            type="submit" 
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="w-full h-12 rounded-full"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Send Inquiry
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Info Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {contactInfo.map((info) => (
                                <Card key={info.label} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-card">
                                    <CardContent className="p-5">
                                        {info.href ? (
                                            <a href={info.href} className="flex items-start gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                                    <info.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                                                    <p className="font-medium mt-0.5 group-hover:text-primary transition-colors">{info.value}</p>
                                                </div>
                                            </a>
                                        ) : (
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <info.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                                                    <p className="font-medium mt-0.5">{info.value}</p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Social Links */}
                        <Card className="border-0 shadow-md bg-card">
                            <CardContent className="p-6">
                                <h4 className="font-serif text-lg font-medium mb-4">Follow Our Journey</h4>
                                <div className="space-y-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                                                <social.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium group-hover:text-primary transition-colors">{social.handle}</p>
                                                <p className="text-xs text-muted-foreground">{social.label}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map */}
                        <Card className="border-0 shadow-md overflow-hidden bg-card">
                            <div className="relative aspect-video bg-muted">
                                <Map
                                    center={[85.324, 27.7172]}
                                    zoom={12}
                                >
                                    <MapMarker longitude={85.324} latitude={27.7172}>
                                        <MarkerContent>
                                            <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                                        </MarkerContent>
                                    </MapMarker>
                                    <MapControls showZoom={false} />
                                </Map>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
