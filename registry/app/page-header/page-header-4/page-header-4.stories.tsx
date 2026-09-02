import type { Meta, StoryFn } from "@storybook/react-vite";

import { PageHeader4 as PageHeader4Block } from "./page-header-4";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Page Header",
} satisfies Meta;

export const ContextTabs: StoryFn = () => <PageHeader4Block />;
