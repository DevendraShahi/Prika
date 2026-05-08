"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const faqs = [
    {
        category: "Orders & Customization",
        questions: [
            {
                q: "How far in advance should I order my bridal gown?",
                a: "We recommend ordering your bridal gown 6-9 months before your wedding date. This allows ample time for design consultations, multiple fittings, and any necessary adjustments. For rush orders, we offer expedited services for an additional fee."
            },
            {
                q: "Can I customize an existing design?",
                a: "Absolutely! All our designs can be customized to your preferences. You can modify necklines, sleeve styles, train lengths, and embellishments. During your consultation, we'll discuss all customization options available."
            },
            {
                q: "Do you offer plus-size options?",
                a: "Yes, we create beautiful gowns for all body types. Each piece is custom-made to your exact measurements, ensuring a perfect fit regardless of size. We believe every bride deserves to feel beautiful."
            }
        ]
    },
    {
        category: "International Clients",
        questions: [
            {
                q: "Do you ship internationally?",
                a: "Yes, we ship worldwide! Our gowns are carefully packaged in protective garment bags and shipped via trusted international carriers with full insurance and tracking. We've successfully delivered to over 50 countries."
            },
            {
                q: "How do virtual consultations work?",
                a: "Virtual consultations are conducted via video call at a time convenient for you. We'll discuss your vision, show you fabric samples (mailed in advance), and create digital sketches. Measurements are taken using our detailed guide with video support."
            },
            {
                q: "What if the dress doesn't fit perfectly?",
                a: "We provide comprehensive measurement guides and video support to ensure accuracy. If minor adjustments are needed, we offer alteration guides or can connect you with recommended local tailors in your area."
            }
        ]
    },
    {
        category: "Pricing & Payment",
        questions: [
            {
                q: "What is the price range for your gowns?",
                a: "Our custom bridal gowns start from $2,000 and can go up to $15,000+ depending on design complexity, fabrics, and embellishments. Evening gowns start from $800. During consultation, we provide detailed quotes based on your specific requirements."
            },
            {
                q: "What is the payment structure?",
                a: "We require a 50% deposit to begin production, with the remaining 50% due upon completion before shipping. We accept bank transfers, credit cards, and PayPal for international clients."
            },
            {
                q: "Do you offer payment plans?",
                a: "Yes, we offer flexible payment plans. You can split the cost into 3-4 installments over the production period. Our team will work with you to create a payment schedule that suits your needs."
            }
        ]
    },
    {
        category: "Appointments & Fittings",
        questions: [
            {
                q: "How do I book an appointment?",
                a: "You can book an appointment through our contact form, by calling +977-9817067299, or via email at info@prikacouture.com. We recommend booking at least 1-2 weeks in advance for in-person appointments."
            },
            {
                q: "How many fittings will I need?",
                a: "Typically, 2-3 fittings are required for a bridal gown: initial fitting, adjustments fitting, and final fitting. For destination clients, we can consolidate into fewer sessions with detailed virtual progress updates."
            },
            {
                q: "What should I bring to my fitting?",
                a: "Please bring the undergarments and shoes you plan to wear on your wedding day. If you have inspiration photos, fabric swatches, or family heirlooms to incorporate, bring those as well."
            }
        ]
    }
]

export function FAQ() {
    return (
        <section id="faq" className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-4 mb-16"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <HelpCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold">Frequently Asked Questions</h2>
                    <Separator className="w-24 h-0.5 bg-primary" />
                    <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                        Find answers to common questions about our services, ordering process, and more
                    </p>
                </motion.div>

                {/* FAQ Categories */}
                <div className="max-w-3xl mx-auto space-y-8">
                    {faqs.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                        >
                            <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
                                <span className="w-8 h-px bg-primary" />
                                {category.category}
                            </h3>
                            <Accordion type="single" collapsible className="space-y-2">
                                {category.questions.map((faq, faqIndex) => (
                                    <AccordionItem 
                                        key={faqIndex} 
                                        value={`${categoryIndex}-${faqIndex}`}
                                        className="bg-card border rounded-lg px-4 data-[state=open]:shadow-md transition-shadow"
                                    >
                                        <AccordionTrigger className="text-left hover:no-underline py-4">
                                            <span className="font-medium">{faq.q}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    ))}
                </div>

                {/* Still Have Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-muted/50 border max-w-md">
                        <MessageCircle className="h-8 w-8 text-primary mb-4" />
                        <h4 className="font-serif text-xl font-medium mb-2">Still Have Questions?</h4>
                        <p className="text-muted-foreground text-sm mb-6">
                            Our team is here to help with any questions you may have
                        </p>
                        <Button asChild>
                            <a href="#contact">Contact Us</a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
