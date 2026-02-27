import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { SelectedWorkShowcase } from "@/components/home/selected-work-showcase"
import { collections } from "@/lib/collections"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <SelectedWorkShowcase items={collections} />

      <section className="py-24 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/atelier"
              className="group rounded-2xl border bg-card p-8 md:p-10 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Route
              </p>
              <h3 className="font-serif text-2xl md:text-3xl mt-3">
                Atelier & Process
              </h3>
              <p className="text-muted-foreground mt-3 max-w-[45ch]">
                Dive into design philosophy, fittings, and handcrafted execution
                in a focused narrative flow.
              </p>
              <span className="inline-flex items-center mt-6 text-sm font-medium text-primary">
                Open Atelier
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/stories"
              className="group rounded-2xl border bg-card p-8 md:p-10 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Route
              </p>
              <h3 className="font-serif text-2xl md:text-3xl mt-3">
                Client Stories & Press
              </h3>
              <p className="text-muted-foreground mt-3 max-w-[45ch]">
                Review testimonials, editorial mentions, and frequently asked
                questions in one focused place.
              </p>
              <span className="inline-flex items-center mt-6 text-sm font-medium text-primary">
                Open Stories
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
