import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature1 as Feature1Block } from "./feature-1";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const FourUpIconRow: StoryFn = () => <Feature1Block />;
