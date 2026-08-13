import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature10 as Feature10Block } from "./feature-10";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const SplitCopyScreenshot: StoryFn = () => <Feature10Block />;
