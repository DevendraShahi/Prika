import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Separator } from "@/components/ui/separator";
import { CollectionCard, CollectionMedia } from "@/components/home/collection-card";

interface Collection {
  id: string
  title: string
  media: CollectionMedia[]
}

const collections: Collection[] = [
  {
    id: '1',
    title: 'Eleanor Gown',
    media: [
      { type: 'image', src: '/img/collection/1.jpg' }
    ]
  },
  {
    id: '2',
    title: 'Seraphina Dress',
    media: [
      { type: 'image', src: '/img/collection/2.jpg' }
    ]
  },
  {
    id: '3',
    title: 'Royal Heritage',
    media: [
      { type: 'video', src: '/img/collection/3-v.mp4' },
      { type: 'image', src: '/img/collection/3.jpg' },
      { type: 'image', src: '/img/collection/3-1.jpg' },
      { type: 'image', src: '/img/collection/3-2.jpg' },
    ]
  },
  {
    id: '4',
    title: 'Ethereal Motion',
    media: [
      { type: 'video', src: '/img/collection/4-v.mp4' }
    ]
  },
  {
    id: '5',
    title: 'Vintage Glamour',
    media: [
      { type: 'image', src: '/img/collection/5.jpg' },
      { type: 'image', src: '/img/collection/5-1.jpg' },
      { type: 'image', src: '/img/collection/5-2.jpg' },
      { type: 'image', src: '/img/collection/5-3.jpg' },
    ]
  },
  {
    id: '6',
    title: 'Modern Chic',
    media: [
      { type: 'video', src: '/img/collection/6-v.mp4' },
      { type: 'image', src: '/img/collection/6.jpg' },
      { type: 'image', src: '/img/collection/6-1.jpg' },
    ]
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />

      <section id="collections" className="py-24 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold">Latest Collections</h2>
          <Separator className="w-24 bg-primary" />
          <p className="text-muted-foreground max-w-[600px]">
            Explore our latest tailored masterpieces, designed for elegance and grace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              title={collection.title}
              media={collection.media}
            />
          ))}
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Bespoke Design Service</h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            From sketch to reality, we create custom bridal and evening wear tailored to your exact measurements and dreams.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
