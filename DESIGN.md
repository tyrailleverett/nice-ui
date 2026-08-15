# Nice UI Design System

## Overview

Nice UI is a shadcn-compatible registry of **marketing blocks** and **product app blocks**. Both surfaces share one token set: a white canvas (`{colors.background}` — #ffffff) with near-black ink (`{colors.foreground}` / `{colors.primary}` — #262626), **Inter Variable** for every type role, and a hairline architecture of `{colors.border}` (#f5f5f5) rules. The system reads as a precise editorial grid — not a friendly-SaaS gray-card stack, not a dark-mode-first dashboard. Dark mode is a full invert of the same tokens, not a second brand.

Type voice is a **single family with two surfaces**. Marketing display headlines use Inter Variable at `{typography.display-*}` via `{font.display-heading}` (**weight 900 / black**, `{tracking.display}` / `tracking-tight` −0.025em). App chrome, body, buttons, nav, and captions stay Inter Variable at 400–600 with normal tracking. There is no custom display face. `{font.heading}` maps to `{font.sans}` — the split is weight, tracking, and size, never family.

Component voltage comes from **architectural chrome**, not painted illustrations: `{component.full-width-divider}` hairlines that bleed to the viewport, faded vertical side-rules in heroes, `{component.decor-icon}` plus marks at framed corners, and **product screenshots** (light + dark assets) nested inside those frames. Marketing does not embed live product widgets; it shows the product as a photograph of the product, held by the grid.

The product/app surface (`registry/app`) uses the same tokens inside shadcn **radix-nova** primitives: `{component.sidebar}` on `{colors.sidebar}` (#fafafa), `{component.card}` with `{rounded.xl}`, `{colors.border}`, and a single `--card-spacing` of `{spacing.sm}` (no density `size` prop), compact `{component.button}` at 36px. App cards in the showcase (`{component.meeting-card}`, `{component.integration-card}`, `{component.flow-card}`) sit on `{colors.card}` with a 1px line and no drop shadow.

The footer stays on the **same canvas** as the page. Nice UI does not close marketing pages with a dark band. Theme control lives in the footer as `{component.theme-switcher}` (system / light / dark) — a `{rounded.pill}` `{component.toggle-group}` with `variant="solid"` so the selected item fills `{colors.primary}`. Default and outline toggles keep a muted on-state; do not put primary fill on the shared toggle recipe.

**Key Characteristics:**
- White canvas with near-black primary CTA (`{colors.primary}` — #262626). Buttons are `{rounded.md}` (~10px) with **weight-400** labels at `{typography.button}` (14px). Compact, quiet, not bold-SaaS.
- Inter Variable for headlines and body. Marketing display headings use `{font.display-heading}` (weight **900**, `{tracking.display}` / `tracking-tight`). App titles stay 600 with normal tracking. Never introduce a second display family.
- Hairline grid as brand: `{component.full-width-divider}`, faded side-rules, column rules between feature cells. Borders use `{colors.border}` (#f5f5f5) — almost invisible until they accumulate into structure.
- `{component.decor-icon}` — a 16px plus mark parked on the four corners of framed screenshot bands. Signature marketing ornament.
- Product voltage from **screenshots inside frames**, not live widgets. Heroes swap `screenshot` / `darkScreenshot` with the theme.
- `{component.announcement-pill}` — a small `{rounded.sm}` bordered chip with a `{font.mono}` eyebrow ("NOW") and a trailing arrow. Recurs on `{component.hero-1}` and `{component.hero-2}`.
- Featured pricing is a `{component.badge}` ("Popular") on `{colors.primary}` at 10% fill — **not** a dark inverted card.
- Footer remains light. `{component.theme-switcher}` in `{component.footer-7}` is the dark-mode control, not a dark footer.
- Section rhythm is `{spacing.section}` (64–112px depending on breakpoint: `py-16` / `md:py-20` / `md:py-24` / `lg:py-28`). Tighter than 96px-everywhere SaaS; the grid lines do the breathing.
- Border radius is hierarchical from `{radius.base}` (12px): `{rounded.md}` for buttons, `{rounded.lg}` for inputs and toggle groups, `{rounded.xl}` for cards, `{rounded.3xl}` for large CTA shells, `{rounded.pill}` for theme switcher and some avatars, `{rounded.full}` for avatars.

## Colors

Values below are the **light** theme in `src/index.css`. Dark inverts ink and canvas; semantic hues stay put.

### Brand & Accent
- **Primary** (`{colors.primary}` — #262626): Dominant action color. Primary CTAs, checked icons, popular-plan emphasis. Press/active darkens via `{colors.primary}` at 80% (`hover:bg-primary/80` is implementation; document pressed as `{colors.primary-active}` — same ink, slightly lifted).
- **Info** (`{colors.info}` — #3b82f6): Semantic info badges, chart-4. **Not** a CTA color. Nice UI is near-monochrome at the action layer.
- **Chart series** — `{colors.chart-1}` (#262626), `{colors.chart-2}` (#737373), `{colors.chart-3}` (#a3a3a3), `{colors.chart-4}` (#3b82f6), `{colors.chart-5}` (#16a34a). Charts stay inside the same gray + two-hue set.

### Surface
- **Background / Canvas** (`{colors.background}` — #ffffff): Default page floor for marketing and app.
- **Sidebar** (`{colors.sidebar}` — #fafafa): Product shell rail only. Slightly cooler than canvas so the app chrome reads as a tool, not a landing page.
- **Card** (`{colors.card}` — #ffffff): Cards, popovers, announcement pills. Same as canvas; separation is `{colors.border}`, not fill.
- **Muted / Secondary / Accent** (`{colors.muted}` / `{colors.secondary}` / `{colors.accent}` — #f5f5f5): Soft fills — tabs lists, secondary buttons, card footers (`bg-muted/50`), billing-interval track, avatar fallbacks.
- **Input** (`{colors.input}` — #f5f5f5): Input border tone (same as muted). Dark mode uses `{colors.input}` at 30% fill.
- **Border / Hairline** (`{colors.border}` — #f5f5f5): 1px rules, full-width dividers, table/column separators.
- **Ring** (`{colors.ring}` — #a3a3a3): Focus rings at 50% (`ring-ring/50`).

### Dark surfaces (`.dark`)
- **Background** (`{colors.background-dark}` — #171717)
- **Card / Popover** (`{colors.card-dark}` — #262626)
- **Primary** (`{colors.primary-dark}` — #fafafa) with `{colors.primary-foreground-dark}` (#262626)
- **Muted** (`{colors.muted-dark}` — #404040)
- **Border** (`{colors.border-dark}` — #404040)

Dark is a first-class theme, not a scarce “footer only” inversion. App shells and marketing blocks both honor `.dark`.

### Text
- **Foreground / Ink** (`{colors.foreground}` — #262626): Headlines, primary text, wordmark.
- **Muted Foreground** (`{colors.muted-foreground}` — #737373): Body supporting copy, nav secondary, footer links, captions.
- **Subtle** (`{colors.subtle}` — #a3a3a3): Tertiary / disabled-adjacent; also `{colors.ring}` in light.
- **On Primary** (`{colors.primary-foreground}` — #ffffff): Text on primary buttons.
- **Card Foreground** (`{colors.card-foreground}` — #262626): Same as ink on light cards.

### Semantic
- **Success** (`{colors.success}` — #16a34a): Success badges (`bg-success/10 text-success`), chart-5.
- **Destructive** (`{colors.destructive}` — #f87171): Errors, destructive buttons (`bg-destructive/10 text-destructive`).
- **Info** (`{colors.info}` — #3b82f6): Info badges.

App showcase cards also use a **small pastel avatar set** (coral #f4b7a8, sand #e8d3b0, sky #b7d4ea, blue #9bb7e8) and **tier tints** (violet / blue / green) inside `{component.flow-card}`. Those are content accents inside product fragments — never hero CTAs.

## Typography

### Font Family
The system runs **Inter Variable** (`@fontsource-variable/inter`) for display, UI, and body. `{font.heading}` is aliased to `{font.sans}`. The fallback is the browser sans stack via `"Inter Variable", sans-serif`.

`{font.mono}` appears only as a **signal**: announcement-pill eyebrows (`NOW`) and similar status chips. Do not set body or headlines in mono.

The split is functional:
- Inter Variable, weight **900**, `{tracking.display}` (`tracking-tight`, −0.025em) — marketing h1 / section h2 (`{font.display-heading}` / `{typography.display-*}`)
- Inter Variable, weight 600 — app `{typography.title}`, `{typography.title-md}`, wordmark (`font-heading font-semibold tracking-tight`)
- Inter Variable, weight 400–500 — body, buttons (400), labels (500), captions (400)
- Inter Variable, weight 400, tracking-wider — hero supporting paragraphs on `{component.hero-1}` only (`tracking-wider` on the subhead is a hero-1 signature, not a global body rule)

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 72px (`text-7xl`) | 900 | tight | `tracking-tight` −0.025em | Wide heroes (`{component.hero-4}`, `{component.hero-5}`) at xl |
| `{typography.display-lg}` | 60px (`text-6xl`) | 900 | tight | `tracking-tight` −0.025em | Desktop hero h1 |
| `{typography.display-md}` | 48px (`text-5xl`) | 900 | tight | `tracking-tight` −0.025em | Tablet hero h1, large feature heads |
| `{typography.display-sm}` | 36px (`text-4xl`) | 900 | tight | `tracking-tight` −0.025em | Compact heroes (`{component.hero-2}`), section h2s |
| `{typography.title}` | 24px | 600 | 32px | 0 | `{text-title}` utility; CTA heads; card-level titles |
| `{typography.title-md}` | 16px | 600 | 20px | 0 | `{text-title-md}` / `{component.card-title}` |
| `{typography.body-lg}` | 18px (`text-lg`) | 400 | ~28px | 0 | Hero subheads (except hero-1), testimonial roles |
| `{typography.body-md}` | 16px (`text-base`) | 400 | 24px | 0 | Inputs at mobile; some feature copy |
| `{typography.body-sm}` | 14px (`text-sm`) | 400 | 20px | 0 | **Default running text** (`body` in `src/index.css`) |
| `{typography.label}` | 12px | 500 | 16px | 0 | `{text-label}` — badges, small buttons (`size="sm"`) |
| `{typography.caption}` | 12px | 400 | 16px | 0 | `{text-label}` + `font-normal` — fine print, `size="xs"` buttons |
| `{typography.button}` | 14px | 400 | 20px | 0 | Default button labels — **not** semibold |
| `{typography.nav-link}` | 14px | 400–500 | 20px | 0 | Header menu items (ghost buttons / nav triggers) |
| `{typography.mono-chip}` | 12px | 400 | 16px | 0 | Announcement eyebrow — `{font.mono}` |

### Principles
Inter is the whole voice. Marketing emphasis is **size + black weight (900) + `tracking-tight`**, not a second typeface. Apply `{font.display-heading}` to marketing `h1` / section `h2` at `{typography.display-sm}` and up (`text-4xl` / 36px or larger) — not compact CTA titles, logo-cloud lines, card `h3`s, plan names, nav, or app chrome.

Default UI copy is **14px / 20px / 400**. Marketing heroes jump the scale; product chrome stays on `{typography.body-sm}` and `{typography.title-md}` at 600.

Wordmark (`{component.logo}`) is an SVG, not live type. Fallback text wordmarks use `font-heading font-semibold text-sm tracking-tight`.

### Note on Font Substitutes
If Inter Variable is unavailable, **Inter** (static) at the same weights is the correct substitute. Do not swap in a geometric display face to “add brand” — the monochrome + hairline system is the brand.

## Layout

### Spacing System
- **Base unit:** 4px (Tailwind `--spacing`).
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 64–112px (`py-16` → `lg:py-28`).
- **Icons:** `{spacing.icon-sm}` 16px (`size-icon-sm` on glyphs). Do not add `icon-md` / `icon-lg` spacing keys until a primitive uses them — they collide conceptually with Button `size="icon-sm"` (a 28px control, not a 16px glyph).
- **Card internal padding:** `{spacing.sm}` (12px) via `--card-spacing` on `{component.card}`; marketing feature cards often override to `{spacing.xl}` (32px / `p-8`).
- **Gutters:** `{spacing.md}`–`{spacing.lg}` in marketing grids; app sidebar width `{layout.sidebar}` 16rem (icon-collapsed 3rem).

### Grid & Container
- **Marketing content width:** `{layout.max-5xl}` (~1024px) for headers, footers, tight bands; `{layout.max-6xl}` (~1152px) for pricing; `{layout.max-7xl}` (~1280px) for wide heroes and feature stages.
- **Header-1** shrinks to `{layout.max-3xl}` after scroll and floats with `{rounded.md}` + hairline — a compact “nav island.”
- **Header-2** is sticky full-bleed, inner nav `{layout.max-5xl}`, height `{spacing.nav}` 56px (`h-14`).
- **Hero-1** is full-bleed: centered copy, then a framed 16:9 screenshot band with side-rules in the copy zone.
- **Feature icon row** (`{component.feature-1}`): 4-up desktop, 2-up mobile, `{layout.max-5xl}`.
- **Pricing:** 3-up (`{component.pricing-1}`) or 2-up (`{component.pricing-4}`) with **shared outer borders**, not isolated rounded cards.
- **App shell:** `{component.sidebar}` + `{component.sidebar-inset}`. Mobile breakpoint `{breakpoint.md}` 768px (`useIsMobile`).

### Whitespace Philosophy
Nice UI uses **structure instead of padding** for rhythm. Full-width hairlines and column rules create bands; section padding is moderate (64–112px), not a 96px metronome. Consecutive bands should alternate: open canvas → ruled grid → screenshot frame → open canvas. Do not stack two screenshot frames or two dense 3-up grids without a quiet band.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, canvas fill | Body sections, unscrolled header-2, most marketing bands |
| Hairline | 1px `{colors.border}` | Dividers, pricing columns, inputs, cards, announcement pills |
| Soft fill | `{colors.muted}` / `{colors.muted}/50` | Tabs list, billing toggle track, card footer, secondary button |
| Scrolled nav | `bg-background/95` + backdrop-blur, optional `shadow` | `{component.header-1}` after 10px scroll; `{component.header-2}` border + blur |
| Screenshot frame | Hairline + `{component.decor-icon}` corners; optional `shadow-xl` + inset ring (`{component.hero-2}`) | Product photography |
| App card | `{colors.card}` + 1px line, **no shadow** (`{component.showcase-card}`) | Meeting / integration / flow cards |
| Overlay | Portal + blurred backdrop | Mobile nav (`{component.portal}`) |

The elevation philosophy is **line, not shadow**. Depth comes from overlapping rules, plus marks, and (rarely) a screenshot well. No neumorphism, no glass except the scrolled-nav blur, no dark featured-tier cards on light pages.

### Decorative Depth
- Faded vertical rules (`via-border` / `from-foreground/6`) in `{component.hero-1}` and `{component.feature-1}`.
- `{component.decor-icon}` plus marks on framed screenshot bands.
- Pastel avatar fills only inside app showcase cards.
- Hero-2 screenshot well: `inset-shadow` + `shadow-xl` + `ring-1 ring-card` — the one place a marketing mockup is allowed to “float.”

## Shapes

### Border Radius Scale

Derived from `{radius.base}` 12px (`--radius: 0.75rem`):

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | ~7px (`rounded-sm` / `{radius.sm}`) | Announcement pill, nested eyebrow chip |
| `{rounded.sm}` | ~7px | Small chrome inside illustrations |
| `{rounded.md}` | ~10px | **Buttons**, badges, header-1 island, icon wells in mega-menu |
| `{rounded.lg}` | 12px | Inputs, toggle-group, some illustration chips |
| `{rounded.xl}` | ~17px | `{component.card}` |
| `{rounded.2xl}` | ~22px | Occasional raised wells |
| `{rounded.3xl}` | ~26px | `{component.cta-9}` newsletter shell |
| `{rounded.pill}` | 9999px | `{component.theme-switcher}`, some tracks |
| `{rounded.full}` | 9999px / 50% | Avatars |

### Photography Geometry
- Hero screenshots: **16:9** (`aspect-video`) in `{component.hero-1}`.
- Avatars: circles. Primitive default `{component.avatar}` is 32px (`size-8`); `sm` 24px; `lg` 40px. `{component.testimonial-1}` uses 48px (`size-12`) with a hairline.
- App showcase avatars: ~38px circles with 2px card-colored ring, overlapping (`margin-left: -0.55rem`).
- Logo wordmark: height 16px in headers (`h-4 w-auto`); 24px in isolated logo stories.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` (#262626) for primary CTAs and ink. The button is near-black, not `{colors.info}`.
- Use Inter Variable for every role. Marketing `h1`/`h2` use `{font.display-heading}` (900, `tracking-tight`). App titles stay 600. Never a second family.
- Prefer hairlines (`{component.full-width-divider}`, column rules) over drop shadows.
- Frame screenshots with dividers + `{component.decor-icon}` (hero-1) or a single well (hero-2). Ship light and dark screenshot assets.
- Mark the featured plan with `{component.badge}` “Popular,” not a dark inverted card.
- Keep default buttons at weight 400 and height 36px.
- Put theme control in `{component.theme-switcher}`, not a dark footer band.
- Compose marketing pages from registry blocks (`hero-*`, `header-*`, `feature-*`, `pricing-*`, `cta-*`, `footer-*`) instead of one-off sections.

### Don't
- Don't use `{colors.info}`, success, or pastel avatar fills on primary CTAs.
- Don't set marketing display headings below `{typography.display-sm}` (`text-4xl`) or without `{font.display-heading}`. Don't put `{font.display-heading}` on compact CTA titles, app chrome, buttons, or card `h3`s.
- Don't invert large marketing surfaces to `{colors.background-dark}` except when the **page theme** is dark.
- Don't give cards heavy shadows; `.showcase-card` is explicitly `box-shadow: none`.
- Don't set button labels to 600/700 as a default — that reads as a different product.
- Don't document or invent hover treatments beyond what primitives already encode (primary 80%, outline → muted). Prefer default + active/pressed + focus-visible.
- Don't mix `{rounded.3xl}` CTA shells with Cal-style 8px everything; stay on the `{radius.base}` 12px ladder.
- Don't embed live app widgets in marketing heroes when a screenshot frame already exists in the block.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger + `{component.portal}` sheet; heroes stack; h1 steps down (`text-3xl`–`text-5xl`); feature-1 is 2-up; pricing 1-up; sidebar becomes sheet |
| Tablet | 768–1024px | Horizontal header; feature grids 2-up; pricing 2-up (`lg:` often 3-up) |
| Desktop | 1024–1440px | Mega-menu; 3–4 column feature/pricing; `{layout.max-5xl}`–`{layout.max-7xl}` |
| Wide | > 1440px | Same structure; containers cap — do not stretch copy to full viewport |

`{breakpoint.md}` 768px is the product mobile query (`useIsMobile`). Tailwind `lg` (1024px) is where many marketing grids hit full column count.

### Touch Targets
- `{component.button-primary}` default 36×36; `lg` 40px. Prefer `lg` for standalone marketing CTAs when the band allows (`pricing-*` already uses `size="lg"`).
- `{component.button-icon}` default 36×36; header hamburger uses `size="icon"`.
- `{component.input}` is 32px tall — compact by design; don't shrink further.
- `{component.avatar}` default 32px; testimonial 48px.

### Collapsing Strategy
- Headers collapse at `< 768px` into `{component.portal}` (not a dropdown).
- Hero-1 stays single column; screenshot band is full width under copy.
- Feature-1: 4 → 2 columns; last-column rule hiding is breakpoint-aware.
- Pricing: 3 → 1 (`pricing-1`) or 2 → 1 (`pricing-4`); shared borders become stacked rows.
- App sidebar: off-canvas sheet below 768px; icon-collapse is a desktop state (`defaultCollapsed` on `{component.app-shell-2}`).

### Image Behavior
- Screenshots keep 16:9 in hero-1; `pointer-events-none` / `select-none` on marketing shots.
- `dark:hidden` / `hidden dark:block` pairs for screenshot and some logo treatments (`dark:brightness-0 dark:invert` on `{component.hero-5}` logos).
- Avatars remain circles at every breakpoint.

## Iteration Guide

1. Focus on **one block** at a time. Reference its registry slug and Storybook id (`{component.hero-1}`, `marketing-hero--centered-hover-logos`).
2. Variants of primitives (`default`, `outline`, `destructive`, sizes) live on the primitive — don't fork a new button for one band.
3. Use `{token.refs}` / CSS variables (`bg-primary`, `text-muted-foreground`, `border-border`) — never raw hex in components.
4. Never document hover as a separate component. Default, Active/Pressed, Focus-visible, Disabled, Invalid.
5. Marketing display stays Inter **900** with `tracking-tight` via `{font.display-heading}`. App titles stay 600. Body stays Inter 400 at 14px in product UI.
6. Dark mode is a theme, not a one-off card. Test `.dark` when adding screenshot pairs.
7. When in doubt about emphasis on the **app** surface: larger Inter before heavier Inter. On **marketing**, the heading is already black — go larger, not heavier.
8. After visual changes, preview the consuming Storybook stories (shared tokens have no stories of their own).

## Known Gaps

- Storybook MCP documents **blocks**, not shadcn primitives. Button / Badge / Card / Input / Sidebar props are defined in `src/components/ui` and are not listed by `list-all-documentation`. This spec grounds primitives in those files + `src/index.css`.
- `{component.hero-1}` subhead uses `tracking-wider`; other heroes do not. Don't promote that to a global body token without a dedicated pass.
- Animation timings (hero `fade-in slide-in-from-bottom-10`, marquee testimonials, portal `zoom-in-97`) are implemented but not tokenized.
- Form validation beyond `aria-invalid` / `{colors.destructive}` rings is not a separate documented component set.
- Showcase card pastels and flow-card tier colors are local to `registry/app/cards-shared/cards.css`, not `:root` tokens.
- Marketing “product UI fragments” are mostly **illustrations or screenshots**, except `{component.feature-9}`'s schedule toolbar, which uses real `{component.button}` chrome at small scale.
- `{colors.subtle}` is a palette token (`--subtle` / `text-subtle`) with no dedicated primitive yet; use it for tertiary copy when a surface needs a step past `{colors.muted-foreground}`. Do not add unused `{text-caption}` or `{spacing.icon-md}` keys.
- Registry slugs stay `{category}-{n}` (install IDs). Story titles name the **layout job** (e.g. `hero-1` / title “Centered Screenshot”), not demo copy.
