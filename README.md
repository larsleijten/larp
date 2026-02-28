# LARPing Event Website

## Overview
This is a static website for "Het Rijk Ontwaakt", a LARP event. The site features a rich medieval/ancient fantasy theme, immersive lore pages, and interactive mini-games.

### Key Features
- **Thematic Styling:** "Ancient Onyx" theme with rune textures, gold accents, and ember-like highlights.
- **Interactive Elements:**
  - Cursor torchlight glow (`main.js`).
  - Animated navigation and button hover effects.
  - "Flappy Dragon" mini-game with custom assets and high-score tracking.
  - "Dwarven Twerk Simulator" (placeholder/implemented logic).
  - Name Generator with thematic UI.

## Technical Implementation Details

### File Structure
- `index.html`: Landing page.
- `announcements.html`: Event news.
- `lore.html`: Backstory and world-building.
- `name-generator.html`: Interactive tool for character names.
- `twerk.html`: Twerk simulator page.
- `flappy-dragon.html`: Flappy bird clone page.
- `styles.css`: Central stylesheet containing all theme variables, animations, and responsive rules.
- `main.js`: Global scripts (footer date, cursor glow).
- `flappy-dragon.js`: Logic for the Flappy Dragon game.
- `images/`: Asset directory containing textures (`rune_lower_background.png`, `rune_top_banner.png`) and game sprites.

### Design System (`styles.css`)
- **Variables:**
  - Colors: Onyx (`#080606`) for backgrounds + `background-image` textures.
  - Text: `Cormorant Garamond` (body) and `Cinzel` (headers).
  - Accents: Ember Orange (`#b54518`) and Tarnished Gold (`#dcae5f`).
  - Glows: `--glow-purple`, `--glow-orange`, `--glow-green` for interactive feedback.
- **Effects:**
  - `#cursor-glow`: A fixed `div` with `mix-blend-mode: screen` tracking mouse position.
  - `flame-pulse`: Animation for cards and buttons.
  - `ancient-flicker`: Text shadow animation for emphasized elements.

### Game Logic (`flappy-dragon.js`)
- **State Management:** `START`, `PLAYING`, `GAMEOVER`.
- **Input:**
  - `Space`: Starts game (from START) and flaps (during PLAYING).
  - `Click/Touch`: Flaps (during PLAYING).
- **Assets:** Custom dragon, sword (top obstacle, rotated), and tower (bottom obstacle) images.
- **Storage:** Uses `localStorage` for high scores.

## Maintenance & Updates
- **Keep Updated:** This README serves as the project's living documentation. Update it whenever new pages, significant scripts, or major style overhauls are added.
- **Style Changes:** When modifying the theme, check `styles.css` for conflicting older styles (e.g., previous "neon" colors).
- **Game Tweaks:** Adjust `gravity`, `lift`, and `gap` in the `game` object in `flappy-dragon.js` to balance difficulty.

## Progress Tracker
- [x] Initialize project structure
- [x] Create base medieval theme styles
- [x] Add global navigation and footer
- [x] Create pages: Home, Heralds, Lore, Name Generator, Dwarven Twerk Simulator, Flappy Dragon
- [x] Integrate Name Generator logic & styles
- [x] Integrate Dwarven Twerk Simulator logic
- [x] Implement Flappy Dragon with custom assets and high score
- [x] Translate website to Dutch
- [x] Apply "Ancient Onyx" visual overhaul (Textures & Lighting)
- [x] Add cursor glow and hover effects
- [x] Refine Flappy Dragon input (Space to start)
- [x] Review copy/content and polish
- [ ] Optional: add favicon
