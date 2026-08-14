import type { Meta, StoryFn } from "@storybook/react-vite";

import { EmptyState3 as EmptyState3Block } from "./empty-state-3";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Empty State",
} satisfies Meta;

export const Reports: StoryFn = () => <EmptyState3Block />;
