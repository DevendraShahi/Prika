import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Contact } from "@/components/sections/contact"

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  )
}
