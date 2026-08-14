import type { Meta, StoryFn } from "@storybook/react-vite";

import { CheckEmail3 as CheckEmail3Block } from "./check-email-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Check Email",
} satisfies Meta;

export const Simple: StoryFn = () => <CheckEmail3Block />;
