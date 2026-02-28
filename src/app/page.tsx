import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { Testimonials } from "@/components/sections/testimonials"
import { SelectedWorkShowcase } from "@/components/home/selected-work-showcase"
import { collections } from "@/lib/collections"

export default function Home() {
  const journeyRoutes = [
    {
      href: "/collections",
      label: "Collections",
      title: "Signature Collections",
      description:
        "Browse curated bridal and evening couture lines with rich visuals and story-led pieces.",
    },
    {
      href: "/atelier",
      label: "Atelier",
      title: "Design Process",
      description:
        "Step into our atelier to see fittings, hand-finishing, and the craftsmanship behind every gown.",
    },
    {
      href: "/services",
      label: "Services",
      title: "Bespoke Services",
      description:
        "From custom sketching to alterations and global delivery, find the service flow that matches your event.",
    },
    {
      href: "/stories",
      label: "Stories",
      title: "Client Stories & Press",
      description:
        "Read verified testimonials, editorial mentions, and the moments that define the Prika experience.",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <SelectedWorkShowcase items={collections} />
      <About />
      <Services />
      <Testimonials />

      <section className="py-24 md:py-28 bg-muted/30 border-y">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Explore More
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">
              Continue Your Couture Journey
            </h2>
            <p className="mx-auto max-w-[62ch] text-muted-foreground">
              Move through every part of our house, from collection curation and
              atelier process to services, testimonials, and press highlights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journeyRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group rounded-2xl border bg-card p-8 md:p-10 shadow-lg hover:shadow-xl transition-all"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  {route.label}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl mt-3">
                  {route.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-[48ch]">
                  {route.description}
                </p>
                <span className="inline-flex items-center mt-6 text-sm font-medium text-primary">
                  Open {route.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-2xl border bg-card shadow-lg p-8 md:p-12 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-4">
              Personal Consultation
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Ready to Design Your Dress?
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-muted-foreground">
              Share your date, style direction, and vision. Our atelier team
              will guide you through a couture process tailored for your event.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center mt-8 rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Book Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
