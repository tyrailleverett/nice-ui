import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature5 as Feature5Block } from "./feature-5";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const PortraitMediaCards: StoryFn = () => <Feature5Block />;
