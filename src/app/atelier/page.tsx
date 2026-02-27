import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { About } from "@/components/sections/about"
import { Process } from "@/components/sections/process"
import { BehindScenes } from "@/components/sections/behind-scenes"

export default function AtelierPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <About />
      <Process />
      <BehindScenes />
      <Footer />
    </main>
  )
}
