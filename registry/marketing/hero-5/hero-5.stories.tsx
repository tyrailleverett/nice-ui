import type { Meta, StoryFn } from "@storybook/react-vite";

import { Hero5 as Hero5Block } from "./hero-5";

export default {
  parameters: { layout: "fullscreen" },
  title: "Marketing/Hero",
} satisfies Meta;

export const SignalBoard: StoryFn = () => <Hero5Block />;
