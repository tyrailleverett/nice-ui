# Nice UI

A shadcn-compatible registry of **marketing blocks** and **product app blocks**. Preview in Storybook, install into any shadcn project with the CLI.

Released under the [MIT License](./LICENSE).

## Quick start

```bash
bun install
bun run dev
```

Open the Storybook playground to browse and develop components in isolation.

## Install

From a project with shadcn already initialized:

```bash
bunx shadcn@latest add tyrailleverett/nice-ui/hero-1
```

Adding any block also installs the Nice UI **style** (Inter Variable, color tokens, 12px radius ladder, and `font-display-heading`). To apply the system without a block:

```bash
bunx shadcn@latest add tyrailleverett/nice-ui/style
```

Useful commands:

```bash
bunx shadcn@latest list tyrailleverett/nice-ui
bunx shadcn@latest view tyrailleverett/nice-ui/hero-1
bunx shadcn@latest add tyrailleverett/nice-ui/hero-1 --dry-run
```

Standalone design-system items:

| Item | Type | What it installs |
|---|---|---|
| `tyrailleverett/nice-ui/font` | `registry:font` | Inter Variable (`@fontsource-variable/inter`) |
| `tyrailleverett/nice-ui/theme` | `registry:theme` | Canvas, ink, semantic hues, radius ladder |
| `tyrailleverett/nice-ui/style` | `registry:style` | Font + theme + `font-display-heading` utility |

## Registry structure

```
registry/
  theme/         # Font, theme tokens, and style
  marketing/     # Landing and marketing blocks
  app/           # Product, auth, and dashboard blocks
```

Blocks are registered in `registry/marketing/registry.json` and `registry/app/registry.json`. Theme items live in `registry/theme/registry.json`. The root [`registry.json`](./registry.json) composes those files with `include`.

## Add a new block

1. Create a folder under `registry/marketing/` or `registry/app/`.
2. Add the component file and a `*.stories.tsx` file for Storybook.
3. Register the item in the matching `registry.json`. Include `tyrailleverett/nice-ui/style` in `registryDependencies` so install pulls tokens and Inter.
4. Validate locally:

```bash
bun run registry:build
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
| `bun run registry:build` | Export registry items and text-safe screenshot assets to `public/r` |

## Tech stack

- Bun
- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui primitives
- Storybook for component preview
