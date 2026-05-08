"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { CollectionCard, type CollectionMedia } from "@/components/sections/collection-card";
import { CollectionDetail, type CollectionDetailData } from "@/components/sections/collection-detail";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { BehindScenes } from "@/components/sections/behind-scenes";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Press } from "@/components/sections/press";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

// Collection data with detailed information for the modal
const collectionsData: CollectionDetailData[] = [
  {
    id: '1',
    title: 'Eleanor Gown',
    category: 'Bridal',
    description: 'A timeless masterpiece featuring intricate lacework and a dramatic train. The Eleanor Gown embodies classic romance with its fitted bodice, delicate beading, and flowing silk organza skirt. Perfect for the bride who dreams of a fairytale moment.',
    details: [
      'Fitted bodice with corset structure',
      'Hand-applied lace appliqués',
      'Cathedral length train',
      'Detachable veil included',
      'Fully lined with boning support'
    ],
    materials: ['French Lace', 'Silk Organza', 'Swarovski Crystals', 'Silk Satin'],
    availableColors: ['Ivory', 'White', 'Champagne', 'Blush'],
    media: [
      { type: 'image', src: '/img/collection/1.jpg' }
    ],
    featured: true
  },
  {
    id: '2',
    title: 'Seraphina Dress',
    category: 'Evening',
    description: 'Contemporary elegance meets traditional craftsmanship. This evening gown features hand-embroidered details and a flowing silhouette that moves beautifully with every step. The Seraphina is designed for the modern woman who appreciates artistry.',
    details: [
      'A-line silhouette',
      'Hand-embroidered bodice',
      'Floor-length with subtle train',
      'Back zipper with button closure',
      'Padded bust with built-in bra'
    ],
    materials: ['Crepe Back Satin', 'Seed Pearls', 'Gold Thread', 'Chiffon'],
    availableColors: ['Navy', 'Burgundy', 'Emerald', 'Black', 'Dusty Rose'],
    media: [
      { type: 'image', src: '/img/collection/2.jpg' }
    ]
  },
  {
    id: '3',
    title: 'Royal Heritage',
    category: 'Bridal',
    description: 'Inspired by royal traditions, this bridal ensemble combines rich fabrics with exquisite embellishments for a regal presence. The intricate handwork and luxurious materials create a gown fit for royalty.',
    details: [
      'Traditional silhouette with modern touch',
      'Heavily embellished bodice',
      'Layers of pure silk',
      'Intricate zardozi work',
      'Matching dupatta included'
    ],
    materials: ['Pure Silk', 'Zardozi', 'Kundan Stones', 'Real Gold Thread', 'Pearls'],
    availableColors: ['Red', 'Gold', 'Pink', 'Peach', 'Ivory'],
    media: [
      { type: 'video', src: '/img/collection/3-v.mp4' },
      { type: 'image', src: '/img/collection/3.jpg' },
      { type: 'image', src: '/img/collection/3-1.jpg' },
      { type: 'image', src: '/img/collection/3-2.jpg' },
    ],
    featured: true
  },
  {
    id: '4',
    title: 'Ethereal Motion',
    category: 'Evening',
    description: 'Capturing the essence of movement, this gown features lightweight fabrics that create a dreamy, ethereal effect. Perfect for garden parties, destination weddings, or any event where you want to feel like you\'re floating.',
    details: [
      'Flowing A-line cut',
      'Multiple layers of chiffon',
      'Delicate spaghetti straps',
      'Open back design',
      'Floor-sweeping hem'
    ],
    materials: ['Silk Chiffon', 'Tulle', 'Crystal Beads', 'Satin Ribbon'],
    availableColors: ['Lavender', 'Sage', 'Dusty Blue', 'Blush', 'Champagne'],
    media: [
      { type: 'video', src: '/img/collection/4-v.mp4' }
    ]
  },
  {
    id: '5',
    title: 'Vintage Glamour',
    category: 'Bridal',
    description: 'A nod to the golden age of Hollywood. This collection features art deco inspired details and luxurious fabrics. The Vintage Glamour gown is for the bride who loves old-world charm with a contemporary twist.',
    details: [
      '1930s inspired silhouette',
      'Art deco beading pattern',
      'Silk charmeuse fabric',
      'Low back with button details',
      'Detachable beaded belt'
    ],
    materials: ['Silk Charmeuse', 'Antique Lace', 'Glass Beads', 'Seed Pearls'],
    availableColors: ['Ivory', 'Antique White', 'Gold', 'Silver'],
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
    category: 'Bridal',
    description: 'For the contemporary bride who wants to make a statement. Clean lines meet dramatic details in this stunning collection. The Modern Chic gown features architectural elements while maintaining romantic softness.',
    details: [
      'Architectural bodice structure',
      'High-low hemline option',
      'Geometric beading accents',
      'Off-shoulder neckline',
      'Pockets in skirt'
    ],
    materials: ['Mikado Silk', 'Organza', 'Crystals', 'Structured Mesh'],
    availableColors: ['White', 'Ivory', 'Black & White', 'Blush'],
    media: [
      { type: 'video', src: '/img/collection/6-v.mp4' },
      { type: 'image', src: '/img/collection/6.jpg' },
      { type: 'image', src: '/img/collection/6-1.jpg' },
    ]
  }
]

// Simple collection data for the cards
interface Collection {
  id: string
  title: string
  description: string
  category: string
  media: CollectionMedia[]
}

const collections: Collection[] = collectionsData.map(c => ({
  id: c.id,
  title: c.title,
  description: c.description,
  category: c.category,
  media: c.media
}))

export default function Home() {
  const [selectedCollection, setSelectedCollection] = React.useState<CollectionDetailData | null>(null)
  const [detailOpen, setDetailOpen] = React.useState(false)

  const handleCollectionClick = (id: string) => {
    const collection = collectionsData.find(c => c.id === id)
    if (collection) {
      setSelectedCollection(collection)
      setDetailOpen(true)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Collections Section */}
      <section id="collections" className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Latest Collections</h2>
            <Separator className="w-24 h-0.5 bg-primary" />
            <p className="text-muted-foreground max-w-[600px] leading-relaxed">
              Explore our latest masterpieces, each one a testament to exceptional craftsmanship 
              and timeless elegance. Swipe through or click to view details.
            </p>
          </motion.div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => handleCollectionClick(collection.id)}
              >
                <CollectionCard
                  id={collection.id}
                  title={collection.title}
                  description={collection.description}
                  category={collection.category}
                  media={collection.media}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Process Section */}
      <Process />

      {/* Services Section */}
      <Services />

      {/* Behind the Scenes Section */}
      <BehindScenes />

      {/* Gallery / Lookbook Section */}
      <Gallery />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Press Section */}
      <Press />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Collection Detail Modal */}
      <CollectionDetail
        collection={selectedCollection}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </main>
  );
}
