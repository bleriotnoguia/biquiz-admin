# Biquiz Monorepo

Monorepo for the Biquiz platform, containing:

- `apps/biquiz-app` - Ionic + React quiz client app
- `apps/biquiz-admin` - Next.js admin dashboard
- `packages/shared` - Shared types/utilities used by both apps

## Tech Stack

- `pnpm` workspaces
- `turbo` for task orchestration
- TypeScript across apps/packages
- Supabase client integration in both applications

## Prerequisites

- Node.js 20+ (recommended)
- `pnpm` 9.x

## Getting Started

1. Install dependencies from the repo root:

```bash
pnpm install
```

2. Run all apps in development mode:

```bash
pnpm dev
```

This uses Turbo and starts each workspace's `dev` task.

## Environment Setup

Copy each app's example file and fill in your Supabase project values:

```bash
cp apps/biquiz-app/.env.example apps/biquiz-app/.env
cp apps/biquiz-admin/.env.local.example apps/biquiz-admin/.env.local
```

Required variables:

- `apps/biquiz-app/.env`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_KEY`
- `apps/biquiz-admin/.env.local`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SUPABASE_REFRENCE_ID`

## Common Commands (Root)

```bash
pnpm dev     # Run dev tasks in all workspaces
pnpm build   # Build all workspaces
pnpm lint    # Run lint tasks where defined
```

## Run a Single App

Run commands from inside each app directory.

### Quiz App (`apps/biquiz-app`)

```bash
pnpm --filter biquiz-app start
pnpm --filter biquiz-app build
pnpm --filter biquiz-app preview
```

### Admin App (`apps/biquiz-admin`)

```bash
pnpm --filter ./apps/biquiz-admin dev
pnpm --filter ./apps/biquiz-admin build
pnpm --filter ./apps/biquiz-admin start
pnpm --filter ./apps/biquiz-admin lint
```

## Workspace Layout

```text
.
├── apps/
│   ├── biquiz-app/
│   └── biquiz-admin/
├── packages/
│   └── shared/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Deployment

This repo can be deployed per app:

- `apps/biquiz-admin` (Next.js): deploy on Vercel, Netlify, or any Node host that supports Next.js.
- `apps/biquiz-app` (Vite/Ionic web build): run `pnpm --filter biquiz-app build` and deploy the generated `dist` directory to static hosting (Vercel static, Netlify, Cloudflare Pages, S3, etc.).

Before deploying, configure each environment's Supabase variables using the same keys shown above.

## Troubleshooting

- `pnpm: command not found`: install `pnpm` 9 (`npm i -g pnpm@9`).
- Build/dev command fails at root: run `pnpm install` again to ensure all workspace deps are linked.
- Admin app shows auth/session issues: verify `NEXT_PUBLIC_SUPABASE_REFRENCE_ID` matches your Supabase project reference.
- Quiz app cannot reach Supabase: check `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` in `apps/biquiz-app/.env`.
- Turborepo stale cache behavior: retry with cache bypass (`pnpm build -- --force`), or remove local build artifacts (`node_modules`, `.next`, `dist`) and reinstall.
