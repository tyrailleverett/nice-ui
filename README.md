# Nice UI

A shadcn-compatible component registry for marketing blocks. Preview components in Ladle, install them into any project with the shadcn CLI.

## Quick start

```bash
bun install
bun run dev
```

Open the Ladle playground to browse and develop components in isolation.

## Install components

From a project with shadcn already initialized:

```bash
bunx shadcn@latest add tyrailleverett/nice-ui/hero-1
```

Useful commands:

```bash
bunx shadcn@latest list tyrailleverett/nice-ui
bunx shadcn@latest view tyrailleverett/nice-ui/hero-1
bunx shadcn@latest add tyrailleverett/nice-ui/hero-1 --dry-run
```

## Registry structure

```
registry/
  marketing/     # Landing and marketing blocks
```

Marketing blocks are registered in `registry/marketing/registry.json`. The root [`registry.json`](./registry.json) composes that file with `include`.

## Add a new block

1. Create a folder under `registry/marketing/`.
2. Add the component file and a `*.stories.tsx` file for Ladle.
3. Register the item in `registry/marketing/registry.json`.
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
