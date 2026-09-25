# SnacknChill — Project Overview

## 1. Project Summary

SnacknChill is a static frontend prototype for a movie, TV-series, and anime discovery/streaming interface.

The project combines a **cyberpunk visual identity** with practical frontend functionality. It is currently implemented without React, Vue, Angular, a backend server, or a package-management workflow.

The core idea is:

> Browse → filter/search → select a title → open a dedicated watch page → choose a season/episode when applicable.

## 2. Current Architecture

The project is intentionally simple:

- `index.html` is the main discovery page.
- `watch.html` handles playback/navigation.
- `style.css` provides the shared visual system.
- `js/theme.js` contains reusable UI interactions.
- `sample-catalog.csv` acts as a small catalog reference.

Most application logic is currently embedded directly in the HTML files.

## 3. Frontend Features

### Discovery

The homepage provides a featured carousel containing example titles such as Fight Club, Inception, Interstellar, Stranger Things, and Demon Slayer.

### Catalog

The current sample catalog contains movie, TV, and anime entries identified using TMDB IDs.

### Search

Users can search the generated title cards from the main header.

### Filtering

The UI supports:

- Genre/category filters
- Movie / TV / Anime filters
- Combined filtering with search

### Watch page

The watch page accepts content information through query parameters.

Movie playback uses a movie embed route, while TV/anime playback uses season and episode parameters.

### Continue Watching

The browser stores recently selected titles using `localStorage`.

This is a useful prototype technique because it requires no backend, but it is not suitable for synchronized multi-device accounts.

## 4. Code Organization

### Current strength

The project has a very low setup barrier.

There is no:

- `npm install`
- build step
- framework
- database
- server-side application

A static web server is enough to run the frontend.

### Current limitation

A significant amount of behavior lives inside `index.html` and `watch.html`.

As the application grows, this will become harder to maintain.

A future structure could be:

```text
snacknchill/
├── index.html
├── watch.html
├── css/
│   ├── base.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── catalog.js
│   ├── filters.js
│   ├── player.js
│   ├── history.js
│   └── theme.js
├── data/
│   └── catalog.json
└── assets/
```

## 5. Data Flow

The current data flow is mostly client-side:

```text
JavaScript catalog
      ↓
Card renderer
      ↓
Search + category/type filters
      ↓
Selected title
      ↓
Query parameters
      ↓
watch.html
      ↓
External iframe player
```

For TV/anime:

```text
Title
 ↓
Season selector
 ↓
Episode selector
 ↓
Updated URL
 ↓
New iframe source
```

## 6. State Management

The project does not have a formal state-management library.

Instead it uses:

- JavaScript variables for active filters
- URL query parameters for selected playback state
- `localStorage` for watch history
- DOM classes for visual state

This is appropriate for a small static prototype.

## 7. Visual System

The UI uses a dark base with bright accent colors.

The main design language includes:

- Cyberpunk-inspired neon accents
- Large cinematic hero sections
- Rounded controls
- Content cards
- Smooth hover movement
- Responsive layouts
- High-contrast typography

The styling is centralized in `style.css`, which makes it possible to change the overall visual identity without rewriting the HTML structure.

## 8. Engineering Observations

### Good foundations

The project already demonstrates several useful software-engineering practices:

- Semantic page separation
- Reusable CSS classes
- Data-driven card generation
- URL-based navigation
- Responsive design
- Client-side persistence
- Progressive enhancement of UI interactions

### Areas to improve

For a more production-oriented codebase:

**Separate concerns**

Move page-specific JavaScript into external modules rather than keeping large scripts inside HTML.

**Centralize data**

Store the catalog in JSON or retrieve it from an API rather than maintaining the same content concepts in multiple places.

**Improve error handling**

External image and iframe resources can fail. User-facing loading/error states would make the application more robust.

**Avoid duplicated CSS**

The stylesheet contains several later overrides for the same selectors. Consolidating these rules would make future maintenance easier.

**Improve accessibility**

Add clear focus states, keyboard controls, meaningful ARIA labels, and better semantic structure.

**Add testing**

Basic JavaScript tests and HTML/CSS validation would help prevent regressions as features are added.

## 9. Portfolio Value

For a beginner software-engineering portfolio, this project can demonstrate more than simply "I made a website."

It shows experience with:

- Frontend architecture
- JavaScript DOM APIs
- Responsive UI engineering
- Client-side state
- Browser storage
- External service integration
- Dynamic content rendering
- Multi-page application flows

A strong future version could turn this into a full-stack project with authentication, an API-backed catalog, persistent user profiles, watch progress, and an administration system.

## 10. Suggested Roadmap

### Phase 1 — Cleanup

- Extract inline JavaScript
- Remove duplicated CSS
- Organize assets
- Add consistent naming conventions
- Add a proper README

### Phase 2 — Data

- Move catalog into JSON
- Create a single content model
- Add validation for catalog entries
- Add poster/backdrop metadata

### Phase 3 — Application

- Add backend API
- Add authentication
- Store user favorites
- Store watch history server-side
- Track episode progress

### Phase 4 — Production

- Add automated tests
- Add CI/CD
- Add monitoring/error logging
- Improve accessibility
- Add legal/privacy documentation
- Deploy using an appropriate hosting architecture

## 11. Overall Technical Character

SnacknChill is best described as a **static, client-side streaming UI prototype** rather than a complete streaming platform.

Its strongest characteristic is its combination of a distinctive visual design with practical JavaScript functionality, while keeping the implementation simple enough to understand and modify.

