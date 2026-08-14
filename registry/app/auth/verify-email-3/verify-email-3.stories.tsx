import type { Meta, StoryFn } from "@storybook/react-vite";

import { VerifyEmail3 as VerifyEmail3Block } from "./verify-email-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Verify Email",
} satisfies Meta;

export const Simple: StoryFn = () => <VerifyEmail3Block />;
