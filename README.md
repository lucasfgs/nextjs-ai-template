# AI Template

A production-ready Next.js 16 starter for AI orchestration projects.

This repository is designed to be copied as the initial codebase for new software
projects. It emphasizes:

- clear module boundaries
- validated environment configuration
- edge-safe authentication architecture
- reusable email templates
- Storybook-driven UI documentation
- AI-friendly project context for autonomous coding agents

## What’s inside

- Next.js App Router with Server Components by default
- Auth.js v5 with Prisma adapter and middleware-safe config split
- Prisma + PostgreSQL with a singleton client
- Tailwind CSS v4 with shadcn/ui-style primitives
- Resend email service and React Email templates
- TanStack Query, Zustand, and React Hook Form for client interactions
- Jest and Storybook for baseline quality and UI review

## Repository map

- `src/app/` — routes, layouts, and metadata only
- `src/modules/` — feature modules with public `index.ts` entrypoints
- `src/modules/template/` — replaceable starter/example product screens
- `src/config/` — shared navigation, route context, and metadata config
- `src/components/` — shared UI, layout, and primitive components
- `src/lib/` — pure utilities and shared constants
- `src/providers/` — app-wide React providers
- `src/env.ts` — all environment variable validation
- `prisma/` — schema, seed, and database tooling
- `.agent-platform/` — machine-readable project context for AI agents
  - `manifest.json` — entrypoint map for agent context files
  - `project-context.json` — stack, conventions, and directory roles
  - `route-map.json` — public, protected, and API route inventory
  - `module-boundaries.json` — import boundary contract and exceptions
  - `customization-checklist.json` — required template handoff steps

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Docker

The repository includes:

- `docker/docker-compose.yml` for local development with PostgreSQL
- `docker/Dockerfile.dev` for the development app container
- `docker/Dockerfile` for a production image

### Development with Docker Compose

1. Copy the environment file:

```bash
cp .env.example .env.local
```

2. Keep `DATABASE_URL` in `.env.local` pointed at your local machine:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/appdb"
```

3. Start the app and database:

```bash
docker compose -f docker/docker-compose.yml up --build
```

The app will be available at http://localhost:3000 and PostgreSQL at `localhost:5432`.
The Compose app container automatically overrides `DATABASE_URL` to use the internal Docker hostname `db`, so you do not need to edit `.env.local` for Docker.

To stop the stack:

```bash
docker compose -f docker/docker-compose.yml down
```

To remove the database volume as well:

```bash
docker compose -f docker/docker-compose.yml down -v
```

If this is the first startup, run Prisma against the running containers in a second terminal:

```bash
docker compose -f docker/docker-compose.yml exec app npm run db:push
docker compose -f docker/docker-compose.yml exec app npm run db:seed
```

If you are running the app on the host instead of in Docker, start only the database container and use the normal Prisma scripts from your terminal:

```bash
docker compose -f docker/docker-compose.yml up -d db
npm run db:migrate
npm run db:seed
```

### Production image

Build the production image:

```bash
docker build -f docker/Dockerfile -t nextjs-ai-template .
```

Run it with your environment file:

```bash
docker run --rm -p 3000:3000 --env-file .env.local nextjs-ai-template
```

## Environment variables

Required variables live in `src/env.ts` and must be mirrored in `.env.example`.

### Server

- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — Auth.js secret
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — optional Google OAuth
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` — optional GitHub OAuth
- `RESEND_API_KEY` — optional email sending key
- `RESEND_FROM_EMAIL` — optional email sender address

### Client

- `NEXT_PUBLIC_APP_URL` — canonical app URL used for links and metadata
- `NEXT_PUBLIC_APP_NAME` — display name used throughout the UI

## Auth and route protection

- `src/modules/auth/auth.config.ts` is Edge-safe and re-exported via `src/modules/auth/edge.ts`.
- `src/modules/auth/auth.ts` contains the full NextAuth instance.
- Protected pages live under `(dashboard)` and `settings` is guarded in middleware.
- `src/proxy.ts` should import `@/modules/auth/edge`, not internal auth files.

## Email flow

The starter includes React Email templates for:

- welcome emails
- email verification
- password reset

If Resend is not configured, email sends fail gracefully with a clear message.

## Customizing this template

1. Update `APP_CONFIG` in `src/lib/constants.ts`.
2. Replace the starter screens in `src/modules/template/`.
3. Add feature modules under `src/modules/<feature>/`.
4. Extend navigation in `src/config/navigation.ts`.
5. Update docs in `README.md`, `CLAUDE.md`, and `.agent-platform/` together.

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test:ci
npm run storybook
npm run storybook:build
npm run validate:template
npm run db:migrate
npm run db:push
npm run db:studio
npm run db:seed
npm run db:generate
```

## Notes for AI agents

- Keep business logic out of `src/app/`.
- Import feature internals through module barrels only. The allowed auth subpaths are `@/modules/auth/edge` for proxy and `@/modules/auth/client` for Client Components.
- Use `env` for configuration and `APP_CONFIG` for product metadata.
- Prefer Server Components unless client state is required.
- Preserve the edge-safe auth split when modifying proxy or auth flows.
- Replace starter screens inside `src/modules/template/` instead of growing example UI inside `src/app/`.

## How to customize this template

- Set `NEXT_PUBLIC_APP_NAME` and `NEXT_PUBLIC_APP_URL` in `.env.local`.
- Edit `src/env.ts` when adding or changing environment variables.
- Update product metadata and shared defaults in `src/lib/constants.ts`.
- Replace or remove the starter screens in `src/modules/template/` as your product takes shape.
- Keep agent-facing instructions in `.agent-platform/` and `CLAUDE.md` in sync.
