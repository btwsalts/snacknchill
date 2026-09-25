# SnacknChill

A neon cyberpunk-inspired movie, TV, and anime streaming interface built with vanilla HTML, CSS, and JavaScript.

SnacknChill is designed as a **frontend-first streaming hub** with a Gen-Z visual style, searchable content, category/type filters, a featured hero carousel, a watch page, episode navigation, and local "Continue Watching" history.

> **Project status:** Frontend prototype / personal project  
> **Primary stack:** HTML5, CSS3, JavaScript  
> **Data source:** Static catalog with TMDB IDs; playback is handled through an external embed URL.

## ✨ What the Project Does

SnacknChill provides a single-page browsing experience for:

- 🎬 Movies
- 📺 TV series
- 🍿 Anime
- 🔎 Title search
- 🏷️ Genre/category filtering
- 🎞️ Content-type filtering
- 🎠 Featured hero carousel
- ▶️ Watch-page navigation
- 📚 Season and episode selection for TV/anime entries
- 💾 Local "Continue Watching" history
- ❤️ Interactive bookmark buttons
- 📱 Responsive desktop/mobile layouts

The project intentionally keeps the frontend lightweight and does not use a JavaScript framework or build system.

## 🧩 Main Pages

### `index.html`

The main browsing page.

It contains:

- Branded header and search bar
- Featured content carousel
- Category filters
- Movie / TV / anime filters
- Dynamically generated content cards
- Continue Watching section
- Footer and newsletter UI
- Navigation to the watch page

The catalog is currently defined directly in JavaScript inside the page.

### `watch.html`

The dedicated playback page.

It reads URL parameters such as:

- `tmdb`
- `type`
- `title`
- `season`
- `episode`
- `seasons`

For TV and anime entries, it generates season selectors and episode buttons. The selected content is loaded into an iframe using an external video-embed endpoint.

### `style.css`

The main visual system for the project.

It handles:

- Dark cyberpunk theme
- Neon lime / magenta accents
- Hero carousel
- Movie cards
- Search UI
- Filter pills
- Watch layout
- Episode sidebar
- Continue Watching cards
- Responsive breakpoints
- Hover and transition effects

### `js/theme.js`

Small reusable interaction logic for:

- Bookmark toggling
- Vibe-pill interaction
- Emoji reaction counters

Some page-specific behavior remains inline in `index.html` and `watch.html`.

### `sample-catalog.csv`

A simple reference catalog containing TMDB IDs, titles, and content types for the sample library.

## 🏗️ How It Works

The project follows a simple client-side flow:

```text
index.html
   │
   ├── Static featured content
   ├── JavaScript catalog
   ├── Search/filter logic
   └── Content cards
            │
            ▼
       watch.html
            │
            ├── Movie playback
            └── TV/Anime playback
                    │
                    ├── Season selector
                    └── Episode selector
```

### Content catalog

The homepage contains a JavaScript catalog with fields such as:

```js
{
  tmdb_id: 550,
  title: "Fight Club",
  year: 1999,
  type: "movie",
  category: "Drama",
  seasons: 0
}
```

Cards are generated from this catalog rather than being manually written one by one.

### Search and filtering

The homepage maintains three filter states:

- Search query
- Active category
- Active content type

The cards are then shown or hidden according to the active filters.

### Watch URLs

When a user selects a title, the site builds a URL similar to:

```text
watch.html?tmdb=550&type=movie&title=Fight%20Club
```

For episodic content, season and episode information are added to the URL.

## 💾 Continue Watching

The watch page stores recently opened titles in browser `localStorage` under:

```text
snc_watch_history
```

The current implementation keeps up to 20 entries.

This means the history is:

- Client-side
- Browser-specific
- Not stored in a database
- Not synchronized between devices

## 🎨 Design Direction

SnacknChill uses a **dark cyberpunk / Gen-Z streaming aesthetic**.

Key visual characteristics include:

- Near-black backgrounds
- Neon lime highlights
- Electric magenta accents
- Rounded cards and controls
- Large cinematic hero imagery
- Smooth hover animations
- Compact metadata
- Responsive layouts

The design is intentionally energetic rather than resembling a traditional corporate streaming service.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Layout, styling, animations, responsiveness |
| Vanilla JavaScript | Search, filtering, carousel, playback routing, local history |
| Font Awesome | Icons |
| TMDB IDs | Content identification |
| Browser localStorage | Continue Watching history |
| External iframe embed | Video playback |

No framework, package manager, or backend is currently required.

## 🚀 Running Locally

Because the project is static, it can be served with almost any static web server.

For example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

A local web server is preferable to opening the files directly with `file://`, especially when testing browser APIs and navigation behavior.

## 📁 Project Structure

```text
snacknchill/
├── index.html
├── watch.html
├── style.css
├── sample-catalog.csv
└── js/
    └── theme.js
```

## 🔐 Important Implementation Notes

### External services

The project references external resources including:

- TMDB image URLs
- Font Awesome CDN
- An external video-embed endpoint

The application therefore depends on third-party services for parts of its functionality.

### Copyright and content

This repository is a frontend implementation. The presence of movie/show metadata or playback embeds does not grant distribution rights.

If this project is deployed publicly, only use content, images, APIs, and playback sources that you are authorized to use and make sure the deployment complies with applicable copyright, licensing, and platform rules.

## 🔮 Potential Next Steps

Some natural improvements would be:

1. Move the catalog into a dedicated JSON/API data source.
2. Separate the inline JavaScript from the HTML pages.
3. Add a proper backend for accounts and synchronized watch history.
4. Replace placeholder poster generation with reliable poster metadata.
5. Add loading and error states for external content.
6. Add accessibility improvements such as stronger keyboard navigation and ARIA states.
7. Add a real favorites/bookmarks data model instead of UI-only bookmark state.
8. Add automated validation and linting.
9. Add a proper deployment workflow.
10. Add a clear legal/privacy section before public production use.

## 📌 Why This Project Is Useful

From a software-engineering perspective, SnacknChill demonstrates practical frontend concepts without relying on a framework:

- DOM manipulation
- Event handling
- URL/query-parameter handling
- Client-side filtering
- Dynamic rendering
- Browser storage
- Responsive CSS
- Component-like reusable UI patterns
- Integration with external services
- Multi-page navigation

It is a good foundation for evolving a static frontend prototype into a larger full-stack application.

## 👤 Author

Built by **btwsalts** as a personal web development project.


---

## ✦ Interface Showcase

<p align="center">
<img src="https://image.tmdb.org/t/p/w1280/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" alt="SnacknChill hero" width="100%">
</p>

<table>
<tr>
<td><img src="https://image.tmdb.org/t/p/w780/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" alt="Inception"></td>
<td><img src="https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" alt="Interstellar"></td>
</tr>
</table>

## 🛠️ Stack at a Glance

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-111111?style=flat-square)

## 🧠 Application Flow

~~~mermaid
flowchart LR
A[Search / Filters] --> B[Dynamic Catalog]
B --> C[Movie / TV / Anime Card]
C --> D[watch.html]
D --> E[Playback]
D --> F[localStorage]
F --> G[Continue Watching]
~~~

## 💡 What Makes It Interesting

- No framework required
- Dynamic content cards generated from data
- Multiple filter states
- Query-parameter based watch routing
- Season and episode navigation
- Persistent browser history
- Responsive streaming-style UI

<details>
<summary><strong>Portfolio talking points</strong></summary>

This project demonstrates core frontend engineering without hiding the implementation behind a framework. It is a good example of DOM manipulation, event-driven UI, URL state, browser storage and external-service integration.

</details>
