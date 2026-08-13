import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta7 as Cta7Block } from "./cta-7";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const GitHubActivityCards: StoryFn = () => <Cta7Block />;
