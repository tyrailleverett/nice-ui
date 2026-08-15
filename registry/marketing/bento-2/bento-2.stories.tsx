import type { Meta, StoryFn } from "@storybook/react-vite";

import { Bento2 as Bento2Block } from "./bento-2";

export default {
  title: "Marketing/Bento",
} satisfies Meta;

export const WideLeadStack: StoryFn = () => <Bento2Block />;
