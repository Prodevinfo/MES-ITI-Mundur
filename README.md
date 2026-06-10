# M.E.S. Private ITI Mundur — UI/UX & GitHub Pages Deployment Guide

This document provides a summary of the refined UI/UX design architecture implemented for the M.E.S. Private ITI Mundur website and details.

---

## 1. UI/UX Design System & Enhancements

### 1.1 Responsive Brand Typography Header
- **Crest Logo Integration**: Integrated a high-resolution crest logo (`assets/images/mes-logo.png`).
- **Responsive HTML/CSS Text Brand**: Replaced the squished image banner with a sharp, three-line vector HTML brand layout (`Dr. PK Abdul Ghafoor Memorial | MES Pvt ITI | Mundur, Palakkad`). This scales cleanly on desktop and collapses into a single-line branding in the mobile drawer.

### 1.2 News Ticker Alerts (Relocated)
- **Top Bar Alignment**: Configured `.news-ticker` and `.news-marquee` with vertical flex centering (`height: 100%`, `align-items: center`) to align the scrolling texts and bell alerts.
- **Relocated Above the Fold**: Moved the news ticker bar from below the hero section to immediately below the sticky header. This ensures the scrolling alerts are visible above the fold on all standard viewports and prevents clipping by taskbars.
- **Relative Anchors**: Dynamic paths within subpages (`admissions.html`, `placements.html`, `blog.html`) were corrected to resolve relatively without parent folder prefixes.

### 1.3 Floating Notifications Drawer (Announcements)
- **Visual Trigger Tab**: Pinned to the right margin with glassmorphism blur (`backdrop-filter: blur(8px)`) and a pulsing gold badge displaying the count of unread announcements.
- **Slide-out Bulletin**: Tapping the widget slides out a dedicated announcements drawer, complete with custom categorized tags and links. 
- **Mobile Adjustments**: The trigger automatically slides down near the bottom right on mobile devices (`max-width: 768px`) to prevent overlapping with the navigation menu button.

### 1.4 Placements Marquee Text Wrap Fix
- **No-wrap Rules**: Introduced a light-themed `.recruiter-logo-light` class for light backgrounds.
- **Grid Stability**: Applied this class to all 16 items on the Placements page (`pages/placements.html`), ensuring long names like *"Kerala State Electricity Board (KSEB)"* remain fully horizontal and scroll smoothly without wrapping vertically.

### 1.5 Mobile Top Utility Bar
- **Structured Rows & Grid**: On viewports under `600px`, the top bar is split into a stacked column layout:
  - **Top Row**: Center-aligned contact info (Phone, Email) with a thin bottom dividing border.
  - **Bottom Row**: A perfect 2x2 grid containing the Statutory committees, NCVT MIS, DGT Portal, and Sitemap links.
- **Modal Dropdown Positioning**: Toggled the `.dropdown` element to `position: static` on mobile. This makes the `.dropdown-menu` expand relative to the `.top-bar` boundaries, filling the width of the screen with a `10px` margin to prevent off-screen clipping.
- **Click Event Helper**: Attached click events in `js/app.js` to enable smooth toggle functionality for mobile touchscreen users.

---

## 2. GitHub Pages Deployment Guide

The project's code architecture is designed to support **GitHub Pages subfolder routing** out of the box because it uses relative path references (`../` and direct relative paths) rather than absolute root links (`/`).

1. **Push Changes to GitHub**:
   Ensure all local changes are committed and pushed to the remote repository. Run the following command if you make future edits:
   ```bash
   git add .
   git commit -m "Refine mobile top bar and add UI/UX documentation"
   git push origin main
   ```

---

## 3. Directory Structure

To keep the repository clean, subpages are separated into a dedicated subdirectory:
```text
MES-ITI-Mundur/
├── index.html            # Main Landing Page (Root Entry Point)
├── UI_UX.md              # UI/UX & Deployment Documentation (This file)
├── css/
│   └── styles.css        # Main Stylesheet & HSL Design Tokens
├── js/
│   └── app.js            # App Logics (Drawer, Slider, Modals, Forms)
├── assets/
│   └── images/           # Compressed, Web-optimized Campus Images & Logos
├── pages/
│   ├── about.html        # About Us & statutory stat tables
│   ├── admissions.html   # Online Multi-Step Admissions Form
│   ├── blog.html         # Blog Feed, Search & Articles
│   ├── contact.html      # Contact & Embedded Google Maps Pin
│   ├── gallery.html      # Masonry Campus Life Gallery & Lightbox
│   ├── placements.html   # Placements rate dashboard & recruiter marquee
│   ├── sitemap.html      # Interactive Sitemap Directory
│   └── trades.html       # Trades details & curriculum Syllabus
└── docs/                 # Architectural Blueprints & Site Maps
```
