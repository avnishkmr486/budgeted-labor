# Altametrics Back Office — Design System

A design system that recreates the visual language of **Altametrics Back Office**, the back-of-house operations console used by restaurant operators to close out the business day: review cash & sales, forecasts, food/inventory variance, labor, and payroll. It is a dense, data-heavy enterprise web application in the classic "operations cockpit" tradition.

> **Sources.** This system was reverse-engineered from product screenshots only (`uploads/Design System Home*.png`) — the "My Workflow" dashboard and the "Summary" reports view. No source code, Figma file, or brand kit was provided. Colors were sampled directly from those screenshots; type and spacing are inferred from the rendered UI. **If you have the codebase, Figma, or official brand assets, share them — several values below are best-effort approximations (see Caveats).**

---

## Product context

Back Office is the manager/admin web app of the Altametrics restaurant platform. The screens captured center on a single store ("1018, Eden") and a **Start of Day** workflow:

- **My Workflow** — a per-store daily checklist. A KPI strip (Forecasted vs Actual Sales, Variance, Labor %, OT Hours, ICOS %) sits above a "Start of Day" panel. The panel pairs a column of module launchers (Cash and Sales, Forecast, Food Management, Labor Management, Payroll Management) with horizontal **workflow chains** of green pennant task nodes (person + checkmark) connected by black baselines.
- **Summary** — stacked report panels (Daily Cash & Sales, Inventory) rendered as sortable data tables with a green/red padlock **Status** column, "Records per page" + search controls, and pagination.

The audience is operational, not consumer: information density, scannable tables, and fast data entry win over whitespace and ornament.

---

## Content fundamentals

How copy reads in Back Office:

- **Domain-literal and terse.** Labels are nouns or noun phrases, Title Case, no articles: "Forecasted Sales", "Gross Sales", "Records per page", "Last Cash and Sales Polling". Buttons are short imperatives in caps or Title Case: **GO**, **Help**, "Print Prep Guide".
- **Operational vocabulary.** Restaurant-ops jargon is used plainly and unglossed: ICOS, PMIX, COS, Theo. $, Transfer In/Out, Waste, Bin Guide, Timecards, OT Hours, Polling.
- **Voice is system → operator, third person.** Status lines state facts ("Last PMIX Polling : 08:01 AM EST", "Showing 1 - 5 of 5 records"). No "you", no marketing voice, no encouragement copy.
- **Numbers are the content.** Currency with `$` and thousands separators (`$8,196.92`); percentages with `%`; **negatives in parentheses** (`(2.83%)`, `($216.67)`) and tinted red. Dates are `MM/DD/YYYY`. Times carry an explicit timezone (`EST`).
- **No emoji, ever.** Status is communicated with color + iconography (padlocks, checks), not emoji.
- **Casing.** Section/panel titles Title Case ("Start of Day", "Cash Column: Daily-Cash & Sales Report"). Column headers Title Case. The brand name is "Altametrics".

---

## Visual foundations

- **Overall feel.** Flat, square, Bootstrap-3-era enterprise. High density, hairline rules everywhere, minimal whitespace. Function over polish.
- **Color.** A dark navy chrome (`--chrome-900 #292b37`) frames the app (top bar + left rail). **Brand red (`#de202b`)** is the accent: the logo mark, the "Help" pill, active-nav left borders, destructive actions. **Action blue (`#2c6fad`)** drives primary buttons (GO), links, and the active page in pagination. **Deep navy (`#0b0b3b`)** fills section headers ("Start of Day"). Specialty gradients identify specific controls: **steel-blue beveled buttons** for module launchers, a **purple gradient** for the date/period selector, and a **gray gradient stack** for KPI metric tiles. **Green (`#36b447`)** means done/locked/on-track (task pennants, status padlocks, progress bar).
- **Type.** A web-safe sans stack — **Arial / Helvetica** — at small sizes (11–14px for UI, up to ~24px for big figures). Bold (700) for labels, headers, buttons, and all numeric values; regular (400) for body/table text. Financial figures use **tabular numerics**.
- **Spacing.** Tight, on a 4px base. Controls are 26–32px tall; table rows ~38px; content padding ~16px. Layout chrome: 54px collapsed icon rail (220px expanded), 50px top bar.
- **Corners & borders.** Small radii — **2–3px** on buttons, inputs, cards; pill (999px) only for the Help button and count chips. Crisp **1px** gray borders (`#dddddd`–`#c4c4c4`) on every control, panel, and table.
- **Elevation.** Subtle. Panels/cards get `0 1px 2px rgba(0,0,0,.12)`. The signature non-flat element is the **bevel**: module buttons and KPI tiles use a top inset highlight + bottom drop shadow (`--bevel-up`) to read as raised; pressed state inverts to an inset shadow (`--bevel-down`).
- **Backgrounds.** Solid fills only — no photography, illustration, texture, or large decorative gradients. App canvas is light gray (`#f0f0f0`); content panels are white; control strips and table headers are `#ececec`. Gradients are reserved for the three functional controls noted above (steel module buttons, purple date selector, gray KPI tiles) and the striped green progress bar.
- **Tables.** Gray header (`#ececec`) with **underlined sortable** column labels; white body with hairline row rules and optional zebra striping; blue linked first cells; right-aligned numerics; a centered Status column with padlock glyphs.
- **Animation.** Effectively none. This is a snappy, state-driven CRUD UI — no entrance animations, parallax, or decorative motion. Treat transitions as instant; at most a quick hover color change.
- **Hover / press.** Hover = slight darken or a faint light overlay (`rgba(255,255,255,.08)` on dark nav). Press on beveled controls = switch from `--bevel-up` to `--bevel-down` (pushed-in). Links underline on hover.
- **Transparency / blur.** Used only as low-opacity white overlays on the dark chrome for hover/active nav states. No backdrop blur, no glassmorphism.
- **Imagery vibe.** N/A — the product ships no photography or illustration in these views. The only raster asset is the logo.

---

## Iconography

- **Primary set: the real Altametrics icons (`assets/images/`).** The product's own icon assets are now bundled — 126 files spanning the SVG **"New UI" navigation set** (`homenewui.svg`, `workforcenewui.svg`, `reportNewWhite.svg`, `P&lnewWhite.svg`, `helpnewui.svg`, `logoutnewui.svg`, `myprofileiconnewui.svg`, `MenuopenNewUI.svg`/`MenuCloseNewUI.svg`, plus `White` variants for dark chrome), the vector brand mark (`AltametricsIcon.svg`, `AltametricsIconBarNewUI.svg`), action/toolbar PNGs (`Edit`, `Delete`, `Copy`, `Filter`, `Approve`, `Publish`, `Plus`, `Close`, `Unlock`, `search`, `calendar`, export icons), workforce/status icons (`terminated`, `minor`, `youth`, `pendingNewHire`, `loa`, `permitexpi`, punch in/out states), and a weather-icon set (`ClearSky`, `Cloudy_NewUI`, `Fog`, `Overcast`, `MostlyCloudy`, `Sleet_New`, `Snow new`).
- **Prefer these real assets** over drawn glyphs in any production or high-fidelity work — reference them by `assets/images/<name>`. The full set is previewed in the **Icon & Asset Library** card (Brand group).
- **Style:** flat, single-color, simple line/solid icons. `*White.svg` / `helpNewWhite.svg` variants are tuned for the dark navy chrome; blue/`Press` variants indicate active/pressed nav states (e.g. `TeamCenterIconBlue` vs `TeamCenterIconWhite`, `skillUpgAppNewui` vs `...Press`).
- **Font Awesome 6 (solid)** is still used as a *fallback* inside the React component primitives (StatusLock padlock, Pagination/DateSelector chevrons, WorkflowTask check) where a matching brand asset isn't wired in. For production, swap these for the real assets above.
- **Note:** a handful of files in `images/` are reference UI screenshots rather than icons (e.g. `pageVarianceAct.png`, `itemHistoricalData.png`, `dailyPmixForecast.png`, `ribbonReport.jpg`); they're kept for context but aren't part of the icon set.
- **Emoji:** never used.
- **Unicode chars:** not used as icons.
- **Logo:** vector `assets/images/AltametricsIcon.svg` is the preferred mark. `assets/logo-altametrics-lockup.png` / `logo-altametrics-mark.png` are low-res screenshot crops kept for the dark-chrome lockup; prefer the SVG where a mark alone is needed. `assets/icon-task-badge.png` is a reference crop of the green workflow pennant.

---

## Foundations & tokens

`styles.css` (root) is the single entry point consumers link; it only `@import`s the token files:

- `tokens/colors.css` — brand, chrome, navy, blue, steel, green, purple, KPI, neutrals + semantic aliases.
- `tokens/typography.css` — Arial/Helvetica stack, size scale, weights, line-heights.
- `tokens/spacing.css` — 4px spacing scale + layout/control sizing.
- `tokens/elevation.css` — radii, borders, shadows, the bevel shadows, focus ring.
- `tokens/base.css` — element resets, link defaults, `.ab-tabular` / `.ab-negative` helpers.

Prefer **semantic aliases** (`--surface-card`, `--text-link`, `--action-primary`, `--status-success`) over raw scale values in new work.

---

## Index / manifest

**Root**
- `styles.css` — global CSS entry (import manifest).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `base.css`.
- `assets/` — logo crops (`logo-altametrics-lockup.png`, `logo-altametrics-mark.png`, `icon-task-badge.png`) + `images/` (126 official Back Office icons/assets: the SVG "New UI" nav set, vector brand mark `AltametricsIcon.svg`, action/toolbar PNGs, weather + workforce status icons).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- `SKILL.md` — Agent-Skill entry point for downloading/using this system in Claude Code.

**Components** (`components/<group>/`) — each is `Name.jsx` + `Name.d.ts` + `Name.prompt.md`, with one `*.card.html` per group:
- `core/` — **Button**, **ModuleButton**, **Panel**
- `data/` — **KpiCard**, **DataTable**, **Pagination**, **StatusLock**
- `feedback/` — **Badge**, **WorkflowTask**
- `forms/` — **Input**, **Select**, **DateSelector**
- `navigation/` — **Tabs**, **SidebarNav**

**UI kits** (`ui_kits/<product>/`)
- `back-office/` — interactive recreation of the Back Office dashboard. `index.html` toggles between the **My Workflow** (KPIs + Start-of-Day workflow) and **Summary** (report tables) screens. Screens: `Chrome.jsx`, `WorkflowScreen.jsx`, `SummaryScreen.jsx`, `Workflow.jsx`.

---

## Caveats

- **Screenshots were the only source.** Colors are sampled (close); type family, exact sizes, spacing, and radii are inferred and may differ from production CSS.
- **Fonts:** assumed Arial/Helvetica (system). If Back Office uses a specific licensed face, supply it.
- **Icons:** the real Altametrics icon set is now bundled in `assets/images/` (including vector SVGs). Font Awesome 6 remains only as a fallback inside the React component primitives.
- **Logo:** vector `assets/images/AltametricsIcon.svg` is available; the PNG lockup crops are lower-res.
