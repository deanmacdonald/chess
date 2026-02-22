# Chess Frontend UI

A modern Vite + React chess interface with real-time play, Stockfish integration, and a clean modular architecture.

---

## 🚀 Tech Stack

- React 19
- Vite 7
- Socket.IO (real-time multiplayer)
- Stockfish (engine analysis)
- Chess.js / ChessOps (rules + move validation)
- Prettier + ESLint (formatting + linting)
- TypeScript type-checking for JS

---

## 📁 Project Structure

src/
components/
hooks/
logic/
assets/
styles/
pages/
App.jsx
main.jsx

- components/ — UI building blocks
- logic/ — chess rules, engine integration, utilities
- hooks/ — custom React hooks
- assets/ — images, sounds
- pages/ — route-level components

---

## 🧩 Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| npm run dev       | Start dev server                  |
| npm run build     | Build for production              |
| npm run preview   | Preview production build          |
| npm run lint      | Run ESLint                        |
| npm run lint:fix  | Auto-fix lint issues              |
| npm run format    | Format with Prettier              |
| npm run typecheck | Type-check JS using TS            |
| npm run clean     | Remove dist, node_modules, caches |

---

## 🧼 Code Quality

### ESLint

Configured with:

- React rules
- Hooks rules
- React Refresh rules
- JS recommended rules

### Prettier

Configured with:

- Tailwind plugin
- 100-char line width
- No semicolons
- Single quotes

---

## 🛠️ Development

Start the dev server:

npm run dev

Run type-checking:

npm run typecheck

Format everything:

npm run format

---

## 📦 Build

npm run build

Output goes to:

dist/

---

## 🧠 Notes

- JS is fully type-checked using TypeScript without converting files.
- Chess logic is isolated in src/logic/ for clarity and testing.
- The project is structured for future expansion (themes, puzzles, AI opponents, etc.).

---

## 📄 License

MIT
