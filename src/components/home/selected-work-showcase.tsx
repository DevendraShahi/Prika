"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Compass, Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { CollectionCard } from "@/components/sections/collection-card"
import { Button } from "@/components/ui/button"
import type { CollectionItem } from "@/lib/collections"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface SelectedWorkShowcaseProps {
  items: CollectionItem[]
  limit?: number
}

interface PanelController {
  center: () => number
  width: () => number
  setScale: (value: number) => void
  setOpacity: (value: number) => void
  setY: (value: number) => void
}

type ShowcasePanel =
  | { type: "intro" }
  | { type: "work"; item: CollectionItem }
  | { type: "outro" }

export function SelectedWorkShowcase({
  items,
  limit = 6,
}: SelectedWorkShowcaseProps) {
  const selectedItems = React.useMemo(() => items.slice(0, limit), [items, limit])
  const showcasePanels = React.useMemo<ShowcasePanel[]>(
    () => [
      { type: "intro" },
      ...selectedItems.map((item) => ({ type: "work" as const, item })),
      { type: "outro" },
    ],
    [selectedItems]
  )

  const containerRef = React.useRef<HTMLElement>(null)
  const stickyRef = React.useRef<HTMLDivElement>(null)
  const railRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const progressBarRef = React.useRef<HTMLDivElement>(null)
  const introScrollCueRef = React.useRef<HTMLDivElement>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const subtitleRef = React.useRef<HTMLParagraphElement>(null)
  const eyebrowRef = React.useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !stickyRef.current ||
        !railRef.current ||
        !trackRef.current ||
        !headingRef.current ||
        !subtitleRef.current ||
        !eyebrowRef.current
      ) {
        return
      }

      const container = containerRef.current
      const sticky = stickyRef.current
      const rail = railRef.current
      const track = trackRef.current
      const heading = headingRef.current
      const subtitle = subtitleRef.current
      const eyebrow = eyebrowRef.current
      const progressBar = progressBarRef.current
      const panels = gsap.utils.toArray<HTMLElement>(".sig-panel", track)

      if (!panels.length) {
        return
      }

      const originalHeadingText = heading.textContent ?? "SELECTED WORK"
      const splitHeading = () => {
        heading.innerHTML = originalHeadingText
          .split("")
          .map((char) =>
            char === " "
              ? `<span class="inline-block">&nbsp;</span>`
              : `<span class="char inline-block">${char}</span>`
          )
          .join("")

        return heading.querySelectorAll<HTMLElement>(".char")
      }

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const introCue = introScrollCueRef.current
        const cueIcon = introCue?.querySelector<HTMLElement>("[data-cue-icon]")
        const cueLine = introCue?.querySelector<HTMLElement>("[data-cue-line]")
        heading.textContent = originalHeadingText
        gsap.set([eyebrow, heading, subtitle], { autoAlpha: 1, clearProps: "all" })
        gsap.set(track, { x: 0, clearProps: "x,paddingLeft,paddingRight" })
        gsap.set(panels, {
          opacity: 1,
          scale: 1,
          y: 0,
          clearProps: "transformOrigin,willChange",
        })
        if (progressBar) {
          gsap.set(progressBar, { scaleX: 1, transformOrigin: "left center" })
        }
        if (introCue) {
          gsap.set(introCue, { clearProps: "opacity,x,willChange" })
        }
        if (cueIcon) {
          gsap.set(cueIcon, { clearProps: "x" })
        }
        if (cueLine) {
          gsap.set(cueLine, { clearProps: "opacity,scaleX,transformOrigin" })
        }
      })

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const chars = splitHeading()

        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        })

        entranceTl
          .from(eyebrow, {
            y: 16,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power3.out",
          })
          .from(
            chars,
            {
              y: 34,
              autoAlpha: 0,
              stagger: { amount: 0.4, ease: "power2.inOut" },
              duration: 0.5,
              ease: "power3.out",
            },
            "<0.08"
          )
          .from(
            subtitle,
            {
              y: 12,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "<0.15"
          )

        return () => {
          entranceTl.kill()
          heading.textContent = originalHeadingText
        }
      })

      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => {
        const introPanel = track.querySelector<HTMLElement>('[data-panel-kind="intro"]')
        const outroPanel = track.querySelector<HTMLElement>('[data-panel-kind="outro"]')
        const introCue = introScrollCueRef.current
        const cueIcon = introCue?.querySelector<HTMLElement>("[data-cue-icon]")
        const cueLine = introCue?.querySelector<HTMLElement>("[data-cue-line]")
        gsap.set(track, { x: 0, clearProps: "x,paddingLeft,paddingRight" })
        gsap.set(panels, {
          opacity: 1,
          scale: 1,
          y: 0,
          clearProps: "transformOrigin,willChange",
        })
        if (introPanel) {
          introPanel.style.width = ""
        }
        if (outroPanel) {
          outroPanel.style.width = ""
        }
        if (progressBar) {
          gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" })
        }
        if (introCue) {
          gsap.set(introCue, { clearProps: "opacity,x,willChange" })
        }
        if (cueIcon) {
          gsap.set(cueIcon, { clearProps: "x" })
        }
        if (cueLine) {
          gsap.set(cueLine, { clearProps: "opacity,scaleX,transformOrigin" })
        }
      })

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        let startOffset = 0
        let endOffset = 0
        let travelDistance = 0
        let panelControllers: PanelController[] = []
        const introPanel = track.querySelector<HTMLElement>('[data-panel-kind="intro"]')
        const outroPanel = track.querySelector<HTMLElement>('[data-panel-kind="outro"]')
        const introCue = introScrollCueRef.current
        const cueIcon = introCue?.querySelector<HTMLElement>("[data-cue-icon]")
        const cueLine = introCue?.querySelector<HTMLElement>("[data-cue-line]")
        const workPanels = panels.filter(
          (panel) => panel.dataset.panelKind === "work"
        )
        const firstFocusPanel = workPanels[0] ?? panels[0]
        const lastFocusPanel = workPanels[workPanels.length - 1] ?? panels[panels.length - 1]
        const setProgress = progressBar ? gsap.quickSetter(progressBar, "scaleX") : null
        const setStickyOpacity = gsap.quickSetter(sticky, "opacity")
        const setStickyY = gsap.quickSetter(sticky, "y", "px")
        const setCueOpacity = introCue
          ? (gsap.quickSetter(introCue, "opacity") as (value: number) => void)
          : null
        const setCueX = introCue
          ? (gsap.quickSetter(introCue, "x", "px") as (value: number) => void)
          : null

        const cueLoopTl =
          cueIcon || cueLine
            ? gsap.timeline({
                repeat: -1,
                yoyo: true,
                defaults: { ease: "sine.inOut", duration: 0.8 },
              })
            : null

        if (cueLoopTl && cueIcon) {
          cueLoopTl.to(cueIcon, { x: 9 }, 0)
        }
        if (cueLoopTl && cueLine) {
          cueLoopTl.to(cueLine, { scaleX: 1.16, opacity: 0.7 }, 0)
        }

        const applyIntroCue = (progress: number) => {
          if (!setCueOpacity || !setCueX) {
            return
          }
          const cueBlend = gsap.utils.clamp(0, 1, progress / 0.24)
          setCueOpacity(1 - cueBlend)
          setCueX(-14 + cueBlend * 26)
        }

        const setEdgeCardWidths = () => {
          if (!firstFocusPanel || !lastFocusPanel) {
            return
          }

          const minEdgeWidth = 320
          const railRect = rail.getBoundingClientRect()
          const edgeMargin = 24
          const railCenter = rail.clientWidth / 2

          if (introPanel) {
            const introRect = introPanel.getBoundingClientRect()
            const firstRect = firstFocusPanel.getBoundingClientRect()
            const introLeft = introRect.left - railRect.left
            const firstCenter = firstRect.left - railRect.left + firstRect.width / 2
            const spanToCenter = firstCenter - introLeft
            const introDelta = railCenter - edgeMargin - spanToCenter
            introPanel.style.width = `${Math.max(
              minEdgeWidth,
              introRect.width + introDelta
            )}px`
          }

          if (outroPanel) {
            const lastRect = lastFocusPanel.getBoundingClientRect()
            const outroRect = outroPanel.getBoundingClientRect()
            const lastCenter = lastRect.left - railRect.left + lastRect.width / 2
            const outroRight = outroRect.right - railRect.left
            const spanToRight = outroRight - lastCenter
            const outroDelta = railCenter - edgeMargin - spanToRight
            outroPanel.style.width = `${Math.max(
              minEdgeWidth,
              outroRect.width + outroDelta
            )}px`
          }
        }

        const measurePanels = () => {
          panelControllers = panels.map((panel) => ({
            center: () => panel.offsetLeft + panel.offsetWidth / 2,
            width: () => panel.offsetWidth,
            setScale: gsap.quickSetter(panel, "scale") as (value: number) => void,
            setOpacity: gsap.quickSetter(panel, "opacity") as (value: number) => void,
            setY: gsap.quickSetter(panel, "y", "px") as (value: number) => void,
          }))
        }

        const refreshLayout = () => {
          gsap.set(track, { x: 0 })
          track.style.paddingLeft = "0px"
          track.style.paddingRight = "0px"
          setEdgeCardWidths()

          if (!firstFocusPanel || !lastFocusPanel) {
            startOffset = 0
            endOffset = 0
            travelDistance = 0
            measurePanels()
            return
          }

          const railRect = rail.getBoundingClientRect()
          const railCenter = rail.clientWidth / 2
          const edgeMargin = 24
          const introLeft = introPanel
            ? introPanel.getBoundingClientRect().left - railRect.left
            : firstFocusPanel.getBoundingClientRect().left - railRect.left
          const lastRect = lastFocusPanel.getBoundingClientRect()
          const lastCenter = lastRect.left - railRect.left + lastRect.width / 2

          const xStart = edgeMargin - introLeft
          const desiredXEnd = railCenter - lastCenter
          const rightBound = rail.clientWidth - edgeMargin - track.scrollWidth
          const xEnd = Math.max(desiredXEnd, rightBound)

          startOffset = -xStart
          endOffset = -xEnd
          travelDistance = Math.max(0, endOffset - startOffset)

          measurePanels()
          gsap.set(track, { x: xStart })
        }

        const applyFocus = (progress: number) => {
          const viewportCenter =
            rail.clientWidth / 2 + startOffset + travelDistance * progress

          panelControllers.forEach((panel) => {
            const distance = Math.abs(panel.center() - viewportCenter)
            const focusRadius = panel.width() * 0.9
            const proximity = gsap.utils.clamp(0, 1, 1 - distance / focusRadius)

            panel.setScale(0.88 + proximity * 0.12)
            panel.setOpacity(0.38 + proximity * 0.62)
            panel.setY((1 - proximity) * 16)
          })
        }

        refreshLayout()
        gsap.set(panels, {
          transformOrigin: "center center",
          willChange: "transform, opacity",
        })
        if (introCue) {
          gsap.set(introCue, { opacity: 1, x: -14, willChange: "transform,opacity" })
        }
        if (cueLine) {
          gsap.set(cueLine, { transformOrigin: "left center" })
        }
        applyFocus(0)
        applyIntroCue(0)
        if (setProgress) {
          setProgress(0)
        }
        setStickyOpacity(1)
        setStickyY(0)

        const horizontalTween = gsap.to(track, {
          x: () => -(startOffset + travelDistance),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${Math.max(travelDistance, 1)}`,
            pin: container,
            pinSpacing: true,
            scrub: 0.7,
            fastScrollEnd: true,
            anticipatePin: 1.2,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              refreshLayout()
            },
            onRefresh: (self) => {
              applyFocus(self.progress)
              applyIntroCue(self.progress)
              setStickyOpacity(1)
              setStickyY(0)
            },
            onUpdate: (self) => {
              applyFocus(self.progress)
              applyIntroCue(self.progress)
              if (setProgress) {
                setProgress(self.progress)
              }
              const releaseBlend = gsap.utils.clamp(0, 1, (self.progress - 0.88) / 0.12)
              setStickyOpacity(1 - releaseBlend * 0.04)
              setStickyY(-releaseBlend * 10)
            },
            onLeave: () => {
              gsap.set(track, { x: -(startOffset + travelDistance) })
              applyFocus(1)
              applyIntroCue(1)
              if (setProgress) {
                setProgress(1)
              }
              setStickyOpacity(0.96)
              setStickyY(-10)
            },
            onEnterBack: () => {
              applyIntroCue(1)
              setStickyOpacity(1)
              setStickyY(0)
            },
            onLeaveBack: () => {
              gsap.set(track, { x: -startOffset })
              applyFocus(0)
              applyIntroCue(0)
              if (setProgress) {
                setProgress(0)
              }
              setStickyOpacity(1)
              setStickyY(0)
            },
          },
        })

        return () => {
          cueLoopTl?.kill()
          horizontalTween.kill()
          track.style.paddingLeft = ""
          track.style.paddingRight = ""
          if (introPanel) {
            introPanel.style.width = ""
          }
          if (outroPanel) {
            outroPanel.style.width = ""
          }
          gsap.set(track, { clearProps: "x" })
          gsap.set(panels, {
            clearProps: "opacity,scale,y,transformOrigin,willChange",
          })
          gsap.set(sticky, { clearProps: "opacity,y" })
          if (introCue) {
            gsap.set(introCue, { clearProps: "opacity,x,willChange" })
          }
          if (cueIcon) {
            gsap.set(cueIcon, { clearProps: "x" })
          }
          if (cueLine) {
            gsap.set(cueLine, { clearProps: "opacity,scaleX,transformOrigin" })
          }
          if (setProgress) {
            setProgress(0)
          }
        }
      })

      return () => {
        mm.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="signature-edit" className="relative">
      <div
        ref={stickyRef}
        className="w-full flex flex-col overflow-hidden border-y border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:h-screen"
      >
        <div className="shrink-0 pt-10 md:pt-12 pb-6 px-6 md:px-10 lg:px-12 text-center">
          <p
            ref={eyebrowRef}
            className="text-xs uppercase tracking-[0.32em] text-primary mb-3"
          >
            Signature Edit
          </p>
          <h2
            ref={headingRef}
            className="font-serif text-4xl md:text-6xl font-light leading-tight mb-4 overflow-hidden"
            aria-label="Selected Work"
          >
            SELECTED WORK
          </h2>
          <p
            ref={subtitleRef}
            className="mx-auto max-w-[52ch] text-sm md:text-base text-muted-foreground leading-relaxed"
          >
            Scroll down to move through our work. Each piece takes focus as the
            rail progresses horizontally.
          </p>
        </div>

        <div className="hidden lg:block shrink-0 h-[2px] w-full bg-border/30 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-primary origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div
          ref={railRef}
          className="flex-1 flex items-stretch overflow-x-auto lg:overflow-visible px-4 sm:px-6 lg:px-0 pt-3 pb-6 lg:pb-4"
        >
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 lg:gap-8 will-change-transform snap-x snap-mandatory lg:snap-none"
          >
            {showcasePanels.map((panel, index) => (
              <div
                key={
                  panel.type === "intro"
                    ? "intro-launch-card"
                    : panel.type === "outro"
                      ? "outro-close-card"
                      : panel.item.id
                }
                className={[
                  "sig-panel shrink-0 snap-center lg:snap-none",
                  panel.type === "work"
                    ? "w-[78vw] max-w-[20rem] sm:w-[64vw] md:w-[52vw] lg:w-[clamp(19.5rem,24vw,23rem)] xl:w-[clamp(20rem,24vw,24rem)]"
                    : "w-[92vw] max-w-none sm:w-[88vw] md:w-[82vw] lg:w-auto",
                ].join(" ")}
                data-panel-kind={panel.type}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-muted-foreground tabular-nums font-mono">
                    {String(index).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border/60" />
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {panel.type === "intro"
                      ? "Start Here"
                      : panel.type === "outro"
                        ? "Finale"
                        : panel.item.category}
                  </span>
                </div>

                {panel.type === "intro" ? (
                  <IntroExperienceCard
                    totalLooks={selectedItems.length}
                    scrollCueRef={introScrollCueRef}
                  />
                ) : panel.type === "outro" ? (
                  <FinaleExperienceCard />
                ) : (
                  <CollectionCard
                    id={panel.item.id}
                    title={panel.item.title}
                    description={panel.item.description}
                    category={panel.item.category}
                    media={panel.item.media}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 pb-8 lg:pb-9 pt-2 lg:pt-4 text-center">
          <Button asChild size="lg" className="rounded-full px-8 group">
            <Link href="/collections">
              Explore All Collections
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function IntroExperienceCard({
  totalLooks,
  scrollCueRef,
}: {
  totalLooks: number
  scrollCueRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="w-full">
      <div className="relative mx-auto w-full lg:max-w-[31rem]">
        <div
          ref={scrollCueRef}
          aria-hidden="true"
          className="intro-scroll-cue pointer-events-none hidden lg:flex absolute top-1/2 -left-28 -translate-y-1/2 items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
            Scroll
          </span>
          <span
            data-cue-line
            className="h-px w-14 bg-primary/55 origin-left"
          />
          <ArrowRight
            data-cue-icon
            className="h-4 w-4 text-primary/90"
          />
        </div>

        <article className="group relative isolate overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 via-background to-background p-6 sm:p-7 lg:p-8 shadow-[0_18px_50px_-30px_hsl(var(--primary)/0.55)] min-h-[27rem] md:min-h-[30rem] lg:min-h-[32rem] transition-[transform,box-shadow,border-color,background] duration-500 ease-out hover:-translate-y-1 hover:border-primary/50 hover:from-primary/26 hover:shadow-[0_30px_80px_-44px_hsl(var(--primary)/0.8),0_0_0_1px_hsl(var(--primary)/0.28),0_0_56px_-14px_hsl(var(--primary)/0.62)]">
          <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute -top-24 left-1/2 h-56 w-[150%] -translate-x-1/2 rounded-full bg-primary/40 blur-3xl animate-[pulse_2.6s_ease-in-out_infinite]" />
            <div className="absolute -bottom-28 left-1/2 h-52 w-[135%] -translate-x-1/2 rounded-full bg-primary/26 blur-3xl animate-[pulse_3.2s_ease-in-out_infinite]" />
          </div>
          <div className="pointer-events-none absolute inset-0 z-0 rounded-xl ring-1 ring-primary/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute -top-20 -right-16 z-0 h-44 w-44 rounded-full bg-primary/18 blur-3xl transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary/24 group-hover:animate-[pulse_3.2s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -bottom-16 -left-14 z-0 h-40 w-40 rounded-full bg-primary/12 blur-3xl transition-all duration-500 group-hover:translate-y-1 group-hover:-translate-x-1 group-hover:bg-primary/18 group-hover:animate-[pulse_3.6s_ease-in-out_infinite]" />

          <div className="relative z-10 flex h-full flex-col">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/35 bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-primary transition-colors duration-300 group-hover:border-primary/55 group-hover:bg-background/90">
              <Sparkles className="h-3.5 w-3.5" />
              Signature Start
            </p>

            <h3 className="mt-5 font-serif text-2xl md:text-[1.8rem] leading-tight transition-colors duration-300 group-hover:text-primary">
              Discover Every Detail Before You Dive In
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-[34ch]">
              Begin with this guided panel, then flow through selected creations or
              jump straight to the full collection for a deeper experience.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/65 bg-background/75 p-3 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-background/90">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Featured Looks
                </p>
                <p className="mt-1 text-lg font-medium tabular-nums text-foreground">
                  {String(totalLooks).padStart(2, "0")}
                </p>
              </div>
              <div className="rounded-lg border border-border/65 bg-background/75 p-3 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-background/90">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Motion + Stills
                </p>
                <p className="mt-1 text-lg font-medium text-foreground">Curated</p>
              </div>
            </div>

            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <Button asChild size="sm" className="group rounded-full px-5">
                <Link href="/collections">
                  Explore All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full px-5">
                <Link href="/atelier">Visit Atelier</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

function FinaleExperienceCard() {
  return (
    <article className="group relative isolate overflow-hidden rounded-xl border border-border/80 bg-gradient-to-br from-background via-background to-primary/10 p-6 sm:p-7 lg:p-8 shadow-[0_18px_44px_-34px_hsl(var(--foreground)/0.42)] min-h-[27rem] md:min-h-[30rem] lg:min-h-[32rem] transition-[transform,box-shadow,border-color,background] duration-500 ease-out hover:-translate-y-1 hover:border-primary/35 hover:to-primary/18 hover:shadow-[0_28px_70px_-42px_hsl(var(--foreground)/0.62),0_0_0_1px_hsl(var(--primary)/0.2),0_0_48px_-16px_hsl(var(--primary)/0.45)]">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-24 left-1/2 h-52 w-[145%] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-[pulse_2.9s_ease-in-out_infinite]" />
        <div className="absolute -bottom-28 left-1/2 h-[12.5rem] w-[128%] -translate-x-1/2 rounded-full bg-foreground/14 blur-3xl animate-[pulse_3.4s_ease-in-out_infinite]" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 rounded-xl ring-1 ring-primary/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -top-16 -left-16 z-0 h-40 w-40 rounded-full bg-primary/14 blur-3xl transition-all duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:bg-primary/20 group-hover:animate-[pulse_3.2s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 z-0 h-52 w-52 rounded-full bg-foreground/10 blur-3xl transition-all duration-500 group-hover:translate-y-1 group-hover:translate-x-1 group-hover:bg-foreground/14 group-hover:animate-[pulse_3.8s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border/80 bg-background/75 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-background/90">
          <Compass className="h-3.5 w-3.5 text-primary" />
          Your Next Step
        </p>

        <h3 className="mt-5 font-serif text-2xl md:text-[1.8rem] leading-tight transition-colors duration-300 group-hover:text-primary">
          End Of Showcase, Start Of Your Story
        </h3>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-[34ch]">
          You&apos;ve seen the signature pieces. Move forward with a private
          consultation or explore every collection in one place.
        </p>

        <div className="mt-6 rounded-lg border border-border/70 bg-background/80 p-4 transition-colors duration-300 group-hover:border-primary/25 group-hover:bg-background/90">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Crafted Experience
          </p>
          <p className="mt-2 text-sm text-foreground">
            Personal fittings, editorial styling, and couture-level execution.
          </p>
        </div>

        <div className="mt-auto pt-8 flex flex-wrap gap-3">
          <Button asChild size="sm" className="group rounded-full px-5">
            <Link href="/contact">
              Book Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="rounded-full px-5">
            <Link href="/collections">See Every Collection</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
