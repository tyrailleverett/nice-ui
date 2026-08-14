import type { Meta, StoryFn } from "@storybook/react-vite";

import { ForgotPassword2 as ForgotPassword2Block } from "./forgot-password-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Forgot Password",
} satisfies Meta;

export const Card: StoryFn = () => <ForgotPassword2Block />;
