# Nice UI

A shadcn-compatible component registry for marketing and dashboard blocks. Preview components in Ladle, install them into any project with the shadcn CLI.

## Quick start

```bash
bun install
bun run dev
```

Open the Ladle playground to browse and develop components in isolation.

## Install components

After this repository is public on GitHub:

```bash
bunx shadcn@latest add hotreloadstudios/nice-ui/hero-1
bunx shadcn@latest add hotreloadstudios/nice-ui/stats-cards
```

Useful commands:

```bash
bunx shadcn@latest list hotreloadstudios/nice-ui
bunx shadcn@latest view hotreloadstudios/nice-ui/hero-1
bunx shadcn@latest add hotreloadstudios/nice-ui/hero-1 --dry-run
```

## Registry structure

```
registry/
  marketing/     # Landing and marketing blocks
  dashboard/     # App and dashboard blocks
```

Each family has its own `registry.json`. The root [`registry.json`](./registry.json) composes them with `include`.

## Add a new block

1. Create a folder under `registry/marketing/` or `registry/dashboard/`.
2. Add the component file and a `*.stories.tsx` file for Ladle.
3. Register the item in that family's `registry.json`.
4. Validate locally:

```bash
bun run registry:validate
```

Stories are for local preview only and are not published as registry files.

## Scripts

| Script | Description |
|---|---|
| `bun run dev` | Start the Ladle playground |
| `bun run build:ladle` | Build a static Ladle site |
| `bun run registry:validate` | Validate the registry manifest |

## Tech stack

- Bun
- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui primitives
- Ladle for component preview
