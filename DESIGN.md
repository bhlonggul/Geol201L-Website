# The Bone Wars: Design Spec

An informational website for a Geology history class about the Great Dinosaur Rush (the "Bone Wars," 1877 to 1892) between paleontologists Othniel Charles Marsh and Edward Drinker Cope.

## Concept

**Field Journal, dug deeper.** A clean, Victorian field-journal look (parchment, ink, serif type) on a single long-scrolling page. As the reader scrolls down, each section's background gets darker and earthier, as if digging down through rock layers, ending at near-black "bedrock." Thin striped bands between sections look like rock strata.

## Tech

- Plain HTML, CSS, and one small JavaScript file. No frameworks or build step.
- Must deploy as a static site (Vercel or GitHub Pages).
- Structure:
  ```
  index.html
  css/styles.css
  js/main.js
  images/        (empty for now)
  ```

## Color tokens

Define all colors as CSS custom properties on `:root`.

| Token | Hex | Use |
|---|---|---|
| `--parchment` | `#F3E9D2` | Hero background, light text on dark layers |
| `--paper` | `#FBF5E8` | Card backgrounds |
| `--ink` | `#2B2118` | Main text, borders, bedrock |
| `--ink-soft` | `#5C4A3A` | Muted text (only on layers 0 to 3) |
| `--rust` | `#A0522D` | Accent: buttons, links, active tab, field-note borders |
| `--tan` | `#C8A27A` | Placeholder borders, accents on the darkest layers |
| `--marsh` | `#2E4A6B` | Team Marsh (navy) |
| `--cope` | `#8B2E2E` | Team Cope (brick red) |

Layer backgrounds, from surface to bedrock:

| Token | Hex |
|---|---|
| `--layer-0` | `#F3E9D2` |
| `--layer-1` | `#EDE0C2` |
| `--layer-2` | `#E6D5B0` |
| `--layer-3` | `#DEC89C` |
| `--layer-4` | `#D2B68A` |
| `--layer-5` | `#C4A078` |
| `--layer-6` | `#7A5A3E` |
| `--layer-7` | `#5E4530` |
| `--layer-8` | `#3F2E21` |
| `--layer-9` | `#2B2118` |

Team colors are used consistently everywhere Marsh or Cope appears (card bands, timeline dots, map pins, tags, scoreboard). Keep text contrast at 4.5:1 or better.

## Typography (Google Fonts)

| Role | Font | Notes |
|---|---|---|
| Display / headers | Abril Fatface | Section headers ~48px, hero title clamp(56px, 8vw, 104px) |
| Body | Lora (400, 600, 700, italic) | 17px, line-height 1.6 |
| Labels / field notes | Special Elite | Eyebrows (14px, uppercase, letter-spacing 2px), placeholders, field notes |

Include fallback stacks: `Georgia, serif` for Abril Fatface and Lora; `"Courier New", monospace` for Special Elite.

## Navigation

- **Sticky header** in `--parchment` with a 2px `--ink` bottom border.
- **Left:** brand link "The Bone Wars" (Abril Fatface, 24px) linking to `#top`.
- **Right:** tabs, uppercase Lora 600, 14px, letter-spacing 1px, in `--rust`:
  Rivals · Origins · Timeline · Geology · Dig Sites · Discoveries · Scandal · Legacy · Sources
- **Each tab links to its section** with smooth scrolling. Tab labels match the section headers exactly.
- **Active tab:** the tab for the section in view gets an underline and `--ink` color (use IntersectionObserver), plus `aria-current="true"`.
- **Depth meter:** a 5px bar directly under the header. It is filled with a left-to-right gradient `#DEC89C → #C4A078 → #7A5A3E → #3F2E21 → #2B2118`, and its width grows from 0% to 100% as the page scrolls.
- **Mobile (under ~860px):** the tabs collapse behind a "Sections" button that toggles the list (`aria-expanded`). Tapping a tab closes the menu.
- Sections need `scroll-margin-top` so headers aren't hidden under the sticky nav.

## Sections

Every section has: an eyebrow label (Special Elite), a header (Abril Fatface), and an italic subtitle (Lora italic, 20px).

| id | Tab | Eyebrow | Header | Subtitle | Background | Text color |
|---|---|---|---|---|---|---|
| `top` | (brand) | A Geology History Project · 1877 to 1892 | **The Bone Wars** (h1) | Two scientists. One feud. More than 130 new dinosaur species pulled from the rocks of the American West. | `--layer-0` | `--ink`, muted `--ink-soft` |
| `rivals` | Rivals | Layer 01 | Rivals | Meet Marsh and Cope | `--layer-1` | `--ink`, muted `--ink-soft` |
| `origins` | Origins | Layer 02 | Origins | How a friendship became a war | `--layer-2` | `--ink`, muted `--ink-soft` |
| `timeline` | Timeline | Layer 03 | Timeline | The feud, year by year | `--layer-3` | `--ink`, muted `--ink-soft` |
| `geology` | Geology | Layer 04 | Geology | Reading the rocks | `--layer-4` | `--ink` only |
| `sites` | Dig Sites | Layer 05 | Dig Sites | The battlefields of the Bone Wars | `--layer-5` | `--ink` only |
| `discoveries` | Discoveries | Layer 06 · You've hit the bone bed | Discoveries | The spoils of war | `--layer-6` | `--parchment` |
| `scandal` | Scandal | Layer 07 | Scandal | The feud goes public, 1890 | `--layer-7` | `--parchment` |
| `legacy` | Legacy | Layer 08 | Legacy | What the war left behind | `--layer-8` | `--parchment`, eyebrow and subtitle `--tan` |
| `sources` | Sources | Bedrock | Sources | (none) | `--layer-9` | `--parchment`, eyebrow `--tan` |

**Hero extras:** a second line in italic `--ink-soft`: "Start at the surface and dig down. The deeper you scroll, the closer you get to the bones." Two buttons: "Start Digging ↓" (solid `--rust`, parchment text, links to `#rivals`) and "Jump to the Geology" (2px `--ink` outline, links to `#geology`). An image placeholder sits to the right of the text (stacks below on mobile).

**Footer:** `--layer-9` background, `--tan` text: "Created by [YOUR NAME] for [COURSE NAME], [SEMESTER]" on the left and a "Back to the surface ↑" link on the right.

## Strata dividers

Between every pair of sections, insert a 20px decorative band (`aria-hidden="true"`) made of four stripes from the section above (A) and below (B):

```css
background: linear-gradient(180deg, A 0 30%, B 30% 45%, A 45% 60%, B 60% 100%);
```

Tip: give each divider `--from` and `--to` custom properties so one CSS rule handles all of them.

## Placeholders

Until real content and images exist, use placeholder blocks:
- 2px dashed `--tan` (or `--rust` in the hero) border, centered text in Special Elite, wrapped in brackets, e.g. `[Portrait of Marsh]`.
- Give image placeholders `role="img"` and an `aria-label`.

## Layout and accessibility

- Content width: max 1200px, centered, side padding at least 16px.
- Section vertical padding: about 72 to 80px.
- Mobile-first and responsive down to ~360px with no horizontal scrolling.
- Visible focus styles on links and buttons; a "Skip to content" link.
- Respect `prefers-reduced-motion` (turn off smooth scrolling).
- Never use em dashes in site copy.

## Later iterations (not part of iteration 1)

- **Iteration 2, content:** rival cards (team-color bands, portraits, VS badge), origin cards (1864 / 1870 / 1877), vertical timeline with team-colored dots and legend, geology cards plus a simplified stratigraphic column, dig-site map with numbered team-colored pins plus a site list, Marsh ~80 vs Cope ~56 scoreboard, fossil cards (Stegosaurus, Allosaurus, Triceratops, Diplodocus, Camarasaurus, Coelophysis), Brontosaurus field note, 1890 newspaper-style box, legacy two-column list, sources list.
- **Iteration 3, polish:** real public domain images (Wikimedia Commons, Library of Congress, Yale Peabody), image credits, final citations.
