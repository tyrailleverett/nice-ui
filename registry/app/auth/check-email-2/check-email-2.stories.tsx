import type { Meta, StoryFn } from "@storybook/react-vite";

import { CheckEmail2 as CheckEmail2Block } from "./check-email-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Check Email",
} satisfies Meta;

export const Card: StoryFn = () => <CheckEmail2Block />;
