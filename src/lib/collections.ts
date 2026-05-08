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
    title: "Fusion Peplum Palazzo Suit",
    category: "Indo-Western",
    description:
      "A contemporary peplum silhouette paired with flowing palazzo pants for a refined fusion statement.",
    media: [
      { type: "video", src: "/img/collection/1-v.mp4" },
      { type: "image", src: "/img/collection/1.jpg" },
      { type: "image", src: "/img/collection/1-1.jpg" },
      { type: "image", src: "/img/collection/1-2.jpg" },
    ],
  },
  {
    id: "2",
    title: "Imperial Reign Lehenga",
    category: "Lehenga",
    description:
      "A regal lehenga with ornate detailing, designed for grand entrances and ceremonial moments.",
    media: [
      { type: "video", src: "/img/collection/2-v.mp4" },
      { type: "image", src: "/img/collection/2.jpg" },
      { type: "image", src: "/img/collection/2-1.jpg" },
    ],
  },
  {
    id: "3",
    title: "Brocade Anarkali Gown",
    category: "Anarkali",
    description:
      "A brocade Anarkali gown shaped with graceful volume and heritage-inspired texture.",
    media: [
      { type: "video", src: "/img/collection/3-v.mp4" },
      { type: "image", src: "/img/collection/3.jpg" },
      { type: "image", src: "/img/collection/3-1.jpg" },
      { type: "image", src: "/img/collection/3-2.jpg" },
    ],
  },
  {
    id: "4",
    title: "Imperial Bauble",
    category: "Statement",
    description:
      "A statement couture piece with jewel-like presence and polished occasionwear drama.",
    media: [{ type: "video", src: "/img/collection/4-v.mp4" }],
  },
  {
    id: "5",
    title: "Bridesmaid Kurti (Kurta)",
    category: "Bridesmaid",
    description:
      "A bridesmaid kurti design with clean tailoring, festive detail, and easy celebratory movement.",
    media: [
      { type: "image", src: "/img/collection/5.jpg" },
      { type: "image", src: "/img/collection/5-1.jpg" },
      { type: "image", src: "/img/collection/5-2.jpg" },
      { type: "image", src: "/img/collection/5-3.jpg" },
    ],
  },
  {
    id: "6",
    title: "Amber Wave",
    category: "Occasionwear",
    description:
      "Warm amber tones and fluid styling come together in an occasion-ready wave of movement.",
    media: [
      { type: "video", src: "/img/collection/6-v.mp4" },
      { type: "image", src: "/img/collection/6.jpg" },
      { type: "image", src: "/img/collection/6-1.jpg" },
    ],
  },
  {
    id: "7",
    title: "Pearl Paradise",
    category: "Embellished",
    description:
      "Pearl-inspired embellishment and soft couture detailing create a luminous special-occasion look.",
    media: [
      { type: "video", src: "/img/collection/7-v.mp4" },
      { type: "image", src: "/img/collection/7.jpg" },
      { type: "image", src: "/img/collection/7-1.jpg" },
    ],
  },
  {
    id: "8",
    title: "Amber Wave",
    category: "Occasionwear",
    description:
      "A second Amber Wave edit focused on motion, shimmer, and sculpted drape through video-led styling.",
    media: [
      { type: "video", src: "/img/collection/8-v.mp4" },
      { type: "video", src: "/img/collection/8-v1.mp4" },
    ],
  },
  {
    id: "9",
    title: "Ruby Bloom",
    category: "Floral",
    description:
      "A ruby-toned bloom of festive couture, balancing floral romance with a polished statement finish.",
    media: [{ type: "image", src: "/img/collection/9.webp" }],
  },
]
