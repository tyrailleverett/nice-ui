import type { Meta, StoryFn } from "@storybook/react-vite";

import { Register2 as Register2Block } from "./register-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Register",
} satisfies Meta;

export const Card: StoryFn = () => <Register2Block />;
