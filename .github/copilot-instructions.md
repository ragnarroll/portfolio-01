# Copilot Instructions for Portfolio-01

## Project Overview
This is an Astro-based portfolio website for Michael Pasimio showcasing projects across three areas: Systems & Tech, Social Vision, and Sports & Health. The site features a home page, a filtered projects gallery, and individual project detail pages.

## Architecture & Key Patterns

### Page Structure
- **[src/pages/index.astro](src/pages/index.astro)**: Landing page with profile image, hero sections, and three-column project area overview
- **[src/pages/projects.astro](src/pages/projects.astro)**: Main projects gallery with inline projects array and tag-based filtering UI
- **[src/pages/projects/*.astro](src/pages/projects/)**: Individual project detail pages using `ProjectLayout`

### Component Hierarchy
- **[src/components/Header.astro](src/components/Header.astro)**: Navigation bar (Home, Projects, Resume PDF link)
- **[src/components/Footer.astro](src/components/Footer.astro)**: Logo and branding ("mvp" + turtle logo)
- **[src/layouts/ProjectLayout.astro](src/layouts/ProjectLayout.astro)**: Wrapper layout that includes Header/Footer; uses `Astro.props` for `projectTitle`

### Data Flow - Projects System
**Critical Pattern**: Projects data is defined as a hardcoded array in [src/pages/projects.astro](src/pages/projects.astro#L9-L65), not pulled from external sources. Each project object has:
- `slug`: URL-safe identifier matching the individual project filename
- `tags`: Array of filter categories ("social", "systems", "wellness")
- `tags_display`: Human-readable tags shown in UI
- `year`, `title`, `type`, `description`

When adding new projects:
1. Add object to the projects array in [src/pages/projects.astro](src/pages/projects.astro)
2. Create corresponding `.astro` file in [src/pages/projects/](src/pages/projects/) with slug name
3. Use [ProjectLayout](src/layouts/ProjectLayout.astro) wrapper and pass `projectTitle` prop

### Filtering System
- **Frontend filtering** via [src/scripts/filter.js](src/scripts/filter.js) - runs `initProjectFilters()` on DOM load
- Filter buttons use `data-filter` attributes matching tags (e.g., "all", "social", "systems", "wellness")
- Project cards have `data-tags` attributes containing space-separated tags for matching
- Visibility toggled via `.hidden` CSS class with staggered animation delays
- Project count badge updates dynamically as filters change

## Styling & Design System

### CSS Architecture
- [src/styles/global.css](src/styles/global.css): Core design tokens and base component styles
- [src/styles/filter.css](src/styles/filter.css): Filter UI and projects gallery specific styles
- [src/styles/old-css-header.css](src/styles/old-css-header.css): Legacy - likely deprecated

### Design Tokens (in `:root`)
Use these CSS variables for consistency:
- **Colors**: `--primary-color: #131D28`, `--secondary-color: #355070`, `--accent-color: #C59570`, `--tertiary-color: #A6A08D`
- **Typography**: `--font-primary` (Work Sans), `--font-heading` (Abril Fatface for headings, Georgia serif for body headings)
- **Spacing**: `--spacing-xs` through `--spacing-xl`
- **Transitions**: `--transition-fast`, `--transition-base`, `--transition-slow`

### Layout Patterns
- Two-column layout: `.two-column` with `.column-home` (used on index)
- Three-column layout: `.three-column` with `.column-project` (project areas section on index)
- Container widths: `.container` (max 1400px), `.container-narrow` (for parallax sections)
- Parallax effect sections use `.parallax` wrapper with `.hero` divs

## Development Workflow

### Key Commands
```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build locally
npm run astro     # Run Astro CLI directly
```

### Important Notes
- No database or external API integrations; all content is static/hardcoded
- No build step required for content updates (Astro handles file-based routing)
- Resume PDF linked externally: `../../Pasimio-Michael-Resume.pdf` (must exist in root)
- Profile image: `../profile-no-bg.png` (referenced from src/pages/)
- Turtle logo: `../../turtle-logo-white.png` (referenced from components/)

## Common Editing Scenarios

### Adding a Project
1. Update projects array in [src/pages/projects.astro](src/pages/projects.astro) (lines 9-65)
2. Choose tags from existing set ("social", "systems", "wellness") or add new ones
3. Create new file: `src/pages/projects/your-project-slug.astro` with content wrapped in `ProjectLayout`
4. No filter button creation needed—tags automatically sync

### Updating Styling
- Prefer CSS variables over hardcoded values
- Filter button styles in [src/styles/filter.css](src/styles/filter.css#L60-L90): uses `::before` pseudo-element for animated background
- Responsive design uses `clamp()` for fluid typography (e.g., h1 uses `clamp(2rem, 6vw, 7rem)`)

### Modifying Navigation/Header
- Edit [src/components/Header.astro](src/components/Header.astro) for nav links
- Edit [src/components/Footer.astro](src/components/Footer.astro) for footer branding

## Known Issues & Legacy Code
- `src/pages/old/` directory contains deprecated page copies (`old-index-copy2.astro`, `old-projects.astro`, `old-resume.astro`)—these should not be referenced
- `old-css-header.css` appears unused; check before relying on it
- Projects.astro is long (~139 lines); future refactor could extract projects array to separate file for maintainability
