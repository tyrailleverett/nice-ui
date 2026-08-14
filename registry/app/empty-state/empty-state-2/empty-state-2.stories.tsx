import type { Meta, StoryFn } from "@storybook/react-vite";

import { EmptyState2 as EmptyState2Block } from "./empty-state-2";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Empty State",
} satisfies Meta;

export const Projects: StoryFn = () => <EmptyState2Block />;
