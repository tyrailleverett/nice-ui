import type { Meta, StoryFn } from "@storybook/react-vite";

import { Bento1 as Bento1Block } from "./bento-1";

export default {
  title: "Marketing/Bento",
} satisfies Meta;

export const EqualFeatureGrid: StoryFn = () => <Bento1Block />;
