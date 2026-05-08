"use client"

import { Instagram, MapPin, Phone, Mail } from "lucide-react"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function Footer() {
    const currentYear = new Date().getFullYear()
    const echoLogoRef = useRef<HTMLSpanElement>(null)
    const echoShimmerRef = useRef<HTMLSpanElement>(null)

    useGSAP(() => {
        if (!echoLogoRef.current || !echoShimmerRef.current) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        if (window.matchMedia("(max-width: 1023px)").matches) return

        const supportsMask =
            typeof window.CSS !== "undefined" &&
            (window.CSS.supports("mask-image", "linear-gradient(black, white)") ||
                window.CSS.supports("-webkit-mask-image", "linear-gradient(black, white)"))
        if (!supportsMask) return

        const logoEl = echoLogoRef.current
        const shimmerEl = echoShimmerRef.current

        const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 0.45 })
        masterTl
            .set(shimmerEl, { opacity: 0, "--shimmer-x": "-170%" })
            .to(
                shimmerEl,
                {
                    opacity: 0.98,
                    duration: 0.14,
                    ease: "power1.out",
                },
                0
            )
            .to(
                shimmerEl,
                {
                    "--shimmer-x": "170%",
                    duration: 1.02,
                    ease: "power2.inOut",
                },
                0
            )
            .to(
                shimmerEl,
                {
                    opacity: 0,
                    duration: 0.22,
                    ease: "power1.in",
                },
                0.82
            )
            .to(
                logoEl,
                {
                    filter: "drop-shadow(0 0 16px rgba(56, 189, 248, 0.82))",
                    duration: 0.5,
                    ease: "sine.inOut",
                },
                0.18
            )
            .to(
                logoEl,
                {
                    filter: "drop-shadow(0 0 7px rgba(56, 189, 248, 0.35))",
                    duration: 0.55,
                    ease: "sine.inOut",
                },
                0.74
            )

        return () => {
            masterTl.kill()
            gsap.set([logoEl, shimmerEl], { clearProps: "all" })
        }
    }, [])

    const quickLinks = [
        { href: "/", label: "Home" },
        { href: "/collections", label: "Collections" },
        { href: "/atelier", label: "Atelier" },
        { href: "/services", label: "Services" },
        { href: "/stories", label: "Stories" },
        { href: "/contact", label: "Contact" },
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
        <footer className="w-full border-t">
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex" aria-label="Prika Couture Home">
                            <Image
                                src="/prika-logo.png"
                                alt="Prika Couture logo"
                                width={220}
                                height={220}
                                className="h-20 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            &quot;We design your dreams.&quot; A luxury bridal and evening couture
                            house, crafting exquisite pieces for your most special moments.
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
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>Designed and Crafted by</span>
                            <a 
                                href="https://echo11.tech" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="relative inline-flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity"
                            >
                                <span
                                    ref={echoLogoRef}
                                    className="echo11-logo relative inline-flex h-[5.5rem] w-[5.5rem] items-center justify-center"
                                >
                                    <span className="relative inline-flex h-full w-full items-center justify-center">
                                        <Image
                                            src="/echo11-logo.svg"
                                            alt="Echo11 logo"
                                            width={88}
                                            height={88}
                                            className="h-[5.5rem] w-[5.5rem] pointer-events-none bg-transparent [filter:drop-shadow(0_0_8px_rgba(56,189,248,0.5))]"
                                        />
                                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                                            <span
                                                ref={echoShimmerRef}
                                                aria-hidden="true"
                                                className="inline-flex h-[5.5rem] w-[5.5rem] items-center justify-center opacity-0 [--shimmer-x:-170%]"
                                                style={{
                                                    WebkitMaskImage:
                                                        "linear-gradient(110deg, transparent 32%, rgba(0,0,0,0.96) 50%, transparent 68%)",
                                                    maskImage:
                                                        "linear-gradient(110deg, transparent 32%, rgba(0,0,0,0.96) 50%, transparent 68%)",
                                                    WebkitMaskSize: "38% 100%",
                                                    maskSize: "38% 100%",
                                                    WebkitMaskRepeat: "no-repeat",
                                                    maskRepeat: "no-repeat",
                                                    WebkitMaskPosition: "var(--shimmer-x) 50%",
                                                    maskPosition: "var(--shimmer-x) 50%",
                                                }}
                                            >
                                                <Image
                                                    src="/echo11-logo.svg"
                                                    alt=""
                                                    aria-hidden
                                                    width={88}
                                                    height={88}
                                                    className="h-[5.5rem] w-[5.5rem] pointer-events-none bg-transparent [filter:brightness(1.35)_drop-shadow(0_0_14px_rgba(56,189,248,0.85))]"
                                                />
                                            </span>
                                        </span>
                                    </span>
                                </span>
                                <span className="relative font-semibold tracking-wide">Echo11</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
