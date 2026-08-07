# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** finance-hub
**Generated:** 2026-08-07 14:42:10
**Category:** Banking/Traditional Finance
**Design Dials:** Density 5/10 (Standard)

---

## Global Rules

### Color Palette

**OVERRIDE (manual, 2026-08-07):** The auto-generated palette above was a green
"Marketplace/Directory" match (community-marketplace tone), which reads as e-commerce/
listings rather than "금융기관"(financial institution) trust. Swapped for a bright
navy/blue banking palette — closer to the auto tool's own "Banking/Traditional Finance"
color-domain match, but with the background lightened to near-white and the accent
changed from gold to a vivid blue (better contrast for CTA buttons, and matches the
"밝고 모던한" brief better than muted gold).

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0F172A` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#1E3A8A` | `--color-secondary` |
| Accent/CTA | `#2563EB` | `--color-accent` |
| Background | `#FFFFFF` | `--color-background` |
| Band (alt section bg) | `#F1F5F9` | `--color-band` |
| Foreground | `#0F172A` | `--color-foreground` |
| Muted | `#64748B` | `--color-muted` |
| Border | `#E2E8F0` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#2563EB` | `--color-ring` |

**Color Notes:** Navy primary (trust) + vivid blue CTA on a bright white/near-white
background. 3-way CTA buttons (홈페이지/Android/iOS) share one button chrome —
differentiated by icon + label, not by color — the 홈페이지 CTA is the filled/primary
variant (always available), Android/iOS CTAs are outline/secondary variant (may be
unavailable for some institutions).

### Typography

- **Heading Font:** Pretendard
- **Body Font:** Pretendard
- **Mood:** Korean-native, modern, clean, trustworthy — reused from the `청구창구`
  (claim-hub) sibling site for portfolio-wide brand consistency; not the Noto Sans KR
  the auto tool suggested (Pretendard reads more like the Toss/modern-fintech register
  Noto Sans KR skews more document/system-UI).
- **Source:** local `.woff2` files (see `assets/fonts/`), loaded via `next/font/local` —
  not a Google Fonts `@import` (self-hosted, no external font request at runtime).

### Spacing Variables

*Density: 5/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary CTA Button — 홈페이지 바로가기 (always available) */
.btn-primary {
  background: #2563EB;
  color: white;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 700;
  min-height: 44px;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.92;
}

/* Secondary CTA Button — Android/iOS 다운로드 (may be unavailable) */
.btn-secondary {
  background: white;
  color: #0F172A;
  border: 1.5px solid #E2E8F0;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 700;
  min-height: 44px;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #2563EB;
  background: #F1F5F9;
}

/* Disabled state — app_available: false */
.btn-disabled {
  background: #F1F5F9;
  color: #64748B;
  border: 1.5px dashed #E2E8F0;
  cursor: not-allowed;
}
```

### Cards

```css
.card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 150ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: #2563EB;
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #2563EB;
  outline: none;
  box-shadow: 0 0 0 3px #2563EB20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Accessible & Ethical

**Keywords:** High contrast, large text (16px+), keyboard navigation, screen reader friendly, WCAG compliant, focus state, semantic

**Best For:** Government, healthcare, education, inclusive products, large audience, legal compliance, public

**Key Effects:** Clear focus rings (3-4px), ARIA labels, skip links, responsive design, reduced motion, 44x44px touch targets

### Page Pattern

**Pattern Name:** Marketplace / Directory

- **Conversion Strategy:** Search bar is the CTA. Reduce friction to search. Popular searches suggestions.
- **CTA Placement:** Hero Search Bar + Navbar 'List your item'
- **Section Order:** 1. Hero (Search focused), 2. Categories, 3. Featured Listings, 4. Trust/Safety, 5. CTA (Become a host/seller)

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Poor security UX
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
