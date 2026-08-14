import type { Meta, StoryFn } from "@storybook/react-vite";

import { PageHeader2 as PageHeader2Block } from "./page-header-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Page Header",
} satisfies Meta;

export const Breadcrumb: StoryFn = () => <PageHeader2Block />;
