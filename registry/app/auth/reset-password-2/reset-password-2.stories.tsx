import type { Meta, StoryFn } from "@storybook/react-vite";

import { ResetPassword2 as ResetPassword2Block } from "./reset-password-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Reset Password",
} satisfies Meta;

export const Card: StoryFn = () => <ResetPassword2Block />;
