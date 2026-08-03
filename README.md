# Codrona Core

API, applications, SDKs, and CLI. A Turborepo/pnpm workspace.

## Layout

```
apps/
  web/        Next.js PWA
  desktop/    Tauri v2
  mobile/     Expo
  api/        API server
packages/
  design-tokens/   rating ladder, type, motion   (MIT)
  ui/              shared components
  types/           shared TypeScript types
  sdk-ts/          published SDK                 (MIT)
```

## Getting started

```
pnpm install
pnpm dev
```

Node 20 or newer. Type-check with `./node_modules/.bin/tsc --noEmit`.

## Licence

AGPL-3.0-or-later, except packages that declare MIT in their own manifest and
LICENSE file. See ADR-0001 in the docs repository.
