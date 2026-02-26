import { Instagram, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-bold">PRIKA</h3>
                        <p className="text-sm text-muted-foreground font-sans">
                            Luxury bridal and evening couture. <br />Worldwide shipping available.
                        </p>
                    </div>

                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <h4 className="font-medium text-lg">Contact</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <a href="tel:+9779817067299" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Phone className="h-4 w-4" />
                                +977-9817067299
                            </a>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Kathmandu, Nepal
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <h4 className="font-medium text-lg">Follow Us</h4>
                        <a
                            href="https://instagram.com/prikacouture"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Instagram className="h-5 w-5" />
                            @prikacouture
                        </a>
                    </div>
                </div>

                <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Prika Couture. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
