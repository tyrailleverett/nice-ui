import type { Meta, StoryFn } from "@storybook/react-vite";

import { LogoCloud1 as LogoCloud1Block } from "./logo-cloud-1";

export default {
  title: "Marketing/Logo Cloud",
} satisfies Meta;

export const BorderedGrid: StoryFn = () => <LogoCloud1Block />;
