import type { Meta, StoryFn } from "@storybook/react-vite";

import { Hero5 as Hero5Block } from "./hero-5";

export default {
  title: "Marketing/Hero",
} satisfies Meta;

export const CenteredHoverLogos: StoryFn = () => <Hero5Block />;
