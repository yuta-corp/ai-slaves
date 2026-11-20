<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Slaves

Internal AI platform for Utah Corporation: one workspace that centralizes all company AI usage and orchestrates a hierarchy of agents (human → manager → project manager / full-stack / backend devs…) acting through internal connectors (mail, calendar, GitHub, social posts, Jira). Jira tickets are the source of truth for project work.

## Stack

- Next.js 16 App Router + React 19, strict TypeScript, Tailwind CSS v4 (theme in `app/globals.css`)
- Prisma 7 ORM with the `@prisma/adapter-pg` driver adapter; schema in `prisma/schema.prisma`, generated client in `lib/generated/prisma`
- NVIDIA NIM is the only AI model provider — never wire up another
- pnpm only, never npm/yarn
- shadcn/ui, style `base-nova` on @base-ui/react, lucide icons (see `components.json`); alias `@/*` → repo root

## Commands

```bash
pnpm dev         # dev server
pnpm format      # prettier, ts/tsx only
pnpm lint        # eslint (flat config)
pnpm typecheck   # tsc --noEmit
pnpm build       # next build, also type-checks
```

Run before every commit/PR: `pnpm format && pnpm lint && pnpm typecheck && pnpm build`.

## Database

- Copy `.env.example` to `.env` first; `DATABASE_URL` points at the local `slaves` Postgres database.
- `pnpm db:migrate` (prisma migrate dev), `pnpm db:generate`, `pnpm db:studio`. Client is generated on install into `lib/generated/prisma` (gitignored).

## Testing

- `pnpm test` — Vitest: unit (`tests/unit`) + integration (`tests/integration`, hits the local DB; skipped without `DATABASE_URL`)
- `pnpm test:e2e` — Playwright (`tests/e2e`); it starts the dev server itself
- Run one file: `pnpm exec vitest run <file>` or `pnpm exec playwright test <file>`

## UI components

- Never hand-write UI components. The user supplies them (shadcn/ui, shadcn space).
- Add shadcn primitives with `npx shadcn@latest add <name>` — installs into `components/ui`.

## Git workflow (English only)

- All issues, branches, commits, and PRs in English. Conventional commits (`feat:`, `fix:`, …).
- One issue per task → branch from `dev` with prefixes: `feat/`, `fix/`, `chore/`, `doc/`, `hotfix/`.
- PRs target `dev` (user testing). Promotion order: `dev` → `preprod` (beta testers) → `prod`. Never skip a stage or push directly to `preprod`/`prod`.

## Code review

Delegate to the `code-reviewer` subagent (`.opencode/agent/code-reviewer.md`) on every change before merging a PR. It verifies the code matches the plan, is clean/readable/maintainable, and strips AI slop.
