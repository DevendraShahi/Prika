import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Services } from "@/components/sections/services"
import { FAQ } from "@/components/sections/faq"

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Services />
      <FAQ />
      <Footer />
    </main>
  )
}
