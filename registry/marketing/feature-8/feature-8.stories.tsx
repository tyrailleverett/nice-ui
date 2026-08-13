import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature8 as Feature8Block } from "./feature-8";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const DashboardBento: StoryFn = () => <Feature8Block />;
