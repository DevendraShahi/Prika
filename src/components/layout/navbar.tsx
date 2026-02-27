"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react"
import { motion, Variants } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { FontSwitcher } from "@/components/theme/font-switcher"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/collections", label: "Collections" },
        { href: "/atelier", label: "Atelier" },
        { href: "/services", label: "Services" },
        { href: "/stories", label: "Stories" },
        { href: "/contact", label: "Contact" },
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
                <nav className="hidden xl:flex items-center gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative group",
                                pathname === link.href
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            {link.label}
                            <span
                                className={cn(
                                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                )}
                            />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-1.5">
                    <div className="hidden lg:flex items-center gap-1">
                        <FontSwitcher />
                    </div>
                    <ModeToggle />

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="xl:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[86vw] max-w-[420px] p-0 border-l border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl"
                        >
                            <motion.div
                                className="flex flex-col h-full bg-background/90"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Header Section */}
                                <motion.div variants={itemVariants} className="relative px-6 pt-8 pb-6 bg-gradient-to-br from-primary/12 via-background to-background border-b border-border/60">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-primary" />
                                        <span className="font-serif text-3xl font-light tracking-wide">PRIKA</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">
                                        Luxury Bridal & Evening Couture House
                                    </p>
                                </motion.div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col px-4 py-4 space-y-1 overflow-y-auto">
                                    {navLinks.map((link, index) => (
                                        <motion.div key={link.href} variants={itemVariants}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "group relative flex items-center gap-3 py-3 px-4 rounded-lg text-[15px] font-medium transition-all duration-200",
                                                    pathname === link.href
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-foreground/90 hover:bg-primary/5 hover:text-primary"
                                                )}
                                            >
                                                <span className="text-[11px] tracking-widest text-muted-foreground/70">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <span className="relative z-10">{link.label}</span>
                                                <span
                                                    className={cn(
                                                        "absolute right-4 h-1.5 w-1.5 rounded-full bg-primary transition-opacity duration-200",
                                                        pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                                                    )}
                                                />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <Separator className="my-1" />

                                {/* Contact Info Section */}
                                <motion.div variants={itemVariants} className="px-6 py-5 space-y-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                                        Get In Touch
                                    </h4>
                                    <div className="space-y-3">
                                        <a href="tel:+9779817067299" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                            <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>+977-9817067299</span>
                                        </a>
                                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>info@prikacouture.com</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Kathmandu, Nepal</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <Separator />

                                {/* Footer Section */}
                                <motion.div variants={itemVariants} className="mt-auto px-6 py-6 bg-muted/20">
                                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                        &quot;We design your dreams&quot; - Exquisite bespoke tailoring crafted for modern elegance.
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
