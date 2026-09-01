\# Front-End Polish \& Upgrade Guidelines (Strict Theme \& Palette Preservation)



\## Core Rule: Zero Color or Theme Alterations

\- \*\*Strictly preserve all existing colors, background shades, borders, and brand accents.\*\* Do not introduce dark mode if the app is light mode, and do not swap out existing brand colors.

\- Extract existing color values directly into `:root` CSS custom properties (e.g., `--bg-main`, `--card-bg`, `--primary-accent`, `--text-main`, `--border-color`) to maintain 100% color fidelity across the entire codebase.



\## What to Upgrade (Craftsmanship \& Polish Only)

1\. \*\*Layout \& Alignment\*\*:

&#x20;  - Modernize container layouts using clean CSS Grid and Flexbox with consistent spacing (`gap`, `padding`, `margin`).

&#x20;  - Fix visual alignment issues between cards, filters, chart canvases, and data tables.

2\. \*\*Typography \& Hierarchy\*\*:

&#x20;  - Polish font sizes, line heights, and letter spacing for clean legibility.

&#x20;  - Enforce `font-variant-numeric: tabular-nums` on all metrics, counters, and prices to prevent layout jitter when data updates.

3\. \*\*Micro-Interactions \& Feel\*\*:

&#x20;  - Add subtle, smooth CSS transitions (`transition: all 0.2s ease`) on button hover, card hover (`transform: translateY(-2px)`), and focus states.

&#x20;  - Add clean subtle borders and shadows derived from the existing background/surface colors.

4\. \*\*Data Visualizations (Chart.js / Native Canvas)\*\*:

&#x20;  - Match chart lines, bars, and tooltip accents to the existing color palette.

&#x20;  - Improve chart responsiveness, axis formatting, and tooltip styling without modifying underlying dataset calculations.

5\. \*\*Code Quality \& Responsiveness\*\*:

&#x20;  - Ensure semantic HTML5 tags.

&#x20;  - Add clean responsive media queries for desktop, tablet, and mobile layouts.

&#x20;  - Keep all existing JavaScript event listeners, data fetching, and calculation logic intact.

