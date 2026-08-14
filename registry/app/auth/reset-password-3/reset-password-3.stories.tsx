import type { Meta, StoryFn } from "@storybook/react-vite";

import { ResetPassword3 as ResetPassword3Block } from "./reset-password-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Reset Password",
} satisfies Meta;

export const Simple: StoryFn = () => <ResetPassword3Block />;
