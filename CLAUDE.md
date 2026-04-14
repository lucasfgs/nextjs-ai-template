# CLAUDE.md — AI Context for nextjs-ai-template

This file provides context for AI assistants working in this codebase.
Read this before making changes. Keep it updated as the project evolves.
Machine-readable companion context lives in `.agent-platform/`.

## Project Overview

A production-ready Next.js 16 starter/boilerplate with full authentication,
type-safe database access, modular feature architecture, and AI-friendly
code organization. Designed as a plug-and-play base for new projects.

## Tech Stack

| Concern       | Library                          | Notes                                |
| ------------- | -------------------------------- | ------------------------------------ |
| Framework     | Next.js 16 (App Router)          | React 19, Server Components          |
| Auth          | Auth.js v5 (next-auth@beta)      | JWT strategy + PrismaAdapter         |
| Database      | Prisma 7 + PostgreSQL            | Singleton client in lib/prisma.ts    |
| Styling       | Tailwind CSS v4 + CSS variables  | Dark mode via next-themes            |
| UI components | Radix UI + CVA + shadcn pattern  | src/components/ui/ — barrel index    |
| Design docs   | Storybook 10                     | npm run storybook (port 6006)        |
| Server state  | TanStack Query v5                | Client Components only               |
| Client state  | Zustand v5                       | Client Components only               |
| Forms         | React Hook Form v7 + Zod v4      | Or useActionState for Server Actions |
| Email         | Resend + @react-email/components | Optional, gracefully degrades        |
| Env           | @t3-oss/env-nextjs               | Validated at startup via src/env.ts  |
| Testing       | Jest 30 + RTL 16                 | jsdom environment                    |

## Directory Conventions

```
src/
  app/           — Next.js App Router ONLY. No business logic here.
  modules/       — Feature modules (plug-and-play). Each has index.ts barrel.
    template/    — Replaceable starter/example product screens for downstream apps.
  components/
    ui/          — shadcn/ui components. Use `npx shadcn add <name>` to add.
    common/      — Shared non-module components (providers, spinners).
    layout/      — Header, sidebar, footer shell components.
  config/        — Shared navigation, page metadata, and route context config.
  lib/           — Pure utilities (no React, no side effects at import time).
  store/         — Zustand stores. Client Components only.
  providers/     — React context providers composed into root layout.
  hooks/         — Global shared React hooks.
  env.ts         — Single source of truth for all environment variables.
  proxy.ts       — Edge-safe auth guards + redirects (imports auth config only).
```

## Module Structure Rule

Every feature module in `src/modules/` MUST follow this layout:

```
src/modules/<name>/
  index.ts              <- PUBLIC API only — the only file imported from outside
  <name>.service.ts     <- Business logic
  <name>.repository.ts  <- Prisma data access (for DB modules)
  actions/              <- Next.js Server Actions ('use server')
  components/           <- React components
  hooks/                <- Custom React hooks
  schemas/              <- Zod validation schemas
  types/                <- TypeScript interfaces/types
```

**Rule**: Never import `src/modules/<name>/internal-file` from outside that module.
Always import from `src/modules/<name>` (the index.ts barrel).

Exception: `src/proxy.ts` may import `@/modules/auth/edge`, which is the
only allowed public subpath for edge-safe auth configuration.
Client Components may import `@/modules/auth/client`, which is the only allowed
client-safe auth subpath.

## Auth Architecture — CRITICAL

Auth.js v5 uses a split-config pattern to support Edge Runtime in middleware:

- `src/modules/auth/auth.config.ts` — providers + callbacks, **NO Prisma import**.
  This is Edge-safe and re-exported through `src/modules/auth/edge.ts`.
- `src/modules/auth/auth.ts` — full `NextAuth()` with `PrismaAdapter`.
  Node.js runtime ONLY — used by API routes and Server Actions.
- `src/modules/auth/edge.ts` — public edge-safe entrypoint for proxy.
- `src/modules/auth/client.ts` — public client-safe entrypoint for auth UI.
- `src/proxy.ts` — imports `@/modules/auth/edge` ONLY.

Violating this pattern causes: `PrismaClient is not supported in Edge Runtime`.

## Server Actions Pattern

```typescript
'use server'

export async function doSomethingAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.errors[0]?.message }
  // ... business logic
  return { success: 'Done' }
}
```

- One exported function per file.
- File naming: `<verb>-<noun>.action.ts`
- Return type: `ActionState = { error?: string; success?: string; data?: T }`
- Always validate with Zod before DB operations.
- Use `useActionState` (React 19) in Client Components.

## Database

```bash
npx prisma migrate dev --name <description>  # create + apply migration
npx prisma migrate deploy                    # apply migrations in production
npx prisma migrate reset                     # reset dev DB (drops all data)
npx prisma studio                            # visual DB browser
npx prisma generate                          # regenerate client after schema changes
```

Prisma singleton is at `src/lib/prisma.ts`. **Never** create `new PrismaClient()` elsewhere.

## Environment Variables

All env vars are defined and validated in `src/env.ts` via `@t3-oss/env-nextjs`.

To add a new env var:

1. Add it to the Zod schema in `src/env.ts` (server or client section)
2. Map it in the `runtimeEnv` block
3. Add it to `.env.example` with a comment
4. Use `env.VAR_NAME` (not `process.env.VAR_NAME`) in app code

Build fails at startup if any required var is missing or malformed.

## Design System & UI Components

All UI primitives live in `src/components/ui/`. They follow the shadcn/ui conventions:

- Built on **Radix UI** for accessibility and keyboard navigation
- Styled with **Tailwind CSS v4** utility classes using CSS custom properties
- Variants defined via **CVA** (class-variance-authority)
- All accept `className` for overrides and use `forwardRef`

### Adding a new component

```bash
npx shadcn add <component-name>
```

This will place the component in `src/components/ui/` and update `globals.css` if new tokens are needed.

### Importing components

```tsx
// Barrel (preferred)
import { Button, Card, Badge } from '@/components/ui'

// Direct import
import { Button } from '@/components/ui/button'
```

### Storybook

```bash
npm run storybook        # dev server at localhost:6006
npm run storybook:build  # static export to storybook-static/
```

Stories live co-located with components: `src/components/ui/button.stories.tsx`.
MDX documentation pages live in `src/stories/docs/`.

## Component Conventions

- **Prefer Server Components**. Add `'use client'` only when you need:
  - `useState`, `useEffect`, `useReducer`
  - Browser APIs or event listeners
  - TanStack Query hooks or Zustand stores
- `src/components/ui/` — Radix UI + CVA components following shadcn pattern.
  Add new ones via `npx shadcn add <component>` or write manually.
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind class merging.

## Styling

- Tailwind CSS v4 uses **CSS-first config**. Custom design tokens are CSS custom
  properties in `src/app/globals.css` under `:root` and `.dark`.
- Dark mode: driven by `next-themes` + the `.dark` class on `<html>`.
- Do not add a `tailwind.config.ts` for design tokens — use `@theme inline {}` in CSS.

## Testing

- Mirror `src/` structure under `__tests__/`
- Query RTL components by role/label (accessibility-first)
- Mock Prisma with `jest.mock('@/lib/prisma')` — never hit a real DB in unit tests
- Run: `npm test` (watch), `npm run test:ci` (coverage, no watch)

## Common Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run format       # Prettier write
npm test             # Jest watch
npm run test:ci      # Jest CI (coverage)
npm run validate:template  # Verify docs, env contract, module boundaries, and agent context
npm run db:migrate   # Create + apply migration
npm run db:studio    # Prisma Studio
npm run db:seed      # Seed dev data
docker compose -f docker/docker-compose.yml up  # Full stack with DB
```

## Import Path Alias

`@/` maps to `src/`. Examples:

- `@/lib/utils` -> `src/lib/utils.ts`
- `@/modules/auth` -> `src/modules/auth/index.ts`
- `@/env` -> `src/env.ts`

## Adding a New Feature Module

1. Create `src/modules/<name>/` with the standard layout above.
2. Define Zod schemas in `schemas/`.
3. Add Prisma model to `prisma/schema.prisma` and run `prisma migrate dev`.
4. Implement repository -> service -> actions/components.
5. Export public API from `index.ts`.
6. Add route group under `src/app/(dashboard)/<name>/` if needed.
7. Add nav link in `src/config/navigation.ts`.

## Removing a Feature Module

1. Delete `src/modules/<name>/`.
2. Remove its Prisma models from `schema.prisma` and migrate.
3. Remove its route group from `src/app/`.
4. Remove its nav link from `src/config/navigation.ts`.
5. Run `prisma generate`.

## What NOT to Do

- Do not add `'use client'` to `layout.tsx` or `page.tsx` unless strictly required.
- Do not import `src/modules/<name>/internal-file` from outside the module.
- Do not use `process.env.VAR` directly — use `env.VAR` from `src/env.ts`.
- Do not run `npm install` for new shadcn components — use `npx shadcn add`.
- Do not put business logic in `src/app/` pages or API routes.
- Do not create a second `PrismaClient` — use `src/lib/prisma.ts`.
- Do not use Zustand stores in Server Components.
- Do not import `src/modules/auth/auth.ts` (full instance) in `src/proxy.ts`.
- Do not keep example product screens inside `src/app/`; move them into `src/modules/template/` or a real product module.
