---
name: Concreto
description: Portfolio landing for an independent photographer, composed as a Brazilian concrete poem on a visible 12-column module grid (pt-BR).
colors:
  ink: "#0f0f0e"
  paper: "#f1efea"
  gray: "#5c5b57"
  gray-soft: "#8c8b86"
  gray-ink: "#a6a49e"
  vermilion: "#c4391f"
  vermilion-ink: "#e0573c"
  line: "rgb(15 15 14 / 0.075)"
  line-strong: "rgb(15 15 14 / 0.18)"
typography:
  display-hero:
    fontFamily: "'Jost Variable', 'Jost', 'Futura', sans-serif"
    fontSize: "clamp(4.25rem, 10.4vw, 10.75rem)"
    fontWeight: 780
    lineHeight: 0.84
    letterSpacing: "-0.04em"
  display:
    fontFamily: "'Jost Variable', 'Jost', 'Futura', sans-serif"
    fontSize: "clamp(2.75rem, 6.6vw, 6.75rem)"
    fontWeight: 720
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Jost Variable', 'Jost', 'Futura', sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 680
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Jost Variable', 'Jost', 'Futura', sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.45vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 560
    letterSpacing: "0.005em"
  small:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  module-number:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    letterSpacing: "0.04em"
    fontFeature: "'tnum'"
rounded:
  none: "0px"
spacing:
  margin: "clamp(16px, 3.2vw, 48px)"
  gutter: "clamp(10px, 1.4vw, 22px)"
  section: "clamp(104px, 13vw, 220px)"
  header: "68px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 30px"
    height: "56px"
  button-ink-hover:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 30px"
    height: "56px"
  button-paper-hover:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
  button-outline-paper:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 30px"
    height: "56px"
  button-sm:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "42px"
  link-line:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "6px 0"
  filter:
    textColor: "{colors.gray}"
    typography: "{typography.title}"
    padding: "6px 0"
  filter-active:
    textColor: "{colors.ink}"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "52px"
---

# Design System: Concreto

## Overview

**Creative North Star: "The Concrete Poem"**

Brazilian concrete poetry and Bienal posters are the source. Every word block and every photograph is placed on one rigorous 12-column module grid, and the grid itself is visible: faint hairline column rules with tiny tabular module numbers (01 to 12) sitting at the top of each line. Empty modules are part of the composition; the page is allowed to leave whole columns unfilled so the photographs can lead.

The material is flat graphite ink on off-white paper. Dark sections are the same ink inverted, never a second palette. Words are heavy, tight, lowercase grotesk stacked in short lines and offset from one another by whole modules, like a poem set in metal type. Photographs are hard-edged rectangles snapped to column spans, with no rounding, no frames and no shadows. A single vermilion is rationed to marks of state: the active filter, the current nav item, the primary underline, focus, scroll progress, errors.

Motion speaks the same grammar as the layout: things arrive along the modules. Photos are uncovered slat by slat, one column at a time; words rise out of masks; images wipe in with clip-path; ink sections open from the page margin to the screen edge; the portfolio recomposes along the grid when filtered. Everything uses transform, opacity and clip-path on an expo curve, and all of it collapses to a still, fully legible page under reduced motion.

**Key Characteristics:**
- Visible 12-column grid with module numbers on the lines; 4 lines remain below 900px.
- Lowercase heavy Jost display (700 to 780) stacked and offset by whole modules.
- Paper and ink as the only two grounds; ink sections invert the same tokens.
- One vermilion, used only for active state and the primary underline.
- Square everything: radius 0 on photos, buttons, fields, panels.
- Module-stepped motion (slats, masks, clip wipes, FLIP) with a full reduced-motion fallback.

## Colors

A two-ground monochrome of graphite ink and warm paper, with grays for hierarchy and one rationed vermilion.

### Primary
- **Vermilion** (#c4391f): active filter underline, current nav item underline, the primary link underline, focus outline, caret, text selection, scroll progress bar, process progress line and lit step numbers, form errors, the hover fill that sweeps across buttons. Never a background for a section, never decorative.
- **Vermilion on Ink** (#e0573c): the same role on ink grounds; swapped in automatically through the ink theme.

### Neutral
- **Graphite Ink** (#0f0f0e): body text on paper, the primary button, ink section grounds (projects, process, CTA, footer, menu, lightbox backdrop at 96%).
- **Warm Paper** (#f1efea): page ground, text on ink, the slat color that covers photos on paper sections.
- **Stone Gray** (#5c5b57): secondary text on paper (about 6:1), inactive filters, placeholders, form privacy note.
- **Ash Gray** (#8c8b86): only strokes and very large text; the scrollbar thumb.
- **Ink Gray** (#a6a49e): secondary text on ink (about 7:1), unlit process steps, footer info and legal.
- **Grid Line** (rgb 15 15 14 / 0.075): the visible module rules; on ink it becomes paper at 0.07.
- **Rule** (rgb 15 15 14 / 0.18): hairline dividers between rows (filters, services, steps, quotes, channels) and the module numbers; on ink, paper at 0.2.

### Named Rules
**The One Mark Rule.** Vermilion marks state or the single primary underline. If a vermilion element does not say "this is active, focused, wrong, or the way forward", it is wrong.

**The Same Ink Rule.** A dark section is `data-theme="ink"`: the ground becomes ink, foreground becomes paper, secondary becomes ink gray, lines and accent swap to their ink variants. No other dark palette exists.

## Typography

**Display Font:** Jost Variable (with Jost, Futura, sans-serif)
**Body Font:** Hanken Grotesk Variable (with Hanken Grotesk, system-ui, sans-serif)

**Character:** A geometric Futura descendant set heavy, tight and lowercase carries the poem; a quiet humanist grotesk carries everything that must be read. The contrast is weight and size, not style.

### Hierarchy
- **Hero display** (780, clamp(4.25rem, 10.4vw, 10.75rem), 0.84): the three stacked hero words and every section title set at hero scale (portfolio, projects, about, process, CTA, contact). Lowercase, letter-spacing -0.04em.
- **Display** (720, clamp(2.75rem, 6.6vw, 6.75rem), 0.92): section titles at the smaller scale, project titles, service names, the menu list. Lowercase.
- **Footer mark** (760, 13vw, 0.8, -0.045em): the photographer's name set edge to edge at the foot of the page.
- **Headline** (680, clamp(1.75rem, 3vw, 2.75rem), 1.05): section-level titles inside a section: the about name, process step titles, the form title.
- **Title** (500, clamp(1.5rem, 2.6vw, 2.25rem), 1.05 to 1.28): category filters and testimonial quotes; the light Jost voice.
- **Lead** (400 to 500, clamp(1.125rem, 1.45vw, 1.4rem), 1.35 to 1.45): hero claim, ledes, about intro, CTA text; max 24 to 46ch.
- **Body** (400, 1rem, 1.6): running text, 36 to 44ch measures.
- **Label** (560, 1rem): buttons and underlined links; 600 for field labels and small headings.
- **Small** (0.8125rem): notes, privacy, legal.
- **Module number** (500, 0.625rem, 0.04em, tabular): the 01 to 12 numbers on the grid lines, colored with the rule token.

### Named Rules
**The Lowercase Poem Rule.** Display text is lowercase, stacked in short lines, and each line is offset by whole modules (one column plus one gutter, or multiples). Words, not sentences.

**The Weight Ladder Rule.** Jost lives at 780 / 760 / 720 for display, 680 for section-level headings, 500 for the light voice. Nothing in between is invented per element.

## Layout

The page is one 12-column grid: side margin clamp(16px, 3.2vw, 48px), gutter clamp(10px, 1.4vw, 22px), and a computed column width exposed as a token so offsets can be expressed in modules. Every section, the header and the footer use the same 12 columns; nested parts use subgrid so photos and text snap to the same lines. Sections breathe with clamp(104px, 13vw, 220px) of vertical space.

Each section draws its own grid lines behind content: 12 hairline columns with module numbers 14px from the top. Below 900px the density drops to four lines (columns 1, 4, 7, 10 and the closing edge) and only those carry numbers.

Compositions are asymmetric spans: the hero photo takes the right 8 modules at full height while three words occupy the left; projects alternate a 7-module image with a 4-module text column, flipping sides; testimonials step across columns 7, 1 and 3; the portfolio places photos from a span pattern (for example 1/5, 7/5, 2/4, 7/6) on 8px rows so it reads as a mosaic without leaving the columns. Below 900px most spans go to full width and photos bleed past the margin.

Breakpoints observed: 600px, 900px (grid density, layout collapse), 1024px (header becomes the full-screen menu), 1100px (portfolio pattern tier).

### Named Rules
**The Module Rule.** Every photo edge and every offset lands on a column line. Offsets are counted in columns plus gutters, not in arbitrary pixels.

**The Visible Grid Rule.** The grid is shown, not hidden: faint lines and module numbers sit behind every grid section, and empty modules are composition, not leftover space.

## Elevation & Depth

Flat. There are no elevation shadows; depth comes from the ink/paper inversion, from photographs, and from motion. The header separates from content with a hairline (`box-shadow: 0 1px 0` in the rule color), and ghost buttons use an inset 1px paper line. Over photographs, a bottom-up ink gradient is used only as a legibility scrim for caption and CTA text.

### Named Rules
**The Flat Paper Rule.** Surfaces never float. If something needs separation, use a hairline rule, an ink inversion, or empty modules.

## Shapes

Square. Radius is 0 everywhere: photos, buttons, fields, the textarea, the lightbox controls, the social squares. Lines are 1px hairlines for structure, 2px for the primary underline and focus, 3px for the active filter underline. Photos are clipped rectangles; reveals and hovers change the clip (inset) rather than the corner. Icons are 24px line icons at 1.5 stroke with square caps.

## Components

### Buttons
Solid blocks that fill with vermilion like ink drawn across a slab.
- **Shape:** square (0), 56px tall, 30px side padding; small variant 42px tall, 18px padding.
- **Ink (primary):** ink block, paper label, weight 560.
- **Paper:** paper block, ink label, on ink grounds.
- **Outline paper:** transparent with an inset 1px paper line at 50%, on photos and ink.
- **Hover / Focus:** a vermilion layer scales in from the left over 0.55s (expo out) and retracts to the right; label turns paper; active presses 1px down. Focus shows a 2px vermilion outline at 3px offset.

### Underlined link
- Label weight 560 over a 2px vermilion underline. On hover the underline retracts to the right and the arrow icon slides 5px. This is the system's secondary action next to every primary button.

### Category filters
- Jost 500 at title size in gray with a tabular count as a superscript. Active (`aria-pressed`) turns ink with a 3px vermilion underline wiping in from the left. Filters sit on a hairline rule.

### Inputs / Fields
- **Style:** transparent, bottom 1px ink line, square, 52px tall; the textarea is fully outlined.
- **Hover:** a 3% ink wash.
- **Focus:** the line turns vermilion with a 2px inset underline (textarea: 1px inset ring); no outline glow.
- **Error:** vermilion line and a 0.875rem vermilion message. The form never fakes a successful send.

### Navigation
- Header on the 12-column grid: brand (Jost 700) in columns 1 to 4, links in 5 to 10, small ink button in 11 to 12. Transparent over the hero with paper links; becomes solid paper (or solid ink over ink sections) with a hairline once scrolled, and hides on scroll down. Links grow a 1px underline on hover; the current item gets a 2px vermilion one. A 2px vermilion scroll progress bar runs along the header foot.
- Below 1024px: a word toggle (menu / fechar) opens a full-screen ink menu that wipes down with clip-path; display-size links rise from masks, every second line offset by two modules.

### Photo frame with slats (signature)
- A hard-edged picture on a placeholder color (the photo's average), fading in when loaded. On reveal, a row of slats in the section ground color covers it and collapses column by column (scaleY to 0, stagger 0.07s, expo in-out) while the image settles from 1.18 scale. Parallax happens only inside the frame.

### Portfolio grid (signature)
- Photos on the 12-column subgrid in an asymmetric span pattern on 8px rows. Each enters with a bottom-up clip wipe. Filtering recomposes the grid with FLIP (1s, expo in-out); leaving photos shrink and fade, entering ones wipe in. Hover scales the image to 1.045 and wipes up a caption over an ink scrim.

### Process steps
- Rows stepped one column further right per step on an ink ground, each with a large Jost 500 numeral. A vertical 2px line fills with vermilion as you scroll; reached steps light from ink gray to paper with a vermilion numeral.

### Lightbox
- Native dialog on a 96% ink backdrop; image grows from its thumbnail; 48px square outlined controls that invert to paper on hover; swipe and arrow navigation.

## Do's and Don'ts

### Do:
- **Do** place every photo and word block on the 12 columns and express offsets as whole modules (column plus gutter).
- **Do** show the grid lines and module numbers behind grid sections, reducing to four lines below 900px.
- **Do** set display text lowercase in Jost at 700 to 780, tight (-0.04em), stacked and offset.
- **Do** keep vermilion (#c4391f, #e0573c on ink) for active state, focus, errors and the primary underline only.
- **Do** build dark sections by switching to the ink theme, not by adding colors.
- **Do** reveal along the modules: slats per column, words rising from masks, clip-path wipes, ink sections opening from the margin to the edge, FLIP recomposition.
- **Do** animate only transform, opacity and clip-path with expo curves (cubic-bezier(0.16, 1, 0.3, 1) and cubic-bezier(0.77, 0, 0.18, 1)).
- **Do** give every motion a reduced-motion state: no smooth scroll, no reveals, all content and process steps visible, filters and lightbox switch instantly.

### Don't:
- **Don't** round corners or add drop shadows to photos, buttons, fields or panels.
- **Don't** use vermilion as a section ground, a decorative fill or a second accent.
- **Don't** set display text in title case or sentence-long headlines.
- **Don't** let photos float off the columns or arrange them as a free masonry wall.
- **Don't** put parallax on running text; parallax lives inside photo frames.
