# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-02-27
### Added
- Added new route pages: `atelier`, `collections`, `services`, `stories`, and `contact`.
- Added a GSAP-powered `SelectedWorkShowcase` with horizontal scroll progression and panel focus effects.
- Added new reusable section components for hero, gallery, process, services, testimonials, press, FAQ, and contact experiences.
- Added shared collections data in `src/lib/collections.ts` to centralize item metadata/media.
- Added custom `Accordion` and `Badge` UI primitives under `src/components/ui/`.
- Added GSAP packages: `gsap` and `@gsap/react`.

### Changed
- Refactored the home page to use section-driven architecture and route cards to deeper content pages.
- Improved site metadata (SEO and Open Graph fields) and wired root font variables in `layout.tsx`.
- Updated navbar and footer with richer navigation, contact details, and responsive menu behavior.
- Simplified theme switching to a direct light/dark toggle interaction.
- Improved font typing in `src/lib/fonts.ts` and excluded `v1-prika` from lint/type-check scope.
- Refreshed global styling and component visual system for the expanded page set.

## [0.1.0] - 2026-02-25
### Added
- Created initial UI layout components including Navbar and Footer.
- Added Home page components: Hero section and Collection cards.
- Integrated `next-themes` for Dark/Light mode support.
- Configured local and Google fonts in `src/lib/fonts.ts` and set up a Font Switcher component.
- Added base UI components using Radix UI (Button, Card, Carousel, Dialog, Dropdown Menu, Input, Label, Separator, Sheet, Textarea).
- Added collection images and video assets to `public/img/`.

### Changed
- Updated `src/app/globals.css` with new custom theme variables and extended styling.
- Configured `src/app/layout.tsx` to include theme and font providers, global navigation, and a footer.
