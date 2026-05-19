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
- This is a client-only frontend. If you connect it to a backend API, set any required base URLs in your runtime environment or modify the code to point to your API endpoints.
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
