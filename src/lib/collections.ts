import type { CollectionMedia } from "@/components/sections/collection-card"

export interface CollectionItem {
  id: string
  title: string
  description: string
  category: string
  media: CollectionMedia[]
}

export const collections: CollectionItem[] = [
  {
    id: "1",
    title: "Eleanor Gown",
    category: "Bridal",
    description:
      "A timeless masterpiece featuring intricate lacework and a dramatic train.",
    media: [{ type: "image", src: "/img/collection/1.jpg" }],
  },
  {
    id: "2",
    title: "Seraphina Dress",
    category: "Evening",
    description:
      "Contemporary elegance meets traditional craftsmanship with hand-embroidered detail.",
    media: [{ type: "image", src: "/img/collection/2.jpg" }],
  },
  {
    id: "3",
    title: "Royal Heritage",
    category: "Bridal",
    description:
      "Inspired by royal traditions with exquisite embellishments and rich fabrics.",
    media: [
      { type: "video", src: "/img/collection/3-v.mp4" },
      { type: "image", src: "/img/collection/3.jpg" },
      { type: "image", src: "/img/collection/3-1.jpg" },
      { type: "image", src: "/img/collection/3-2.jpg" },
    ],
  },
  {
    id: "4",
    title: "Ethereal Motion",
    category: "Evening",
    description:
      "A fluid silhouette with lightweight layers for a dreamy movement-focused look.",
    media: [{ type: "video", src: "/img/collection/4-v.mp4" }],
  },
  {
    id: "5",
    title: "Vintage Glamour",
    category: "Bridal",
    description:
      "A nod to old Hollywood with art deco inspiration and luxurious textures.",
    media: [
      { type: "image", src: "/img/collection/5.jpg" },
      { type: "image", src: "/img/collection/5-1.jpg" },
      { type: "image", src: "/img/collection/5-2.jpg" },
      { type: "image", src: "/img/collection/5-3.jpg" },
    ],
  },
  {
    id: "6",
    title: "Modern Chic",
    category: "Bridal",
    description:
      "Architectural structure meets romantic softness for the contemporary bride.",
    media: [
      { type: "video", src: "/img/collection/6-v.mp4" },
      { type: "image", src: "/img/collection/6.jpg" },
      { type: "image", src: "/img/collection/6-1.jpg" },
    ],
  },
]
