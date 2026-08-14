import type { Meta, StoryFn } from "@storybook/react-vite";

import { PageHeader3 as PageHeader3Block } from "./page-header-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Page Header",
} satisfies Meta;

export const Toolbar: StoryFn = () => <PageHeader3Block />;
