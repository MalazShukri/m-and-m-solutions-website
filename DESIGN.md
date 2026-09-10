---
name: M & M Solutions
description: A near-black backdrop lit by a slow-drifting blue/violet/teal aurora, threaded by one continuous three.js network canvas behind every section, with blue and violet as the two pillar accents.
colors:
  ink-950: "#05070a"
  ink-900: "#0a0e13"
  ink-850: "#0e1319"
  ink-800: "#131920"
  ink-700: "#1b232c"
  brand-light: "#5ac8fa"
  brand: "#3b82f6"
  brand-deep: "#1d4ed8"
  brand-dim: "#1e3a8a"
  violet-light: "#c4b5fd"
  violet: "#8b5cf6"
  violet-deep: "#6d28d9"
  violet-dim: "#4c1d95"
  whatsapp-green: "#4ade80"
  foreground: "hsl(210 20% 96%)"
  muted-console: "rgba(244, 246, 248, 0.62)"
  hairline-border: "rgba(255, 255, 255, 0.09)"
typography:
  display-en:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
  display-ar:
    fontFamily: "Cairo, ui-sans-serif, system-ui, sans-serif"
  label:
    fontFamily: "Space Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.6875rem"
    letterSpacing: "0.06em"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
rounded:
  sm: "calc(0.625rem - 4px)"
  md: "calc(0.625rem - 2px)"
  lg: "0.625rem"
  panel: "14px"
  pill: "999px"
spacing:
  chip: "44px"
  section-py: "6rem"
  panel-p: "1.5rem"
components:
  cta-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "#05170e"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  cta-primary-hover:
    backgroundColor: "#4dedA0"
  cta-ghost:
    backgroundColor: "rgba(255,255,255,0.02)"
    textColor: "#f4f6f8"
    rounded: "{rounded.lg}"
  cta-whatsapp:
    backgroundColor: "rgba(37,211,102,0.12)"
    textColor: "#4ade80"
    rounded: "{rounded.lg}"
  console-panel:
    backgroundColor: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))"
    rounded: "{rounded.panel}"
  chip:
    backgroundColor: "rgba(59,130,246,0.1)"
    textColor: "{colors.brand-light}"
    rounded: "{rounded.md}"
    size: "44px"
  badge-live:
    backgroundColor: "rgba(59,130,246,0.12)"
    textColor: "{colors.brand-light}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
---

# Design System: M & M Solutions

## Overview

**Creative North Star: "Websites & ERP, one blue identity"**

The site is a dark backdrop with a slow-drifting, blurred aurora of color (`.site-backdrop::before`, blue/violet/teal radial gradients on a 28s ease-in-out drift) sitting behind a single continuous three.js particle-network canvas (`network-canvas.tsx`), both fixed behind the entire page — not one per section — so scrolling never hits a flat black box; a vignette gradient (`.site-backdrop::after`) over both keeps text legible while the color and network stay visible throughout. Everything sits on that shared backdrop as a "console-panel": a hairline-bordered, barely-tinted glass slab, never a bright card on a light background. Two accent colors carry the site — brand blue (lifted from the logo mark) for the Websites/Apps pillar, and violet for the ERP pillar — rather than a multi-color pillar system; the one further sanctioned exception is WhatsApp's own green, reserved exclusively for WhatsApp contact actions (a recognizable third-party affordance, not a site accent).

The product pivoted away from AI/WhatsApp-Instagram-automation as a sellable pillar (Meta's developer platform isn't available in Syria yet), so the hero's centerpiece is a three.js `DeviceScene` — two floating, auto-rotating device panels (a browser/desktop mockup and a phone mockup, both wireframed in the brand blue) — dramatizing the two pillars actually sold: **Websites & Mobile Apps** and **ERP Systems**. The former `ChatConsole` hero component and `AISection` are kept in the codebase but unmounted (see Don't), ready to return once Meta's API is usable locally.

This is a code-led build with no separate comp; the shipped `app/globals.css`, `tailwind.config.ts`, and `device-scene.tsx`/`network-canvas.tsx` are the system of record, and this document was written from them.

**Key Characteristics:**
- One shared aurora + three.js network-canvas backdrop behind the whole page, not per-section decoration.
- Two pillar accents — brand blue (Websites/Apps) and violet (ERP) — plus WhatsApp's own green on WhatsApp-specific actions; no further colors.
- Mono-uppercase, tabular-numeral labels standing in for "system status" chrome throughout (badges); eyebrows/kickers are explicitly avoided — see Don't.
- One recurring signature list pattern (the "module list") replaces card grids for any feature/capability list.
- Full bilingual EN/AR with mirrored RTL layout as a first-class, non-degraded state, not a stub.

## Colors

The palette is a near-black ground lit by a blue/violet/teal aurora, with two accent families (blue, violet) carrying meaning; there is no light-mode variant and no secondary neutral family beyond the ink ramp.

### Primary
- **Brand Blue** (`#3b82f6`, light variant `#5ac8fa`, deep variant `#1d4ed8`): the Websites/Apps pillar accent, lifted from the logo mark, and the default/dominant accent everywhere outside the ERP module list. Used on `cta-primary` (as a `#3b82f6 → #1d4ed8` gradient, matching the logo's own gradient direction), the hero's highlighted headline word, the Web section's chip icons and `console-panel-glow`, most live-status badges, nav underline, focus rings, half of the network-canvas particles/lines, and (blended toward violet) the `DeviceScene` wireframe edges and screen-block colors. It carries all "this is alive/working" and "this is the brand" signaling site-wide.

### Secondary
- **Violet** (`#8b5cf6`, light variant `#c4b5fd`, deep variant `#6d28d9`): the ERP pillar accent — used only via `.chip-violet`, `.badge-live-violet`, and `.console-panel-glow-violet` on the ERP section's module list (chip icons, the "ERPNext" badge, panel hover glow) and the `text-violet-light` "WHAT'S INCLUDED" label. Also blended into the shared aurora backdrop and half the network-canvas particles, and into the `DeviceScene`'s screen-block gradient and rim light, so the two pillar colors read as one connected system rather than two unrelated palettes. Never used for the primary CTA, which stays brand blue site-wide regardless of section.

### Exception
- **WhatsApp Green** (`#4ade80` text, `rgba(37,211,102,…)` fills): reserved exclusively for `cta-whatsapp` — the nav, hero, contact, and mobile-menu buttons that open a WhatsApp chat. This is WhatsApp's own brand color signaling "this specific button leaves the site for WhatsApp," not a site accent; it must never appear on a non-WhatsApp control.

### Neutral
- **Void Ink** (`#05070a`): the page background (`site-backdrop`) and `.loading-splash`; sections themselves carry no background color and let the fixed backdrop show through.
- **Ink ramp** (`#0a0e13` → `#1b232c`, tokens `ink-900`…`ink-700`): scrollbar track/thumb and borders.
- **Foreground** (`hsl(210 20% 96%)`, ≈ `#f4f6f8`): primary text color on the dark ground.
- **Muted Console Text** (`rgba(244,246,248,0.62)`): secondary/body copy (`.text-muted-console`) — subtitles, descriptions, panel body text.
- **Hairline White** (`rgba(255,255,255,0.08–0.18)`): every panel border, divider, and nav underline; the system's only "structure" color, used at low opacity instead of a solid gray.

### Named Rules
**The One Backdrop Rule.** There is exactly one background surface on the page — the fixed `site-backdrop` (aurora gradient layer + three.js canvas) over void ink — shared by every section; sections carry no `background` of their own, and panels differentiate by hairline border and glow, never by a lighter surface tint or a re-asserted section background.

**The Two-Accent Rule.** Brand blue and violet are the only site accents, each tied to one pillar (Web/Apps = blue, ERP = violet) and never mixed within one component's interactive state; a new module reaches for brand blue by default, violet only if it is explicitly part of the ERP pillar, or (for a WhatsApp-specific action only) WhatsApp green — never a fourth color.

## Typography

**Display Font:** Space Grotesk (with ui-sans-serif, system-ui, sans-serif fallback) — English display and body type.
**Body Font:** Space Grotesk (English); Cairo (Arabic, with the same system fallback) swaps in wholesale on `html[dir="rtl"] body`.
**Label/Mono Font:** Space Mono (with ui-monospace, SFMono-Regular fallback) — status labels, section eyebrow-equivalents, timestamps.

**Character:** A confident geometric sans (Space Grotesk) carries headlines and body copy with a technical, non-corporate edge, deliberately not Inter; Space Mono supplies the "console readout" register for anything representing live system state (badges, timers, tech-stack names); Cairo takes over completely for Arabic rather than being force-fit into the Latin geometric face.

### Hierarchy
- **Display** (700, `text-4xl` → `text-[3.4rem]` clamped across breakpoints, leading-[1.08]): hero H1 only.
- **Headline** (700, `text-3xl md:text-4xl`, tight tracking via `.section-heading`): section H2s (About, AI, Web, ERP, Projects, Contact).
- **Title** (600, `text-base`–`text-lg`): panel/card headings inside sections (module titles, contact-panel headings).
- **Body** (400, `text-sm`–`text-lg`, leading-relaxed): descriptions and paragraph copy, `.text-muted-console` for secondary weight.
- **Label** (Space Mono, `0.6875rem`, `0.06em` tracking, uppercase): live-status badges, console-panel header eyebrows (e.g. "AUTOMATION STATUS"), timestamps (`tabular-nums`).

### Named Rules
**The No-Kicker Rule.** Section headings never use a separate small kicker/eyebrow line above the H2; `.section-heading` is a self-contained heading, and any "eyebrow"-style label that appears is the mono live-status badge, which is a system-state indicator, not decorative kicker copy.

**The Script Swap Rule.** Typeface family is a property of `dir`, not of theme choice: `html[dir="rtl"]` swaps the entire display/body stack to Cairo; nothing renders Latin-geometric type over Arabic text or vice versa.

## Layout

The page is a stack of full-width sections (`section-surface`, `py-24`, hairline `border-t border-white/6` between them) inside a centered `container` (Tailwind default, `2rem` padding, `1400px` cap at `2xl`). Content within each section is further capped at `max-w-4xl` (About, AI, Web, ERP) or `max-w-5xl` (Contact) and centered, keeping line lengths and panel widths controlled on wide viewports.

The hero breaks this single-column rhythm with a two-column split at `lg`: `grid-cols-[1.05fr_0.95fr]` (headline + pillar chips + CTAs on one side, the `DeviceScene` three.js visual on the other), collapsing to a single stacked column below `lg`. Feature/capability sections (Web, ERP) use a single console-panel with an internal divided layout rather than a page-level multi-column card grid — see Components → Console Module List.

Spacing rhythm: sections use `py-24`; panels use `p-4`–`p-8` depending on density; the 44px minimum tap target (`min-height/min-width: 44px` on buttons/links) is enforced globally for touch accessibility, with an `.inline-tap` escape hatch for inline text links.

## Elevation & Depth

The system is flat by default and uses hairline borders plus glow, not drop shadows, to express structure — the one deliberate exception is `cta-primary`, whose shadow is a colored glow (a highlight, not a floor-standing shadow) reinforcing that it's an "always-on" active control. Depth on hover is conveyed by a translateY lift (2–3px) plus a border-color and glow intensification keyed to the panel's assigned pillar color, not by a shadow growing.

### Shadow Vocabulary
- **CTA glow** (`0 10px 25px rgba(59,130,246,0.35)`, deepening on hover to `0 16px 36px -6px rgba(59,130,246,0.5)`): `cta-primary` at rest and hover — the only persistent shadow in the system.
- **Panel glow, brand blue** (`0 0 0 1px rgba(59,130,246,0.15), 0 20px 40px -20px rgba(59,130,246,0.3)`): `console-panel-glow` on hover, the one glow color used everywhere.
- **Mobile menu panel** (`0 20px 40px -12px rgba(0,0,0,0.5)`): the one plain (non-colored) shadow, used for the mobile nav overlay lifting above page content.

### Named Rules
**The Glow-Not-Shadow Rule.** Elevation communicates state (hover, active, "this is interactive"), never generic depth, and always in the one brand-blue glow; a colorless drop shadow is reserved for the single case of an overlay panel (mobile menu) sitting above other content.

## Shapes

Corners are consistently rounded but restrained: `14px` on console-panels, `10px` on chips, `8-10px` (`--radius` derived) on buttons and inputs, and full pill (`999px`) on status badges. Borders are always 1px hairlines at low white opacity (`rgba(255,255,255,0.08–0.18)`), never a solid saturated border color at rest — saturated borders appear only as the hover glow state in the pillar color. There is no clipping/mask geometry beyond the radial-gradient mask used to fade the background grid at the hero's edges.

## Components

### Buttons
- **Shape:** rounded-lg (~8-10px), 44px+ minimum height.
- **Primary (`cta-primary`):** brand-blue gradient fill (`#3b82f6 → #1d4ed8`, matching the logo's own gradient direction), white text, 600 weight, persistent blue glow shadow; hover deepens the gradient (`#2563eb → #1e40af`) and lifts 2px.
- **Ghost (`cta-ghost`):** transparent/near-transparent with a hairline white border; hover raises border opacity and background tint slightly, same 2px lift.
- **WhatsApp (`cta-whatsapp`):** its own variant, not a generic secondary — WhatsApp-green-tinted background/border/text (`rgba(37,211,102,...)`), used specifically and only for WhatsApp contact actions in the nav, hero, contact, and mobile menu.

### Chips
- **Style:** 44×44px square, 10px radius, hairline blue-tinted border, low-opacity brand-blue background; icon centered inside. One style, no color variants — `chip` alone carries brand blue everywhere it's used.
- **State:** chips are decorative/labeling, not interactive controls — no distinct pressed/selected state.

### Live/Status Badges
- **Style:** pill-shaped, mono-uppercase 11px text, brand-blue-tinted (`badge-live`), with a small pulsing dot (`badge-live-dot`, `pulse-dot` keyframe) signaling "live now." A `badge-live-violet` modifier (with its own `pulse-dot-violet` keyframe) swaps the same shape to the ERP pillar's violet.
- **Use:** the "Live"/"منفّذ" badge on shipped projects with a real URL (blue, in the Projects carousel's detail panel), and the ERP section's "ERPNext" status badge (violet). This is the system's one recurring way of asserting "this is real/running," reused verbatim across sections rather than restyled per-section — the color swap is the only per-pillar variation permitted.

### Cards / Containers (Console Panel)
- **Corner Style:** 14px radius (`.console-panel`).
- **Background:** near-transparent white gradient (`rgba(255,255,255,0.03)` → `0.015`) over the void-ink ground — never a distinct lighter surface color.
- **Shadow Strategy:** none at rest; pillar-colored glow on hover (see Elevation & Depth).
- **Border:** 1px hairline white at `0.09` opacity, brightening to `0.18` on hover.
- **Internal Padding:** `p-4`–`p-8` depending on density (hero pillar chips at `p-4`, section panels at `p-6`+).

### Console Module List (signature pattern)
The system's standard way of presenting a list of features/capabilities is **one console-panel per section, not a grid of small cards.** Structure: a header bar (mono-uppercase label on the left — e.g. "WHAT'S INCLUDED" — plus a `badge-live` on the right); below it, a list of rows separated by hairline `divide-y`, each row a `feature-row` (chip + title + one line of copy, `-mx-3 px-3` so its hover tint has breathing room) — never a repeated bordered sub-card. Rows reveal with a per-row stagger (`framer-motion`, `staggerChildren: 0.08`, each row sliding in from the trailing edge) rather than fading in as one block, so the list reads as a list. On hover a row tints its background and its chip scales/rotates slightly (`.feature-row:hover .chip`) — feedback on the row, not the whole panel. The Web section uses the default blue chip; the ERP section uses `chip-violet` and `console-panel-glow-violet` throughout, and its badge is `badge-live-violet`. This module-list pattern is the system's answer to "how do we show 4-8 features" and should be reused for any future feature/capability list instead of a same-size icon+heading+text card grid.

### Signature Component: Portfolio Coverflow
The Projects section (`components/ui/coverflow-carousel.tsx`, wired up in `projects.tsx`) is a drag/keyboard-driven 3D coverflow of real project screenshots — cards rotate and recede off-axis as they leave center, exactly like the hero's `DeviceScene`, this is hand-built (no carousel library), not `ui/carousel.tsx` (the unused embla-based primitive already in the repo). Selecting a card (drag, arrow keys, click, or the prev/next buttons) calls back into `projects.tsx` (`onSelect`), which renders a `console-panel` detail block below the carousel with the project's title, description, a `badge-live` when it has a real live/store link, and its actual link buttons (`cta-ghost`) — the carousel never fabricates a caption for functionality that needs a real action. The `1 / N` position readout is forced `dir="ltr"` since digit pairs reverse visually inside an RTL flow otherwise. Reuse this component for any future "browse many real screenshots" need instead of a static image grid; do not reuse it to fabricate visual interest for content that isn't real (see Don't).

### Inputs / Fields
- **Style:** translucent white fill (`bg-white/5`), hairline border (`border-white/12`), rounded, 44px minimum height, placeholder in muted-console tone.
- **Focus:** ring in brand blue (`focus-visible:ring-brand`), matching the global `:focus-visible` outline treatment.
- **Error:** message text in red (`text-red-400`), bold — a semantic warning color, deliberately not brand blue, so a validation error never reads as a brand accent.

### Navigation
- **Style:** fixed, translucent-blurred bar (`nav-console`, `backdrop-filter: blur(10px)`) over the ground, darkening slightly once scrolled (`.scrolled`); logo as image mark, text nav links with a blue underline that scales in from center on hover, persistent WhatsApp CTA button, language switcher always visible.
- **Mobile:** links move into a `mobile-menu-panel` (opaque near-black panel, 16px radius, the system's one plain shadow) with 44px-tall tap targets and the WhatsApp CTA repeated full-width at the bottom.

### Signature Component: Device Scene
The hero's centerpiece and the system's most distinctive component (`device-scene.tsx`): two floating three.js panels — a desktop/browser mockup and a phone mockup — each a wireframed dark box with brand-blue "screen block" planes standing in for UI content, auto-rotating slowly with a sine-wave bob and reacting to pointer position for parallax. Built from plain `BoxGeometry`/`PlaneGeometry` primitives (no external model), lit with ambient + two directional lights (one blue rim light), edges drawn via `EdgesGeometry` in brand blue. `prefers-reduced-motion` disables the animation loop and pointer listener, rendering one static frame. This, plus the page-wide `network-canvas.tsx` backdrop, is where the system's three.js ambition lives — not confined to the hero alone, since the network canvas persists behind every section.

### Dormant Component: Chat Console (not currently mounted)
`chat-console.tsx` and `ai-section.tsx` remain in the codebase, commented out of `app/page.tsx` and `hero.tsx`, because the AI/WhatsApp-Instagram-automation pillar isn't currently deliverable (Meta's developer platform isn't available in Syria). It was the previous hero centerpiece: three `ThreadCard`s cycling through named states (`idle → received → typing → sent → resolved`) via framer-motion springs. Its internal colors (green/pink/cyan per channel) were never migrated to the single-blue system since it isn't rendered — if it's ever re-mounted, restyle it to brand blue first.

## Do's and Don'ts

### Do:
- **Do** use brand blue for any new accent, glow, chip, or CTA — there is no second site color to choose between.
- **Do** use the console-panel + hairline-border + hover-glow vocabulary for any new content block; don't introduce a new "card" style with a solid surface color or drop shadow.
- **Do** use the module-list pattern (header bar + chip/title + hairline-divided rows) for any new feature or capability list, instead of a grid of same-size icon+heading+text cards.
- **Do** use `badge-live` for any new "this is real/currently active" claim (live project, active integration, system status) rather than inventing a new indicator style.
- **Do** keep the `network-canvas.tsx` backdrop as a single fixed layer behind the whole page (`site-backdrop` in `app/page.tsx`) rather than re-adding it per section.
- **Do** use logical Tailwind properties (`ms-`, `me-`, `start-`, `end-`) for any new spacing/positioning so RTL mirroring stays correct without per-direction overrides; the codebase already does this for icon margins (`ms-2`, `me-2`) and badge positioning (`end-3`).
- **Do** swap the full display/body font stack (Space Grotesk → Cairo) at the `dir` boundary, not per-component.

### Don't:
- **Don't** add a section-heading kicker/eyebrow line — `.section-heading` is self-contained; if a "status" label is needed above content, use the mono `badge-live` pattern instead, which is a live-state indicator and not decorative kicker copy.
- **Don't** reintroduce a third site accent beyond blue and violet (the old green/cyan/amber multi-pillar system) — WhatsApp green is the one further sanctioned exception, and only on WhatsApp-specific controls.
- **Don't** use violet on the primary CTA, nav, or any cross-section chrome — it is scoped to the ERP module list (plus its blended share of the aurora/network-canvas/DeviceScene) so it reads as "the ERP pillar," not a second general-purpose accent.
- **Don't** re-mount `<AISection />` (app/page.tsx) or the `ChatConsole` hero component, and don't sell AI/WhatsApp/Instagram-automation as a live service, until Meta's developer platform is confirmed working in Syria — this is a product-truth constraint, not just a style one.
- **Don't** use a hard-offset neobrutalist-style shadow anywhere; this is not a neobrutalist world — the one shadow vocabulary is soft colored glow plus a single plain overlay shadow for the mobile menu.
- **Don't** use glyph/emoji icons for UI chrome; the system exclusively uses outline icon components (`lucide-react`, `react-icons/fa`) sized 14–20px inside chips or inline with text. (Emoji inside actual message/copy text, like the dormant chat-console's sample replies, is content, not an icon substitute.)
- **Don't** introduce a system/display font (e.g. a generic OS UI font) for headlines; Space Grotesk (English) and Cairo (Arabic) are the only display faces.
- **Don't** fabricate testimonials, star ratings, client logos, or metrics to fill a section — per product truth, no such evidence exists yet, and the "Live" badge / real portfolio links are the system's only trust device.
- **Don't** give a project or feature a "Live" badge unless it corresponds to a real, working URL/store link — the badge is a factual claim, not a decorative tag.
- **Don't** hardcode API keys or secrets in source — `RESEND_API_KEY` lives in `.env.local` (gitignored) and is read via `process.env` in `app/actions/send-email.tsx`.
