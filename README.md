# Nice UI

A shadcn-compatible component registry for marketing blocks. Preview components in Storybook, install them into any project with the shadcn CLI.

## Quick start

```bash
bun install
bun run dev
```

Open the Storybook playground to browse and develop components in isolation.

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
2. Add the component file and a `*.stories.tsx` file for Storybook.
3. Register the item in `registry/marketing/registry.json`.
4. Validate locally:

```bash
bun run registry:validate
```

Stories are for local preview only and are not published as registry files.

Slugs stay `{category}-{n}` (install IDs, folder names, and component exports). Registry `title` and the Storybook story export name the **layout or job** (for example `hero-1` / `Hero1` with title `Centered Screenshot`), not demo copy.

## Scripts

| Script | Description |
|---|---|
| `bun run dev` | Start the Storybook playground |
| `bun run build:storybook` | Build a static Storybook site |
| `bun run registry:validate` | Validate the registry manifest |

## Tech stack

- Bun
- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui primitives
- Storybook for component preview
