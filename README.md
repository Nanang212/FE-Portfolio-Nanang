# static-frontend

This is the static frontend for the portfolio site (React + Vite + TailwindCSS).

Quick start — clone and run locally

Prerequisites
- Node.js v18 or later (v18, v20 recommended)
- npm (bundled with Node)

Commands

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd static-frontend
npm install
```

Run the dev server (hot reload):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

Other useful commands
- `npm run lint` — run ESLint

Files of interest
- Public assets: `public/images/` — place brand icons / illustrations here (favicon, brandIcon.png)
- Translations: `src/i18n/en.json` and `src/i18n/id.json`
- Layouts and components: `src/Components/Portfolio/` and `src/Layouts/`

Notes
- The assistant now runs in free FAQ mode using local retrieval from `public/data/knowledge.json`.
- No AI model/API key is required for the default assistant mode.
- To enable OpenRouter, put your key in `.env.local` on the server side:

```bash
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_MODEL=openai/gpt-4o-mini
OPENROUTER_SITE_URL=http://localhost:5173
OPENROUTER_APP_NAME=Portfolio Assistant
```

- If you deploy to Vercel or another host, set the same environment variables in the deployment dashboard.
- Never put the key in `src/` or expose it through Vite client env variables like `VITE_*`.
- If you used `vercel dev` before and it created `.env.local`, you can remove old AI env vars like `GEMINI_API_KEY`, `OPENAI_API_KEY`, `OLLAMA_MODEL`, and `OLLAMA_BASE_URL`.
- If you prefer `yarn` or `pnpm`, you can use them instead of `npm` (install deps with `yarn` / `pnpm install`).

If you want I can add a short CONTRIBUTING section, environment examples, or a script to auto-copy images into `public/images`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
