import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CollectionCard } from "@/components/sections/collection-card"
import { Gallery } from "@/components/sections/gallery"
import { collections } from "@/lib/collections"

export default function CollectionsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-24 md:py-28">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Prika Archive
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold">
              Signature Collections
            </h1>
            <p className="mx-auto max-w-[56ch] text-muted-foreground">
              Explore curated couture pieces across bridal and evening lines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                id={collection.id}
                title={collection.title}
                description={collection.description}
                category={collection.category}
                media={collection.media}
              />
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <Footer />
    </main>
  )
}
