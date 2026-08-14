import type { Meta, StoryFn } from "@storybook/react-vite";

import { EmptyState4 as EmptyState4Block } from "./empty-state-4";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Empty State",
} satisfies Meta;

export const Members: StoryFn = () => <EmptyState4Block />;
