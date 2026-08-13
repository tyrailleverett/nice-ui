import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature13 as Feature13Block } from "./feature-13";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const TwoByTwoCards: StoryFn = () => <Feature13Block />;
