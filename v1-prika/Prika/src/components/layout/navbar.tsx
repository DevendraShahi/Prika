"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react"
import { motion, Variants } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { FontSwitcher } from "@/components/theme/font-switcher"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#collections", label: "Collections" },
        { href: "#about", label: "About" },
        { href: "#process", label: "Process" },
        { href: "#services", label: "Services" },
        { href: "#behind-scenes", label: "Atelier" },
        { href: "#gallery", label: "Lookbook" },
        { href: "#testimonials", label: "Testimonials" },
        { href: "#press", label: "Press" },
        { href: "#faq", label: "FAQ" },
        { href: "#contact", label: "Contact" },
    ]

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { x: 20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    }

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
            scrolled 
                ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" 
                : "bg-transparent"
        }`}>
            <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-serif text-3xl md:text-4xl font-light tracking-tight">PRIKA</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden 2xl:flex items-center gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-1">
                        <FontSwitcher />
                        <ModeToggle />
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="2xl:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0 border-l-0">
                            <motion.div
                                className="flex flex-col h-full bg-background"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Header Section */}
                                <motion.div variants={itemVariants} className="relative px-6 pt-8 pb-6 bg-gradient-to-br from-primary/10 via-background to-background">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-primary" />
                                            <span className="font-serif text-3xl font-light tracking-wide">PRIKA</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FontSwitcher />
                                            <ModeToggle />
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">
                                        Luxury Bridal & Evening Couture
                                    </p>
                                </motion.div>

                                <Separator />

                                {/* Navigation Links */}
                                <nav className="flex flex-col px-6 py-4 space-y-1 overflow-y-auto">
                                    {navLinks.map((link) => (
                                        <motion.div key={link.href} variants={itemVariants}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="group relative py-2 px-4 -mx-4 rounded-md text-base font-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary block"
                                            >
                                                <span className="relative z-10">{link.label}</span>
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary transition-all duration-200 group-hover:h-full rounded-r-full" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <Separator />

                                {/* Contact Info Section */}
                                <motion.div variants={itemVariants} className="px-6 py-6 space-y-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                                        Get In Touch
                                    </h4>
                                    <div className="space-y-3">
                                        <a href="tel:+9779817067299" className="flex items-start gap-3 text-sm hover:text-primary transition-colors">
                                            <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">+977-9817067299</span>
                                        </a>
                                        <div className="flex items-start gap-3 text-sm">
                                            <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">info@prikacouture.com</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm">
                                            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">Kathmandu, Nepal</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <Separator />

                                {/* Footer Section */}
                                <motion.div variants={itemVariants} className="mt-auto px-6 py-6 bg-muted/30">
                                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                        "We design your dreams" - Exquisite bespoke tailoring crafted for modern elegance.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <a
                                            href="https://instagram.com/prikacouture"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                        >
                                            <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                                        </a>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
