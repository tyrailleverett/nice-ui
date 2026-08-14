import type { Meta, StoryFn } from "@storybook/react-vite";

import { VerifyEmail2 as VerifyEmail2Block } from "./verify-email-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Verify Email",
} satisfies Meta;

export const Card: StoryFn = () => <VerifyEmail2Block />;
