import type { Meta, StoryFn } from "@storybook/react-vite";

import { LogoCloud2 as LogoCloud2Block } from "./logo-cloud-2";

export default {
  title: "Marketing/Logo Cloud",
} satisfies Meta;

export const Marquee: StoryFn = () => <LogoCloud2Block />;
