import { Instagram, MapPin, Phone, Mail, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { href: "#collections", label: "Collections" },
        { href: "#about", label: "About Us" },
        { href: "#process", label: "Our Process" },
        { href: "#services", label: "Services" },
        { href: "#testimonials", label: "Testimonials" },
        { href: "#press", label: "Press" },
        { href: "#faq", label: "FAQ" },
        { href: "#contact", label: "Contact" },
    ]

    const services = [
        "Bridal Couture",
        "Evening Gowns",
        "Custom Designs",
        "Alterations",
        "Consultations",
        "Worldwide Shipping",
    ]

    return (
        <footer className="w-full border-t bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-3xl font-light tracking-tight">PRIKA</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            "We design your dreams." A luxury bridal and evening couture house, 
                            crafting exquisite pieces for your most special moments.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a
                                href="https://instagram.com/prikacouture"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                            >
                                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg font-medium">Quick Links</h4>
                        <nav className="flex flex-col space-y-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg font-medium">Our Services</h4>
                        <nav className="flex flex-col space-y-2">
                            {services.map((service) => (
                                <span key={service} className="text-sm text-muted-foreground">
                                    {service}
                                </span>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg font-medium">Contact Us</h4>
                        <div className="space-y-3">
                            <a href="tel:+9779817067299" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Phone className="h-4 w-4 text-primary" />
                                +977-9817067299
                            </a>
                            <a href="mailto:info@prikacouture.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-4 w-4 text-primary" />
                                info@prikacouture.com
                            </a>
                            <div className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                                Kathmandu, Nepal
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            © {currentYear} Prika Couture. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            Crafted with <Heart className="h-4 w-4 text-rose-500 fill-rose-500" /> in Nepal
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
