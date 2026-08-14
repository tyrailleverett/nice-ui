import type { Meta, StoryFn } from "@storybook/react-vite";

import { PageHeader1 as PageHeader1Block } from "./page-header-1";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Page Header",
} satisfies Meta;

export const Simple: StoryFn = () => <PageHeader1Block />;
