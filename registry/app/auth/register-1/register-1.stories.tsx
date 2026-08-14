import type { Meta, StoryFn } from "@storybook/react-vite";

import { Register1 as Register1Block } from "./register-1";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Register",
} satisfies Meta;

export const SplitTestimonial: StoryFn = () => <Register1Block />;
