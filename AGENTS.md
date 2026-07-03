<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Agent Rules

This repository is a reusable project boilerplate. Optimize changes for future
projects, not only for the current demo screens.

Before coding:

- If `node_modules/next/dist/docs/` is missing, run `npm ci` first.
- Read the relevant bundled Next.js 16 docs for the touched area. Common files:
  - `01-app/01-getting-started/02-project-structure.md`
  - `01-app/01-getting-started/05-server-and-client-components.md`
  - `01-app/01-getting-started/15-route-handlers.md`
  - `01-app/01-getting-started/16-proxy.md`
  - `01-app/02-guides/environment-variables.md`
  - `01-app/02-guides/ai-agents.md`
- Read `CLAUDE.md` for project architecture, module boundaries, and workflow
  conventions.
- Read `.agent-platform/manifest.json` and the referenced context files when
  changing routes, modules, environment variables, or template customization
  guidance.

Core rules:

- Keep `src/app/` thin: routes, layouts, metadata, and route handlers only.
- Put business logic in `src/modules/<feature>/` and expose it through that
  module's `index.ts` public API.
- Preserve the Auth.js split: `src/proxy.ts` may import
  `@/modules/auth/edge`, never the full auth instance.
- Prefer Server Components. Add `'use client'` only for state, effects, event
  handlers, browser APIs, or client-only hooks/stores.
- Keep `src/env.ts`, `.env.example`, README, `CLAUDE.md`, and
  `.agent-platform/` synchronized when configuration changes.
- Run `npm run validate:template` after changing routes, modules, docs, env,
  or agent context.
