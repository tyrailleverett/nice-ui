import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature11 as Feature11Block } from "./feature-11";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const FourCardBento: StoryFn = () => <Feature11Block />;
