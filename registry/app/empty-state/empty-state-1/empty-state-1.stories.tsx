import type { Meta, StoryFn } from "@storybook/react-vite";

import { EmptyState1 as EmptyState1Block } from "./empty-state-1";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Empty State",
} satisfies Meta;

export const Records: StoryFn = () => <EmptyState1Block />;
