# AGENTS.md

## Project Overview

Build a lightweight vocabulary-learning web app that runs entirely in the browser and is hosted on GitHub Pages.

The app should:
- Be beginner-friendly and clean
- Work fully offline after first load
- Save all user data in the browser
- Require no backend or database
- Be easy to extend later
- Use modern JavaScript practices
- Be mobile-friendly
- Be optimized for GitHub Pages hosting

---

# Tech Stack

Use:
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

Do NOT use:
- Node.js backend
- Server-side rendering
- Databases
- Authentication systems
- Heavy frameworks unless explicitly requested later

Optional lightweight libraries are acceptable if they improve UX significantly.

---

# Hosting Requirements

The app will be hosted on GitHub Pages.

Requirements:
- Must work as a static site
- All assets must be relative-path safe
- No server dependencies
- No environment variables required
- No build step required unless absolutely necessary

Preferred structure:

/
├── index.html
├── style.css
├── app.js
├── assets/
├── data/
└── README.md

---

# Core Features

## 1. Vocabulary Word Management

Users can:
- Add vocabulary words
- Edit words
- Delete words
- Search/filter words

Each vocabulary entry should contain:
- Word
- Definition
- Example sentence
- Category or tag
- Difficulty level
- Date added

Optional:
- Pronunciation
- Synonyms
- Notes

---

## 2. Local Storage Persistence

IMPORTANT:
All data must persist using browser storage.

Use:
- localStorage as default

Optional:
- IndexedDB if scaling becomes necessary

Requirements:
- Auto-save changes immediately
- Restore data automatically on page load
- Never lose user data during refresh

Structure data cleanly using JSON.

Example structure:

```js
[
  {
    id: "uuid",
    word: "abundant",
    definition: "existing in large quantities",
    example: "Food was abundant.",
    category: "adjective",
    difficulty: "easy",
    createdAt: "2026-05-10"
  }
]