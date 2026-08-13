import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature9 as Feature9Block } from "./feature-9";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const TwoUpIllustrations: StoryFn = () => <Feature9Block />;
