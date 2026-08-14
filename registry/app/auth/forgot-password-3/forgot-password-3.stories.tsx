import type { Meta, StoryFn } from "@storybook/react-vite";

import { ForgotPassword3 as ForgotPassword3Block } from "./forgot-password-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Forgot Password",
} satisfies Meta;

export const Simple: StoryFn = () => <ForgotPassword3Block />;
