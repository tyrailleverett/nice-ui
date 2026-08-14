import type { Meta, StoryFn } from "@storybook/react-vite";

import { Bento5 as Bento5Block } from "./bento-5";

export default {
  title: "Marketing/Bento",
} satisfies Meta;

export const ProductCapabilityGrid: StoryFn = () => <Bento5Block />;
