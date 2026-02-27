import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Testimonials } from "@/components/sections/testimonials"
import { Press } from "@/components/sections/press"

export default function StoriesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Testimonials />
      <Press />
      <Footer />
    </main>
  )
}
