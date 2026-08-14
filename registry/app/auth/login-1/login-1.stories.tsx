import type { Meta, StoryFn } from "@storybook/react-vite";

import { Login1 as Login1Block } from "./login-1";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Login",
} satisfies Meta;

export const SplitTestimonial: StoryFn = () => <Login1Block />;
