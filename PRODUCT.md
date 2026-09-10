# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Syrian businesses, across three groups this site targets directly:

1. Small-to-medium businesses currently taking orders informally through Instagram/social pages, who need a real professional website or e-commerce platform.
2. Medium-to-large businesses that need a proper ERP system (accounting, inventory, HR/payroll, CRM, manufacturing) to replace spreadsheets and disconnected processes.
3. Any business (of any size) that wants AI-driven customer service automation on the social channels their customers already use (WhatsApp, Instagram).

The founder is based in Syria and the site's stated focus is the Syrian market specifically, not a generic global SMB audience.

## Product Purpose

M & M Solutions builds custom websites, mobile applications, AI customer-service automations/agents, and ERPNext-based ERP systems for Syrian businesses. Success means Syrian businesses get access to digital capabilities (AI-automated social commerce, real e-commerce/web presence, and enterprise-grade ERP) that the founder considers underserved in that market today.

## Positioning

Three specific, named pillars — chosen deliberately over a generic "we do websites, apps, AI, and ERP" framing:

- **AI customer service automation on social media** — a 24/7 AI agent/automation layer for WhatsApp and Instagram that replaces manual message-by-message customer handling.
- **Professional websites/e-commerce replacing Instagram-as-storefront** — for businesses currently taking orders through Instagram DMs/posts, a real website or e-commerce platform as the upgrade path.
- **ERP systems for medium-to-large businesses** — ERPNext-based implementations that unify finance, inventory, HR, CRM, and manufacturing.

The claim a competitor couldn't credibly make: doing all three, specifically for the Syrian market, where the founder believes these three capabilities are currently in short supply.

## Operating Context

- Bilingual EN/AR audience with full RTL support already implemented (`language-context`, `translations.ts`) — this is a working, load-bearing feature, not a stub.
- Client contact happens directly, not through self-serve signup: real email (malazshukri.contactme@gmail.com), real phone/WhatsApp (+963981063882, Syria country code), and a contact form that emails the founder.
- Prospective clients evaluate the agency largely through the shown portfolio of live/shipped work (websites with live URLs, apps with App Store/Play Store links).

## Capabilities and Constraints

- Custom websites and e-commerce platforms.
- Mobile applications (Android & iOS).
- AI automations and AI agents: appointment booking, instant replies, WhatsApp/Instagram messaging, 24/7 availability, multi-conversation handling.
- ERPNext-based ERP systems: accounting/finance, inventory, HR/payroll, CRM/sales, manufacturing, custom modules.
- The "Technology Stack" content shown to prospects (Vue.js, Django, Flutter, ERPNext, MongoDB) describes capabilities offered to clients, and is independent of the website's own implementation stack (Next.js/React) — do not conflate the two or "fix" the copy to match the site's build.
- Bilingual EN/AR with RTL is a hard constraint: must be preserved and fully supported in the redesign, not degraded to translated strings in an LTR-only layout.
- Real contact channels (email, phone, WhatsApp) must remain prominent and functioning, not buried.
- All current portfolio projects (14 total: 12 company + 2 personal/freelance, each with real descriptions and images, several with live/App Store/Play Store links) must be preserved in the new design — the redesign must not curate this down to a shorter "highlights" list.

## Brand Commitments

- Name: "M & M Solutions".
- Existing brand assets in `public/`: `logo.png`, `favicon.png`, `icon.svg`, `icon-light-32x32.png`, `icon-dark-32x32.png`. Treat these as the current identity marks; the redesign may restyle their presentation but should not silently replace the mark itself without flagging it.
- The founder (Malaz Shukri) is the direct point of contact — the personal, reachable-founder identity is part of how the brand currently presents itself (real personal email/WhatsApp, not a generic "sales@" inbox).

## Evidence on Hand

- 14 real client projects with descriptions (EN/AR), images, and live/App Store/Play Store links where applicable (see `components/projects.tsx`). This is real, shipped work — not placeholder portfolio content.
- No real testimonials exist yet: a Testimonials component exists in the codebase but is explicitly commented out "for future use when real reviews are available." Do not fabricate testimonials, review quotes, star ratings, or client logos to fill this gap.
- No case-study-level metrics (e.g., "increased conversions by X%") exist on the current site — do not invent numbers not already present.

## Product Principles

1. Lead with the three named pillars (AI social-commerce automation, professional web presence replacing Instagram-as-storefront, ERP for scaling businesses) as the primary structure of the site, not a flattened four/five-item generic services grid.
2. Real, shipped, linkable work is the trust mechanism — never substitute it with generic stock claims, invented testimonials, or fabricated metrics.
3. Direct founder access (real WhatsApp/phone/email) is part of the value proposition and should stay first-class and easy to reach, not relegated to small footer text.
4. Bilingual Arabic/English with RTL is core infrastructure for this market, not a checkbox feature — Arabic-reading users must get a first-class, mirrored experience, not a translated-but-still-LTR layout.
5. The Syria-market-gap story (these capabilities are underserved locally) is the differentiated narrative and should be legible in the positioning, without turning into an unverifiable market-size claim.

## Accessibility & Inclusion

No explicit accessibility standard was specified by the founder; the site must remain usable in both English (LTR) and Arabic (RTL) reading directions given the bilingual constraint above.
